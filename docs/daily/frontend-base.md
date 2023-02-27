---
icon: b fa-simplybuilt
category: 天天笔记
date: 2021-11-29
sidebar: auto
tag:
  - Frontend
  - Interview
---

# 前端基础

## JS & Vue & React

1. \== 和 ===

2. null和undefined

3. typeof bar === “object” 验证的风险

4. NaN：，类型，验证它的函数

5. get和post区别

   1. 

6. use strict

7. 什么是window对象，什么是document对象

8. 原型链：构造函数、实例对象、原型之间关系图

9. apply和call的区别

10. 替代图片的方法

11. MVVM原理

    1. [MVVM最佳解读和实践 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/38270598)

12. 输入http到绚烂成网页中间发生了什么

13. html是怎么渲染的

14. 创建对象的方法：字面量、构造方法、构造函数、工厂模式、原型模式

15. new一个实例对象会发生什么

16. 基本数据类型和引用数据类型有什么区别

17. 箭头函数和普通函数区别，普通函数的this指向问题

18. 数组去重有哪些方法，用set的好处

19. for循环可以用什么来代替：reduce

20. JS中的遍历对象的方法有哪些，for in能否遍历循环出原型对象

21. Vue的生命周期，created和mounted区别

    1. 

22. v-mode的原理

23. Object.defineProperty方法

24. Vue3.0中的Proxy作用和使用

25. v-if和v-show的computed和watch区别，应用场景

26. 浏览器策略

27. css常用布局

28. Vue中父子组件传值问题

29. Vuex的使用

30. vue-router原理

31. iframe用于在网页中插入第三方页面，早期的页面使用iframe主要是用于导航栏这种很多页面都相同的部分，从而在切换页面的时候避免重复下载。

    1. 优点
       方便修改，模拟分离，像一些信息管理系统会用到。
       但现在基本不推荐使用。除非特殊需要，一般不推荐使用。
    2. 缺点
       iframe的创作比一般的DOM元素慢了1-2个数量级 
       iframe标签会在页面上的加载，如果页面的onload事件无法及时触发，导致用户觉得网页加载很慢，用户体验不好，在Safari和Chrome中可以通过js动态设置iframe的src属性来避免重复。
       iframe对于SEO不友好，替代方案一般就是动态语言的Incude机制和aj​​ax动态填充内容等。

32. 浏览器是怎么对HTML5的离线存储资源进行管理和加载

    1. 在线的情况下，浏览器发现html右侧有清单属性，它会请求清单文件。
    2. 如果是第一次访问app，那么浏览器就会根据清单文件的内容下载相应的资源并进行离线存储。
    3. 如果已经访问过app并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，
    4. 然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不做任何操作，如果文件更改了，那么就会重新下载文件中的资源并进行离线存储。
    5. 离线的情况下，浏览器就直接使用离线存储的资源。

33. HTML5的离线存储如何使用，工作原理能不能解释一下？

    1. 在用户没有与互联连接时，可以正常访问站点或应用，在用户与互联连接时，更新用户机器上的缓存文件。

    2. 原理：HTML5的离线存储是基于一个新建的.appcache文件的缓存机制（不是存储技术），通过这个文件上的解析列表离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

    3. 使用方法

       只要在头部加一个清单属性就可以了

       ```html
       <！DOCTYPE html>
       < html  manifest = “ cache.manifest ” >
         ...
       </ html >
       ```

       然后cache.manifest文件的书写方式如下：

       ```js
       CACHE MANIFEST
       #v0.11
       
       CACHE:
       
       js/app.js
       css/style.css
       
       NETWORK:
       resourse/logo.png
       
       FALLBACK:
       / /offline.html
       ```

34. AJAX = *A*synchronous *J*avaScript *A*nd *X*ML.

    AJAX 并非编程语言。

    AJAX 仅仅组合了：

    - 浏览器内建的 XMLHttpRequest 对象（从 web 服务器请求数据）
    - JavaScript 和 HTML DOM（显示或使用数据）

    Ajax 是一个令人误导的名称。Ajax 应用程序可能使用 XML 来传输数据，但将数据作为纯文本或 JSON 文本传输也同样常见。

    Ajax 允许通过与场景后面的 Web 服务器交换数据来异步更新网页。这意味着可以更新网页的部分，而不需要重新加载整个页面。

    Ajax请求：

    1. 网页中发生一个事件（页面加载、按钮点击）
    2. 由 JavaScript 创建 XMLHttpRequest 对象
    3. XMLHttpRequest 对象向 web 服务器发送请求
    4. 服务器处理该请求
    5. 服务器将响应发送回网页
    6. 由 JavaScript 读取响应
    7. 由 JavaScript 执行正确的动作（比如更新页面）

35. 前端页面三层结构：

    1. 合并：结构层，表示层，行为层。
    2. 结构层（structural layer） 标签，也就是那些出现在尖括号里的单词，对网页内容的语义暗示引起了描述，但这些标签不包含任何关于如何找到有关内容的信息。例如，P标签表达了这样一种语义：“这是一个文本段。”
    3. 表示层（presentation layer） 由CSS对“如何显示有关内容”的问题做出了回答。
    4. 行为层（behaviorlayer） 负责回答“内容应该如何对事件引发反应”这一问题。这是Javascript语言和DOM主宰的领域。

36. HTML DOM（文档对象模型）

    当网页被加载时，浏览器会创建页面的文档对象模型（*D*ocument *O*bject *M*odel）。

    *HTML DOM* 模型被结构化为*对象树*：

    `对象的 HTML DOM 树`

    ![DOM HTML 树](https://gitee.com/yzketx/image-markdown/raw/master/img/202111292257614.gif)

    通过这个对象模型，JavaScript 获得创建动态 HTML 的所有力量：

    - JavaScript 能改变页面中的所有 HTML 元素
    - JavaScript 能改变页面中的所有 HTML 属性
    - JavaScript 能改变页面中的所有 CSS 样式
    - JavaScript 能删除已有的 HTML 元素和属性
    - JavaScript 能添加新的 HTML 元素和属性
    - JavaScript 能对页面中所有已有的 HTML 事件作出反应
    - JavaScript 能在页面中创建新的 HTML 事件
