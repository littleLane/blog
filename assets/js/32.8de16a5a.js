(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{179:function(a,t,s){"use strict";s.r(t);var r=s(0),e=Object(r.a)({},function(){var a=this.$createElement;this._self._c;return this._m(0)},[function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"js-异步加载之-async-和-defer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#js-异步加载之-async-和-defer","aria-hidden":"true"}},[a._v("#")]),a._v(" js 异步加载之 async 和 defer")]),a._v(" "),s("p",[s("a",{attrs:{name:"a4c19434"}})]),a._v(" "),s("h1",{attrs:{id:"web-三把剑"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#web-三把剑","aria-hidden":"true"}},[a._v("#")]),a._v(" web 三把剑")]),a._v(" "),s("p",[a._v("在 web 前端开发领域有三把剑：HTML、CSS 和 JavaScript，其中的 HTML 表示的是超文本标记语言，用于描述页面的 DOM 结构，是页面显示的基础架子，就好似新买的毛坯房；而 CSS 就是装修，甚至可能是精装修，用来对 HTML 描述的页面架子结构进行修饰，形成各种各样的布局；JavaScript 可以对这个精装修进行进一步的功能化，让原本平淡无奇的精装修变得有灵魂、可交互，比如智能化家具等。说了这么一通，也就是 JavaScript 和 CSS 文件的加载都是以 HTML 为载体的。")]),a._v(" "),s("p",[s("a",{attrs:{name:"fa7113b6"}})]),a._v(" "),s("h2",{attrs:{id:"浏览器解析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览器解析","aria-hidden":"true"}},[a._v("#")]),a._v(" 浏览器解析")]),a._v(" "),s("p",[a._v("再说到浏览器吧！对于网站的加载，浏览器首先是拿到 HTML 文件的。在 HTML 文件中会包含利用 style 标签和 script 标签加载的内联样式和 JavaScript 脚本文件，异或者是通过 link 标签和 script 标签加载的外部的样式文件和 JavaScript 文件。也就是说只有在浏览器解析到了对应的标签后，才会去加载对应的脚本文件，有点类似按需加载。")]),a._v(" "),s("p",[a._v("众所周知，浏览器解析 HTML 文档是按由顶直下的顺序进行的，首先是 html 标签，然后是 head 标签，接着是 body 标签。在这个解析的过程中，一旦遇到了 script 标签，浏览器肯定知道是有 JavaScript 文件或者代码段要加入解析流程了，但是具体的 JavaScript 要执行什么逻辑就不得而知了，所以这是只得停止其他所有文件的解析，直到这个 script 标签包含的 JavaScript 加载解析执行完成后，才能恢复其他文件的解析流程。")]),a._v(" "),s("p",[s("a",{attrs:{name:"8c17e5d3"}})]),a._v(" "),s("h2",{attrs:{id:"解析-javascript"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解析-javascript","aria-hidden":"true"}},[a._v("#")]),a._v(" 解析 JavaScript")]),a._v(" "),s("p",[a._v("这就很纳闷了，JavaScript 的权限这么大的呀，它加载执行的时候，其他文件的加载执行都得停下，它为啥这么🐂？再说了 HTML、CSS、JavaScript 他们不是有单独的解析器吗，那应该是在不同的线程执行才对的呀，他们之间难道有啥不可言说的勾当？")]),a._v(" "),s("p",[a._v("勾当倒是没啥构造，只是这个 JavaScript 确实很牛，它包含着三大护法：DOM、BOM 和 ECMAScript。")]),a._v(" "),s("ul",[s("li",[a._v("DOM 俗称文档对象模型（Document Objech Model），说白了就是页面文档对象模型树，它自己还提供了处理可扩展标志语言的标准编程接口；")]),a._v(" "),s("li",[a._v("BOM 全称 Browser Object Model，俗称浏览器对象模型。浏览器页面初始化时，会在内存创建一个全局对象，用来描述当前窗口的属性和状态，这个全局对象就被称为浏览器对象模型；")]),a._v(" "),s("li",[a._v("ECMAScript 是一种可以在宿主环境中执行计算并能操作可计算对象的基于对象的程序设计语言。")])]),a._v(" "),s("p",[a._v("正因为 DOM 向 JavaScript 暴露了修改文档对象模型和文档样式对象的接口，导致 JavaScript 可以对 DOM 结构做任何的修改。正因为这样，再加上浏览器在处理 JavaScript 前根本无从知道脚本有没有对 DOM 做修改的操作，以免对扰乱页面的渲染，所以浏览器只得在加载执行 JavaScript 文件时停下其他所有文件的解析，直到该部分的 JavaScript 文件加载解析执行完成。")]),a._v(" "),s("p",[s("a",{attrs:{name:"b80fceab"}})]),a._v(" "),s("h2",{attrs:{id:"优化方案"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#优化方案","aria-hidden":"true"}},[a._v("#")]),a._v(" 优化方案")]),a._v(" "),s("p",[a._v("由于 JavaScript 文件的这一特性，可能导致页面渲染延迟，从而影响用户的体验，那有没有什么办法可以改善或者解决这一问题呢？")]),a._v(" "),s("p",[a._v("优化的方案很多，这里我们着重说一下关于 script 的两个属性 async 和 defer。")]),a._v(" "),s("p",[s("a",{attrs:{name:"async"}})]),a._v(" "),s("h3",{attrs:{id:"async"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#async","aria-hidden":"true"}},[a._v("#")]),a._v(" async")]),a._v(" "),s("p",[a._v("async 字面意思就是异步，它的作用就是使 JavaScript 进行"),s("strong",[a._v("异步加载")]),a._v("，也就是做脚本的加载不会阻塞其他文件的解析。但是在 JavaScript 加载完成后，JavaScript 就会立即执行，这个"),s("strong",[a._v("执行的过程会阻塞其他文件的解析")]),a._v("，直至 JavaScript 脚本文件执行完成，原本阻塞的文件解析才会恢复。基本使用如下：")]),a._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("script")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("async")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("script.js"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}}),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n")])])]),s("p",[s("a",{attrs:{name:"defer"}})]),a._v(" "),s("h3",{attrs:{id:"defer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#defer","aria-hidden":"true"}},[a._v("#")]),a._v(" defer")]),a._v(" "),s("p",[a._v("defer 字面意思延迟，它的作用会比 async 更加优秀。当 script 设置该属性后，JavaScript 脚本文件会进行"),s("strong",[a._v("异步加载")]),a._v("，这个加载的过程同样不会影响到其他文件的解析。得到 JavaScript 脚本加载完成后，神奇的事情发生了 —— 脚本文件并不会马上执行，而是"),s("strong",[a._v("延迟到页面的 DOMContentLoad 事件触发之前的一刻进行解析执行")]),a._v("。而这个时候页面的所有元素都已经解析完成了，就等已经加载完成的 JavaScript 文件解析执行了。等到 JavaScript 解析执行完成后，整个页面的渲染就完成了，随后就会触发 DOMContentLoad 事件。**说到这里，终于明白了 defer 的意思就是 JavaScript 脚本的执行被延迟了。**基本使用如下：")]),a._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("script")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("defer")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("myscript.js"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}}),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n")])])]),s("p",[s("a",{attrs:{name:"7c3a4a08"}})]),a._v(" "),s("h2",{attrs:{id:"图解-async-和-defer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#图解-async-和-defer","aria-hidden":"true"}},[a._v("#")]),a._v(" 图解 async 和 defer")]),a._v(" "),s("p",[a._v("接下来用一张图来形象的描述普通的 script 标签、加了 async 或 defer 属性的 script 标签加载 JavaScript 的流程，其中蓝色线代表网络读取 JavaScript 脚本，红色线代表执行脚本的时间，绿色线代表 HTML 解析。")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://cdn.nlark.com/yuque/0/2019/png/114852/1563119829730-cd20f25b-e6bb-4758-9300-60da4c83447e.png#align=left&display=inline&height=123&name=image.png&originHeight=112&originWidth=689&size=32345&status=done&width=746#align=left&display=inline&height=112&originHeight=112&originWidth=689&status=done&width=689",alt:"image.png"}})]),a._v(" "),s("p",[a._v("此图告诉我们以下几个要点：")]),a._v(" "),s("ul",[s("li",[a._v("defer 和 async 针对 JavaScript 脚本文件的加载相对于 HTML 的解析都是异步的")]),a._v(" "),s("li",[a._v("它俩的差别在于脚本下载完之后何时执行，async 是在加载完成后立即执行，而 defer 是在 DOMContentLoad 事件即将触发时执行。很显然 defer 是最接近我们对应用脚本加载和执行的要求")]),a._v(" "),s("li",[a._v("关于 defer，此图并没有表现出它是"),s("strong",[a._v("按照加载顺序执行脚本")]),a._v("的，这样顺序的执行对于脚本之间的互相依赖关系是完好的")]),a._v(" "),s("li",[a._v("async 则是"),s("strong",[a._v("乱序执行")]),a._v("的，对它来说脚本的加载和执行是紧紧挨着的，谁先加载完成，谁就立马执行，根本不管声明的顺序如何")]),a._v(" "),s("li",[a._v("仔细想想，async 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的")])])])}],!1,null,null,null);t.default=e.exports}}]);