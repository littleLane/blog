# Vue $dispatch 和 $broadcast

<a name="70761d53"></a>
## 00 前言
$dispatch 和 $broadcast 作为一对情侣 💑属性，在 Vue 1.0 中主要用来实现基于组件树结构的事件流通信 —— 通过向上或向下以冒泡的形式传递事件流，以实现嵌套父子组件的通信。但是由于其显功能缺陷，在 Vue 2.0 中就被移除了。虽然 Vue 官网已经不再支持使用 $dispatch 和 $broadcast 进行组件通信，但是在很多基于 Vue 的 UI 框架中都有对其的封装，包括 [**element-ui**](http://element-cn.eleme.io/#/zh-CN)、[iview](https://github.com/iview/iview) 等等。

那么 $dispatch 和 $broadcast 到底是怎么工作，其底层又是怎么实现的呢？接下来，我们就详细的说一说！

<a name="175d38a3"></a>
## 01 $dispatch 详解
为了追根溯源，我们还是先去 Vue 1.0 的文档你观摩一下其概念吧！

> **概念：**

_**Dispatch an event, first triggering it on the instance itself, and then propagates upward along the parent chain. The propagation stops when it triggers a parent event listener, unless that listener returns ****`true`****. Any additional arguments will be passed into the listener’s callback function.**<br />_<br />上面的一段英文定义来自 Vue 1.0 官方文档，其大致的意思是说：**dispatch 是一个事件，首先会在自己实例本身上触发，然后沿父链向上传播。当它触发父组件上的事件侦听器时传播即会停止，除非该侦听器返回 true。 任何其他参数都将传递给侦听器的回调函数。**

> **参数：**

dispatch 会接收两中参数：event 是事件名称，[...args] 是触发事件时传递给回调函数的参数。

> **例子：**

```javascript
// 创建一个 parent 组件
var parent = new Vue();

// 创建一个 child1 组件，其父组件指向 parent
var child1 = new Vue({ parent: parent });

// 创建一个 child2 组件，其父组件指向 child1
var child2 = new Vue({ parent: child1 });

// 在 parent 组件监听名为 test 的事件，并绑定了一个回调函数
parent.$on('test', function () {
  console.log('parent notified');
});

// 在 child1 组件监听名为 test 的事件，并绑定了一个回调函数
child1.$on('test', function () {
  console.log('child1 notified');
});

// 在 child2 组件监听名为 test 的事件，并绑定了一个回调函数
child2.$on('test', function () {
  console.log('child2 notified');
});
```

说到这里，parent、child1 和 child2 三个组件之间的关系可以展示成如下的关系图：<br />
![高阶组件 (4).png](https://cdn.nlark.com/yuque/0/2019/png/114852/1551870035081-a5c673d4-9ed2-4e31-96b2-343c54c0b449.png#align=left&display=inline&height=362&name=%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6%20%284%29.png&originHeight=370&originWidth=194&size=4444&status=done&width=190)<br />

```javascript
// 在 child2 组件中通过 dispatch 触发 test 事件
child2.$dispatch('test');

// 事件执行会输出如下结果
// -> "child2 notified"
// -> "child1 notified"
```

当执行 child2.$dispatch('test'); 时，首先会触发 child2 组件里面监听的 test 事件的回调函数，输出 'child2 notified'，根据上面官方文档的定义，事件会沿着组件关系链一直向上传递，然后传递到 child1 组件，触发监听事件输出 "child1 notified"，但是该侦听器没有返回 true，所以事件传递到此就结束了，最终的输出结果就只有 "child2 notified" 和 "child1 notified"。

> **Vue 1.0 官方实现**


在 Vue 1.0 版本中，$dispatch 实现的源码放在 /src/instance/api/events.js 文件中，代码很简单：

```javascript
/**
 * Recursively propagate an event up the parent chain.
 * 递归地在父链上传播事件。
 * @param {String} event
 * @param {...*} additional arguments
 */
// $dispatch 方法是定义在 Vue 的 prototype 上的
// 接受一个字符串类型的事件名称
Vue.prototype.$dispatch = function (event) {
  // 首先执行 $emit 触发事件，将返回值保存在 shouldPropagate 中
  var shouldPropagate = this.$emit.apply(this, arguments)
  
  // 如果首次执行的 $emit 方法返回的值不是 true 就直接返回
  // 如果返回值不是 true 就说明组件逻辑不希望事件继续往父组件进行传递
  if (!shouldPropagate) return
  
  // 如果首次执行 $emit 方法返回值是 true 就获取当前组件的 parent 组件实例
  var parent = this.$parent
  
  // 将函数接受的参数转换成数组
  var args = toArray(arguments)
  
  // use object event to indicate non-source emit on parents
  // 根据传入的事件名称的参数组装成 object
  args[0] = { name: event, source: this }
  
  // 循环知道组件的父组件
  while (parent) {
    // 在父组件中执行 $emit 触发事件
    shouldPropagate = parent.$emit.apply(parent, args)
    
    // 如果父组件 $emit 返回的是 true 就继续递归祖父组件，否则就停止循环
    parent = shouldPropagate ? parent.$parent : null
  }
  
  // 最后返回当前组件实例
  return this
}
```

> **element-ui 实现**


在 Element-UI 中，$dispatch 实现的源码放在 /src/mixins/emitter.js 文件中，代码很简单：

```javascript
// 定义 dispatch 方法，接受三个参数，分别是：组件名称、将要触发的事件名称、回调函数传递的参数
dispatch(componentName, eventName, params) {
  // 获取基于当前组件的父组件实例，这里对父组件实例和根组件实例做了兼容处理
  var parent = this.$parent || this.$root;
  
  // 通过父组件的 $option 属性获取组件的名称
  var name = parent.$options.componentName;

  // 当相对当前组件的父组件实例存在，而且当父组件的名称不存在或者父组件的名称不等于传入的组件名称时，执行循环
  while (parent && (!name || name !== componentName)) {
    // 记录父组件的父组件
    parent = parent.$parent;

    // 当父组件的父组件存在时，获取祖父组件的名称
    if (parent) {
      name = parent.$options.componentName;
    }
  }
  
  // 当循环结束是，parent 的值就是最终匹配的组件实例
  if (parent) {
    // 当 parent 值存在时调用 $emit 方法
    // 传入 parent 实例、事件名称与 params 参数组成的数组
    // 触发传入事件名称 eventName 同名的事件
    parent.$emit.apply(parent, [eventName].concat(params));
  }
}
```

> **差异分析**


仔细看完实现 $dispatch 方式的两个版本的代码，大家是不是发现，两个版本的实现和功能差异性还是很大的。

- 1、接受参数：Vue 实现版本只会接受一个字符串类型的事件名称为参数，而 element-ui 实现的版本会接受三个参数，分别是：需要触发事件的组件名称、将要触发的事件名称、回调函数传递的参数；

- 2、实现功能：Vue 实现版本触发事件一直会顺着组件链向上进行传递，知道父组件中的侦听器没有返回 true，在这个期间所有的组件都会执行事件的响应，包括当前组件本身，而 element-ui 实现版本会不断的基于当前组件向父组件进行遍历，直至找到和接受的组件名称匹配，就会停止遍历，触发匹配组件中的监听事件。

<a name="3d7550fe"></a>
## 10 $broadcast 详解
上面详细的说完 $dispatch 方法的实现和 Vue 实现版本与 element-ui 实现版本的区别，下面就该说说 $broadcast，毕竟他们是情侣属性嘛。

> **概念**

_Broadcast an event that propagates downward to all descendants of the current instance. Since the descendants expand into multiple sub-trees, the event propagation will follow many different “paths”. The propagation for each path will stop when a listener callback is fired along that path, unless the callback returns _`_true_`_**.**_<br /><br />Broadcast 是一个事件，它向下传播到当前实例的所有后代。由于后代扩展为多个子树，事件传播将会遵循许多不同的“路径”。 除非回调返回 true，否则在沿该路径触发侦听器回调时，每个路径的传播将会停止。

> **参数**

<br />broadcast 会接收两中参数：event 是事件名称，[...args] 是触发事件时传递给回调函数的参数。

> **例子**


```javascript
// 创建 parent 组件实例
var parent = new Vue()

// 创建 child1 组件实例，其父组件指向 parent
var child1 = new Vue({ parent: parent })

// 创建 child2 组件实例，其父组件指向 parent
var child2 = new Vue({ parent: parent })

// 创建 child3 组件实例，其父组件指向 child2
var child3 = new Vue({ parent: child2 })

// 在 child1 组件监听名为 test 的事件，并绑定了一个回调函数
child1.$on('test', function () {
  console.log('child1 notified')
})

// 在 child2 组件监听名为 test 的事件，并绑定了一个回调函数
child2.$on('test', function () {
  console.log('child2 notified')
})

// 在 child3 组件监听名为 test 的事件，并绑定了一个回调函数
child3.$on('test', function () {
  console.log('child3 notified')
})
```

parent、child1、child2 和 child3 四个组件之间的关系可以展示成如下的关系图：<br />![高阶组件 (5).png](https://cdn.nlark.com/yuque/0/2019/png/114852/1551875942057-18c8899a-6c5c-4015-a4f7-38f2e755dcc1.png#align=left&display=inline&height=363&name=%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6%20%285%29.png&originHeight=399&originWidth=345&size=8819&status=done&width=314)
```javascript
parent.$broadcast('test')
// -> "child1 notified"
// -> "child2 notified"
```

当执行 parent.$broadcast('test'); 时，事件流会以 parent 组件为起点向 parent 的子组件进行传递，根据事件绑定的顺序，虽然 parent 组件有两个同级的 child1 和 child2 ，但是事件流会先触发 child1 里面的绑定事件，此时会输出 "child1 notified"，然后事件流到达 child2 组件，会触发 child2 组件中的绑定事件，输出 "child2 notified"。到这时，child2 组件中的侦听器并没有返回 true，所以事件传递到此就结束了，最终的输出结果就只有 "child1 notified" 和 "child2 notified"。

> **Vue 1.0 官方实现**

<br />在 Vue 1.0 版本中，$broadcast 实现的源码放在 /src/instance/api/events.js 文件中，代码很简单：

```javascript
/**
 * Recursively broadcast an event to all children instances.
 * 递归地向所有子实例广播事件。
 * @param {String|Object} event
 * @param {...*} additional arguments
 */
// $dispatch 方法是定义在 Vue 的 prototype 上的
// 接受一个事件
Vue.prototype.$broadcast = function (event) {
  // 获取传入事件的类型，判断是否为字符串
  var isSource = typeof event === 'string'
  
  // 校正 event 的值，当接受 event 的类型为字符串时就直接使用，如果不是字符串就使用 event 上的 name 属性 
  event = isSource ? event : event.name
  
  // if no child has registered for this event,
  // then there's no need to broadcast.
  // 如果当前组件的子组件没有注册该事件，就直接返回，并不用 broadcast
  if (!this._eventsCount[event]) return
  
  // 获取当前组件的子组件
  var children = this.$children
  
  // 将函数接受的参数转换成数组
  var args = toArray(arguments)
  
  // 如果传入事件为字符串
  if (isSource) {
    // use object event to indicate non-source emit
    // on children
    // 根据传入的事件名称的参数组装成 object
    args[0] = { name: event, source: this }
  }
  
  // 循环子组件
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i]
    
    // 在每个子组件中调用 $emit 触发事件
    var shouldPropagate = child.$emit.apply(child, args)
    
    // 判断调用 $emit 返回的值是否为 true
    if (shouldPropagate) {
      // 如果调用 $emit 返回的值为 true，就递归孙子组件继续广播
      child.$broadcast.apply(child, args)
    }
  }
  
  // 最后返回当前组件的实例
  return this
}
```

> **element-ui 实现**

<br />在 Element-UI 中，$broadcast 实现的源码放在 /src/mixins/emitter.js 文件中，代码很简单：

```javascript
// 定义 broadcast 方法，接受三个参数，分别是：组件名称、将要触发的事件名称、回调函数传递的参数
function broadcast(componentName, eventName, params) {
  // 依次循环当前组件的子组件
  this.$children.forEach(child => {
    // 获取每个子组件的名字
    var name = child.$options.componentName;

    // 判断子组件的名字是否等于传入的组件名称
    if (name === componentName) {
      // 如果子组件的名字等于传入的组件名称就调用 $emit 触发事件
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // 如果子组件的名字不等于传入的组件名称就递归遍历调用 broadcast 孙子组件
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
```

> **差异分析**

<br />和之前说到的 $dispatch 一样，这里的 $broadcast 的两个实现版本也存在着巨大的差异：

- 1、接受参数：Vue 实现版本只会接受一个字符串类型的事件名称为参数，而 element-ui 实现的版本会接受三个参数，分别是：需要触发事件的组件名称、将要触发的事件名称、回调函数传递的参数；

- 2、实现功能：Vue 实现的 $broadcast 触发方式是**默认**只触发子代组件，不触发孙子代组件，如果子代创建了监听且返回了true，才会向孙子代组件传递事件。而 element-ui 实现的版本是直接向所有子孙后代组件传递，直至获取到的子组件名称等于传入的组件名称相等，才会触发当前子组件的监听事件，期间也没有返回值的判定。

<a name="bbe8fac5"></a>
## 11 总结
说到这里，$dispatch 和 $broadcast 的讲解就结束了。可能大家已经知道了 Vue 2.0 版本为什么会将这两个属性移除。首先我们引入[官网](https://cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2)的说法：

_因为基于组件树结构的事件流方式实在是让人难以理解，并且在组件结构扩展的过程中会变得越来越脆弱。这种事件方式确实不太好，我们也不希望在以后让开发者们太痛苦。并且 __`$dispatch`__ 和 __`$broadcast`__ 也没有解决兄弟组件间的通信问题。_<br /><br />这样来说 $dispatch 和 $broadcast 确实会有这样的问题。在前面的讲解中，大家也不难发现 $dispatch 主要是事件流由当前组件往父组件流动，当满足一定条件的时候就会触发当前子组件的监听事件，$broadcast 的功能是事件流由当前组件向子组件流动，当满足一定条件的时候就会触发当前子组件的监听事件。也就是说 $dispatch 和 $broadcast 主要解决了父子组件、嵌套父子组件的通信，并没有解决兄弟组件的通信问题，另一个方面这样的事件流动的方式是基于组件树结构的，当业务越来越烦杂时，这种方式会显得极其繁琐，甚至会混乱到难以维护，所以 Vue 2.0 版本移除这两个 API 是在意料之中的。

但是为什么三方 UI 库都会封装类似的这样一个组件通信的方式呢？我的猜测可能是为了解决在父子层嵌套组件中，通过 $dispatch 和 $broadcast 定向的向某个父或者子组件**远程调用**事件，这样就避免了通过传 props 或者使用 refs 调用组件实例方法的操作。这样说的话，$dispatch 和 $broadcast 也就其存在的价值，而并不是一无是处的，还是那句话：**技术没有好与坏，只有合适不合适**！
