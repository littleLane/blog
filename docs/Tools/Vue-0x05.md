# Vue 生命周期详解

<a name="a4d3b02a"></a>
## 概述
生命周期是对所有事物存在的每个阶段的描述，是世间万事万物的生命写照。比如说人的一生大致会分为这些阶段：婴儿、幼儿、儿童、青春期、中年、老年和死亡。在每个阶段会做不同的事情：

- 婴儿期，由于我们身体还很小，除了我们本能的反应，其他的我们什么都做不了；
- 幼儿期，就要开始学走路、各种闹腾，开始上幼儿园；
- 儿童期，开始上小学，学习的东西会越来越多；
- 青春期，随着我们进入青春期，越来越多奇怪，好奇的想法开始涌入我们的思想，越来越有叛逆的思想和动作；
- 中年：人的一生中最巅峰的时期，在这个阶段就要不停的奋斗，实现自己的价值_[惭愧不已]；_
- 老年：代指人的一生开始慢慢的谢幕了，开始进入养老阶段，回忆之前风光的岁月；
- 死亡：生命消失殆尽，最终会化为泥土。

> 当然，看完这些，大家可能会略显伤感：人生也不过如此！


<a name="8192660b"></a>
## Vue 生命周期
上面说的那些大家看看就算了，可千万别去深想，这就是生命的法则。回到我们这篇博客的主题吧，Vue 生命周期。

接下来的内容，我们会详细介绍 Vue 2.0 和 Vue 1.0 生命周期的几个阶段。
<a name="V2.0"></a>
### V2.0
![lifecycle.png](https://cdn.nlark.com/yuque/0/2019/png/114852/1552700468984-dbb38ae0-e5aa-4d52-9288-183d396dc6a3.png#align=left&display=inline&height=975&name=lifecycle.png&originHeight=3039&originWidth=1200&size=50021&status=done&width=385)<br />先看 [Vue 2.0 的官方文档](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)放出来**的一张关于** Vue 生命周期的图，图中非常详细的展示了 Vue 各个生命周期的运转和每个阶段做的事情：

- new Vue() 构造一个 Vue 的实例，这个阶段会做一个 Init 初始化的事情，包括 Events 事件、Lifecycle 生命周期函数等等；

- beforeCreate：组件实例被创建之前调用的钩子函数。**此时数据、属性等都还没有初始化**；

- created：此时组件 **实例创建完成，数据完成初始化，属性也已经绑定，但是 DOM 还没有渲染，所以 $el 属性此时并不能访问****到；**

- beforeMount：在 beforeMount 之前会进行组件模板的编译，这个阶段标志着编译好的模板即将被挂载，**此时 $el 属性可以访问到，是编译之前的 DOM；**

- mounted：**$el 属性值会被编译后的组件模板替换并完成挂载，此时 $el 属性就是我们见到的已经填充数据和绑定事件的 DOM 了**，在这个时候就能操作 DOM 元素了；

- beforeUpdate：当我们更新数据状态(更准确的说是 Vue 响应式机制监测到数据状态)变化时，就会触发这个生命周期钩子函数。**当然你也可以在这个函数中进一步更新状态，而不会触发额外的渲染，记住千万不要对同一个状态做多次不同值的****更新，会导致死循环渲染（这里 Vue 内部会处理掉）**；

- Updated：这个阶段 Virtual DOM 已经对比完成，**更新的补丁也已经打上，组件已经重新渲染完成**。在这个阶段你可以对新的 DOM 进行操作。**这里****你也可以在这个函数中进一步更新状态，但是不建议这么做，因为会触发额外的更新渲染。记住千万不要对同一个状态做多次不同值的****更新****，因为这样渲染更新会进入死循环（这里 Vue 内部就不会处理了，会一直渲染下去）；**

- beforeDestroy：当我们调用 $destory() 或者跳转页面(keep-alive 除外)、关闭页面时，准确的说就是**卸载组件之前，就会调用该生命周期函数。这时组件实例依然存在并且可用。**

- destroyed：组件完全被卸载，组件实例完全被销毁时调用。**此时组件实例上的所有事件监听都会被移除，同样子组件的实例也会被销毁。**

```jsx
new Vue({
  el: '#app',
  template: `
    <div>
      <p>{{message}}</p>
      <!-- 点击按钮会更新 message 数据状态，导致重新渲染 -->
      <button @click="message+=1">click</button>
      <!-- 点击按钮会调用 $destroy 方法，导致组件实例卸载 -->
      <button @click="handleDestroy">destroy</button>
    </div>
  `,
  data: {
    message: 'hello'
  },
  beforeCreate () {
    console.log('beforeCreate', this.$el)      // undefined DOM 还没渲染，所以访问不到，但是在 Vue 实例中是存在的
    console.log('beforeCreate', this.$data)    // undefined 数据、属性等都还没有初始化
    console.log('beforeCreate', this.message)  // undefined 数据、属性等都还没有初始化
  },
  created () {
    console.log('created', this.$el)           // undefined DOM 还没渲染，所以访问不到，但是在 Vue 实例中是存在的
    console.log('created', this.$data)         // {__ob__: Observer} 数据、属性等都完成初始化
    console.log('created', this.message)  // hello 数据、属性等都完成初始化
  },
  beforeMount () {
    // 原始模板 DOM(具体自己运行查看)
    console.log('beforeMount', this.$el)        
    console.log('beforeMount', this.$data)
    console.log('beforeMount', this.message)
  },
  mounted () {
    // 首次已填充数据的 DOM(具体自己运行查看) 新的实例已经替换了旧的实例
    console.log('mounted', this.$el)
    console.log('mounted', this.$data)
    console.log('mounted', this.message)
  },
  beforeUpdate () {
    // 按照数据状态变化后填充的新的 DOM (具体自己运行查看)
    console.log('beforeUpdate', this.$el)
    console.log('beforeUpdate', this.$data)    // 新的数据
    console.log('beforeUpdate', this.message)  // 新的数据
  },
  updated () {
    // 按照数据状态变化后填充的新的 DOM (具体自己运行查看)
    console.log('updated', this.$el)
    console.log('updated', this.$data)        // 新的数据
    console.log('updated', this.message) // 新的数据
  },
  beforeDestroy () {
    // 最近一次挂载的 DOM 实例(具体自己运行查看)
    console.log('beforeDestroy', this.$el)
    console.log('beforeDestroy', this.$data)  // 最新数据的状态值
    console.log('beforeDestroy', this.message) // 最新数据的状态值
  },
  destroyed () {
    // 最近一次挂载的 DOM 实例(具体自己运行查看) 
    // 但是运行完后，无论你再怎么操作按钮改变数据状态，DOM 都不会渲染
    console.log('destroyed', this.$el)	
    console.log('destroyed', this.$data)			// 最新数据的状态值
    console.log('destroyed', this.message) // 最新数据的状态值
  },
  methods: {
    handleDestroy () {
      // 卸载 DOM，销毁实例
      this.$destroy()
    }
  }
})
```

<a name="V1.0"></a>
### V1.0
上面就是关于 V2.0 生命周期的所有阶段的描述了，下面我们说一下 V1.0 的生命周期<br />
![lifecycle (1).png](https://cdn.nlark.com/yuque/0/2019/png/114852/1552707078257-8ce3b843-e613-44b4-9f64-bcef6230c86c.png#align=left&display=inline&height=824&name=lifecycle%20%281%29.png&originHeight=2800&originWidth=1200&size=116787&status=done&width=353)<br />相比 V2.0 生命周期，V1.0 的生命周期相对比较粗糙，主要包含以下几个阶段：<br />

- new Vue()：构造一个 Vue 的实例，这个阶段会调用 Init 做初始化的事情；

- init：实例已经创建，数据响应式未添加；

- created：此时实例已经创建，事件初始化完成，数据响应式已经添加，但是 DOM 还没有渲染，所以 $el 属性此时并不能访问到；

- beforeCompile：模板编译前被调用，此时 $el 属性就能够访问；

- compiled：模板编译完成时被调用；

- ready：模板编译完成并完成渲染时被调用；

- beforeDestroy：当我们调用 $destory() 或者跳转页面(keep-alive 除外)、关闭页面时，准确的说就是卸载组件之前，就会调用该生命周期函数。这时组件实例依然存在并且可用。

- destroyed：组件完全被卸载，组件实例完全被销毁时调用。此时组件实例上的所有事件监听都会被移除，同样子组件的实例也会被销毁。



```javascript
new Vue({
  el: '#app',
  template: `
    <div>
      <p>{{message}}</p>
      <!-- 点击按钮会更新 message 数据状态，导致重新渲染 -->
      <button @click="message+=1">click</button>
      <!-- 点击按钮会调用 $destroy 方法，导致组件实例卸载 -->
      <button @click="handleDestroy">destroy</button>
    </div>
  `,
  data: {
    message: 'hello'
  },
  init() {
    console.log('init', this.$el)         // null 访问不到
    console.log('init', this.$data)				// {} 尚未初始化
    console.log('init', this.message)			// undefined 尚未初始化
  },
  created () {
    console.log('created', this.$el)          // undefined DOM 还没渲染，所以访问不到，但是在 Vue 实例中是存在的
    console.log('created', this.$data)				// 数据已经初始化，所以访问得到
    console.log('created', this.message)      // 数据已经初始化，所以访问得到
  },
  beforeCompile() {
    // 在此方法调用之前，会做首次渲染
    console.log('beforeCompile', this.$el)    // 所以这里是可以拿到值的
    console.log('beforeCompile', this.$data)
    console.log('beforeCompile', this.message)
  },
  compiled() {
    // 在此方法调用之前，会做数据填充，再次渲染
    console.log('compiled', this.$el)
    console.log('compiled', this.$data)
    console.log('compiled', this.message)
  },
  ready() {
    // 渲染完成
    console.log('ready', this.$el)
    console.log('ready', this.$data)
    console.log('ready', this.message)
  },
  beforeDestroy () {
    // 组件销毁之前被调用
    console.log('beforeDestroy', this.$el)
    console.log('beforeDestroy', this.$data)
    console.log('beforeDestroy', this.message)
  },
  destroyed () {
    // 组件销毁完成之后被调用
    console.log('destroyed', this.$el) 			// 这里获取不到值 undefined
    console.log('destroyed', this.$data)
    console.log('destroyed', this.message)
  },
  methods: {
    handleDestroy () {
      // 卸载 DOM，销毁实例
      this.$destroy()
    }
  }
})
```


<a name="a4771338"></a>
### V1.0 和 V2.0 生命周期对比
上面分别介绍了 Vue 两个大版本的生命周期，改动还挺大的，那么对于熟悉 V1.0 的同学怎样才能更好的切换到 V2.0 呢，下面我们给你了比较的表格数据，大家可以借鉴：

| Vue 1.0 | Vue2.0 | Description |
| --- | --- | --- |
| init | beforeCreate | 组件实例刚刚被创建，状态还没有初始化 |
| created | created | 组件实例创建完成，状态绑定完成，DOM 还没生成，$el 属性访问不到 |
| beforeCompile | beforeMount | 模板编译/挂载之前 |
| compiled | mounted | 模板编译/挂载之后 |
| activate |  | 模板编译完成 |
| ready | mounted | 模板编译/挂载之后 |
|  | beforeUpdate | 数据状态变化时触发 |
|  | update | 组件更新渲染完成后触发 |
|  | activated | keep-alive 组件激活 |
|  | deactivated | keep-alive 组件移除 |
| attached |  | $el 通过指令等附加到 DOM |
| deattached |  | $el 通过指令等从 DOM 移除 |
| beforeDestroy | beforeDestroy | 组件销毁前调用 |
| destroyed | destroyed | 组件销毁后调用 |
|  | errorCaptured | 捕获子组件的错误 |

<a name="25f9c7fa"></a>
## 总结
组件的生命周期是一个很重要的概念，通过生命周期我们可以做很多的事情，比如（针对 V2.0 版本）

- 可以在 beforeCreate 中添加 loading 展示；
- 在 mounted 里面操作 DOM、获取后端数据、绑定 window 事件等等；
- 在 beforeUpdate 中修改数据状态（这里需要特别注意），而不会导致重复渲染
- 在 beforeDestroy 中解除绑定的事件，清空全局变量等等

但是有很多同学会乱用生命周期，导致不可预测的结果和 bug，所以搞懂生命周期是非常重要的！
