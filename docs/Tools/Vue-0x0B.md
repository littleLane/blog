# 数据响应式初探

近些年来，一股 MVVM 之风刮遍全球，大家无不为之称赞。关于 MVVM 架构模式的实现，大家讨论的最多的算是 Vue.js 了吧！Vue.js 很好的利用 MVVM 中的 VM 声明式的实现了与数据模型 Model 和视图 View 的联通，使得用户只需对数据模型进行操作，就能响应到对应的视图上，这其中核心的实现就是「响应式系统」了。「响应式系统」在整个系统中起到了举足轻重的作用，为我们大大减轻了生产力，了解其原理与实现就成为了我们技术人无尽的追求，同样也有助于我们在实际的生产开发中更好的解决相关的问题。

<a name="U0FdX"></a>
## MVVM
![WX20190608-151021@2x.png](https://cdn.nlark.com/yuque/0/2019/png/114852/1559978649256-b142406c-3b3c-4636-a60b-fc1dfbf1bde2.png#align=left&display=inline&height=231&name=WX20190608-151021%402x.png&originHeight=516&originWidth=974&size=104047&status=done&width=436)<br />
<br />上面给出了一张比较简单但是很形象的图，它描述了 MVVM 中视图 View、视图模型 VM 和数据模型 Model 这三者之间的关系：视图模型 VM 全称 ViewModel，它是整个模式的核心，紧紧联系着视图 View 和数据模型 Model。视图模型 VM 会通过 DOM 事件监听（DOM Listeners）将视图数据转换成数据模型数据，通过数据绑定（Data Bindings）将数据模型转换成视图数据以更新视图。其中的视图 View 就是我们熟知的组件页面了，而数据模型 Model 就是 JavaScript 对象了。

从上面的分析，不难发现视图 View 和数据模型 Model 算是我们最熟悉的了，不需要做过多的说明，但是 VM 视图模型就是我们需要深挖的了，它的原理实现对整个 MVVM 模型系统非常重要。接下来，大部分内容就是对这个核心的探讨了。

<a name="jmu4q"></a>
## Object.defineProperty
在详细介绍这个 Object.defineProperty 之前，我们先抛出几个问题：

1. Object.defineProperty 是什么，它可以实现什么？
1. Vue.js 是如何利用它实现响应式系统的？
1. 利用 Object.defineProperty 实现的响应式系统有什么缺陷？

<a name="tON3e"></a>
### 问题一
> ECMAS-262 第5版在定义只有内部采用的特性时，提供了描述属性特征的几种属性。ECMAScript 对象中目前存在的属性描述符主要有两种：数据描述符(数据属性)和存取描述符(访问器属性)。数据描述符是一个拥有可写或不可写值的属性，存取描述符是由一对 getter-setter 函数功能来描述的属性。


Object.defineProperty 就是用来定义对象属性的属性描述符方法，它会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

<a name="T8fNS"></a>
#### 数据描述符
数据描述符可包含下列的属性：

- **configurable**：默认为 false。当且仅当该属性值为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。

- **enumerable**：默认为 false。当且仅当该属性值为 true 时，该属性才能够出现在对象的枚举属性中，比如 for-in循环或 Object.keys() 等。

- **writable**：默认为 false。当且仅当该属性值为 true 时，value 才能被赋值运算符改变。

<br />

- **value**：该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 [undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

示例代码：

```javascript
var obj = {}

Object.defineProperty(obj, 'a', {
  value: 1
})

// 获取属性 a 的值：obj.a   => 1
// 获取 obj 上可遍历的属性：Object.keys(obj)  => []
// 删除 obj 上的属性 a：delete obj.a 	=>  false
// 重新定义 obj 上的属性 a：Object.defineProperty(obj, 'a', { value: 1, configurable: true })   => Cannot redefine property 直接报错
// 重新赋值 obj 上的属性 a 的值为 2：obj.a = 2
// 重新获取属性 a 的值：obj.a   => 1   ⚠️注意：重新赋值并没有成功
```

上面的示例代码可以说明：当通过 Object.defineProperty 为对象定义或修改属性时，默认不指定属性描述符，所有的属性描述符的值都是 false，这会导致该属性不会存在于对象可遍历的属性列表中，不能对属性重新配置（包括删除和重新定义属性），还有对该属性的重新赋值也不会成功。如果显式的将这些描述符设置为 true，那么以上描述的所有不可行的操作都会可行（可以被重新赋值，可以被删除，可以被重新定义，可以被遍历等），这里我就不演示了，大家感兴趣可以实操一下。

<a name="1DCSN"></a>
#### 存取描述符
存取描述符可包含下列的属性：

- **configurable**：默认为 false。当且仅当该属性值为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。

- **enumerable**：默认为 false。当且仅当该属性值为 true 时，该属性才能够出现在对象的枚举属性中，比如 for-in循环或 Object.keys() 等。

<br />

- **get**：一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入 this 对象（由于继承关系，这里的 this 并不一定是定义该属性的对象）。默认为 undefined。

- **set**：一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。默认为 undefined。

示例代码：

```javascript
var obj = {}
var val = ''

Object.defineProperty(obj, 'a', {
  get() {
    return val
  },
  set(newVal) {
    val = newVal
  }
})
```

![image.png](https://cdn.nlark.com/yuque/0/2019/png/114852/1559982903196-27317122-d7c1-4a16-9eee-20a624902848.png#align=left&display=inline&height=87&name=image.png&originHeight=174&originWidth=414&size=17278&status=done&width=207)

当你运行上面的示例代码，你会发现 obj 对象变成了上面这样，是不是有种很熟悉的感觉？对，在 Vue.js 项目中，我们无时不刻不见到这样的数据结构。这就是 Object.defineProperty 存取描述符的魅力了：它会给定义过的属性添加 set 和 get 方法。当我们通过 . 符号或者 [] 给对象的属性赋值时，就会触发 set 方法了；当我们通过 . 符号或者 [] 获取对象的属性的对应值时，就会触发 get 方法了。正因为 Object.defineProperty 有这样一个能力，所以我们可以通过它实现响应式系统，完成 MVVM 模式中 VM 这重要的一环。

Object.defineProperty 的存取描述符中依然可以包含 **configurable** 和 **enumerable**，这两个属性的作用我们在数据描述符中已经提到过了，这里就不再赘述了。

<a name="dtpfk"></a>
### 问题二
上面我们已经分析过了，我们可以通过 Object.defineProperty 存取描述符将对象定义成可观察的，然后在 set 和 get 方法中加上对应的逻辑。

为了便于看到效果，这里先定义一个方法，该方法在调用时会输出「视图更新啦~~」

```javascript
function cb() {
  console.log('视图更新啦~~')
}
```

为了实现更好的复用和便于递归，我们将定义一个名为 defineReactive 的方法，该方法就是对 Object.defineProperty 逻辑的封装，它会接受对象、需要定义的属性 key 值和属性的值，然后根据这些参数定义属性的 getter、setter 方法，实现响应式。

```javascript
function defineReactive (obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,       	// 属性可枚举
    configurable: true,     	// 属性可被修改或删除
    get() {
      return val       
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      observer(val)
      cb(newVal);
    }
  })
}
```

要想将数据变成深度可观察的，我们还需要封装一层。封装的逻辑主要是对类型进行判断，然后就是对深层的属性进行遍历并调用 defineReactive 实现完全数据响应式。

```javascript
function observer(value) {
  if (!value || (typeof value !== 'object')) {
    return
  }

  Object.keys(value).forEach((key) => {
    const val = value[key]
    observer(val)
    defineReactive(value, key, val);
  })
}
```

到了这一步，就来测试一下我们的成果吧：

```javascript
// 定义一个 obj 多级嵌套对象
var obj = {a: 1, b: { c: 2 }}

// 将 obj 变成可观察的
observer(obj)

obj.b = 'lane'   =>  视图更新啦~~
```

成果还不错，我们就来趁热打铁封装一个简单的 Vue 响应式系统吧！先来看一个最简单的 Vue 使用示例：

```javascript
const vm = new Vue({
  data: {
    message: 'I am lane.'
  }
})
```

Vue 会作为构造函数进行调用并接受一个对象作为函数。目前在最简单的情况下，参数对象只包含一个 data 属性，我们的目的就是将这个 data 属性值变成可观察的。

```javascript
// Vue构造类
class Vue {
  constructor(options) {
    this._data = options.data;
    observer(this._data);
  }
}
```

测试简易封装的 Vue 示例代码：

```javascript
vm._data.message = 'hello, world.'  // 视图更新啦～
```

当然这还只是 Vue.js 中响应式系统的第一步，为了更好的进行数据更新处理，系统还需要进行依赖收集，以确保数据更新性能达到更优。

<a name="k2Wbm"></a>
### 问题三
通过 Object.defineProperty 实现的数据响应式逻辑对于数组的许多方法都不能触发 set 方法（包括 push、pop、shift、unshift、splice、sort、reverse），Vue.js 为了解决这个问题，重新包装了这些函数，同时当这些方法被调用的时候，手动去触发更新操作；还有另一个问题，官网也有特别的[指出](https://link.juejin.im/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Flist.html%23%25E6%25B3%25A8%25E6%2584%258F%25E4%25BA%258B%25E9%25A1%25B9)：

> 由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
> - 当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
> - 当你修改数组的长度时，例如：vm.items.length = newLength
> 
> 这个最根本的原因是因为这两种情况下，受制于js本身无法实现监听，所以官方建议用他们自己提供的内置 api 来实现，我们也可以理解到这里既不是 defineProperty 可以处理的，也不是包一层函数就能解决的，这就是 2.x 版本现在的一个问题。


我们可以利用我们之前的定义来实验一把：

```javascript
const vm = new Vue({
  data: {
    userIds: ['01', '02', '03', '04', '05']
  }
})

// 都没有输出  视图更新啦～，说明没有触发 set
vm._data.userIds.push('06')  
vm._data.userIds.length = 2
```

<a name="r2uAI"></a>
## 总结
今天关于数据响应式的初探就到这里吧，说到的东西也挺多的，首先是 MVVM 模式的架构，然后对 MVVM 的每个组成都进行详细的说明，接着说到了目前 Vue.js 通过 Object.defineProperty 实现响应式数据的方式，并对 Object.defineProperty 的用法和数据描述符与存取描述符进行了详细的讲解，最后利用 Object.defineProperty 封装了一个简单的 Vue 响应式系统，最后的最后提到了关于 Object.defineProperty 的一些缺陷。当然这还只是走出了第一步，Vue.js 的响应式系统还包括数据劫持、依赖收集等，当然后面我们也会慢慢的提到。
