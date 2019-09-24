(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{189:function(t,a,s){"use strict";s.r(a);var n=s(0),r=Object(n.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[t._m(0),t._v(" "),s("p",[t._v("一直以来都想好好的理一理 Array 相关的 API 方法，因为关于它的知识点太多了，而且在平时的开发过程中也用得非常频繁，于是打算连载几篇博客将 Array 相关的知识都梳理一遍，一方面是巩固基础，另一方面补充自己知识的空缺。")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),s("p",[t._v("在 JavaScript 中，Array 作为一个全局对象的形式存在着，主要用于构建数组。数组是用于存放一系列元素的集合，其在内存中的存储形式为一段连续的内存地址，而数组的名称其实就是这段连续内存地址的首地址了。")]),t._v(" "),s("p",[t._v("JavaScript 中的数组在定义的时候无需指定元素的类型，也可以不指定数组的长度，甚至可以包含任意数据类型的元素，也就是说 JavaScript 中的各数据类型的数据都可以混合存在于一个数组里面。这些特点和其他一些语言还是存在很大的区别的，比如 Java 里面数组定义的时候必须指定数组中每个元素的类型，而且数组中的每个元素必须保证相同的数据类型，也就是说定义的时候指定的是 int 类型，那么数组里面的每个元素都必须是 int 类型的数据。还有 Java 在定义数组时必须要指定其长度。这样对比下来，可见 JavaScript 中的数组是非常灵活的了。")]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),s("p",[t._v("上面说了很多概念性的东西，我都写累了，更不用说大家看了。下面我们就来说说数组创建的几种方式吧！")]),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),s("p",[t._v("这种定义数组的方式，我个人用得比较做，因为它很直接，也很简单、方便、快速。一上来就可以声明一个变量，变量的值就是用 [] 符号包裹的以逗号隔开的可包含多种数据类型值的序列集合，形如上面的示例代码。")]),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),s("p",[t._v("还记得我们上面说到的概念吗：Array 是一个专门用于创建数组的全局对象，下面我们就好好的利用这个全局对象为我们做点事情。")]),t._v(" "),t._m(11),s("p",[t._v("new 操作符的作用大家想必都知道（如果你还不知道 new 操作符的作用，你可以"),s("a",{attrs:{href:"https://www.yuque.com/littlelane/javascript/nqloa2",target:"_blank",rel:"noopener noreferrer"}},[t._v("点击这里查看"),s("OutboundLink")],1),t._v("），它会将函数通过构造函数的形式进行调用并进行实例化。这里我们会通过 new 操作符以构造函数的形式调用 Array 创建数组。第一行代码我们在调用 Array() 时没有传入任何参数，这时会创建一个空数组；第二行代码传递了 Number 类型的数字 2，这时会创建一个长度为 2 的数组，数组里面的元素都是 undefined；第三行代码创建数组时传递了多个元素，最终创建的数组就是这些元素最终组成的数组了；最后一种方式会先创建一个空数组，然后利用下标初始化对应下标的值，创建了 ['JavaScript', 1, { book: 'Vue.js' }] 的形式的数组。")]),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),s("p",[t._v("上面介绍了通过多种方式创建一维数组，但是对于数组的存在形式还有多维数组，多维数组中我们接触比较多的就是二维数组了，这里我们就只说说关于二维数组。")]),t._v(" "),s("p",[t._v("为了更好的明白二维数组的存储形式，我们现在看看一维数组的图示吧")]),t._v(" "),t._m(14),t._v(" "),s("p",[t._v("数组的存储形式以一段连续的内存，所以一维数组的存储形式可以表示为以上图例，其中标注的 array 表示数组的名称，0、1、2 表示数组中各元素的下标。")]),t._v(" "),t._m(15),t._v(" "),s("p",[t._v("如果上面一维数组图例可以看成是一维坐标系的话，那二维数组就很自然的可以类比为二维坐标系了。在图示中，我们展示了一个名为 days 的二维数组。数组以先横排后竖排的形式进行展示，相当于二维坐标系中的 X 轴和 Y 轴。")]),t._v(" "),s("p",[t._v("二维数组的形式大家都清楚了，那我们就来动手创建一个二维数组吧。")]),t._v(" "),t._m(16),s("p",[t._v("上面展示了两种创建二维数组的方式，明显可以看出直接量的形式简单许多，而下面逐层赋值的方式略显复杂。当然在日常的开发中，我们一般会使用多重循环的方式进行多维数组的创建，例如：")]),t._v(" "),t._m(17),t._m(18),t._v(" "),t._m(19),t._v(" "),s("p",[t._v("length 是 Array 的实例属性。可以通过获取这个属性值得到数组中的元素个数或者通过设置该属性值设置数组中元素的个数。该值是一个无符号 32-bit 的整数，并且总是大于数组最高项的下标。由于 length 值为无符号 32-bit 整数，所以其可表示的范围为 0 到 2^32-1，所以数组的最大长度为 2^32-1，即 4,294,967,295。")]),t._v(" "),t._m(20),s("p",[t._v("数组的 length 属性还有一个非常重要的作用是在利用 for 表达式遍历数组时设置循环的终止条件")]),t._v(" "),t._m(21),s("p",[t._v("数组的 length 属性还有一个显著的特点，就是我们通过整数下标为数组设值时，该属性的值会自动变化")]),t._v(" "),t._m(22),t._m(23),t._v(" "),t._m(24),t._v(" "),s("p",[t._v("数组基本上可以支持所有数据类型的下标")]),t._v(" "),t._m(25),s("p",[t._v("我的尝试到此为止，大家可以继续试验，如果发现有不支持的可以在下面评论艾特我。")]),t._v(" "),s("p",[t._v("虽然数组下标支持很多，但是个人推荐只使用整数形式，原因有以下几点：")]),t._v(" "),t._m(26),t._v(" "),s("p",[t._v("上面有提到，针对全是整数类型的下标数组的遍历，我们可以使用 for 表达式进行，而如果数组使用了除整数以外的数据类型下标，可以使用 for in 进行数组遍历")]),t._v(" "),t._m(27),t._m(28),t._v(" "),t._m(29),t._v(" "),s("p",[t._v("说到这里，关于数组的基础知识就说完了，主要说了数组的概念，数组的两种定义方式，并由此引申出了多维数组，然后说了数组的 length 属性和数组的下标，算是对数组有了一个基本的认识。关于下一篇，我们将会讲解数组相关的方法，敬请期待！")])])},[function(){var t=this.$createElement,a=this._self._c||t;return a("h1",{attrs:{id:"重学-array-之基础概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#重学-array-之基础概念","aria-hidden":"true"}},[this._v("#")]),this._v(" 重学 Array 之基础概念")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"PDWLJ"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"基础概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基础概念","aria-hidden":"true"}},[this._v("#")]),this._v(" 基础概念")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"QySj8"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"定义数组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#定义数组","aria-hidden":"true"}},[this._v("#")]),this._v(" 定义数组")])},function(){var t=this.$createElement,a=this._self._c||t;return a("blockquote",[a("p",[this._v("Let's show code!")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"kPGpl"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h3",{attrs:{id:"直接量创建"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#直接量创建","aria-hidden":"true"}},[this._v("#")]),this._v(" 直接量创建")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建一个空数组")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" empty "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建一个包含多种数据类型值的数组")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" array "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'JavaScript'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" book"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Vue.js'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'React.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'CSS'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"oIC4p"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h3",{attrs:{id:"构造函数创建"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#构造函数创建","aria-hidden":"true"}},[this._v("#")]),this._v(" 构造函数创建")])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[this._v("// 创建一个空数组\nvar empty = new Array()\n\n// 创建一个指定长度的数组\nvar array1 = new Array(2)\n\n// 创建一个包含多种数据类型值的数组\nvar array2 = new Array('JavaScript', 1, { book: 'Vue.js' }, true, ['css'])\n\n// 先创建一个空数组，然后给数组元素赋值\nvar array3 = new Array()\narray3[0] = 'JavaScript'\narray3[1] = 1\narray3[2] = { book: 'Vue.js' }\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"d7gg1"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h3",{attrs:{id:"多维数组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#多维数组","aria-hidden":"true"}},[this._v("#")]),this._v(" 多维数组")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("img",{attrs:{src:"https://cdn.nlark.com/yuque/0/2019/png/114852/1557155662310-b500dd41-cf17-4723-8cae-f043a502691c.png#align=left&display=inline&height=198&name=WX20190506-231329%402x.png&originHeight=198&originWidth=1204&size=14657&status=done&width=1204",alt:"WX20190506-231329@2x.png"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("img",{attrs:{src:"https://cdn.nlark.com/yuque/0/2019/png/114852/1557155506102-c1fae411-2f87-48c7-82b0-33fa5838afc2.png#align=left&display=inline&height=416&name=WX20190506-231054%402x.png&originHeight=416&originWidth=1216&size=345649&status=done&width=1216",alt:"WX20190506-231054@2x.png"}})])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 直接量形式")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" arrays "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'b'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'c'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//必须逐层进行赋值")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" arrays "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\narrays"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\narrays"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\narrays"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),t._v("\narrays"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\narrays"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("\narrays"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'b'")]),t._v("\n")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" arrays "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" childArr "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    childArr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" j\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  arrays"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" childArr\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"miJ9Q"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"数组长度-length"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数组长度-length","aria-hidden":"true"}},[this._v("#")]),this._v(" 数组长度 length")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建一个数组")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" array "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'JavaScript'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" book"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Vue.js'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'css'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取数组的长度")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" arrLen "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 5")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置数组的 length 属性值")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 再次获取数组的长度")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" newArrLen "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 3")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 打印下标为 3、4 的元素")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// undefined")]),t._v("\n")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建一个数组")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" array "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'JavaScript'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" book"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Vue.js'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'css'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 遍历打印数组的每个元素")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" len "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" len"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建一个空数组")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" array "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取数组 length")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 0")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 通过整数下标为数组设值")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 有点酷耶！")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"O1rDW"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"数组下标"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数组下标","aria-hidden":"true"}},[this._v("#")]),this._v(" 数组下标")])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建一个空数组")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" array "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 整数 毋庸置疑！")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\t\t\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 0")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 字符串 试试")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello'")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// hello")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 对象\tunbelievable")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// {a: 1}")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 函数\tunbelievable")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'unbelievable'")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// unbelievable")]),t._v("\narray"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[a("p",[this._v("仔细观察上面试验代码片段，你是不是已经发现了只有根据整数形式的下边进行赋值时，数组的 length 属性才会自动变化")])]),this._v(" "),a("li",[a("p",[this._v("如果你想通过除整数形式以外的下标进行赋值，JavaScript 为你提供了另外一种专门处理这中类型的数据类型 —— Object")])]),this._v(" "),a("li",[a("p",[this._v("如果你通过函数、对象等复杂类型下标进行赋值，你要清楚语言内部的处理原理 —— 会将复杂类型转为基础类型，然后进行对应的赋值、查找操作，不然你会觉得上面示例代码中的最后两个例子片段会特别诡异")])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 针对上面示例代码所得数组遍历")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" index "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//\t0 0")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//\thello hello")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [object Object] {a: 1}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// () => {} unbelievable")]),t._v("\n")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("a",{attrs:{name:"HmPMU"}})])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结","aria-hidden":"true"}},[this._v("#")]),this._v(" 总结")])}],!1,null,null,null);a.default=r.exports}}]);