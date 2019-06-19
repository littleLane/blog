# 重学 call、apply

call 和 apply 是所有函数都具有的方法，它们都可以通过使用一个指定的 this 值和若干个指定的参数值来调用某个函数或方法，它们之间的区别是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。

<a name="Lj2HG"></a>
## 语法
call() 方法的调用形式为：

```javascript
fun.call(thisArg, arg1, arg2, ...)
```

- fun 为当前需要执行的函数；
- thisArg 为在 fun 函数运行时指定的 this 值；
> 值得注意的是：指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数在非严格模式下运行，则指定为 null 和 undefined 的 this 值会自动指向当前环境全局对象（浏览器为 window，node 为 global），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。

- arg1, arg2, ... 为调用函数 fun 时需要传递的参数列表。

apply() 方法的调用形式为：

```javascript
fun.apply(thisArg, [argsArray])
```

各部分代表的函数和上面 call() 方法的各部分一致，只是调用函数 fun 时需要传递的参数改为了数组的形式。

<a name="PAOzE"></a>
## 分析
给出一段 call 方法的使用示例代码吧：

```javascript
var obj = {
  name: 'littleLane'
}

function func() {
  console.log(this.name)
}

func.call(obj)		// littleLane
```

上面的示例代码中，首先定义了一个名为 obj 的对象，对象包括一个 name 属性，且值为 littleLane，随后又定义了一个名为 func 的函数，函数的逻辑是打印出挂载在当前作用域 this 下名为 name 的属性值，最后就是通过 call 方法调用了 func 函数，并且指定 func 函数调用的上下文为 obj 对象。

在这个过程中，有几个重要的点要非常注意：

- 1、call 方法的调用改变了 func 函数的 this 指向，this 指到了 obj
- 2、func 函数执行了，并且会传入参数列表

说到这里，你是不是会想到这样一段代码：

```javascript
var obj = {
  name: 'littleLane',
  func: function() {
    console.log(this.name)
  }
}

obj.func()		// littleLane
```

对比这两段代码，如果是我们来模拟 call() 方法是不是可以像这样：

- 将调用 call() 方法的函数设为 call() 方法接受的第一个参数对象（如果没有传入该参数就设置为 window）的属性；
- 通过对象点的方式执行这个函数，并将剩余的参数传入；
- 当执行完成后将该函数从对象里面删除。

<a name="y0M02"></a>
## 模拟
<a name="brEaa"></a>
### call()
根据上面的分析，那我们就先来一版简单的 —— 无关参数版本

```javascript
Function.prototype.call2 = function(ctx = window) {
  ctx.func = this
  const result = ctx.func()
  delete ctx.func
  return result
}
```

测试：

```javascript
var obj = {
  name: 'littleLane'
}

function func() {
  console.log(this.name)
}

func.call2(obj)		// littleLane
```

根据测试结果，第一个简单版本的实现就成功了。

那如果是带有多个参数的话，就要对参数进行处理了，形如：

```javascript
var obj = {
  name: 'littleLane'
}

function func(name, age) {
  console.log('arg1', name)
  console.log('arg2', age)
  console.log(this.name)
}

func.call(obj, 'yuque', '25')		

// output list: 
// arg1 yuque
// arg2 25
// littleLane
```

那我们就趁热打铁来一波完整版本的吧：

```javascript
Function.prototype.call2 = function(ctx = window) {
  ctx.func = this
  const args = [...arguments].slice(1)
  const result = ctx.func(...args)
  delete ctx.func
  return result
}
```

测试：

```javascript
var obj = {
  name: 'littleLane'
}

function func(name, age) {
  console.log('arg1', name)
  console.log('arg2', age)
  console.log(this.name)
}

func.call2(obj, 'yuque', '25')	

// output list: 
// arg1 yuque
// arg2 25
// littleLane
```

测试结果和原生的 call 方法一致，这表示我们已经大功告成了！👏

<a name="yMzOO"></a>
### apply()
call() 方法已经模拟成功了，接下来，我们就来看看 apply 吧。上面我们提到过 apply() 和 call() 唯一的不同之处就是函数参数的处理不同，call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。所以 apply() 方法可以很快的模拟为：

```javascript
Function.prototype.apply2 = function(ctx = window) {
  ctx.func = this
  
  let result;
  if (arguments[1]) {
  	result = ctx.func(...arguments[1])
  } else {
    result = ctx.func()
  }
  
  delete ctx.func
  return result
}
```

测试：

```javascript
var obj = {
  name: 'littleLane'
}

function func(name, age) {
  console.log('arg1', name)
  console.log('arg2', age)
  console.log(this.name)
}

func.apply2(obj, ['yuque', '25'])	

// output list: 
// arg1 yuque
// arg2 25
// littleLane
```

测试结果和原生的 apply 方法表现一致，这表示我们已经大功告成了！👏
