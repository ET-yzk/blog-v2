---
icon: b fa-markdown
title: Markdown 介绍
dir:
  order: 2
index: false
---

# V1 deprecated

`vuepress-theme-hope` 通过内置 [md-enhance](https://vuepress-theme-hope.github.io/md-enhance)，在 Markdown 中启用了更多的语法与新功能。

<!-- more -->

## 一键启用

你可以设置 `themeconfig.mdEnhance.enableAll` 启用 [md-enhance](https://vuepress-theme-hope.github.io/md-enhance) 插件的所有功能，或者根据相关文档选择你需要的功能。

```js {3-5}
module.exports = {
  themeConfig: {
    mdEnhance: {
      enableAll: true,
    },
  },
};
```

## 新增的更多语法

### 上下角标

19^th^ H~2~O

::: details 代码

```md
19^th^ H~2~O
```

:::

- [点击查看](https://vuepress-theme-hope.github.io/zh/guide/markdown/sup-sub/)

### 自定义对齐

::: center

我是居中的

:::

::: right

我在右对齐

:::

:::: details 代码

```md
::: center

我是居中的

:::

::: right

我在右对齐

:::
```

::::

- [点击查看](https://vuepress-theme-hope.github.io/zh/guide/markdown/align/)

### 脚注

此文字有脚注[^first].

[^first]: 这是脚注内容

::: details 代码

```md
此文字有脚注[^first].

[^first]: 这是脚注内容
```

:::

- [点击查看](https://vuepress-theme-hope.github.io/zh/guide/markdown/footnote/)

### 标记

你可以标记 ==重要的内容== 。

::: details 代码

```md
你可以标记 ==重要的内容== 。
```

:::

- [点击查看](https://vuepress-theme-hope.github.io/zh/guide/markdown/mark/)

### 任务列表

- [x] 计划 1
- [ ] 计划 2

::: details Code

```md
- [x] 计划 1
- [ ] 计划 2
```

:::

- [点击查看](https://vuepress-theme-hope.github.io/guide/markdown/tasklist/)

### 流程图

```flow
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
```

::: details 代码

````md
```flow
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
```
````

:::

- [点击查看](https://vuepress-theme-hope.github.io/zh/guide/markdown/flowchart/)

## Emoji

**输入**

```
:tada: :100:
```

**输出**

:tada: :100:

你可以在[这个列表](/guide/emoji)找到所有可用的 Emoji。

## 目录

**输入**

```
[[toc]]
```

**输出**

<!--lint disable no-shortcut-reference-link no-undefined-references-->

[[toc]]

<!--lint enable no-shortcut-reference-link no-undefined-references-->

目录（Table of Contents）的渲染可以通过 `config.js -> markdown.toc` 选项来配置。

## 自定义容器 <Badge text="默认主题"/>

::: info 自定义标题

信息容器

:::

::: tip 自定义标题

提示容器

:::

::: warning 自定义标题

警告容器

:::

::: danger 自定义标题

危险容器

:::

::: details 自定义标题

详情容器

:::

:::: details 代码

```md
::: info 自定义标题

信息容器

:::

::: tip 自定义标题

提示容器

:::

::: warning 自定义标题

警告容器

:::

::: danger 自定义标题

危险容器

:::

::: details 自定义标题

详情容器

:::
```

::::

**参考:**

- [vuepress-plugin-container](https://vuepress-community.netlify.app/en/plugins/container/#vuepress-plugin-container)

## 代码块中的语法高亮

VuePress 使用了 [Prism](https://prismjs.com/) 来为 markdown 中的代码块实现语法高亮。Prism 支持大量的编程语言，你需要做的只是在代码块的开始倒勾中附加一个有效的语言别名：

**输入**

````
``` js
export default {
  name: 'MyComponent',
  // ...
}
```
````

**输出**

``` js
export default {
  name: 'MyComponent',
  // ...
}
```

**输入**

````
``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```
````

**输出**

``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

在 Prism 的网站上查看 [合法的语言列表](https://prismjs.com/#languages-list)。


## 代码块中的行高亮

**输入**

````
``` js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**输出**

``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

除了单行以外，你也可指定多行，行数区间，或是两者都指定。

- 行数区间: 例如 `{5-8}`, `{3-10}`, `{10-17}`
- 多个单行: 例如 `{4,7,9}`
- 行数区间与多个单行: 例如 `{4,7-13,16,23-27,40}`

**输入**

````
``` js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```
````

**输出**

``` js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

## Mermaid

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

::: details 代码

````md
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

:::

- [点击查看](https://vuepress-theme-hope.github.io/zh/guide/markdown/mermaid/)

### Tex 语法

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

::: details 代码

```md
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$
```

:::

- [点击查看](https://vuepress-theme-hope.github.io/zh/guide/markdown/tex/)

### 代码案例

::: demo 一个普通 Demo

```html
<h1>Hello World</h1>
<p><span id="very">Hi</span> there</p>
<div class="container">  <img src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />  <h1>GLASSMORPHISM</h1>  <div class="glass" /></div>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Hi there");
});
```

```css
span {
  color: red;
}

.container {
    width: 50vw;
    height: 50vh;
    display: grid;
    place-items: center;
    position: relative;
}

.container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
}

.container h1 {
    font-size: 4vw;
    color: white;
    position: absolute;
}

.glass {
    position: absolute;
    width: 50%;
    height: 50%;
    /* 核心代码 */
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(2px);
    border-radius: 4px;
}
```

:::

:::: details 代码

````md
::: demo 一个普通 Demo

```html
<h1>Hello World</h1>
<p><span id="very">Hi</span> there</p>
<div class="container">  <img src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />  <h1>GLASSMORPHISM</h1>  <div class="glass" /></div>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Hi there");
});
```

```css
span {
  color: red;
}

.container {
    width: 50vw;
    height: 50vh;
    display: grid;
    place-items: center;
    position: relative;
}

.container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
}

.container h1 {
    font-size: 4vw;
    color: white;
    position: absolute;
}

.glass {
    position: absolute;
    width: 50%;
    height: 50%;
    /* 核心代码 */
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(2px);
    border-radius: 4px;
}
```

:::
````

::::

::: demo [react] 一个 React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Hi there" };
  }
  render() {
    return (
      <div className="box-react">
        Hello World <span>{this.state.message}</span>
      </div>
    );
  }
}
```

```css
.box-react span {
  color: red;
}
```

:::

:::: details 代码

````md
::: demo [react] 一个 React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Hi there" };
  }
  render() {
    return (
      <div className="box-react">
        Hello World <span>{this.state.message}</span>
      </div>
    );
  }
}
```

```css
.box-react span {
  color: red;
}
```

:::
````

::::

::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box">
    Hello World <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "Hi there" }),
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::

:::: details 代码

````md
::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box">
    Hello World <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "Hi there" }),
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::
````

::::

::: demo 一个普通 Demo

```md
# 标题

Hi there
```

```ts
const message: string = "Hello World";

document.querySelector("h1").innerHTML = message;
```

```scss
h1 {
  font-style: italic;

  + p {
    color: red;
  }
}
```

:::

:::: details 代码

````md
::: demo 一个普通 Demo

```md
# 标题

Hi there
```

```ts
const message: string = "Hello World";

document.querySelector("h1").innerHTML = message;
```

```scss
h1 {
  font-style: italic;

  + p {
    color: red;
  }
}
```

:::
````

::::

- [点击查看](https://vuepress-theme-hope.github.io/zh/guide/markdown/demo/)

### 幻灯片

@slidestart

## 幻灯片 1

一个有文字和 [链接](https://mrhope.site) 的段落

---

## 幻灯片 2

- 列表 1
- 列表 2

---

## 幻灯片 3.1

```js
const a = 1;
```

--

## 幻灯片 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend

::: details 代码

````md
@slidestart

## 幻灯片 1

一个有文字和 [链接](https://mrhope.site) 的段落

---

## 幻灯片 2

- 列表 1
- 列表 2

---

## 幻灯片 3.1

```js
const a = 1;
```

--

## 幻灯片 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend
````

:::

- [点击查看](https://vuepress-theme-hope.github.io/zh/guide/markdown/presentation/)

## Header Anchors

所有的标题将会自动地应用 anchor 链接，anchor 的渲染可以通过 `config.js -> markdown.anchor` 来配置。

## 链接

### 内部链接

网站内部的链接，将会被转换成 `<router-link>` 用于 SPA 导航。同时，站内的每一个文件夹下的 `README.md` 或者 `index.md` 文件都会被自动编译为 `index.html`，对应的链接将被视为 `/`。

以如下的文件结构为例：

```
.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ README.md
   ├─ three.md
   └─ four.md
```

假设你现在在 `foo/one.md` 中：

``` md
[Home](/) <!-- 跳转到根部的 README.md -->
[foo](/foo/) <!-- 跳转到 foo 文件夹的 index.html -->
[foo heading](./#heading) <!-- 跳转到 foo/index.html 的特定标题位置 -->
[bar - three](../bar/three.md) <!-- 具体文件可以使用 .md 结尾（推荐） -->
[bar - four](../bar/four.html) <!-- 也可以用 .html -->
```

### 链接的重定向

VuePress 支持重定向到干净链接。如果一个链接 `/foo` 找不到，VuePress 会自行寻找一个可用的 `/foo/` 或 `/foo.html`。反过来，当 `/foo/` 或 `/foo.html` 中的一个找不到时，VuePress 也会尝试寻找另一个。借助这种特性，我们可以通过官方插件 [vuepress-plugin-clean-urls](https://vuepress.github.io/plugins/clean-urls/) 定制你的网站路径。

::: tip 注意
无论是否使用了 permalink 和 clean-urls 插件，你的相对路径都应该依赖于当前的文件结构来定义。在上面的例子中，即使你将 `/foo/one.md` 的路径设为了 `/foo/one/`，你依然应该通过 `./two.md` 来访问 `/foo/two.md`。
:::

### 外部链接

外部的链接将会被自动地设置为  `target="_blank" rel="noopener noreferrer"`:

- [vuejs.org](https://vuejs.org)
- [VuePress on GitHub](https://github.com/vuejs/vuepress)

你可以自定义通过配置 config.markdown.externalLinks  来自定义外部链接的特性。


## 图片点击放大

- 示例:

<picture>
  <source srcset="/bg1.png" media="(max-width: 719px)">
  <img class="line-numbers-mobile-snap" alt="Image">
</picture>

<picture>
  <source srcset="/bg2.png" media="(max-width: 719px)">
  <img class="line-numbers-mobile-snap" alt="Image">
</picture>

<style>
  @media screen and (min-width:  719px) {
    .line-numbers-mobile-snap {
       display: none;
    }
  }
  @media screen and (max-width:  719px) {
    .line-numbers-desktop-snap {
       display: none;
    }
    .line-numbers-mobile-snap {
      max-width: none!important;
      margin: 0 -1.5rem;
      width: 100vw;
    }
  }
</style>

- 代码:

```vue
<picture>
  <source srcset="/bg1.png" media="(min-width: 719px)">
  <img class="line-numbers-desktop-snap" alt="Image">
</picture>

<picture>
  <source srcset="/bg2.png" media="(max-width: 719px)">
  <img class="line-numbers-mobile-snap" alt="Image">
</picture>

<style>
  @media screen and (min-width:  719px) {
    .line-numbers-mobile-snap {
       display: none;
    }
  }
  @media screen and (max-width:  719px) {
    .line-numbers-desktop-snap {
       display: none;
    }
    .line-numbers-mobile-snap {
      max-width: none!important;
      margin: 0 -1.5rem;
      width: 100vw;
    }
  }
</style>
```

## 导入代码段 <Badge text="beta" type="warning"/>

::: danger

在测试中无法显示

:::

你可以通过下述的语法导入已经存在的文件中的代码段：

``` md
<<< @/filepath
```

它也支持 [行高亮](#代码块中的行高亮)：

``` md
<<< @/filepath{highlightLines}
```

**输入**

```
<<< @/../@vuepress/markdown/__tests__/fragments/snippet.js{2}
```


::: tip 注意
由于代码段的导入将在 webpack 编译之前执行，因此你无法使用 webpack 中的路径别名，此处的 `@` 默认值是 `process.cwd()`。
:::


为了只导入对应部分的代码，你也可运用 [VS Code region](https://code.visualstudio.com/docs/editor/codebasics#_folding)。你可以在文件路径后方的 `#` 紧接着提供一个自定义的区域名称（预设为 `snippet` ）

**输入**

``` md
<<< @/../@vuepress/markdown/__tests__/fragments/snippet-with-region.js#snippet{1}
```

## 进阶配置

VuePress 使用 [markdown-it](https://github.com/markdown-it/markdown-it) 来渲染 Markdown，上述大多数的拓展也都是通过自定义的插件实现的。想要进一步的话，你可以通过 `.vuepress/config.js` 的 `markdown` 选项，来对当前的 `markdown-it` 实例做一些自定义的配置：

``` js
module.exports = {
  markdown: {
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2] },
    extendMarkdown: md => {
      // 使用更多的 markdown-it 插件!
      md.use(require('markdown-it-xxx'))
    }
  }
}
```

## 其他语法

详见 [Markdown 增强 | vuepress-theme-hope](https://vuepress-theme-hope.github.io/zh/guide/markdown/)
