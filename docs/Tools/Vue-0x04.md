# v-model 后续 input and change

<a name="f7ac14b2"></a>
## 前导
在我的[ Vue 专栏](https://www.yuque.com/littlelane/vue)有两篇关于由浅入深的讲解 Vue 中 v-model 的[用法、原理](https://www.yuque.com/littlelane/vue/iqevua)和[源码实现](https://www.yuque.com/littlelane/vue/ct3qng)。我相信大家看完这两篇文章后，一定会对 v-model 有一个深刻的认识，并对其背后实现的原理有个非常详细的了解。

v-model 在 Vue 中作为双向数据绑定的语法糖，其背后原理就是通过 v-bind 绑定一个响应式的数据，然后当数据变化时，实时的触发绑定在元素上的 input 事件，事件的逻辑就是修改绑定的响应式数据的值，然后渲染到视图。

那么疑问来了，为什么这个绑定的事件不是我们之前熟知的 change 而是我们(也许是我)很少用到的 input 呢？这两个事件又有什么区别呢？下面我们就来好好的分析分析！

<a name="d7f4734a"></a>
## 详解 change
先给一个简单的例子：

```html
<input type="text" id="change"/>
<p id="changep"></p>

<script>
  document.getElementById('change').addEventListener('change', (e) => {
    document.getElementById('changep').innerHTML = e.target.value;
  });
</script>
```

这里我们给 id 为 change 的 input 标签绑定了 change 事件，当 change 事件发生时，将 input 标签的值填充到了 id 为 changep 的 p 标签进行显示。

![Mar-14-2019 22-57-24.gif](https://cdn.nlark.com/yuque/0/2019/gif/114852/1552575603425-1cc31414-1176-4bbf-9203-ad0847090c9f.gif#align=left&display=inline&height=132&name=Mar-14-2019%2022-57-24.gif&originHeight=132&originWidth=320&size=48714&status=done&width=320)<br />
<br />根据 GIF 图，我们会发现：当我们向 input 标签输入值时，绑定的 change 事件不是事实就触发的，除非我们让 input 标签失去焦点，或者按下 Enter 键。乍一看，这种效果和 blur 事件很相似，但是他们之前还是有本质的区别的。<br />
<br />将上面给出的示例代码修改成如下，给 input 标签绑定 blur 事件<br />

```html
<script>
  document.getElementById('change').addEventListener('change', (e) => {
    console.log('change');
    document.getElementById('changep').innerHTML = e.target.value;
  });
  document.getElementById('change').addEventListener('blur', () => {
    console.log('blur');
  })
</script>
```

实践后的效果如下：<br />![Mar-14-2019 23-08-34.gif](https://cdn.nlark.com/yuque/0/2019/gif/114852/1552576185292-ae805318-3495-46cf-9f50-6e346bbfa360.gif#align=left&display=inline&height=255&name=Mar-14-2019%2023-08-34.gif&originHeight=284&originWidth=536&size=983816&status=done&width=481)<br />
<br />看效果就很明显了：blur 是在 input 标签失去焦点后就会触发，它只关注失焦这个状态。而 change 是在 input 标签的值发生变化而且失去焦点时，才会触发，它关注的是值变化和失焦(或者是 Enter )两个状态。

textarea 和 input type='text' 对于 change 事件的标签是一致的，checkbox、radio、select 是当选中值发生变化时就触发 change 事件，和 textarea、input type='text' 略有不同。

> 兼容性：change 事件基本上支持所有的浏览器，不会出现兼容性的问题！


<a name="658ad2ba"></a>
## 详解 input
input 事件是 HTML5 新加的事件。相比 change 事件，其兼容性就差了一点，支持 IE9+ 的所有现代浏览器。

```html
input：<input type="text" id="input"/>
<p id="inputp"></p>

<script>
	document.getElementById('input').addEventListener('input', (e) => {
    document.getElementById('inputp').innerHTML = e.target.value;
  });
</script>
```

示例代码给出了一个 id 为 input 的标签并绑定了 input 事件，当 input 事件触发时，就会将 input 标签的值赋值给 id 为 inputp 的 p 标签显示。<br />![Mar-14-2019 23-36-01.gif](https://cdn.nlark.com/yuque/0/2019/gif/114852/1552577776045-23aeedaa-7bc4-43ec-9d1c-77587e1a8429.gif#align=left&display=inline&height=146&name=Mar-14-2019%2023-36-01.gif&originHeight=146&originWidth=368&size=50756&status=done&width=368)<br />
<br />这个效果和之前的 change 相比就非常具有实时性了，只管向 input 标签输入值，input 事件就会实时的触发，随后导致 p 标签显示的内容实时变化。当然对于 textarea、checkbox、radio、select 标签也会有这种实时的效果。由于 input 事件的实时性，用它来绑定元素，实现 v-model 双向数据绑定的效果就非常合适了。

<a name="f321ed6f"></a>
## 延伸 propertychange
由于 input 事件的兼容性问题，你可以使用 propertychange 事件做兼容处理。propertychange 事件的绑定方式和其他事件的绑定方式一样。但是你需要注意的是：标签上的任何属性变化都会触发 propertychange 事件，这样的话你就需要写相应的逻辑进行处理了。还有就是这个事件是 IE 浏览器专属的，由于本人是 MAC 就不能给出效果展示了，大家有兴趣可以私下去探索。

<a name="25f9c7fa"></a>
## 总结
虽然 input 和 change 事件都不简单，但是到这里为止，我终于可以清除的区分他们两个了，算是一个收获吧，你们呢，觉得怎么样？

