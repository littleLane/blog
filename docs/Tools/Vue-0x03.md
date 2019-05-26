# Vue v-model 源码解析

> 上篇 [v-model 实现原理](https://www.yuque.com/littlelane/vue/iqevua) 留下的坑，这终于要来填了！


<a name="c18acae6"></a>
## 前置 · 前情回顾

在上篇文章中，我们详细介绍了 v-model 指令在原生 form 标签和自定义组件上的用法，这些我们在平时的项目开发过程中是运用的比较多的，之后又讲到 v-model 指令只是一个语法糖[🍬] —— 对各原生的 form 元素的属性值和属性值改变时触发的事件做了适配性的封装处理，并提供了一个简单的用法，最后我们提到了 v-model 修饰符的用法。读完整篇文章，原本神神秘秘的 v-model 展现出了它内在的样子，许多关于 v-model 的奇思异想都消散了，反而对尤大多生了几分敬佩！

> 废话不多说，大家上车，咱们源码见！


<a name="2b913c5a"></a>
## 前置 · Flow

[Flow](https://flow.org/en/docs/getting-started/) 是 facebook 公司出的 JavaScript 静态类型检查工具，其功能和同样是 facebook 出的针对 React 运行时 props 类型检查工具 [prop-types](https://reactjs.org/docs/static-type-checking.html) 很像，只是针对性和用法不一样。说到这里，可能大家会想到 [TypeScript](https://www.baidu.com/link?url=oIMQ_SchTGNEY1GyiC6JsvsAFOgwllkK1PdQ8hKrj0O&wd=&eqid=c9bf5568000166a5000000065c7b7df9)，但是 Flow 也只是做静态检查，Vue 源码的的静态检查就是基于 Flow 的，所以在阅读源码的之前，了解 Flow 是很有帮助的。

Flow 本身提供了两种方式进行类型检查：

- 1、类型推倒：指的是通过变量的使用上下文来推断出变量的类型，然后根据这些推断来检查类型。它不需要你对代码做任何修改就可以进行类型检测，将开发者的工作量降到了最低。它也不强制你刻意的注意和改变开发的习惯，就可以通过上下文环境推断出变量的类型。

- 2、类型注释：类型注释需要你在编写代码的时候，显式的给变量或者函数接受的形参变量或者函数的返回值等添加明确的期望数据类型。Flow 会根据这些给定的数据类型对参数值进行校验。这样的校验方式，可以是开发者在写代码的时候就发现数据类型或者传参的错误，避免了 JavaScript 弱数据类型隐式的数据转换带来的运行时错误。下面是一个简单的例子：

```javascript
/*@flow*/

function add(x: number, y: number): number {
  return x + y
}

add('Hello', 11)
```

例子中定义了一个名为 add 的函数，函数接受数据类型都为 number 的参数 x 和 y，并且返回的数据类型也是 number 类型。但是在调用 add 函数时，传入了一个字符串和数字类型的参数，这是 Flow 就会检查到接受的数据类型不匹配，并会给出接受参数类型错误的提示！

```javascript
/*@flow*/
// 定义名为 arr 的数组，且数组的每个元素都是 number 数字类型
var arr: Array<number> = [1, 2, 3]
```

```javascript
/*@flow*/
// 定义名为 Bar 的类
class Bar {
  x: string;           // x 是字符串
  y: string | number;  // 通过 | 指定 y 可以是字符串或者数字类型
  z: boolean;          // z 只能是 true 或 false 布尔类型

  constructor(x: string, y: string | number) {
    this.x = x
    this.y = y
    this.z = false
  }
}

// 使用 Bar 类创建一个实例
var bar: Bar = new Bar('hello', 4)
```

```javascript
/*@flow*/
// 定义的 foo 变量既可以是字符串，又可以是 null 或者 undefined
var foo: ?string = null
```

因为主要内容不是 Flow ，为了后续能够更好的阅读代码，这里就随便提了一下。如果大家想详细的了解 Flow ，请移步 Flow 的[官方文档](https://flow.org/en/docs/types/)！

<a name="3c1ca10f"></a>
## 正文 · 源码

```javascript
new Vue({
  el: '#app',
  template: `
    <div id="app">
      <input type="text" v-model="message" />
      <p>message: {{message}}</p>
    </div>
  `,
  data: {
    message: 'lane'
  }
});
```

上面示例代码展示了 v-model 的简单用法：我们在 input 标签上通过 v-model 指令绑定了一个名叫 message 的属性，然后在 p 标签通过 `{{}}` 进行了展示，最后在 data 里面定义了名为 message 的属性，并赋值 lane。当运行代码的时候可以看到 input 和 p 标签都会展示 data 里面 message 属性的值 —— lane，此时向 input 输入值，发现下面 p 标签展示的内容也同时变化了，并且内容和此时 input 的值一致。v-model 的这种表现就是我们常说的双向数据绑定，具体的原理可以查看 [v-model 实现原理](https://www.yuque.com/littlelane/vue/iqevua)。

接下来，我们将通过这个简单的例子一步一步揭开 v-model 源码级实现的面纱。

<a name="1bf99bd0"></a>
### 脉络
从实例可以看到：我们通过 new Vue 实例化了一个对象。实例化操作接受一个对象，对象里面包括 el 标识容器的节点、template HTML 模板字符串、data 定义 Vue 实例属性（注意这里的属性数据一般会实现响应式）。可想而知，在实例化的过程中肯定执行了很多初始化的过程。

在 Vue 实例化的时候会调用 _init 方法，对配置进行合并、初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等，然后就会执行实例挂载 —— $mount 操作。这里 $mount 方法会针对不同的平台作出不同的定义。接下来，源代码会进入 compile 编译，在这个过程会经历 parse、optimize 与 generate 三个阶段。v-model 指令就是在 parse 阶段进行解析的。

<a name="genDirectives"></a>
### genDirectives
parse 会接受模板 template 和平台配置 opitons 两个参数。在 parse 阶段，v-model 指令会被解析到 AST 中对应的 el.directives 中（注意在 template 解析的过程中会夹杂着 optimize 优化执行）。

![WX20190311-233250@2x.png](https://cdn.nlark.com/yuque/0/2019/png/114852/1552318489843-9fac12f6-fa66-41b4-af7d-312235275425.png#align=left&display=inline&height=382&name=WX20190311-233250%402x.png&originHeight=798&originWidth=868&size=133269&status=done&width=415)<br />
<br />接着，由 template 解析好的 AST 和平台配置进入到了 generate 阶段。generate 会将 AST 转化成 render funtion 字符串，最终得到 render 的字符串以及 staticRenderFns 字符串。

在 generate 阶段会经历 codegen，这是就会执行 genData 方法进行 render funtion 字符串的转换，这时就会势必执行 directives 的解析，也就是 genDirectives(el, state) 方法。

genDirectives(el, state) 方法具体的代码定义在 src/compiler/codegen/index.js 文件中。

```javascript
function genDirectives (el: ASTElement, state: CodegenState): string | void {
  const dirs = el.directives
  // 如果没有指令就直接返回
  if (!dirs) return
  let res = 'directives:['
  let hasRuntime = false
  let i, l, dir, needRuntime
  
  // 对所有的指令进行遍历
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i]
    needRuntime = true
    // 获取对应指令的解析函数，比如我们这里的 model 就对应 state.directives 里面的 model 解析函数
    const gen: DirectiveFunction = state.directives[dir.name]
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      // 如果有指令对应的解析函数，就进行解析处理
      // 根据解析函数返回的结果，判断是否还需要在运行时进行操作处理
      needRuntime = !!gen(el, dir, state.warn)
    }
    
    // 如果需要在运行时操作处理，就进行参数模板的拼接，作为后续的属性绑定
    if (needRuntime) {
      hasRuntime = true
      res += `{name:"${dir.name}",rawName:"${dir.rawName}"${
        dir.value ? `,value:(${dir.value}),expression:${JSON.stringify(dir.value)}` : ''
      }${
        dir.arg ? `,arg:"${dir.arg}"` : ''
      }${
        dir.modifiers ? `,modifiers:${JSON.stringify(dir.modifiers)}` : ''
      }},`
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}
```

让我们看一下 genDirectives 接受的 state 值：

![WX20190311-235545@2x.png](https://cdn.nlark.com/yuque/0/2019/png/114852/1552319853919-27aeb063-0220-4370-be0b-bceaf6ab5fe4.png#align=left&display=inline&height=277&name=WX20190311-235545%402x.png&originHeight=564&originWidth=726&size=103359&status=done&width=356)<br />
<br />
<br />可以看到 Vue 内置了 bind、cloak、html、model、on、text 指令的解析函数。

<a name="dad7c3ec"></a>
### 解析处理函数 model
当解析到 input 标签上的 v-model 指令时，state.directives[dir.name] 就会去找 Vue 内置的指令解析函数，这个主入口文件是 src/platforms/web/compiler/directives/index.js ：

```javascript
export default {
  model,
  text,
  html
}
```

这些解析函数是在 Vue 实例化的时候就合并了，随后在 compile 阶段的各个函数进行传递。当解析到对应的 model 解析函数后，就会通过 gen(el, dir, state.warn) 进行执行。函数的执行就会来到 src/platforms/web/compiler/directives/model.js 文件：

```javascript
// el 为当前解析节点的 AST 结构
// dir 是当前指令的对象结构
// _warn 警告提示信息函数方法
export default function model (
  el: ASTElement,
  dir: ASTDirective,
  _warn: Function
): ?boolean{
  const value = dir.value
  const modifiers = dir.modifiers
  const tag = el.tag
  const type = el.attrsMap.type
  if (process.env.NODE_ENV !== 'production') {
    // 这里对 input type='file' 的标签做了警告提示
    // 就是说这种类型的 input 标签不支持 v-model ,只能通过 change 监听
    if (tag === 'input' && type === 'file') {
      warn(
        `<${el.tag} v-model="${value}" type="file">:\n` +
          `File inputs are read only. Use a v-on:change listener instead.`
      )
    }
  }

	// 节点是自定义组件
  if (el.component) {
    genComponentModel(el, value, modifiers)
    return false
  } else if (tag === 'select') {
    // select 标签
    genSelect(el, value, modifiers)
  } else if (tag === 'input' && type === 'checkbox') {
    // input type=checkbox 标签
    genCheckboxModel(el, value, modifiers)
  } else if (tag === 'input' && type === 'radio') {
    // input type=radio 标签
    genRadioModel(el, value, modifiers)
  } else if (tag === 'input' || tag === 'textarea') {
    // input 为文本输入标签，即 type 为 text 或者 textarea
    genDefaultModel(el, value, modifiers)
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers)
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn()
  }
  return true
}
```

代码逻辑其实非常简单，首先对 input file 标签做了警告提示，因为这个标签是只读标签，只能通过 change 监听，然后通过标签的名称和类型做了判断，让不同类型的标签进入不同的逻辑处理函数。这里由于我们示例代码写的是 input type='text' 标签，所以会进入 genDefaultModel(el, value, modifiers) 处理函数。

<a name="dbf6cc20"></a>
### 事件、属性绑定与修饰符处理
到了这一步，v-model 指令的解析就真正进入了高潮。前面的大部分逻辑主要是根据 DOM AST 结构解析出各个指令，然后针对不同的指令调用合适的处理函数。这不就到了 v-model 实际的处理函数了，代码依然在 src/platforms/web/compiler/directives/model.js 文件中：

```javascript
// 处理 v-model 指令
// el 为当前解析节点的 AST 结构
// value 为 v-model 指令绑定值，这里就是 message 
// modifiers 是指令包含的修饰符
function genDefaultModel (
  el: ASTElement,
  value: string,
  modifiers: ?ASTModifiers
): ?boolean {
  const type = el.attrsMap.type

  // warn if v-bind:value conflicts with v-model
  if (process.env.NODE_ENV !== 'production') {
    // 这里对同一个标签上绑定了 v-model 和 v-bind 指令给出绑定冲突警告提示
    const value = el.attrsMap['v-bind:value'] || el.attrsMap[':value']
    if (value) {
      const binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value'
      warn(
        `${binding}="${value}" conflicts with v-model on the same element ` +
        'because the latter already expands to a value binding internally'
      )
    }
  }

  // 获取指令的修饰符是否存在，这里 v-model 只支持 lazy/number/trim 三种修饰符
  const { lazy, number, trim } = modifiers || {}
  const needCompositionGuard = !lazy && type !== 'range'
  // event是设置事件类型，如果是lazy则定义change类型，如果不是lazy再判断type是不是range，如果不是，则定义input事件类型
  const event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input'

  let valueExpression = '$event.target.value'
  if (trim) {
    // 如果使用 trim 修饰符，valueExpression 字符串拼接 .trim()
    valueExpression = `$event.target.value.trim()`
  }
  if (number) {
    // 如果使用 number 修饰符，就对 valueExpression 字符串进行数字转换
    valueExpression = `_n(${valueExpression})`
  }

  // 根据指令的 AST 结构拼接 code 代码结构
  let code = genAssignmentCode(value, valueExpression)
  if (needCompositionGuard) {
    code = `if($event.target.composing)return;${code}`
  }

  // 绑定 value 属性
  addProp(el, 'value', `(${value})`)
  // 绑定事件处理
  addHandler(el, event, code, null, true)
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()')
  }
}
```

这里面有三个重要的方法调用，一个是 genAssignmentCode(value, valueExpression) 根据指令的 AST 结构拼接 code 代码结构，二是 addProp(el, 'value', `(${value})`) 给标签绑定 value 属性，最后一个是 addHandler(el, event, code, null, true) 给标签绑定事件。

<a name="genAssignmentCode"></a>
#### genAssignmentCode
genAssignmentCode 具体代码在 src/compiler/directives/model.js 文件：

```javascript
// value 为 v-model 指令绑定值，这里就是 message 
// assignment 是 value 对应的表达式 是一个字符串
export function genAssignmentCode (
  value: string,
  assignment: string
): string {
  const res = parseModel(value)
  if (res.key === null) {
    // 这里就相当于 message= $event.target.value
    return `${value}=${assignment}`
  } else {
    return `$set(${res.exp}, ${res.key}, ${assignment})`
  }
}
```

这里就是根据很多不同的情况作了处理，然后得到了 v-model 绑定值对应的计算表达式，并返回其结构字符串 message= $event.target.value。在 parseModel 函数中处理了 v-model="obj.a" 这种形式。如果我们绑定的是这种形式，就会根据 . 号进行拆分返回，最后函数返回的就是 $set(obj, 'a', $event.target.value) 的形式。parseModel 里面的具体代码，大家可以自由去查看。

<a name="569fda11"></a>
#### addProp 和 addHandler
这两个函数就是 v-model 的精髓代码了，代码文件是 src/compiler/helpers.js：

```javascript
// addProp
export function addProp (el: ASTElement, name: string, value: string) {
  (el.props || (el.props = [])).push({ name, value })
  el.plain = false
}

// addHandler
export function addHandler (
  el: ASTElement,
  name: string,
  value: string,
  modifiers: ?ASTModifiers,
  important?: boolean,
  warn?: Function
) {
  modifiers = modifiers || emptyObject
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    )
  }

  // 这里会处理 capture/once/passive 等等修饰符
  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture
    name = '!' + name // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once
    name = '~' + name // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive
    name = '&' + name // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu'
      delete modifiers.right
    } else if (modifiers.middle) {
      name = 'mouseup'
    }
  }

  // 处理 native 修饰符
  let events
  if (modifiers.native) {
    delete modifiers.native
    events = el.nativeEvents || (el.nativeEvents = {})
  } else {
    events = el.events || (el.events = {})
  }

  const newHandler: any = { value }
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers
  }

  // 给 el 添加事件处理，相当于在 input 上绑定了 input 事件
  const handlers = events[name]
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler)
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler]
  } else {
    events[name] = newHandler
  }

  el.plain = false
}
```

addProp 函数很简单的几句代码，就是往当前标签 AST 结构对象的 props 属性 push 一个 name 是 v-model 属性值，value 是前面解析到的对应的表达式的对象，形象一点，也就是 {name: 'message', value: $event.target.value}。

addHandle 函数相对复杂一点，因为需要处理很多的事件修饰符。处理完事件修饰符后，然后将事件添加到当前标签 AST 结构对象的 events 属性，相当于在 input 上绑定了 input 事件。

最后再回到 genDirectives，继续执行函数的逻辑：

```javascript
if (needRuntime) {
  hasRuntime = true
  res += `{name:"${dir.name}",rawName:"${dir.rawName}"${
    dir.value ? `,value:(${dir.value}),expression:${JSON.stringify(dir.value)}` : ''
  }${
    dir.arg ? `,arg:"${dir.arg}"` : ''
  }${
    dir.modifiers ? `,modifiers:${JSON.stringify(dir.modifiers)}` : ''
  }},`
}
```

根据解析到的指令生成 AST 结构的字符串形式:

```json
"{directives:[{name:"model",rawName:"v-model",value:(message),expression:"message"}],attrs:{"type":"text"},domProps:{"value":(message)},on:{"input":function($event){if($event.target.composing)return;message=$event.target.value}}}"
```

生成的 AST 结构字符串转换成模板后原来的 <input type="text" v-model="message" /> 就变成了 <input type="text" v-bind:value="message" v-on:input="message=$event.target.value" />。

动态绑定了 input 的 value 指向了 messgae 变量，并且在触发 input 事件的时候去动态把 message 设置为目标值，这样实际上就完成了数据双向绑定了，所以说 v-model 实际上就是语法糖。

<a name="0fd702b6"></a>
### 组件 v-model 解析
```javascript
const Child = {
  template: `
    <div>
      <input :value="value" @input="updateValue" placeholder="edit me">
    </div>
  `,
  props: ['value'],
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    }
  }
}

new Vue({
  el: '#app',
  template: `
    <div>
      <child v-model="message"></child>
      <p>message: {{message}}</p>
    </div>
  `,
  data: {
    message: 'lane'
  },
  components: {
  	Child
  }
});
```

在上面的内容中，我们详细的分析了原生的 DOM 标签上使用 v-model 时源码的解析，对于自定义组件 v-model 的使用源码解析的步骤和上面的分析步骤是一致的，只不过在[解析处理函数 model 的逻辑](https://www.yuque.com/littlelane/vue/ct3qng#dad7c3ec)里面转向了 if(!config.isReservedTag(tag)) 判断逻辑的 genComponentModel(el, value, modifiers)。该方法的逻辑代码在 src/compiler/directives/model.js 文件：

```javascript
export function genComponentModel (
  el: ASTElement,
  value: string,
  modifiers: ?ASTModifiers
): ?boolean {
  // 解析出 v-model 的修饰符
  const { number, trim } = modifiers || {}

  // 给baseValueExpression赋值一个默认的字符串
  const baseValueExpression = '$$v'
  let valueExpression = baseValueExpression
  if (trim) {
    // 如果 trim 修饰符存在，就判断类型是否为字符串，如果是使用去空格方法，如果不是返回原值
    valueExpression =
      `(typeof ${baseValueExpression} === 'string'` +
        `? ${baseValueExpression}.trim()` +
        `: ${baseValueExpression})`
  }
  if (number) {
    // 如果 number 修饰符存在，就对结果取数字
    valueExpression = `_n(${valueExpression})`
  }
  const assignment = genAssignmentCode(value, valueExpression)

  el.model = {
    value: `(${value})`,
    expression: `"${value}"`,
    callback: `function (${baseValueExpression}) {${assignment}}`
  }
}
```

genComponentModel 函数的代码逻辑很简单，执行函数最终会生成如下结果：

```javascript
el.model = {
  value:'(message)',
  expression:'"message"',
  callback:'function ($$v) {message=$$v}',
}
```

执行完 genComponentModel 函数后，随后就会回到 genDirectives 函数逻辑，再到 genData 逻辑执行 AST 字符串模板的组装：

```javascript
if (el.model) {
  data += `model:{value:${
    el.model.value
  },callback:${
    el.model.callback
  },expression:${
    el.model.expression
  }},`
}
```

最终生成的 render 代码就是：

```javascript
with(this){
  return _c('div',[_c('child',{
    model:{
      value:(message),
      callback:function ($$v) {
        message=$$v
      },
      expression:"message"
    }
  }),
  _v(" "),
  _c('p',[_v("Message is: "+_s(message))])],1)
}
```

然后在创建子组件 vnode 阶段，会执行 createComponent 函数，它的定义在 src/core/vdom/create-component.js 中：

```javascript
export function createComponent (
 Ctor: Class<Component> | Function | Object | void,
 data: ?VNodeData,
 context: Component,
 children: ?Array<VNode>,
 tag?: string
): VNode | Array<VNode> | void {
 // ...
 // transform component v-model data into props & events
 // 对 data.model 会执行 transformModel
 if (isDef(data.model)) {
   transformModel(Ctor.options, data)
 }

 // extract props
 const propsData = extractPropsFromVNodeData(data, Ctor, tag)
 // ...
 // extract listeners, since these needs to be treated as
 // child component listeners instead of DOM listeners
 const listeners = data.on
 // ...
 const vnode = new VNode(
   `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
   data, undefined, undefined, undefined, context,
   { Ctor, propsData, listeners, tag, children },
   asyncFactory
 )
 
 return vnode
}
```

对 data.model 的情况做处理，执行 transformModel(Ctor.options, data) 方法，transformModel 的代码在 src/core/vdom/create-component.js 文件：

```javascript
function transformModel (options, data: any) {
  const prop = (options.model && options.model.prop) || 'value'
  const event = (options.model && options.model.event) || 'input'
  ;(data.props || (data.props = {}))[prop] = data.model.value
  const on = data.on || (data.on = {})
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event])
  } else {
    on[event] = data.model.callback
  }
}
```

transformModel 逻辑会给 data.props 添加 data.model.value，并给 data.on 添加 data.model.callback。另外这里的逻辑处理了一个可配置化的特性，就是在子组件中我们可以在 model 属性中配置 prop 来指定绑定的属性和配置 event 绑定派发的事件名称，形成一对匹配的关系，组成 v-model 双向数据绑定的关系，如同下面形式的示例：

```javascript
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```


对我们的例子而言，通过 transformModel 扩展的结果如下：

```javascript
data.props = {
  value: (message),
}
data.on = {
  input: function ($$v) {
    message=$$v
  }
} 
```

由此分析，上面给出的示例代码就可以转换成下面的形式：

```javascript
new Vue({
  el: '#app',
  template: `
    <div>
      <child :value="message" @input="message=arguments[0]"></child>
      <p>message: {{message}}</p>
    </div>
  `,
  data: {
    message: 'lane'
  },
  components: {
  	Child
  }
});
```

子组件传递的 value 绑定到当前父组件的 message，同时监听自定义 input 事件，当子组件派发 input 事件的时候，父组件会在事件回调函数中修改 message 的值，同时 value 也会发生变化，子组件的 input 值被更新。

<a name="25f9c7fa"></a>
## 总结
说到这里 v-model 实现的源码就解析完后了。v-model 通过语法糖的形式实现了数据的双向绑定，而其内部的逻辑也是可圈可点的。 v-model 即可以支持原生表单元素，也可以支持自定义组件。在组件的实现中，我们是可以配置子组件接收的 prop 名称，以及派发的事件名称。同时 v-model 也是父子组件通讯模式的一种：父组件通过 prop 把数据传递到子组件，子组件修改了数据后把改变通过 $emit 事件的方式通知父组件。
