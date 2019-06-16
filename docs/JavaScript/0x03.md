# 重学 new 操作符

在 JavaScript 中，new 操作符后面常接构造函数，用于创建出一个新的实例。接下来我们将通过几段示例代码分析 new 操作符做了什么，最后根据这些行为实现一个 new 操作符。

<a name="5m82F"></a>
## 分析 new 操作符
首先来一段简单的示例代码吧！

```javascript
function Person(name) {
	this.name = name
  this.sayHello = function() {
  	console.log(`Hello ${this.name}`)
  }  
}

const person = new Person('littleLane')

person	// {name: "littleLane", sayHello: ƒ}
person.name	// littleLane
person.sayHello()	// Hello littleLane
```

上面的示例代码，我们构建了一个名字为 Person 的构造函数，函数接受 name 为参数，并将接收到的 name 参数赋值到了 this.name 属性上，在 this 上还定义了一个名为 sayHello 的方法，方法被调用时会输出 this.name 属性值。接着，我们通过 new 操作符创建了一个 person 实例。最后查看实例 person、person.name、person.sayHello()的输出值，我们发现最终**通过 new 操作符构建出来的实例就是构造函数 Person 里面 this 指向的对象**。

那这个对象是否每次构造出来都是全新的，我们再看下面的示例代码：

```javascript
function Person(name) {
	this.name = name
  this.sayHello = function() {
  	console.log(`Hello ${this.name}`)
  }  
}

const person1 = new Person('little')
const person2 = new Person('lane')

person1.name					// little
person2.name					// lane

person1 === person2		// false
```

我们向 Person 构造函数传递了不同的参数，并使用 new 操作符构造了 person1 和 person2 实例。最后打印出了 person1.name 和 person2.name 的值，发现他们互不干扰的，而且最终的 person1 也不等于 person2，说明**每次调用 new 操作符都是构造一个全新的实例**。

那如果构造函数关联了原型链，构造出来的实例是否会关联上，我们接着看：

```javascript
function Person(name) {
	this.name = name
  this.sayHello = function() {
  	console.log(`Hello ${this.name}`)
  }  
}

Person.prototype.sayName = function() {
  console.log(this.name)
}  

const person = new Person('littleLane')

person.name				// littleLane
person.sayHello()	// Hello littleLane
person.sayName()	// littleLane
```

我们在 Person 原型上添加了一个 sayName 的方法，然后通过构造出来的实例 person 可以访问到，并且打印出正确的值，**这说明通过 new 操作符构造出来的实例是可以访问到构造函数原型链中的属性的，也就是说 new 操作符会将实例与构造函数的原型链连接起来**。

上面的例子中，我们并没有显式的 return 值，那如果构造函数中有 return 返回值又会怎样呢？接下来，我们会分两种情况进行说明。

```javascript
// 返回原始值
function Person(name) {
	this.name = name
  this.sayHello = function() {
  	console.log(`Hello ${this.name}`)
  }  
  return 1
  // return true
  // return ''
  // return
}

const person = new Person('littleLane')
person.name				// littleLane
person.sayHello()	// Hello littleLane
```

在上面的示例代码中，我们 return 了一个原始值 1，发现返回值并没有起作用，最终通过 new 操作符构造出来的实例还是和上面示例代码中的一样。对此如果还有疑问，你还可以尝试其他原始类型的返回值。

经过一系列的尝试后，我们最终得出结论：**构造函数如果有显式 return 原始值，那么这个返回值将毫无意义，最终还是会得到构造函数内部构造的对象实例**。

既然构造函数返回原始值是没有任何作用的，那么返回对象又会怎样呢？

```javascript
// 返回对象类型值
function Person(name) {
	this.name = name
  this.sayHello = function() {
  	console.log(`Hello ${this.name}`)
  }  
  return {
  	name: 'strong',
    age: 25
  }
}

const person = new Person('littleLane')	// {name: "littleLane", sayHello: ƒ}
person.name				// strong
person.sayHello()	// TypeError: person.sayHello is not a function
```

显式 return 一个对象居然生效了。这里我们在构造函数中显式的返回对象，发现构造函数中的 this 依然是正常工作的，但是构造生成的实例没有指向构造函数中的 this，而是指向了返回的对象。

由此，我们可以得出一个结论：**构造函数里面如果有显式的返回对象类型值，那么通过 new 操作符构造出来的对象会指向这个返回值，而且会被正常使用。**

> 既然构造函数中显式的 return 值会有这么大的误区，那就建议在实际的开发过程中尽量不要在构造函数中显式 return 值。


通过上面几段示例代码的分析，我们已经知道了 new 操作符的实际作用了，接下来我们就来尝试实现一下和 new 操作符作用相同的函数吧！

<a name="VSXgj"></a>
## 实现 new 操作符
在动手编码之前，我们先来分析一下 new 操作符的作用以及我们需要怎么实现。

- 1、首先 new 操作符会返回一个对象作为实例，所以我们需要在函数内部构建一个对象
- 2、在构造函数中，我们是通过 this 来挂载属性和方法的，而我们构建的对象是可以访问到这些属性和方法的，所以我们构建的对象应该绑定到构造函数作用域，也就是将 this 对象指向该对象
- 3、这个对象是可以访问到构造函数原型链上的属性的，所以需要将这个对象与构造函数链接起来
- 4、构造函数内部显式的返回原始值是需要忽略的，所以我们需要将返回对象正常处理
- 5、当构造函数内部显式的返回对象类型值时，我们可以直接返回这个值

说了这么多，我们还是动手实现一段代码吧！

```javascript
function New(func) {
	const obj = {}
  if (func.prototype !== null) {
  	Object.setPrototypeOf(obj, func.prototype)
  }
  const result = func.apply(obj, Array.prototype.slice.call(arguments, 1))
  return result instanceof Object ? result : obj
}
```

实现的代码只有寥寥几行，下面我们就来说说这几行代码实现的功能：

- 1、首先是定义一个名称为 New 的函数（因为 new 是 JavaScript 关键词），函数接受多个函数，其中第一个就是构造函数本身了，后面都是执行构造函数所需要传递的参数
- 2、然后根据上面的分析，每次调用时我们都会构造一个对象 obj
- 3、接着我们会判断构造函数的 prototype 属性是否存在，如果存在就通过 Object.setPrototypeOf 方法（等同于 obj.__proto__ = func.prototype）将 obj 对象和构造函数的原型链关联起来（因为按照我们之前的分析，new 操作度构造出来的实例是可以访问到构造函数原型链上的属性和方法的）
- 4、将 obj 通过 apply 方法绑定到构造函数上，并且传入除构造函数以外剩余的参数，得到构造函数的返回值
- 5、最后判断构造函数的返回值是否为对象，如果是对象就使用构造函数的返回值，否则使用 obj，这样就忽略了构造函数返回的原始值

<a name="hPk0o"></a>
## 测试代码实现
new 操作符功能基本就实现了，接下来就来测试一下函数的功能是否和原生的 new 操作一致：

```javascript
function Person(name) {
	this.name = name
  this.sayHello = function() {
  	console.log(`Hello ${this.name}`)
  }  
}

Person.prototype.sayName = function() {
  console.log(this.name)
}  

const person = New(Person, 'littleLane')

person.name				// littleLane
person.sayHello()	// Hello littleLane
person.sayName()	// littleLane
```

和上面说到的原生 new 的功能保持一致。

<a name="cNjMj"></a>
## 总结
看完上面的内容，大家应该和我一样会感到诧异：哦，原来 new 操作符并没有什么黑魔法呀！它只是一个语法糖，其实它完成的功能有这些：

- 每次调用 new 操作符都会创建一个全新的对象
- new 操作符会被执行[[Prototype]]（也就是__proto__）链接
- new 操作符内部会将 this 指向新创建的对象
- 通过 new 操作符创建的每个对象将最终被 [[Prototype]] 链接到这个函数的 prototype 对象上
- 如果函数没有返回对象类型，那么 new 操作符中的函数调用将返回该对象引用
