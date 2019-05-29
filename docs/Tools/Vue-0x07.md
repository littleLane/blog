# Vue Router 实现剖析之一

![v2-6127682635d2b9422fac8bb7ca2ea8bf_hd.png](https://cdn.nlark.com/yuque/0/2019/png/114852/1557389163347-2e0058ec-5d88-4e36-90bb-0fe23041fca0.png#align=left&display=inline&height=399&name=v2-6127682635d2b9422fac8bb7ca2ea8bf_hd.png&originHeight=518&originWidth=720&size=104435&status=done&width=555)<br />一张来自 [DDFE 技术周刊](https://zhuanlan.zhihu.com/p/24104410)的图

> 写在前面：这一系列的文章是关于 Vue Router 源码解析的，所以贴出一部分源码是情有可原的。但是为了提高文章的阅读体验感，并不会原封不动的将源码全部 COPY 过来，也就是说贴出来的源码片段会经过简化处理，所以为了更好的理解源码的设计思路和整体结构，希望你拉取 Vue Router 对应版本的源码对照着进行阅读。

⚠️注意：我们研究的 Vue-Router 的版本是当前最新的 v3.0.6 版本！

<a name="sScO6"></a>
## 前导知识
Vue Router 是 Vue 官方维护的、为 Vue 框架量身定制的路由系统。为什么说是量身定制呢，因为 Vue 架构是基于数据响应式的 —— 也就是数据驱动视图，数据变化后，就会立即响应在用户界面。为了更好的为 Vue 视图渲染服务，更好的配合 Vue 快速构建出体验优秀的应用，于是 Vue Router 深度集成了 Vue.js 的核心。Vue Router 包含很多强大的功能：

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

接下来的时间，我们将深入 Vue Router 源码，探索 Vue Router 底层实现，学习作者高超的编程思想，以便我们在后续的开发过程中能够更好的让 Vue Router 为我们的应用服务，同时提升我们的编程能力和组织代码的水平。

在进行下面的学习之前，我希望你已经：

- 对 Vue、Vue Router 有一定的了解，至少有实战经验，并学会了基本的用法
- 阅读过 [Vue Router 官方](https://router.vuejs.org/zh/)的文档至少一遍
- 掌握 [HTML5 history 和 hash 路由 API](https://www.yuque.com/littlelane/daily-question/ayk17f)
- 知道 Vue 插件的注册和编写，特别是 [Vue.use()](https://www.yuque.com/littlelane/vue/gz2vee)
- 掌握 [ES5](http://lzw.me/pages/ecmascript/)、[ES6](http://es6.ruanyifeng.com/) API，至少一些常见的用法和写法要看的懂

如果你有上面这些基础，下面的内容对你来说是很轻松的。当然如果你有欠缺，也不用妄自菲薄，你仍然可以一遍阅读一遍补充学习。

<a name="f3d480ce"></a>
## 示例引子
首先用一个简单的例子抛出我们的主题吧：

```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件进行路由导航. -->
    <!-- 通过传入 `to` 属性指定跳转链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

```javascript
// 0. 使用模块化机制编程，导入 Vue 和 VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'

// 1. 注册 Vue-Router 插件
Vue.use(VueRouter)

// 2. 定义 (路由) 组件。
// 还可以通过 import 的方式引入
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 3. 定义路由
// 每个路由应该映射一个组件。 
// 其中 "component" 可以是：
// 通过 Vue.extend() 创建的组件构造器，或者是一个组件配置对象。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 4. 创建 router 实例，然后传 `routes` 路由配置
// 当然还可以传入别的 Vue-Router 支持的配置参数, 不过这里为了简单起见，就先这样吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes，（ES6 属性简写知识的体验）
})

// 5. 创建和挂载根实例。
// 记得要将 router 配置参数注入路由，从而让整个应用（每个组件）都有路由功能
const app = new Vue({
  router
}).$mount('#app')
```

这是一个基础的 Vue Router 和 Vue 结合的例子，使用了模块化编程的机制，符合我们实际项目开发的方式，如果你已经有这方便的经验（再加上代码注释），应该很快就能明白每一步做了什么，这里我就不在赘述了。下面我们就从 Vue.use(VueRouter) 插件注册说起吧！

<a name="022dc89e"></a>
## Vue Router 注册
Vue Router 项目的主入口是 src/index.js 文件，该入口文件主要是通过 export default 导出了一个 VueRouter 类。我们知道 Vue Router 只是 Vue 的一个插件，插件是要通过 Vue.use() 方法进行注册的，注册的基础是 Vue Router 插件实例应该定义一个 install 方法。在入口文件中，install 方法只通过 import { install } from './install' 方法导入的。

我们来详细看 Vue Router 中 install 方法的具体实现，代码在 src/install.js 文件：

```javascript
export let _Vue
export function install (Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true
  _Vue = Vue
  
  const isDef = v => v !== undefined
  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }
  
  // 通过 Vue.mixin 向组件混入生命周期方法
  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  // 对象属性映射
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  // 组件注册
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
```

上面就是 Vue Router 注册逻辑的全部代码了，代码比较简洁，逻辑结构很清晰，大致分了三块业务逻辑：

1、首先为了避免插件重复注册，在 install 方法上添加了一个 installed 属性。当 Vue Router 被注册后就会将 installed 属性赋值为 true，于是就有了一开始的 if 判断逻辑。if 逻辑通过判断 installed 属性值是否为 true 并且全局变量 _Vue 和 install 方法接受的 Vue 实例参数是否同一个来确定插件是否已注册过。如果已经注册过就直接 return，如果没有注册过就进行注册逻辑。

> ⚠️注意：这里有一点需要说明一下，我们贴出的第一句代码是 `export let _Vue`，尤大通过这句代码导出了 Vue 实例对象（这个变量在执行插件注册逻辑过程中被赋予 Vue 实例对象）。
> **Q**：大家是不是和我一样有点困惑，为什么尤大将 Vue 实例通过 install 方法传入，然后又导出去呢？
> **A**：其实目的也很明确，Vue Router 是 Vue 定制化的路由系统（这点我们在一开始就说过了），那 Vue Router 内部实现逻辑肯定会通过 Vue 实例调用 Vue 自身的一些方法（比如数据响应式等）。既然 Vue 实例会通过 install 方法传进来，而且 install 方法会在插件使用之前就注册，尤大肯定不想单独引入 Vue 代码包，导致最终打出来的 Vue Router 包文件变大，于是就有了这样的逻辑代码。另一方面，当包使用者重复通过 install 方法注册插件时，存有 Vue 实例的全局变量 _Vue 并不会被销毁，所以可以通过这一特性来判断插件。


> ⚠️另外需要注意的是：要想保证 Vue Router 后续的逻辑正常执行，必须将插件注册方法 install 在第一步就执行。


2、然后就通过 Vue.mixin() 方法向每个组件都混入了 beforeCreate 和 destroyed 生命钩子函数。

- beforeCreate：回头看一下前面给出的示例代码，我们是在 new Vue() 的时候将 router 实例传入的，也就是这里的 this.$options.router 了。如果有传入 router 实例就将自身赋值给 this._routerRoot（**由于组件是树状结构，在遍历组件树的过程中，子组件（这里的 else 逻辑）在执行该钩子函数的时候，this._routerRoot 始终指向离它最近的、传入 router 对象作为配置而实例化的父实例**），并将传入的 router 实例赋值给 this._router，然后执行 this._router.init() 方法初始化 router。接着的逻辑用 defineReactive 方法把 this._route 变成响应式对象，当路由信息变化后就会更新视图。最后会调用 registerInstance 方法注册实例；
- destroyed：就一句逻辑，调用 registerInstance 方法注册实例。

3、最后部分的逻辑就非常简单了。大家可以先停下来回想一下在实际的开发中，我们是不是可以组件中通过 this.$router 获取路由实例，通过 this.$route 获取当前路由对象？接下来的两个 Object.defineProperty 方法就是将 this._routerRoot._router 路由根实例和 this._routerRoot._route 路由对象代理到 Vue.propertype 上的 $router 和 $route 属性上的。接着又通过 Vue.component 在全局注册了 `<router-link>` 和 `<router-view>` 两个组件，所以我们可以在实际的开发中使用这两个组件实现路由功能。最后的逻辑用来合并路由的生命钩子函数。

Vue Router 注册逻辑到这里就说完了，接下来我们就继续说一下 new VueRouter() 的逻辑。

<a name="7bdb759e"></a>
## Vue Router 类
VueRouter 类就是整个路由系统的主逻辑了，逻辑代码在 src/index.js 文件。为了方便查看和讲解，我将 VueRouter 类的主体逻辑和其他逻辑分开展示。

<a name="624cbb9f"></a>
### 类外壳逻辑

```javascript
// 除主体逻辑之外的逻辑
export default class VueRouter {
  static install: () => void;
  static version: string;

  app: any;
  apps: Array<any>;
  ready: boolean;
  readyCbs: Array<Function>;
  options: RouterOptions;
  mode: string;
  history: HashHistory | HTML5History | AbstractHistory;
  matcher: Matcher;
  fallback: boolean;
  beforeHooks: Array<?NavigationGuard>;
  resolveHooks: Array<?NavigationGuard>;
  afterHooks: Array<?AfterNavigationHook>;
  // 主体逻辑见下面代码块
}

function registerHook (list: Array<any>, fn: Function): Function {
  list.push(fn)
  return () => {
    const i = list.indexOf(fn)
    if (i > -1) list.splice(i, 1)
  }
}

function createHref (base: string, fullPath: string, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install
VueRouter.version = '__VERSION__'

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter)
}
```

上面这部分逻辑有一个 VueRouter 类的壳子，在壳子里面指定了一些属性的类型，每个属性具体代表的含义，下面会讲到。接着有个 registerHook 方法用来注册路由的生命钩子函数，然后有一个 createHref 方法根据传入的基准地址和路由的模式（也就是 hash 模式和其他模式）获取 URL 链接。接下来，有两个属性赋值：install 方法赋值给 VueRouter.install，供使用时利用 Vue.use() 注册插件；将版本配置参数赋值给 VueRouter.version。最后是兼容 UMD 方式使用逻辑，如果当前环境浏览器，并且存在 window.Vue（说明是 UMD 使用方式）就自动使用有全局的 Vue 实例就自动使用插件

<a name="b201057f"></a>
### 类主体逻辑

```javascript
  constructor (options: RouterOptions = {}) {
    this.app = null
    this.apps = []
    this.options = options
    this.beforeHooks = []
    this.resolveHooks = []
    this.afterHooks = []
    this.matcher = createMatcher(options.routes || [], this)

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
  }

  init (app: any /* Vue component instance */) {
    this.apps.push(app)

    // set up app destroyed handler
    // https://github.com/vuejs/vue-router/issues/2639
    app.$once('hook:destroyed', () => {
      // clean out app from this.apps array once destroyed
      const index = this.apps.indexOf(app)
      if (index > -1) this.apps.splice(index, 1)
      // ensure we still have a main app or null if no apps
      // we do not release the router so it can be reused
      if (this.app === app) this.app = this.apps[0] || null
    })

    // main app previously initialized
    // return as we don't need to set up new history listener
    if (this.app) {
      return
    }

    this.app = app
    const history = this.history

    // 根据 history 的类别执行相应的初始化操作和监听
    if (history instanceof HTML5History) {
      history.transitionTo(history.getCurrentLocation())
    } else if (history instanceof HashHistory) {
      const setupHashListener = () => {
        history.setupListeners()
      }
      history.transitionTo(
        history.getCurrentLocation(),
        setupHashListener,
        setupHashListener
      )
    }

    // 设置当前历史对象的 cb 值, 在 transitionTo 的时候知道在 history 更新完毕的时候调用这个 cb
    // 然后看这里设置的这个函数的作用就是更新下当前应用实例的 _route 的值
    history.listen(route => {
      this.apps.forEach((app) => {
        app._route = route
      })
    })
  }
	// 这里省略的逻辑是 Vue Router 提供出去的 api 接口
}
```

VueRouter 类的构造函数接受一个路由配置对象（就是我们在 new Router() 时传递的对象）为参数。在构造函数中初始化了一些属性，其中 this.app 代表 Vue 根实例；this.apps 以数组的形式用来保存持有 $options.router 属性的 Vue 实例；this.options 用来保存new VueRouter 实例时传入的路由配置；this.beforeHooks、this.resolveHooks、this.afterHooks 用来存储路由生命钩子函数；this.matcher 代表路由匹配器，路由匹配器由 createMatcher 方法生成。

我们都知道 Vue Router 支持三种模式的路由：history、hash 和 abstract，其中前两个都是运用于浏览器端的，abstract 是用于支持 Node 服务端的。由于 history 包含 HTML5 新增的 API，为了使低版本的浏览器兼容，于是这里有一段路由自动降级的逻辑 —— 首先获取路由配置对象的 mode 属性值，如果存在就将其赋给变量 mode，否则将变量 mode 赋值为 hash（也就是默认是 hash 模式的路由）；然后的逻辑是如果当前 mode 变量的值是为 history(即当前路由模式为 history)，而且当前浏览器不支持 history.pushState 方法，还满足传入的路由配置对象中不包含 fallback 或者包含的 fallback 属性值不为 false (表示允许降级处理)，就需要进行路由降级处理，处理的方式是将当前的路由模式修改成 hash 模式。否则，就不进行降级处理。接着根据最终的 mode 值对路由方法类进行实例化，并赋值给 this.history。路由历史的实现根据 this.mode 的不同而不同，但是它们都是继承自 History 基类。

在前面 Vue Router 注册逻辑中，我们说到 install 方法会通过 Vue.mixin() 方法向每个组件混入 beforeCreate 和 destroyed 生命周期逻辑，而在 beforeCreate 会调用 init 方法执行 router 初始化逻辑。下面我们就来说说 init 方法的具体实现。

init 方法接受 Vue 组件实例作为参数，首先做插件是否注册判断。如果已经注册，就将 Vue 实例存入 this.apps，随后在传入的 Vue 组件实例上注册一个 destroyed 生命钩子函数：当组件卸载完成后，从 this.apps 里面清除这个传入的实例。如果 this.app 指向的是传入的这个实例，就将 this.apps 里面的第一个实例(如果没有就是 null)重新赋值给 this.app，让 this.app 的值执向根实例或者 null。然后如果 this.app 没值的话，就直接 return，不需要通过接下来的逻辑构建新的 history 监听器了，因为组件实例都没有了。最后是拿到当前 this.history 的值，根据它的类别执行相应的初始化和监听操作。

init 方法之后的逻辑比较简单：依次在定义了 beforeEach、beforeResolve、afterEach、onReady、onError、push、replace、go、back、forward 实例方法。

<a name="25f9c7fa"></a>
## 总结
为了避免篇幅过长引起大家的不适，这里先就打住了，后续我会单独开几篇将核心的内容单独拧出来说说。<br />上面着重介绍了 Vue Router 类、 插件注册、init 初始化等比较前置的知识，当然这还只是进了个门，后续还有几个核心的点需要花大量篇幅进行解说，大家翘首以盼吧！
