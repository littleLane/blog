# Vue.use() 做了什么？

<a name="2ccaa35f"></a>
## 初识 Vue.use
_Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与_[_现代化的工具链_](https://cn.vuejs.org/v2/guide/single-file-components.html)_以及各种_[_支持类库_](https://github.com/vuejs/awesome-vue#libraries--plugins)_结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。_<br />-- Vue 官网

Vue 被设计成一套渐进式的框架，其本身的核心作用是构建用户界面视图，其他的各种能力会通过插件的形式集成解决，这套集成的机制就是通过 Vue.use() 方法来实现的，以下有几个很熟悉的案例：

```javascript
// 当你在开发过程中集成 Vue-Router 时，你需要这样：
Vue.use(VueRouter)

// 当你需要集成 element-ui 时，你需要这样：
Vue.use(ElementUI);
```

那 Vue 内部 use() 方法做了什么能够这么简单的将插件进行集成或者我们应该怎么写一个插件呢？接下来我们会详细介绍相关内容。

<a name="95a22e55"></a>
## 剖析 Vue.use
Vue.use 算是 Vue 一个全局的 API 了。全局的 API 初始化是在项目主入口文件 vue/src/core/index.js 通过 initGlobalAPI(Vue) 进行的。随后，我们跟踪到 vue/src/core/global-api/index.js 全局 API 的主入口文件，在这里 Vue.use 通过调用 initUse(Vue) 被初始化，然后我们来到 initUse() 方法导出的文件 vue/src/core/global-api/use.js 查看 Vue.use 方法的真实源代码。

> 说句题外话：这一步步的方法跟踪下来，大家有没有发现 Vue 的源码模块拆分的还是挺细的，阅读起来障碍少了很多，像我们查看 Vue.use API 最后只需要查看一个主文件就行了，其他的都是方法调用。


```javascript
/* @flow */
import { toArray } from '../util/index'

/**
 * Vue.use 插件装载方法：
 * 这里有个非常巧妙的做法，通过闭包的方式将 Vue.use 通过函数包裹，函数接受 Vue 对象
 * 这样就避免了再次通过 import Vue 的行为，非常值得学习
 * @export
 * @param {GlobalAPI} Vue
 */
export function initUse (Vue: GlobalAPI) {
  // 接受一个类型为 Function 或者 对象的 plugin 参数
  Vue.use = function (plugin: Function | Object) {
    // 用来存储所有已经装载过的插件
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))

    // 判断插件是否已经注册过，若已经注册过就直接返回
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // 获取额外的插件注册参数
    const args = toArray(arguments, 1)

    // 将 this 压入到参数列表的头部
    args.unshift(this)
    
    if (typeof plugin.install === 'function') {
      // 如果 plugin 的 install 属性是 Function ，就执行 install 逻辑
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      // 如果 plugin 是 Function ，就直接执行
      plugin.apply(null, args)
    }

    // 插件注册完成后，就将插件最加到全局已注册列表的尾部
    installedPlugins.push(plugin)

    // 最后返回插件对象
    return this
  }
}

```

由于这个 API 的源码并没有多少，我就全部拷贝过来了，随便也带上了我的学习注释。

细心的朋友可能已经发现了：尤大并没有将我们平时开发一样将方法直接暴露出去，而是运用了闭包的技巧，利用 initUse 函数将方法包裹起来；initUse 函数接受 Vue 实例（因为最终的 use 方法是要挂载到 Vue 实例的，最终我的使用的时候就是 Vue.use()），尤大并没有再导入一个 Vue 实例，而是通过传入的形式，这里是一个很巧妙的做法，避免了重复打包；随后就是定义了 Vue.use 方法，方法接受的第一个参数表示 Function 或者 Object 类型的插件（当然后面还可以接受不定个数参数），并且在方法里面维护了一个已装载的插件列表，以便判断插件是否已经装载，避免重复装载插件；如果插件之前没有注册过，就判断 plugin 是否有定义 install 方法，如果有定义就直接通过 apply 调用，并且方法执行的第一个参数是 Vue 实例**（通过 toArray(arguments, 1) 方法将调用 Vue.use 时传递的出第一个参数以外的所有参数转换成数组，然后通过 args.unshift(this) 将 Vue 实例对象插到参数数组的头部）**；如果没有定义，就判断 plugin 本身的类型是否是 Function，如果是就直接调用 plugin 本身，并且方法执行的第一个参数是 Vue 实例；接着把 plugin 存储到 installedPlugins 中，代表 plugin 已经完成注册；最后返回 Vue 实例，以供外部调用。

从上面的分析，大家是不是已经发现了：其实 Vue 提供的插件注册机制还是很简单，每个插件都需要实现一个静态的 install 方法（或者插件本身就是函数）。当我们执行 Vue.use 注册插件的时候，就会调用这个 install 方法进行注册，并且在这个 install 方法中，我们可以通过方法接受的第一个参数拿到 Vue 实例对象。这样的好处就是：**作为 Vue 插件的编写方就不需要再去额外的 import Vue 了**。是不是觉得这种做法很机智呢？

<a name="e8c2f811"></a>
## 插件编写
上面我们详细的分析了 Vue.use 的实现，下面我们就运用两种方式编写两个简单的插件吧，顺便练练手！

<a name="0a148837"></a>
### 定义 plugin install 方法

```javascript
export default {
  install(Vue, options) {
    // 打印日志
		Vue.prototype.$log = () => {
      // do something
      console.log('日志被打印了！')
    }
    // other more methods
  }
}
```

这里我们利用 export default 导出一个对象，对象里面定义了 install 方法。跟我们上面分析的一样，install 方法接受多个参数，其中第一个是 Vue 实例，后面的参数是额外的配置化参数，如果写复杂的插件可能会用到。这里我们是直接将插件的主方法挂载到 Vue 实例的 prototype 上。插件的使用也很简单、方便，在各组件中直接通过 this.$log() 调用就可以了。

<a name="f4a8fc33"></a>
### 定义函数 plugin

```javascript
export default (Vue, options) => {
  // 打印日志
  Vue.prototype.$log = () => {
    // do something
    console.log('日志被打印了！')
  }
  // other more methods
}
```

当然，你还可以像上面一样定义插件，类似于直接导出来了 install 方法。方法接受参数和使用方法较上面都是一样的，这里就不赘述了！虽然这种方式也可以，但是 Vue 官网不推荐使用这种方式，而是使用上面 install 方法。

<a name="25f9c7fa"></a>
## 总结
插件作为 Vue 生态系统的重要组成部分，起着不可或缺的作用，是插件系统让 Vue 更加灵活丰富。虽然 Vue 的插件系统实现精简，但是功能足够强大。另一方面，通过这节的源码学习，也学到了代码组织、编写的优雅方式，同时为我们以后更加深入的学习 Vue 的源码打下了一个基础，为之后 Vue-Router 路由系统的学习做了一个铺垫。
