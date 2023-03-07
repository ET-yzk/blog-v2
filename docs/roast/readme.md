---
title: 《假装是日记》
icon: 😶
category: 小吐槽
star: true
index: false
sidebar: heading
---

### `一些特别的符号` 🔎 🔍

Ⓜ️待办  ✅完成  ❗重要  ⚠️注意

---

### `2023.03.07 杭州 ☀️` 😁

图床也从 Gitee 迁移到 Github 啦，多亏了 Picgo 的插件 [picgo-plugin-pic-migrater](https://github.com/PicGo/picgo-plugin-pic-migrater)，多谢啦~😚

我宣布，博客 v2 今天正式上线！！！耶耶耶~ 🐼

---

### `2023.03.06 杭州 ☀️` 😎

今天算是把网站迁移完毕了，可能还有一些遗留的小细节没改好，但也算无伤大雅。害，这些小问题都是当初自己书写不够规范导致的，现在再去 review，有点恐怖哇，真的得注意习惯，问题都是一点一滴积累的。

傍晚，备备接到了他报考研究生学校招生老师的电话，算是明确要他了（羡慕了呀），10 号国家线也得出了，我也得开始准备详细了解了……

现在博客网站就差搞定自动部署啦，冲冲冲！（迁移真的很麻烦，甚至不如重新构建 🫥）

---

### `2023.03.03 杭州 ☀️` 🫡

哎嘿，我又回来啦~

前几天去南京逛了一下，天均 4 万+，真是个锻炼身体、开拓视野、缅怀历史的好地方。最后一站是 **南京大屠杀遇难者同胞纪念馆** ，我们选择宽恕，拥抱和平，但不代表我们会遗忘历史，peace & love 🕊️。

---

### `2023.02.27 杭州 ☀️` 😵

今天继续迁移 blog，但是有一个问题一直没法解决（前天就碰到了），头疼：

::: details “npm run docs:dev”
```bash
npm run docs:dev
# 报错如下
`> blog@2.0.0 docs:dev
> vuepress dev docs

⠙ Initializing and preparing dataerror error in hook extendsPage from vuepress-theme-hope-extends-page
✖ Initializing and preparing data - failed in 450ms
TypeError: e.trim is not a function
at me (file:///pathto/node_modules/vuepress-shared/lib/node/index.js:1:28528)
at Hn (file:///pathto/node_modules/vuepress-shared/lib/node/index.js:1:30785)
at Object.extendsPage [as hook] (file:///pathto/node_modules/vuepress-theme-hope/lib
/node/index.js:35:5883)
at Object.process (file:///pathto/node_modules/@vuepress/core/dist/index.js:663:37)
at async createPage (file:///pathto/node_modules/@vuepress/core/dist/index.js:550:3)
at async Promise.all (index 29)
at async resolveAppPages (file:///pathto/node_modules/@vuepress/core/dist/index.js:5
62:17)
at async appInit (file:///pathto/node_modules/@vuepress/core/dist/index.js:585:15)
at async file:///pathto/node_modules/@vuepress/cli/dist/index.js:484:7
at async file:///pathto/node_modules/@vuepress/utils/dist/index.js:106:20`
```
:::

询问了一下开发者，等他的解救了，提了个 [Discussion](https://github.com/vuepress-theme-hope/vuepress-theme-hope/discussions/2833) 。顺便看了下其他人提的方式，一个好的提问最好得交待 具体问题、版本号、**复现操作**、所作尝试、环境 等，提问题也得多学学呀 😳

哎嘿，在作者的提示下解决了，详情就去上面的 Discussion 里看吧。

不得不说，在更新到 v2 后，VuePress 对 Markdown 的代码检查能力大大提高，可以预见前端将逐渐规范起来，达到和后端甚至超越后端的高度 🫡（瞎说的，嘿嘿嘿）

---

### `2023.02.26 杭州 ☀️ ` 😎

今天被室友拉去放风筝了，还不错，可惜最后掉边上保安室上去不回来了。筝筝，你已经是一个飞上天的风筝了，期待你在下一任主人手中再次翱翔蓝天 🥹

---

### `2023.02.25 杭州 🌤️` 🤔

完蛋，怎么更新上站点已经记不清了，笔记还是得多记记哇 😭

今天根据 hope 主题的 v2 迁移指南进行了一部分的迁移操作，发现了的第一次建站时，对于 sidebar 等配置的认识是有问题的，我说怎么之前的页面怎么怪怪的，果然是常知常新啊 🥰

通过 **npx vp-update** 更新，这是迁移后的终端版本更新提示：

::: details 例子
vuepress-theme-hope:  ⚠ comment is deprecated in themeConfig, please use "plugins.comment" instead.
vuepress-theme-hope:  ⚠ git is deprecated in themeConfig, please use "plugins.git" instead.
vuepress-theme-hope:  ⚠ mdEnhance is deprecated in themeConfig, please use "plugins.mdEnhance" instead.
vuepress-theme-hope:  ⚠ pwa is deprecated in themeConfig, please use "plugins.pwa" instead.
vuepress-theme-hope:  ⚠ items is deprecated in navbar, please use "children" instead.
vuepress-theme-hope:  ⚠ Blog feature is tree-shakable in v2, you should set plugins.blog: true in theme options to enable it.
vuepress-theme-hope:  ⚠ copyright is deprecated in V2, please use plugins.copyright instead.
vuepress-theme-hope:  ⚠ "footer.copyright" options is deprecated, please use "copyright" instead
vuepress-theme-hope:  ⚠ "footer.display" options is deprecated, please use "displayFooter" instead
vuepress-theme-hope:  ⚠ "footer.content" options is deprecated, please use "footer" instead
vuepress-theme-hope:  ⚠ title is deprecated in sidebar, please use "text" instead.
error V2 style switched to scss instead of stylus, so you should remove index.styl and create index.scss under .vuepress/styles.
error V2 style switched to scss instead of stylus, so you should remove palette.styl and create config.scss and palette.scss under .vuepress/styles.
vuepress-plugin-md-enhance:  ✖ "enableAll" is removed and no longer supported
✖ Initializing and preparing data - failed in 1.70s
……
:::

---

### `2023.02.24 杭州 ⛅` 🤩

由于之前找实习加之后来仓促决定考研后，本博客一度被荒废 😭

今天终于打算拾起当初废了一番功夫的博客，打开站点一看，发现图片都显示不了时才想起，由于码云官方开启了防盗链功能，导致之前配置的 Gitee 图床直接就挂掉了，还得费一番功夫去 Ⓜ️ 迁移到新的图床上…… 😵

啊对，记得还得给这个小站点加上 ✅ 备案声明！！！

没错，以后这个图标 Ⓜ️ 就拿来表示代办吧，意思是码住的码 🐎，✅ 完成 ❗ 重要 ⚠️ 注意

刚刚看了下之前用的 [VuePress 主题 Hope](https://theme-hope.vuejs.press/zh/) 更新到了 v2 ，漂亮了好多，尤其是那个一键切换夜间模式的实现好喜欢，，，不行还得看看怎么✅更新主题……嗯，标签的 UI 也变漂亮了。

另外，博客上的东西是有点乱糟糟的，得 ⚠️ 借鉴一下大佬们的改一改……

还有，博客上的 ✅ 搜索功能还是空有 UI，没有功能的来着……

