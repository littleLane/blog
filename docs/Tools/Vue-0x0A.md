# Vue Router 实现剖析之五

在实际的应用中，我们会使用 `<router-link>` 组件提供类似链接的效果，当用户点击时会调用 Vue Router 实现的 api 进行 url 的切换，进行切换组件的渲染。而组件的渲染是需要载体的，Vue Router 也提供了对应的组件来实现组件渲染的载体，接下来我们就来分别介绍他们吧。

<a name="3RH3u"></a>
## `<router-link>`
Vue Router 内置的组件 router-link 组件， 它支持用户在具有路由功能的应用中（点击）导航。 通过 to 属性指定目标地址，默认渲染成带有正确链接的 a 标签，可以通过配置 tag 属性生成别的标签。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。router-link 比起写死的 `<a href="...">` 会好一些，理由如下：无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致，所以当你要切换路由模式，或者在 IE9 降级使用 hash 模式，无须作任何变动。在 HTML5 history 模式下，router-link 会守卫点击事件，让浏览器不再重新加载页面。当你在 HTML5 history 模式下使用 base 选项之后，所有的 to 属性都不需要写（基路径）了。

那么接下来我们就来分析它的实现，它的定义在 src/components/link.js 中：

```javascript
export default {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render (h: Function) {
    const router = this.$router
    const current = this.$route
    const { location, route, href } = router.resolve(this.to, current, this.append)
    const classes = {}
    const globalActiveClass = router.options.linkActiveClass
    const globalExactActiveClass = router.options.linkExactActiveClass
    const activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass
    const exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass
    const activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass
    const exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass
    const compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route
    classes[exactActiveClass] = isSameRoute(current, compareTarget)
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget)
    const handler = e => {
      if (guardEvent(e)) {
        if (this.replace) {
          router.replace(location)
        } else {
          router.push(location)
        }
      }
    }
    const on = { click: guardEvent }
    if (Array.isArray(this.event)) {
      this.event.forEach(e => { on[e] = handler })
    } else {
      on[this.event] = handler
    }
    const data: any = {
      class: classes
    }
    if (this.tag === 'a') {
      data.on = on
      data.attrs = { href }
    } else {
      const a = findAnchor(this.$slots.default)
      if (a) {
        a.isStatic = false
        const extend = _Vue.util.extend
        const aData = a.data = extend({}, a.data)
        aData.on = on
        const aAttrs = a.data.attrs = extend({}, a.data.attrs)
        aAttrs.href = href
      } else {
        data.on = on
      }
    }
    return h(this.tag, data, this.$slots.default)
  }
}
```

router-link 标签的渲染也是基于 render 函数，它首先做了路由解析。然后执行 router.resolve 方法获取路由相关的信息。router.resolve 是 VueRouter 的实例方法，它的定义在 src/index.js 中：

```javascript
resolve (
  to: RawLocation,
  current?: Route,
  append?: boolean
): {
  location: Location,
  route: Route,
  href: string,
  normalizedTo: Location,
  resolved: Route
} {
  const location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  )
  const route = this.match(location, current)
  const fullPath = route.redirectedFrom || route.fullPath
  const base = this.history.base
  const href = createHref(base, fullPath, this.mode)
  return {
    location,
    route,
    href,
    normalizedTo: location,
    resolved: route
  }
}
function createHref (base: string, fullPath: string, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath
  return base ? cleanPath(base + '/' + path) : path
}
```

它先规范生成目标 location，再根据 location 和 match 通过 this.match 方法计算生成目标路径 route，然后再根据 base、fullPath 和 this.mode 通过 createHref 方法计算出最终跳转的 href。解析完 router 获得目标 location、route、href 后，接下来对 exactActiveClass 和 activeClass 做处理，当配置 exact 为 true 的时候，只有当目标路径和当前路径完全匹配的时候，会添加 exactActiveClass；而当目标路径包含当前路径的时候，会添加 activeClass。接着创建了一个守卫函数 ：

```javascript
const handler = e => {
  if (guardEvent(e)) {
    if (this.replace) {
      router.replace(location)
    } else {
      router.push(location)
    }
  }
}
function guardEvent (e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return
  if (e.defaultPrevented) return
  if (e.button !== undefined && e.button !== 0) return 
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute('target')
    if (/\b_blank\b/i.test(target)) return
  }
  if (e.preventDefault) {
    e.preventDefault()
  }
  return true
}
const on = { click: guardEvent }
  if (Array.isArray(this.event)) {
    this.event.forEach(e => { on[e] = handler })
  } else {
    on[this.event] = handler
  }
```

最终会监听点击事件或者其它可以通过 prop 传入的事件类型，执行 hanlder 函数，最终执行 router.push 或者 router.replace 函数，它们的定义在 src/index.js 中：

```javascript
push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  this.history.push(location, onComplete, onAbort)
}
replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
 this.history.replace(location, onComplete, onAbort)
}
```

实际上就是执行了 history 的 push 和 replace 方法做路由跳转。最后判断当前 tag 是否是 a 标签，router-link 默认会渲染成 a 标签，当然我们也可以修改 tag 的 prop 渲染成其他节点，这种情况下会尝试找它子元素的 a 标签，如果有则把事件绑定到 a 标签上并添加 href 属性，否则绑定到外层元素本身。

<a name="34YaT"></a>
## `<router-view>`
路由最终的渲染离不开组件，Vue Router 内置了 `<router-view>` 组件，它的定义在 src/components/view.js 中。

```javascript
export default {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render (_, { props, children, parent, data }) {
    data.routerView = true
   
    const h = parent.$createElement
    const name = props.name
    const route = parent.$route
    const cache = parent._routerViewCache || (parent._routerViewCache = {})
    let depth = 0
    let inactive = false
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      if (parent._inactive) {
        inactive = true
      }
      parent = parent.$parent
    }
    data.routerViewDepth = depth
    if (inactive) {
      return h(cache[name], data, children)
    }
    const matched = route.matched[depth]
    if (!matched) {
      cache[name] = null
      return h()
    }
    const component = cache[name] = matched.components[name]
   
    data.registerRouteInstance = (vm, val) => {     
      const current = matched.instances[name]
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val
      }
    }
    
    ;(data.hook || (data.hook = {})).prepatch = (_, vnode) => {
      matched.instances[name] = vnode.componentInstance
    }
    let propsToPass = data.props = resolveProps(route, matched.props && matched.props[name])
    if (propsToPass) {
      propsToPass = data.props = extend({}, propsToPass)
      const attrs = data.attrs = data.attrs || {}
      for (const key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key]
          delete propsToPass[key]
        }
      }
    }
    return h(component, data, children)
  }
}
```

router-view 是一个 functional 组件，它的渲染也是依赖 render 函数，那么 router-view具体应该渲染什么组件呢？首先它会获取当前的路径，然后在 VueRouter 的实例执行 router.init 方法的时候，会执行如下逻辑，定义在 src/index.js中：

```javascript
history.listen(route => {
  this.apps.forEach((app) => {
    app._route = route
  })
})
```

而 history.listen 方法定义在 src/history/base.js 中：

```javascript
listen (cb: Function) {
  this.cb = cb
}
```

然后在 updateRoute 的时候执行 this.cb：

```javascript
updateRoute (route: Route) {
  //. ..
  this.current = route
  this.cb && this.cb(route)
  // ...
}
```

也就是我们执行 transitionTo 方法最后执行 updateRoute 的时候会执行回调，然后会更新 this.apps 保存的组件实例的 _route 值，this.apps 数组保存的实例的特点都是在初始化的时候传入了 router 配置项，一般的场景数组只会保存根 Vue 实例，因为我们是在 new Vue 传入了 router 实例。$route 是定义在 Vue.prototype 上。每个组件实例访问 $route 属性，就是访问根实例的 _route，也就是当前的路由线路。

router-view 是支持嵌套的，回到 render 函数，其中定义了 depth 的概念，它表示 router-view 嵌套的深度。每个 router-view 在渲染的时候，执行如下逻辑：

```javascript
data.routerView = true
// ...
while (parent && parent._routerRoot !== parent) {
  if (parent.$vnode && parent.$vnode.data.routerView) {
    depth++
  }
  if (parent._inactive) {
    inactive = true
  }
  parent = parent.$parent
}
const matched = route.matched[depth]
// ...
const component = cache[name] = matched.components[name]
```

parent._routerRoot 表示的是根 Vue 实例，那么这个循环就是从当前的 router-view 的父节点向上找，一直找到根 Vue 实例。在这个过程中，如果碰到了父节点也是 router-view 的时候，说明 router-view 有嵌套的情况，depth++。遍历完成后，根据当前线路匹配的路径和 depth 找到对应的 RouteRecord，进而找到该渲染的组件。<br />除了找到了应该渲染的组件，还定义了一个注册路由实例的方法：

```javascript
data.registerRouteInstance = (vm, val) => {     
  const current = matched.instances[name]
  if (
    (val && current !== vm) ||
    (!val && current === vm)
  ) {
    matched.instances[name] = val
  }
}
```

给 vnode 的 data 定义了 registerRouteInstance 方法，在 src/install.js 中，我们会调用该方法去注册路由的实例：

```javascript
const registerInstance = (vm, callVal) => {
  let i = vm.$options._parentVnode
  if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
    i(vm, callVal)
  }
}
Vue.mixin({
  beforeCreate () {
    // ...
    registerInstance(this, this)
  },
  destroyed () {
    registerInstance(this)
  }
})
```

在混入的 beforeCreate 钩子函数中，会执行 registerInstance 方法，进而执行 render 函数中定义的 registerRouteInstance 方法，从而给 matched.instances[name] 赋值当前组件的 vm 实例。render 函数的最后根据 component 渲染出对应的组件 vonde：

```javascript
return h(component, data, children)
```

那么当我们执行 transitionTo 来更改路由线路后，组件是如何重新渲染的呢？在我们混入的 beforeCreate 钩子函数中有这么一段逻辑：

```javascript
Vue.mixin({
  beforeCreate () {
    if (isDef(this.$options.router)) {
      Vue.util.defineReactive(this, '_route', this._router.history.current)
    }
    // ...
  }
})
```

由于我们把根 Vue 实例的 _route 属性定义成响应式的，我们在每个 router-view 执行 render函数的时候，都会访问 parent.$route，如我们之前分析会访问 this._routerRoot._route，触发了它的 getter，相当于 router-view 对它有依赖，然后再执行完 transitionTo 后，修改 app._route 的时候，又触发了setter，因此会通知 router-view 的渲染 watcher 更新，重新渲染组件。

<a name="DA7b3"></a>
## 总结
到这里关于 Vue Router 的所有实现就说完了。Vue Router 提供了多种路由模式的实现，为开发者提供了丰富的 api，完全可以满足复杂的开发业务场景。整个系统的设计也很清晰，路由系统会维护当前的路由信息，当用户切换路由地址时，会获取目标路由信息并将当前路由切换过去，切换的过程中会执行一系列的路由钩子函数，然后更改 url 信息，并渲染对应的组件。路由切换完毕后会把目标线路更新替换当前线路，这样就会作为下一次的路径切换的依据。
