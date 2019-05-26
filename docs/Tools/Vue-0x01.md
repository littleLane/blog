# v-model 实现原理

v-model 是 Vue 框架提供的众多指令中的一个，其主要作用是可以实现在表单 `<input>`、`<textarea>` 及 `<select>` 标签元素上创建双向数据绑定。

那双向数据绑定又是什么呢？在讲解 v-model 指令之前，我们就先来说说双向数据绑定吧！

<a name="4989f3b4"></a>
## 双向数据绑定

废话不多说，上来就直接亮一段 v-model 示例的代码吧！

```javascript
// 定义 v-model 示例组件
Vue.component('bindData', {
  template:`
    <div>
      <p>this is bindData component!</p>
      <button @click="handleChange">change input value</button>
      <input type="text" v-model="inputValue" />
      <p>{{inputValue}}</p>
    </div>
  `,
  data() {
    return {
      inputValue: 'hello'
    }
  },
  methods:{
    // 点击按钮改变 input 的值
    handleChange() {
      this.inputValue = `I'm changed`;
    }
  }
});

const app=new Vue({
  el: '#app',
  template: `
    <div>
      <bindData />
    </div>
  `
});
```

我相信上面的一段简单的示例代码对于参与过基于 Vue 技术栈项目开发的同学来说都是常规操作了，如果你还没有参与过基于 Vue 技术栈项目的开发或者对 Vue 不怎么熟悉，我介意你先去查看[官网](https://cn.vuejs.org/)的文档，尝试着做一两个项目，然后回过头来看咱们的这篇文章，你肯定会对 v-model 有新的认识！

上面这段示例代码通过在 input 标签上绑定 v-model 实现一个很神奇的功能：

* 首先在 input 标签上通过 v-model 指令绑定 $data_（如果你还不知道 $data 这个 Vue 示例的内置属性，你可以点击[_这里_](https://cn.vuejs.org/v2/api/#data)） 的 inputValue 属性；

* 因为 $data 的 inputValue 属性有一个 hello 的初始值，所以当组件 mounted 后，input 显示的值就是 hello，同时 input 标签下的 p 标签里面显示的也是 _hello_；

* 当组件显示后，向 input 中输入值，发现 input 标签下的 p 标签里面显示的是 _input 标签当前展示的值_；

* 最后点击 input 标签上面的 button 标签，发现 input 标签的值和 p 标签里面显示的内容同时变化了，而且_显示内容一致，都显示成了 I'm changed。

<a name="v-model"></a>
## v-model

上面详细的列出了几点操作和展示的内容，回头看看这就是双向数据绑定呀！此时此刻，如果你还不是很了解 v-model 的实现原理，可以先静下心来根据自己现在已经知道的知识来好好想想或者假设一下 v-model 内部是怎样操作的（不要怕想错 💪）。

几分钟过去了。。。[斜眼笑]

<a name="6278a768"></a>
### 接触 v-model

现在我们一起来分析一下吧：

* 1、从 inputValue 属性入手吧，因为 input 标签、v-model、button 标签、p 标签的唯一联系就是这个 inputValue 属性了，不信你就看看示例代码吧！

* 2、因为 input 属性是定义在 $data 上的，那就是响应式数据（如果你还不知道响应式数据是啥，你可以点击[_这里_](https://cn.vuejs.org/v2/guide/reactivity.html#ad)_）_，根据响应式数据的特性：当数据值被修改时，会驱动视图的变化，显示变化后的数据，那么对应的绑定了 inputValue 属性的 p 标签显示的内容就会变化

* 3、当我们往 input 输入值时，p 标签显示的内容也相应的变化了，根据响应式数据的特性，这里肯定是触发了 inputValue 值的变化，并且将 input 此时的值赋值给了 inputValue，才导致了 p 标签内容的变化；

* 4、当点击 button 时，input 和 p 标签显示的值都变化了且显示的值一样，而在 button 绑定的 click 处理函数中，我们直接将新值赋值给了 inputValue。p 标签是显示的展示了 inputValue 属性的值，所以理所当然的变化了，那 input 呢？

* 5、据我们所知，input 上面是有一个叫 value 的属性，我们可以根据 value 属性给 input 设置显示值。那点击 button 后，我们给 inputValue 设置了新的值，input 的显示值也变化了，那肯定是有个给 input 的 value 属性设置值的操作；

* 6、在第 3 点和第 5 点分别暴露出了在 input 上有两个隐式的操作：给 inputValue 设置和给 input 的 value 属性设置。但是在 input 标签上没有显示的绑定操作，只有一个 v-model 指令。

> ❓这里我们就假设这两个隐式的操作就是 v-model 封装的。


<a name="5a502209"></a>
### 懵逼改造 v-model

根据上面 6 点的分析或者根据我们现有的知识，我们稍微改写一下代码：

```javascript
// 定义 v-model 示例组件改写
Vue.component('bindData1', {
  template:`
    <div>
      <p>this is bindData1 component!</p>
      <button @click="handleChange">change input value</button>
      <input type="text" :value="inputValue" @change="handleInputChange" />
      <p>input 中的值为：{{inputValue}}</p>
    </div>
  `,
  data() {
    return {
      inputValue: 'hello'
    }
  },
  methods:{
    // 处理 input 输入 change 事件
    handleInputChange(e) {
      this.inputValue = e.target.value;
    },
    
    // 点击按钮改变 input 的值
    handleChange() {
      this.inputValue = `I'm changed`;
    }
  }
});

const app=new Vue({
  el: '#app',
  template: `
    <div>
      <bindData1 />
    </div>
  `
});
```

改造后的代码可以实现和改造之前一样的双向数据绑定的效果，但是改造之前的示例示例代码，改造之后的代码主要修改了两个地方：

* 1、将 input 标签上的 v-model 指令去掉了，换成了用 v-bind:value（缩写 :value） 指令来绑定 inputValue 属性，并且加上了一个 v-on:change（缩写 ） 事件；

* 2、添加了一个 input change 处理函数，函数逻辑是将当前 input 标签的值赋值给 $data 的 inputValue 属性

<a name="994d0c3d"></a>
### 深入 v-model

看到这里，你是不是在犯嘀咕：这两中不同的代码都可以实现同样的双向数据绑定的效果，肯定不是巧合，这两种处理方式肯定存在某种联系。

不错，上面两个示例基本是等效的实现。改造后的示例是改造前的复杂实现方式，也就是说 v-model 只是一种封装或者语法糖，负责监听用户的输入事件以更新数据，并对一些极端场景进行特殊处理。

v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。

v-model 在不同的 HTML 标签上使用会监控不同的属性和抛出不同的事件：

* text 和 textarea 元素使用 `value` 属性和 `input` 事件；

* checkbox 和 radio 使用 `checked` 属性和 `change` 事件；

* select 字段将 `value` 作为 prop 并将 `change` 作为事件。

看到这里是不是恍然大悟了！下面是一个 select 的示例，关于更多的示例可以上 [Vue 官网查看](https://cn.vuejs.org/v2/guide/forms.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model)：<br />![Feb-26-2019 12-57-55.gif](https://cdn.nlark.com/yuque/0/2019/gif/114852/1551157096632-48e821bd-60af-426b-a14a-d5538cd2a35e.gif#align=left&display=inline&height=438&linkTarget=_blank&name=Feb-26-2019%2012-57-55.gif&originHeight=438&originWidth=560&size=1608542&status=done&width=560)<br />

<a name="3d09df3b"></a>
### 自定义组件 v-model

前文的内容只是讲解了 v-model 在原生表单标签上面的使用，在平时的开发中使用第三方 UI 库提供的组件时使用 v-model 的频率也很好，那自定义组件上面的 v-model 又是怎么实现的呢？

在自定义的组件上 v-model 默认会利用名为 value 的 prop 和名为 input 的事件实现，但是对于不同的表单元素 value 属性会用于不同的目的（正如我们[上面提到的](https://www.yuque.com/littlelane/vue/iqevua#994d0c3d)），比如单选框、复选框表现为 checked。为了区别这些不同的表现特性 Vue 给组件提供了 model 配置属性。model 是一个对象：提供 prop 属性指定组件 value 特性，event 指定值变化时触发的事件。

说了这么多，来一段示例代码吧！

```jsx
// 自定义组件 checkbox
Vue.component('checkbox', {
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `,
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
});

// 使用自定义组件 
Vue.component('useCheckbox', {
  template: `
    <checkbox v-model="checkStatus" @change="handleChange"></checkbox>
  `,
  data() {
    return {
      checkStatus: false
    }
  },
  methods: {
    handleChange(checked) {
      // do something
    }
  }
});

```

示例代码中的 checkStatus 的值将会传入这个名为 checked 的 prop。同时当 checkbox 触发一个 change 事件并附带一个新的值的时候，这个 checkStatus 的属性将会被更新。

> ⚠️注意：注意你仍然需要在组件的 props 选项里声明 checked 这个 prop


<a name="e7dd4e0f"></a>
## v-model 修饰符

在原生的表单元素和自定义的组件中使用 v-model 我们都讲解完了，同时我们也讲到了 v-model 的实现原理，现在大家应该对 v-model 很了解了吧！

接下来，我们就说说那些使用在 v-model 上的修饰符吧。

<a name=".lazy"></a>
### .lazy

在上面的内容中，我们提及到 v-model 实现了双向数据绑定，双向数据绑定的特性是：当 input 标签显示的值实时变化时，也会实时的触发 input 标签上的 input 事件，在每次 input 事件触发后将输入框的值与数据实时进行同步。 在一些特殊的需求和场景下，你可能希望数据同步不是实时同步而是在触发 change 事件的时候进行数据同步，那么你可以添加 lazy 修饰符进行处理，使用的示例如下：

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
```

<a name=".number"></a>
### .number

在表单中处理输入验证必须是数字时，比如跟钱💰相关的操作，你这是可能就希望可以将用户输入的值自动转换成数字类型，那你可以在 v-model 上加上 number 修饰符进行处理。

```html
<!-- 将输入的值自动转换成数字类型 -->
<input v-model.number="age" type="number">
```

> ⚠️ number 修饰符的处理原则是：使用 parseFloat() 函数对输入的值进行处理，如果输入的值是 parseFloat() 函数不能解析的，如以非数字开头的字符串，就会返回原始值。


<a name=".trim"></a>
### .trim

对于用户在表单标签中输入的字符串，最后我们都想去除首尾的空白字符，那么这个 trim 修饰符是非常有用的。

```html
<!-- 去除输入值的首尾空白字符 -->
<input v-model.trim="msg">
```

<a name="25f9c7fa"></a>
## 总结

v-model 是一个非常实用的指令，它的使用可以省去我们很多的业务逻辑代码，使代码更加清晰、更好维护。当然 v-model 的实现原理还是非常容易理解和消化的，再者尤大为了让我们的开发更加方便，在 v-model 提供了很实用的修饰符简化我们的操作，修饰符的使用也很简单。

v-model 的实现原理我们算是搞清楚了，那下节我们就说一下 Vue 源码到底是怎么实现 v-model 的，下次再见吧👋！