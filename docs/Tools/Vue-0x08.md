# Vue Router 实现剖析之二

[前一篇文章](https://www.yuque.com/littlelane/vue/uogm2g)介绍了 Vue Router 类、 插件注册、init 初始化等比较前置的知识，这里我们将深入腹地，说一说 Vue Router 的核心 —— history 历史管理。

<a name="86d92e84"></a>
## history 历史管理
关于 history 历史管理的处理，在 VueRouter 类中有相关的入口处理，这部分的代码在 src/index.js：

```javascript
let mode = options.mode || 'hash'
this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false

if (this.fallback) {
  mode = 'hash'
}

if (!inBrowser) {
  mode = 'abstract'
}

this.mode = mode

switch (mode) {
  case 'history':
    this.history = new HTML5History(this, options.base)
    break
  case 'hash':
    this.history = new HashHistory(this, options.base, this.fallback)
    break
  case 'abstract':
    this.history = new AbstractHistory(this, options.base)
    break
  default:
    if (process.env.NODE_ENV !== 'production') {
      assert(false, `invalid mode: ${mode}`)
    }
}
```

这里的 switch 逻辑会根据最终修正的 mode 变量的值实例化不同的路由实例，并赋值给 this.history 变量，供后面逻辑使用。我们在深入看看 HTML5History、HashHistory 和 AbstractHistory 类的实现，它们都是继承自同一个基类 History。那我们就先来看看 base 这个类的逻辑吧，这部分的逻辑在 src/history/base.js：

```javascript
export class History {
  constructor (router: Router, base: ?string) {
    this.router = router
    this.base = normalizeBase(base)
    // start with a route object that stands for "nowhere"
    this.current = START
    this.pending = null
    this.ready = false
    this.readyCbs = []
    this.readyErrorCbs = []
    this.errorCbs = []
  }

	listen (cb: Function) {
    this.cb = cb
  }

  onReady (cb: Function, errorCb: ?Function) {
    if (this.ready) {
      cb()
    } else {
      this.readyCbs.push(cb)
      if (errorCb) {
        this.readyErrorCbs.push(errorCb)
      }
    }
  }

  onError (errorCb: Function) {
    this.errorCbs.push(errorCb)
  }

  // 处理路由变化中的基础逻辑，这部分的逻辑我们后续会讲到
  transitionTo (location: RawLocation, onComplete?: Function, onAbort?: Function) {}
  // ....
}

/**
 * 根据配置的 base 值获取绝对路径
 * @param {?string} base
 * @returns {string}
 */
function normalizeBase (base: ?string): string {
  if (!base) {
    if (inBrowser) {
      const baseEl = document.querySelector('base')
      base = (baseEl && baseEl.getAttribute('href')) || '/'
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '')
    } else {
      base = '/'
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}
// ...
```

这里贴出的代码我们省略了很多的逻辑，关于这部分省略的逻辑也是 Vue Router 的核心之一，在后续的文章中会单独拿出来说说。基类剩余的逻辑就很简单了，其中的构造函数会接受 router 实例和表示基础路径的字符串 base 作为参数，然后就是一些静态属性的声明和赋值，接下来就定义了几个路由模式类的基础方法，还记得上一篇文章说到的 Vue Router 类里面的 init 初始化方法吗，其中有一段这样的逻辑：

```javascript
// 设置当前历史对象的 cb 值, 在 transitionTo 的时候知道在 history 更新完毕的时候调用这个 cb
// 然后看这里设置的这个函数的作用就是更新下当前应用实例的 _route 的值
history.listen(route => {
  this.apps.forEach((app) => {
    app._route = route
  })
})
```

该基类就对这个 listen 方法有相关的实现：

```javascript
listen (cb: Function) {
  this.cb = cb
}
```

listen 声明逻辑会将接受到的回调函数保存在基类的属性上供后面的 transitionTo 逻辑使用，而在 VueRouter 类的 init 方法中的调用 listen 逻辑会遍历 this.apps 值 —— 也就是我们之前说到的保存持有 $options.router 属性的 Vue 实例数组，将 route 路由对象赋值到单个 Vue 实例的 _route 属性，这也就是下面这段逻辑的来源了：

```javascript
Object.defineProperty(Vue.prototype, '$route', {
  get () { return this._routerRoot._route }
})
```

然后暴露 onReady 方法用来收集路由切换完成时的成功和异常处理回调、onError 方法用来收集路由切换过程中的错误处理回调。

base 基类实现说完了。但是基于 base 基类，Vue Router 有三种路由模式的实现，接下来我会以其中一种模式重点说一下，另外两种就点到为止，因为三种模式的实现有很多相似的地方。

<a name="m4edX"></a>
## History 类实现
html5 提供了新的 history api 以便开发者可以利用这些 api 做更多的功能实现，Vue Router 基于这些 api 实现了 html5 history 历史管理模式，源码在 src/history/html5.js

```javascript
export class HTML5History extends History {
  constructor (router: Router, base: ?string) {
    super(router, base)

    const expectScroll = router.options.scrollBehavior
    const supportsScroll = supportsPushState && expectScroll

    if (supportsScroll) {
      setupScroll()
    }

    const initLocation = getLocation(this.base)
    
    window.addEventListener('popstate', e => {
      const current = this.current
      
      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      const location = getLocation(this.base)
      if (this.current === START && location === initLocation) {
        return
      }

      this.transitionTo(location, route => {
        if (supportsScroll) {
          handleScroll(router, route, current, true)
        }
      })
    })
  }
}

export function getLocation (base: string): string {
  let path = decodeURI(window.location.pathname)
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length)
  }
  return (path || '/') + window.location.search + window.location.hash
}

```

和 base 基类一样，HTML5History 类构造函数同样接受 VueRouter 实例和基础路径的字符串 base 作为参数，然后获取路由配置参数中表示滚动行为的 scrollBehavior。这个 scrollBehavior 在我们平时的开发中也很实用：

```javascript
// 比如我们希望在路由切换的时候，对应渲染的页面的滚动条会滚动指定的位置
// 我们可以这样
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // 希望页面滚动条始终处于原始位置（X 轴处于最左端，Y 轴处于最顶端）
    return { x: 0, y: 0 }
  }
})
```

如果 VueRouter 的配置参数配置了 scrollBehavior 而且浏览器支持 pushState html5 api 就执行 setupScroll 方法。

是否支持 pushState html5 api 是通过执行 supportsPushState 方法进行判断的，该方法的源代码在 src/util/push-state.js：

```javascript
export const supportsPushState = inBrowser && (function () {
  const ua = window.navigator.userAgent

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})()
```

主要是通过 userAgent 获取当前机器的环境，判断浏览器的版本信息和当前浏览器环境是否实现 pushState。

而 setupScroll 方法的实现代码在 src/util/scroll.js：

```javascript
const positionStore = Object.create(null)

export function setupScroll () {
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  window.history.replaceState({ key: getStateKey() }, '', window.location.href.replace(window.location.origin, ''))
  window.addEventListener('popstate', e => {
    saveScrollPosition()
    if (e.state && e.state.key) {
      setStateKey(e.state.key)
    }
  })
}

export function saveScrollPosition () {
  const key = getStateKey()
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  }
}
```

首先调用 replaceState 方法修复 Firefox 的 bug，然后通过监听 popstate 事件，这个事件会在浏览器历史记录条目发生改变时触发，也就是当用户点击前进、后退按钮或者调用 history.back()、history.forward()、history.go() 时触发。当 popstate 事件触发时，就将触发路由切换的当前文档距离窗口左端和顶端的距离保存于 positionStore 对象，以便后续在切换回该路由页面时使滚动条滚动至相同的位置。

接着回到 HTML5History 逻辑，基于 base 和当前地址栏的 URL 获取最终有效路由 URL（不包括协议、域名、基础路径）作为初始路径 initLocation，然后监听 popstate 事件。当事件触发时，说明浏览器历史记录条目发生了变化，然后获取当前的路由信息和有效路由 URL（因为此时浏览器地址栏的信息可能已经变化了，再次获取有效链接可能是不同的）与初始的路由信息和有效链接进行比较。如果相同说明是路由链接没有变化，对应的需要渲染的页面信息也就不变，所以直接 return 不做任何处理，如果其中一项不同就说明有可能需要切换路由信息，渲染新页面信息，就继续进行处理。

```javascript
go (n: number) {
  window.history.go(n)
}

push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  const { current: fromRoute } = this
  this.transitionTo(location, route => {
    pushState(cleanPath(this.base + route.fullPath))
    handleScroll(this.router, route, fromRoute, false)
    onComplete && onComplete(route)
  }, onAbort)
}

replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  const { current: fromRoute } = this
  this.transitionTo(location, route => {
    replaceState(cleanPath(this.base + route.fullPath))
    handleScroll(this.router, route, fromRoute, false)
    onComplete && onComplete(route)
  }, onAbort)
}

ensureURL (push?: boolean) {
  if (getLocation(this.base) !== this.current.fullPath) {
    const current = cleanPath(this.base + this.current.fullPath)
    push ? pushState(current) : replaceState(current)
  }
}

getCurrentLocation (): string {
  return getLocation(this.base)
}
```

HTML5History 类定义了 go 方法，调用的是原生的 window.history.go(n) 方法；模拟实现了 push 方法，接受目标路由信息 location、onComplete 成功回调函数、onAbort 终止回调函数三个参数，通过 transitionTo 方法处理路由信息的切换，replace 方法也是类似的逻辑；对于 ensureURL 方法，三个模式的路由类都有自己的实现，AbstractHistory 实现了一个空函数，不做任何处理。在 HTML5History 中，如果通过 getLocation 获取的有效路由 URL和当前路由信息对象里面的路径不同就调用 pushState 或 replaceState 方法进行路由信息的切换。在 HashHistory 中，如果当前地址栏的 hash 值和路由信息对象里面的 hash 值不一致就调用 pushHash 和 replaceHash 进行路由信息的切换，当然 pushHash 和 replaceHash 方法在支持 pushState 方法的环境下最终还是执行的 pushState 和 replaceState 方法，在不支持 pushState 方法的环境下就执行的 window.location.hash 和 window.location.replace 了。

HTML5History 类处理方法就说完了。HashHistory 的实现其实和 HTML5History 的实现差不多，只不过 HashHistory 是对 URL hash 值的处理，多了一层对 pushState 支持的判断。而 AbstractHistory 则完全使用了不一样的方式进行实现 —— 栈。因为 AbstractHistory 的设计是作用于非浏览器环境的，所以没有原生的 replaceState、pushState api 和可监听历史记录变化的事件 popstate，需要完全利用栈先进后出的特性进行模拟路由 api 的实现。有兴趣的小伙伴可以去源码看看相关的实现，这就我就不赘述了。

<a name="25f9c7fa"></a>
## 总结
那么到此为止，我们将 history 基类和基于它的三种路由模式实现都过了一遍，了解了 history 模式的实现和提供给外部的 api。[下一篇](https://www.yuque.com/littlelane/vue/dkcbt1)我们将会讲到 Vue Router 另一个核心的概念 —— 匹配，这里 Vue Router 会将我们配置的路由信息进行组装形成映射表，供路由信息的匹配和页面渲染。
