(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{204:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),s("p",[t._v("关于 ['1', '2', '3'].map(parseInt) 这道题，可能会在很多面试场景会被文档。当然回答错误的几率还是很高的，不然我们也不会单独拿出来说道说道。")]),t._v(" "),s("p",[t._v("说到这里，大家可以停下来思考一下，对，只是思考，不可以动手实践哟！考查一下自己是否可以给出个所以然。")]),t._v(" "),s("p",[t._v("这里我就不公布答案了，下面就直接看问题分析吧（我会假设你已经好好的思考过了）！")]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),s("p",[t._v("['1', '2', '3'].map(parseInt)，别看这个问题很短，但是它主要考查了两个方法的用法：")]),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),t._m(9),t._m(10),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),s("p",[t._v("一个新数组，每个元素都是经过回调函数处理后的结果。")]),t._v(" "),t._m(13),t._v(" "),t._m(14),t._m(15),t._v(" "),t._m(16),t._v(" "),t._m(17),t._v(" "),t._m(18),t._v(" "),t._m(19),t._m(20),t._v(" "),t._m(21),t._v(" "),t._m(22),t._v(" "),t._m(23),t._v(" "),t._m(24),t._v(" "),t._m(25),t._v(" "),t._m(26),s("p",[t._v("到这里，这道题涉及的两个最最主要的知识点我们都讲解完了，那就回到题目本身吧！")]),t._v(" "),s("p",[t._v("本题执行的方式其实可以作如下的转换：")]),t._v(" "),t._m(27),s("p",[t._v("由此，题目的执行解析步骤如下：")]),t._v(" "),t._m(28),t._v(" "),t._m(29),t._v(" "),t._m(30),t._v(" "),s("p",[t._v("既然问题已经出了，而且我们也分析的明明白白。那到最后有什么办法可以规避和解决这种问题呢？")]),t._v(" "),t._m(31),s("p",[t._v("通过包装一层回调函数指明所要传递的参数，限制住 parseInt 第二个基准参数，这样就没有问题了，代码阅读性也会大大提高。")]),t._v(" "),t._m(32),s("p",[t._v("或者直接通过 Number() 做类型转换，将字符串转成数字。")]),t._v(" "),t._m(33),t._v(" "),t._m(34),t._v(" "),s("p",[t._v("到此，这个问题的结果、成因、解决方案，我们都聊得明明白白了，你有没有感到瞬间豁然开朗呢？还是那句话，虽然题目很简单，但是考查的知识点还是有的，大家可千万注意里面的坑！")]),t._v(" "),t._m(35),t._v(" "),t._m(36),t._v(" "),s("p",[t._v("1、"),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map",target:"_blank",rel:"noopener noreferrer"}},[t._v("Array.prototype.map()"),s("OutboundLink")],1),s("br"),t._v("2、"),s("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt",target:"_blank",rel:"noopener noreferrer"}},[t._v("parseInt()"),s("OutboundLink")],1)])])},[function(){var t=this.$createElement,a=this._self._c||t;return a("h1",{attrs:{id:"_1-2-3-map-parseint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-3-map-parseint","aria-hidden":"true"}},[this._v("#")]),this._v(" ['1', '2', '3'].map(parseInt)")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"254dd6d2"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"问题描述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题描述","aria-hidden":"true"}},[this._v("#")]),this._v(" 问题描述")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"094c47ac"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"问题分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题分析","aria-hidden":"true"}},[this._v("#")]),this._v(" 问题分析")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"Array.prototype.map"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h3",{attrs:{id:"array-prototype-map"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#array-prototype-map","aria-hidden":"true"}},[this._v("#")]),this._v(" Array.prototype.map")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("strong",[this._v("Array.prototype.map()")]),this._v(" 方法用于创建一个新数组，其结果是原数组中的每个元素都调用一个提供的函数后返回的结果。")])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("基本语法")])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" newArray "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" oldArray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("callback")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("currentValue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Return element for new_array ")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("thisArg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("参数详解")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("callback：生成新数组每个元素的处理函数，可接受三个参数："),a("br"),this._v("currentValue：数组中正在被 callback 处理的当前元素。"),a("br"),this._v("index：可选，数组中正在被 callback 处理的当前元素的索引。"),a("br"),this._v("array：可选，map 方法被调用的数组。"),a("br"),this._v("thisArg：可选，执行 callback 函数时使用绑定 this 的值。")])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("返回值")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("基本用法")])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 返回一个新的数组，新数组中每个元素都是原数组中对应元素的 2 倍")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("9")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("16")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("x")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" x "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 返回 [2, 8, 18, 32]")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"parseInt"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h3",{attrs:{id:"parseint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#parseint","aria-hidden":"true"}},[this._v("#")]),this._v(" parseInt")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("**parseInt() **函数解析一个字符串参数，并返回一个指定基数进制的整数。"),a("br"),a("br")])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("基本语法")])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseInt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("string"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" radix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("参数详解")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("string：要被解析的值。如果参数不是一个字符串，则使用 toString() 方法将其转换为字符串。字符串开头的空白符将会被忽略。"),a("br"),this._v("radix：一个介于 2 和 36 之间的整数，表示上述字符串的"),a("strong",[this._v("基数")]),this._v('。比如参数 "10" 表示使用十进制数值系统。')])},function(){var t=this.$createElement,a=this._self._c||t;return a("blockquote",[a("p",[a("strong",[this._v("⚠️ 注意：始终指定 Radix 参数")]),this._v("10**。")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("返回值")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[this._v("返回解析后的整数值。 如果被解析参数的第一个字符无法被转化成数值类型或者第二个参数 radix 的值不在有效值范围内则返回 NaN。"),a("br"),a("br")])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("基本用法")])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseInt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'123'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将 '123' 看作 5 进制数，返回十进制数 38 => 1*5^2 + 2*5^1 + 3*5^0 = 38")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseInt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a123'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将返回 NaN，因为该字符串以字母开头，无法转换成数字")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseInt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'123a'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 将会返回十进制数 123，因为该字符串以数字开头，然后截取前面连续的数字串，由于第二个参数没有传，所以默认返回 10 进制数值")]),t._v("\n")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("parseInt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseInt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("currentValue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[this._v("1、第一次执行实际上调用的是 parseInt('1', 0)，由于 parseInt 的第二个参数是 0，所以会默认为十进制，即是将字符串形式的 1 转换成十进制数，于是返回整数 1；")]),this._v(" "),a("li",[this._v("2、第二次执行实际上调用的是 parseInt('2', 1)，根据上面 parseInt 方法接受参数的解析，其第二个参数的有效值为介于 2 和 36 之间的整数（如果是 0 则默认十进制），其余的都会返回 NaN，所以这次执行返回 NaN；")]),this._v(" "),a("li",[this._v("3、第二次执行实际上调用的是 parseInt('3', 2)，然而对于二进制的数只能包含 0 和 1，显然这个以 3 开头的字符串对于基数 2 来说并不是一个有效的数值，所以这个字符串将被解析为空，函数返回为NaN。")]),this._v(" "),a("li",[this._v("4、所以这里的最终结果就应该是 [1, NaN, NaN]。")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"520f9e6c"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"问题解决"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题解决","aria-hidden":"true"}},[this._v("#")]),this._v(" 问题解决")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("value")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseInt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'1'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Number"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"25f9c7fa"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结","aria-hidden":"true"}},[this._v("#")]),this._v(" 总结")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"35808e79"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"参考资料"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考资料","aria-hidden":"true"}},[this._v("#")]),this._v(" 参考资料")])}],!1,null,null,null);a.default=e.exports}}]);