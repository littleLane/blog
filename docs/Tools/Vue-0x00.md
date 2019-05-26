# Vue 组件通信详解

众所周知，Vue 主要思想之一就是组件式开发。因此，在实际的项目开发中，肯定会以组件的开发模式进行。形如页面和页面之间需要通信一样，Vue 组件和组件之间肯定也需要互通有无、共享状态。接下来，我们就悉数给大家展示所有 Vue 组件之间的通信方式。

<a name="f03306c0"></a>
## 组件关系
![Vue 组件通信.png](https://cdn.nlark.com/yuque/0/2019/png/114852/1550939018312-26305b9e-64ce-46a1-a76d-d3be0ff9a78b.png#align=left&display=inline&height=250&linkTarget=_blank&name=Vue%20%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1.png&originHeight=632&originWidth=790&size=12554&status=done&width=313)<br />
<br />上面展示的图片可以引入所有 Vue 组件的关系形式：<br />

* A 组件和 B 组件、B 组件和 C 组件、B 组件和 D 组件形成了父子关系
* C 组件和 D 组件形成了兄弟关系
* A 组件和 C 组件、A 组件和 D 组件形成了隔代关系（其中的层级可能是多级，即隔多代）

<a name="613cf536"></a>
## 组件通信

这么多的组件关系，那么组件和组件之间又有哪些通信的方式呢？各种方式的区别又是什么？适用场景又是什么呢？带着问题继续往下看吧！

<a name="5e21e1c3"></a>
### props 和 $emit

用过 Vue 技术栈开发项目过的开发者对这样一个组合肯定不会陌生，这种组件通信的方式是我们运用的非常多的一种。props 以单向数据流的形式可以很好的完成父子组件的通信。

所谓单向数据流：就是数据只能通过 props 由父组件流向子组件，而子组件并不能通过修改 props 传过来的数据修改父组件的相应状态。至于为什么这样做，Vue 官网做出了解释：

_**所有的 prop 都使得其父子 prop 之间形成了一个****单向下行绑定****：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。**_<br />_<br />_**额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。**_<br />_<br />——[**_Vue 官网_**](https://cn.vuejs.org/v2/guide/components-props.html)

正因为这个特性，于是就有了对应的 $emit。$emit 用来触发当前实例上的事件。对此，我们可以在父组件自定义一个处理接受变化状态的逻辑，然后在子组件中如若相关的状态改变时，就触发父组件的逻辑处理事件。

```javascript
// 父组件
Vue.component('parent', {
  template: `
    <div>
      <p>this is parent component!</p>
      <child :message="message" v-on:getChildData="getChildData"></child>
    </div>
  `,
  data() {
    return {
      message: 'hello'
    }
  },
  methods:{
    // 执行子组件触发的事件
    getChildData(val) {
      console.log(val);
    }
  }
});

// 子组件
Vue.component('child', {
  template:`
    <div>
      <input type="text" v-model="myMessage" @input="passData(myMessage)">
    </div>
  `,
  /**
   * 得到父组件传递过来的数据
   * 这里的定义最好是写成数据校验的形式，免得得到的数据是我们意料之外的
   *
   * props: {
   *   message: {
   *     type: String,
   *     default: ''
   *   }
   * }
   *
  */
  props:['message'], 
  data() {
    return {
      // 这里是必要的，因为你不能直接修改 props 的值
      myMessage: this.message
    }
  },
  methods:{
    passData(val) {
      // 数据状态变化时触发父组件中的事件
      this.$emit('getChildData', val);
    }
  }
});
    
var app=new Vue({
  el: '#app',
  template: `
    <div>
      <parent />
    </div>
  `
});
```

在上面的例子中，有父组件 parent 和子组件 child。
* 1). 父组件传递了 message 数据给子组件，并且通过v-on绑定了一个 getChildData 事件来监听子组件的触发事件；
* 2). 子组件通过 props 得到相关的 message 数据，然后将数据缓存在 data 里面，最后当属性数据值发生变化时，通过 this.$emit 触发了父组件注册的 getChildData 事件处理数据逻辑。

<a name="f164db86"></a>
### $attrs 和 $listeners

上面这种组件通信的方式只适合直接的父子组件，也就是如果父组件A下面有子组件B，组件B下面有组件C，这时如果组件A直接想传递数据给组件C那就行不通了！ 只能是组件A通过 props 将数据传给组件B，然后组件B获取到组件A 传递过来的数据后再通过 props 将数据传给组件C。当然这种方式是非常复杂的，无关组件中的逻辑业务一种增多了，代码维护也没变得困难，再加上如果嵌套的层级越多逻辑也复杂，无关代码越多！

针对这样一个问题，Vue 2.4 提供了 $attrs 和 $listeners 来实现能够直接让组件A传递消息给组件C。

```jsx
// 组件A
Vue.component('A', {
  template: `
    <div>
      <p>this is parent component!</p>
      <B :messagec="messagec" :message="message" v-on:getCData="getCData" v-on:getChildData="getChildData(message)"></B>
    </div>
  `,
  data() {
    return {
      message: 'hello',
      messagec: 'hello c' //传递给c组件的数据
    }
  },
  methods: {
    // 执行B子组件触发的事件
    getChildData(val) {
      console.log(`这是来自B组件的数据：${val}`);
    },
    
    // 执行C子组件触发的事件
    getCData(val) {
      console.log(`这是来自C组件的数据：${val}`);
    }
  }
});

// 组件B
Vue.component('B', {
  template: `
    <div>
      <input type="text" v-model="mymessage" @input="passData(mymessage)"> 
      <!-- C组件中能直接触发 getCData 的原因在于：B组件调用 C组件时，使用 v-on 绑定了 $listeners 属性 -->
      <!-- 通过v-bind 绑定 $attrs 属性，C组件可以直接获取到 A组件中传递下来的 props（除了 B组件中 props声明的） -->
      <C v-bind="$attrs" v-on="$listeners"></C>
    </div>
  `,
  /**
   * 得到父组件传递过来的数据
   * 这里的定义最好是写成数据校验的形式，免得得到的数据是我们意料之外的
   *
   * props: {
   *   message: {
   *     type: String,
   *     default: ''
   *   }
   * }
   *
  */
  props: ['message'],
  data(){
    return {
      mymessage: this.message
    }
  },
  methods: {
    passData(val){
      //触发父组件中的事件
      this.$emit('getChildData', val)
    }
  }
});

// 组件C
Vue.component('C', {
  template: `
    <div>
      <input type="text" v-model="$attrs.messagec" @input="passCData($attrs.messagec)">
    </div>
  `,
  methods: {
    passCData(val) {
      // 触发父组件A中的事件
      this.$emit('getCData',val)
    }
  }
});
    
var app=new Vue({
  el:'#app',
  template: `
    <div>
      <A />
    </div>
  `
});
```

在上面的例子中，我们定义了 A，B，C 三个组件，其中组件B 是组件 A 的子组件，组件C 是组件B 的子组件。

* 1). 在组件 A 里面为组件 B 和组件 C 分别定义了一个属性值（message，messagec）和监听事件（getChildData，getCData），并将这些通过 props 传递给了组件 A 的直接子组件 B；
* 2). 在组件 B 中通过 props 只获取了与自身直接相关的属性（message），并将属性值缓存在了 data 中，以便后续的变化监听处理，然后当属性值变化时触发父组件 A 定义的数据逻辑处理事件（getChildData）。关于组件 B 的直接子组件 C，传递了属性 $attrs 和绑定了事件 $listeners；
* 3). 在组件 C 中直接在 v-model 上绑定了 $attrs 属性，通过 v-on 绑定了 $listeners；

最后说一下 $attrs 和 $listeners 吧！

  * $attrs：包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定属性 (class和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件。

* $listeners：包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件。

<a name="e1c16afe"></a>
### 中央事件总线 EventBus

对于父子组件之间的通信，上面的两种方式是完全可以实现的，但是对于两个组件不是父子关系，那么又该如何实现通信呢？在项目规模不大的情况下，完全可以使用中央事件总线 EventBus 的方式。如果你的项目规模是大中型的，那你可以使用我们后面即将介绍的 [Vuex 状态管理](https://www.yuque.com/littlelane/vue/kllzcm#1765f2e8)。

EventBus 通过新建一个 Vue 事件 bus 对象，然后通过 bus.$emit 触发事件，bus.$on 监听触发的事件。

```jsx
// 组件 A
Vue.component('A', {
  template: `
    <div>
      <p>this is A component!</p>
      <input type="text" v-model="mymessage" @input="passData(mymessage)"> 
    </div>
  `,
  data() {
    return {
      mymessage: 'hello brother1'
    }
  },
  methods: {
    passData(val) {
      //触发全局事件globalEvent
      this.$EventBus.$emit('globalEvent', val)
    }
  }
});

// 组件 B
Vue.component('B', {
  template:`
    <div>
      <p>this is B component!</p>
      <p>组件A 传递过来的数据：{{brothermessage}}</p>
    </div>
  `,
  data() {
    return {
      mymessage: 'hello brother2',
      brothermessage: ''
    }
  },
  mounted() {
    //绑定全局事件globalEvent
    this.$EventBus.$on('globalEvent', (val) => {
      this.brothermessage = val;
    });
  }
});

//定义中央事件总线
const EventBus = new Vue();

// 将中央事件总线赋值到 Vue.prototype 上，这样所有组件都能访问到了
Vue.prototype.$EventBus = EventBus;

const app = new Vue({
  el: '#app',
  template: `
    <div>
      <A />
      <B />
    </div>
  `
});
```

在上面的实例中，我们定义了组件 A 和组件 B，但是组件 A 和组件 B 之间没有任何的关系。

* 1). 首先我们通过 new Vue() 实例化了一个 Vue 的实例，也就是我们这里称呼的中央事件总线 EventBus ，然后将其赋值给了 Vue.prototype.$EventBus，使得所有的业务逻辑组件都能够访问到；
* 2). 然后定义了组件 A，在组件 A 里面定义了一个处理的方法 passData，主要定义触发一个全局的 globalEvent 事件，并传递一个参数；
* 3). 最后定义了组件 B，在组件 B 里面的 mounted 生命周期监听了组件 A 里面定义的全局 globalEvent 事件，并在回调函数里面执行了一些逻辑处理。

中央事件总线 EventBus 非常简单，就是任意组件和组件之间打交道，没有多余的业务逻辑，只需要在状态变化组件触发一个事件，然后在处理逻辑组件监听该事件就可以。该方法非常适合小型的项目！

<a name="ce7a35ab"></a>
### provide 和 inject

熟悉 React 开发的同学对 Context API 肯定不会陌生吧！在 Vue 中也提供了类似的 API 用于组件之间的通信。

在父组件中通过 provider 来提供属性，然后在子组件中通过 inject 来注入变量。不论子组件有多深，只要调用了inject 那么就可以注入在 provider 中提供的数据，而不是局限于只能从当前父组件的 prop 属性来获取数据，只要在父组件的生命周期内，子组件都可以调用。这和 React 中的 Context API 有没有很相似！

```jsx
// 定义 parent 组件
Vue.component('parent', {
  template: `
    <div>
      <p>this is parent component!</p>
      <child></child>
    </div>
  `,
  provide: {
    for:'test'
  },
  data() {
    return {
      message: 'hello'
    }
  }
});

// 定义 child 组件
Vue.component('child', {
  template: `
    <div>
      <input type="tet" v-model="mymessage"> 
    </div>
  `,
  inject: ['for'],	// 得到父组件传递过来的数据
  data(){
    return {
      mymessage: this.for
    }
  },
});

const app = new Vue({
  el: '#app',
  template: `
    <div>
      <parent />
    </div>
  `
});
```

在上面的实例中，我们定义了组件 parent 和组件 child，组件 parent 和组件 child 是父子关系。

* 1). 在 parent 组件中，通过 provide 属性，以对象的形式向子孙组件暴露了一些属性
* 2). 在 child 组件中，通过 inject 属性注入了 parent 组件提供的数据，实际这些通过 inject 注入的属性是挂载到 Vue 实例上的，所以在组件内部可以通过 this 来访问。

> ⚠️ 注意：官网文档提及 provide 和 inject 主要为高阶插件/组件库提供用例，并不推荐直接用于应用程序代码中。


关于 provide 和 inject 这对属性的更多具体用法可以参照[官网的文档](https://cn.vuejs.org/v2/api/?#provide-inject)。

---
写到这里有点累了，前面大致介绍了四种 Vue 组件通信的方式，你觉得这些就够了吗？不不不，讲完前面四种方式后面还有四种等着我们呢！ 借此加个分割线，压压惊！😭对了，千万不要说学不动了，只要还有一口气，都要继续学！

---
<a name="a58ca6ff"></a>
### v-model 

这种方式和前面讲到的 props 有点类型，但是既然单独提出来说了，那肯定也有其独特之处！不管了，先上代码吧！

```jsx
// 定义 parent 组件
Vue.component('parent', {
  template: `
    <div>
      <p>this is parent component!</p>
      <p>{{message}}</p>
      <child v-model="message"></child>
    </div>
  `,
  data() {
    return {
      message: 'hello'
    }
  }
});

// 定义 child 组件
Vue.component('child', {
  template: `
    <div>
      <input type="text" v-model="mymessage" @change="changeValue"> 
    </div>
  `,
  props: {
    value: String, // v-model 会自动传递一个字段为 value 的 props 属性
  },
  data() {
    return {
      mymessage: this.value
    }
  },
  methods: {
    changeValue() {
      this.$emit('input', this.mymessage); //通过如此调用可以改变父组件上 v-model 绑定的值
    }
  },
});

const app = new Vue({
  el: '#app',
  template: `
    <div>
      <parent />
    </div>
  `
});
```

说到 v-model 这个指定，大家肯定会想到双向数据绑定，如 input 输入值，下面的显示就是实时的根据输入的不同而显示相应的内容。刚开始学习 Vue 的时候有没有觉得很神奇，不管你有没有，反正我有过这种感觉！

关于详细的 v-model 用法和自定义组件 v-model 的实现，可以到[这里](https://www.yuque.com/littlelane/vue/iqevua)查看！这里我们主要讲解 v-model 是如何实现父子组件通信的。

在上面的实例代码中，我们定义了 parent 和 child 两个组件，这两个组件是父子关系，v-model 也只能实现父子组件之间的通信。

* 1). 在 parent 组件中，我们给自定义的 child 组件实现了 v-model 绑定了 message 属性。此时相当于给 child 组件传递了 value 属性和绑定了 input 事件。
* 2). 顺理成章，在定义的 child 组件中，可以通过 props 获取 value 属性，根据 props 单向数据流的原则，又将 value 缓存在了 data 里面的 mymessage 上，再在 input 上通过 v-model 绑定了 mymessage 属性和一个 change 事件。当 input 值变化时，就会触发 change 事件，处理 parent 组件通过 v-model 给 child 组件绑定的 input 事件，触发 parent 组件中 message 属性值的变化，完成 child 子组件改变 parent 组件的属性值。

这里主要是 v-model 的实现原理要着重了解一下！这种方式的用处适合于将展示组件和业务逻辑组件分离。

<a name="db73c200"></a>
### $parent 和 $children

这里要说的这种方式就比较直观了，直接操作父子组件的实例。$parent 就是父组件的实例对象，而 $children 就是当前实例的直接子组件实例了，不过这个属性值是数组类型的，且并不保证顺序，也不是响应式的。

```jsx
// 定义 parent 组件
Vue.component('parent', {
  template: `
    <div>
      <p>this is parent component!</p>
      <button @click="changeChildValue">test</button>
      <child />
    </div>
  `,
  data() {
    return {
      message: 'hello'
    }
  },
  methods: {
    changeChildValue(){
      this.$children[0].mymessage = 'hello';
    }
  },
});

// 定义 child 组件
Vue.component('child', {
  template:`
    <div>
      <input type="text" v-model="mymessage" @change="changeValue" /> 
    </div>
  `,
  data() {
    return {
      mymessage: this.$parent.message
    }
  },
  methods: {
    changeValue(){
      this.$parent.message = this.mymessage;//通过如此调用可以改变父组件的值
    }
  },
});
    
const app = new Vue({
  el:	'#app',
  template: `
    <div>
      <parent />
    </div>
  `
});
```

在上面实例代码中，分别定义了 parent 和 child 组件，这两个组件是直接的父子关系。两个组件分别在内部定义了自己的属性。在 parent 组件中，直接通过 this.$children[0].mymessage = 'hello'; 给 child 组件内的 mymessage 属性赋值，而在 child 子组件中，同样也是直接通过 this.$parent.message 给 parent 组件中的 message 赋值，形成了父子组件通信。

关于 [$parent](https://cn.vuejs.org/v2/api/#vm-parent) 和 [$children](https://cn.vuejs.org/v2/api/#vm-children) 这对属性的详细介绍可以查询官网文档！

<a name="58210e81"></a>
### $boradcast 和 $dispatch 

这也是一对成对出现的方法，不过只是在 Vue1.0 中提供了，而 Vue2.0 被废弃了，但是还是有很多开源软件都自己封装了这种组件通信的方式，比如 [Mint UI](http://mint-ui.github.io/#!/zh-cn)、[Element UI](http://element-cn.eleme.io/#/zh-CN) 和 [iView](https://www.iviewui.com/) 等。

```javascript
// broadcast 方法的主逻辑处理方法
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}

export default {
  methods: {
    // 定义 dispatch 方法
    dispatch(componentName, eventName, params) {
      let parent = this.$parent;
      let name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    
    // 定义 broadcast 方法
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
```

上面所示的代码，一般都作为一个 mixins 去混入使用, broadcast 是向特定的父组件触发事件，dispatch 是向特定的子组件触发事件，本质上这种方式还是 on 和 emit 的封装，在一些基础组件中都很实用。

因为在 Vue 2.0 这个 API 已经废弃，那我们在这里也就提一下，如果想详细了解 Vue 1.0 和其他基于 Vue 的 UI 框架关于这个 API 的实现，可以点击查看[这篇文章](https://www.yuque.com/littlelane/vue/usdfkw)！

<a name="1765f2e8"></a>
### Vuex 状态管理

Vuex 是状态管理工具，实现了项目状态的集中式管理。工具的实现借鉴了 [Flux](https://facebook.github.io/flux/docs/overview.html)、[Redux](http://redux.js.org/)、和 [The Elm Architecture](https://guide.elm-lang.org/architecture/) 的模式和概念。当然与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。详细的关于 Vuex 的介绍，你既可以去查看[官网文档](https://vuex.vuejs.org/zh/)，也可以查看本专栏关于 Vuex 一系列的介绍。

<a name="25f9c7fa"></a>
## 总结

写到这里，Vue 中关于组件通信的所有方式就介绍完了，是不是感觉还是颇丰的呢？其实还有另外的两种方式可以实现组件的通信，一是通过 [Vue Router](https://router.vuejs.org/zh/) 通信，二是通过浏览器本地存储实现组件通信。关于这两种方式，这里我就不讲了，当然我会在本专栏中单独开篇讲解的，希望大家有兴趣就去看看！

准确来说本文详细讲解了实现 Vue 通信的六种方式，每种方式都有其特点。在实际的项目，大家可以酌情的进行使用。
