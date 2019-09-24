(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{203:function(t,e,i){"use strict";i.r(e);var s=i(0),n=Object(s.a)({},function(){var t=this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"content"},[i("h1",{attrs:{id:"git-ssh-permission-denied"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#git-ssh-permission-denied","aria-hidden":"true"}},[t._v("#")]),t._v(" git ssh Permission denied")]),t._v(" "),i("p",[i("a",{attrs:{name:"8e1b944f"}})]),t._v(" "),i("h2",{attrs:{id:"背景"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#背景","aria-hidden":"true"}},[t._v("#")]),t._v(" 背景")]),t._v(" "),i("p",[t._v("今天临下班前突然想到最近需要重构一个非常重要的项目，新项目使用的技术栈是 Vue。由于需求可能会很多和很杂，为了方便项目的迭代和维护，我们合计着引入一个文档系统，针对每个需求和每次的改动编写对应的文档以便进行需求的梳理与项目的维护。")]),t._v(" "),i("p",[t._v("晚上就回家捣鼓了一下 vuepress ，这个是基于 Vue + Vue Router + Webpack 的技术栈形式进行实现的，和我们主项目的技术架构一样的，而且 vuepress 支持很完善的配置和高可定制化处理，于是就用来搭建了一个个人的博客系统，并实现了命令式一键部署！")]),t._v(" "),i("p",[t._v("就是这个一键式部署功能引出了本篇文档！")]),t._v(" "),i("p",[i("a",{attrs:{name:"5dc99f6e"}})]),t._v(" "),i("h2",{attrs:{id:"问题"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#问题","aria-hidden":"true"}},[t._v("#")]),t._v(" 问题")]),t._v(" "),i("p",[t._v("先把自动部署 github 的 shell 脚本抛出来吧！")]),t._v(" "),i("div",{staticClass:"language-shell extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[t._v("#!/usr/bin/env sh\n\n# 确保脚本抛出遇到的错误\nset -e\n\n# 生成静态文件\nnpm run docs:build\n\n# 进入最终生成静态的目录\ncd docs/.vuepress/dist\n\n// 在最终生成的静态目录初始化 git 配置\ngit init\ngit add -A\ngit commit -m 'deploy'\n\n# 推到你仓库的的 gh-page 分支\n# 将 <USERNAME>/<REPO> 替换为你的信息\ngit push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages\n\ncd -\n")])])]),i("p",[t._v("自动部署 github 的脚本很简单，基本的流程就是：执行 "),i("code",[t._v("npm run docs:build")]),t._v(" 生成最终的网站静态资源，由于生成的静态资源存放在 "),i("code",[t._v("docs/.vuepress/dist")]),t._v(" 目录下，然后将当前目录转到最终静态的目录，再初始化 git 配置，提交所有的变更，最后将所有的变更 "),i("code",[t._v("push")]),t._v(" 到远程的 github 仓库对应的分支。")]),t._v(" "),i("p",[t._v("这个自动化部署的过程是没什么问题的。但是就是在执行自动化部署时，在最后一步 —— push 代码的时候报错了")]),t._v(" "),i("p",[i("img",{attrs:{src:"https://cdn.nlark.com/yuque/0/2019/png/114852/1550852651825-ab5416e1-471a-4923-bc8e-9382b7786c09.png#align=left&display=inline&height=88&name=WX20190223-002347%402x.png&originHeight=134&originWidth=1136&size=77636&status=done&width=746",alt:"WX20190223-002347@2x.png"}})]),t._v(" "),i("p",[t._v("这个报错信息向我们展示了：当 shell 通过 ssh 方式向 github 仓库推送代码的时候，没有权限（publickey）。")]),t._v(" "),i("p",[t._v("静下心来想想，发现这个报错是情理之中的：因为 github 是一个公共的代码管理平台，只要是公共的管理平台，就肯定会有安全问题，针对这些安全问题，平台开发者肯定会实施一些措施进行规避，比如浏览器实现了同源策略。关于 github 这样的平台肯定是实现了公钥、私钥的处理。")]),t._v(" "),i("p",[t._v("既然问题都已经清除了，且问题的原因也找到一二了，那就动手解决问题吧！")]),t._v(" "),i("p",[i("a",{attrs:{name:"4b86211f"}})]),t._v(" "),i("h2",{attrs:{id:"解决"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#解决","aria-hidden":"true"}},[t._v("#")]),t._v(" 解决")]),t._v(" "),i("p",[t._v("通过 git@github.com: Permission denied (publickey) 关键字在网上搜索了一通，发现关于这类问题的条目还蛮多的，内容都是大同小异：")]),t._v(" "),i("ul",[i("li",[t._v("1、运行 ssh-keygen 命令生成 ssh 密钥文件**（这里建议回到 ~ 目录）**")]),t._v(" "),i("li",[t._v("2、生成 ssh 密钥时，会提示你输入文件的 key 和 passphrase，我建议这里一直按回车过掉")])]),t._v(" "),i("p",[i("img",{attrs:{src:"https://cdn.nlark.com/yuque/0/2019/png/114852/1550853810425-10dd0e6d-78d9-44dd-ae37-c28318ec621f.png#align=left&display=inline&height=131&name=WX20190223-004314%402x.png&originHeight=130&originWidth=664&size=40254&status=done&width=668",alt:"WX20190223-004314@2x.png"}})]),t._v(" "),i("p",[t._v("随后就会 "),i("code",[t._v("User/<userName>/.ssh")]),t._v(" 下生成这三个文件。")]),t._v(" "),i("ul",[i("li",[t._v("3、在 github setting 主页添加 ssh 相关值")])]),t._v(" "),i("p",[i("img",{attrs:{src:"https://cdn.nlark.com/yuque/0/2019/png/114852/1550854134234-77988038-f54f-41c8-bddd-67d3da57535c.png#align=left&display=inline&height=373&name=WX20190223-004823%402x.png&originHeight=1082&originWidth=2164&size=190957&status=done&width=746",alt:"WX20190223-004823@2x.png"}})]),t._v(" "),i("p",[t._v("将上图中通过命令生成的 SSH 密钥文件 id_rsa.pub 里面的内容复制到 SSH key，然后 title 设置 id_rsa，最后点击 Add SSH key 保存 SSH 密钥值即可。")]),t._v(" "),i("ul",[i("li",[t._v("4、回到终端执行 ssh -T git@github.com 检查 SSH 密钥是否生效")])]),t._v(" "),i("p",[i("img",{attrs:{src:"https://cdn.nlark.com/yuque/0/2019/png/114852/1550854348946-4f0a9320-a98f-40de-9a32-59290ae1c618.png#align=left&display=inline&height=59&name=WX20190223-005220%402x.png&originHeight=92&originWidth=1154&size=51907&status=done&width=746",alt:"WX20190223-005220@2x.png"}})]),t._v(" "),i("p",[t._v("如果出现上图显示的内容就证明 SSH 配置完成。")]),t._v(" "),i("ul",[i("li",[t._v("5、重新执行部署命令就发现 push 代码已经 OK 了！")])]),t._v(" "),i("p",[i("a",{attrs:{name:"25f9c7fa"}})]),t._v(" "),i("h2",{attrs:{id:"总结"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#总结","aria-hidden":"true"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),i("p",[t._v("这个问题是关于 git ssh 的问题。问题看上去有点可怕，因为跟权限挂钩了，但是这类问题网上就很多参考的文档，所以也就没什么好怕的了。这里主要介绍了 Mac 的解决方案，关于 Windows 的解决方案，我这里就不方便出了，因为手上也没有 Windows 电脑。如果大家遇到问题，还是去网上搜搜吧！")])])}],!1,null,null,null);e.default=n.exports}}]);