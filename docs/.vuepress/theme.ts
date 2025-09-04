import { hopeTheme } from "vuepress-theme-hope";

import { enNavbarConfig, zhNavbarConfig } from "./navbar";
import { enSidebarConfig, zhSidebarConfig } from "./sidebar";

export default hopeTheme({
  logo: "/logo.png",
  logoDark: "/logo-darkmode.png",

  author: {
    name: "kfkfka🍀zkye",
    url: "https://blog.yzketx.online/",
  },

  favicon: "/favicon.ico",

  hostname: "https://blog.yzketx.online/",

  docsDir: "docs", // 文档目录
  docsBranch: "master",

  repo: "https://github.com/ET-yzk/blog-v2",
  repoDisplay: true,

  themeColor: false,
  darkmode: "switch",
  fullscreen: false,

  locales: {
    "/": {
      navbar: zhNavbarConfig,
      sidebar: zhSidebarConfig,

      footer: "At four o'clock in the morning, I saw Begonia flowers awake. ❀",
      copyright: 'Copyright © 2021-至今 kfkfka | <a href="/LICENSE">MIT License</a> 🌻',

      blog: {
        intro: "/intro/",
        description: "near zero",
        medias: {
          // Zhihu: "https://zhihu.com",
          // Baidu: "https://baidu.com",
          Email: "mailto:yzket@foxmail.com",
          Github: "https://github.com/ET-yzk",
          // Gmail: "mailto:yzketxte@gmail.com",
        },
        articlePerPage: 10,
        // articleInfo: ["Author", "Original", "Date", "PageView", "Category", "Tag", "ReadingTime"],
      },

    },
    "/en/": {
      navbar: enNavbarConfig,
      sidebar: enSidebarConfig,

        footer:
          'Theme by <a href="https://theme-hope.vuejs.press">vuepress-theme-hope</a> ❀',
        copyright:
          'Copyright © 2021-PRESRENT kfkfka | <a href="/LICENSE">MIT License</a> 🌻',

      blog: {
          intro: "/en/intro/",
          description: "π",
          medias: {
              // Zhihu: "https://zhihu.com",
              // Baidu: "https://baidu.com",
              // Email: "mailto:yzket@foxmail.com",
              Github: "https://github.com/ET-yzk",
              Gmail: "mailto:yzketx@gmail.com",
          },
          // articlePerPage: 6,
      },
    },
  },

  displayFooter: true,
  copyright: 'Copyright © 2021-present zkye | <a href="https://blog.yzketx.online/LICENSE">MIT License</a>',

  markdown: {
    tabs: true,
    align: true,
    codeTabs: true,
    footnote: true,
    figure: true,
    imgLazyload: true,
    imgMark: true,
    imgSize: true,
    math: true,
    tasklist: true,
    include: true,
    attrs: true,
    mermaid: true,
    sub: true,
    sup: true,
    vPre: true,
    mark: true,
    component: true,
    preview: true,
    flowchart: true,
    demo: true,
    highlighter: { // https://theme-hope.vuejs.press/zh/guide/markdown/code/fence.html
      type: "shiki", // or "prismjs"

      // shiki 或 prismjs 选项
      // ...
    },
  },

  plugins: {

    blog: {
      excerptLength: 24,
    },

    // 搜索 https://theme-hope.vuejs.press/zh/guide/feature/search.html#使用-vuepress-plugin-slimsearch
    slimsearch: true,

    // https://theme-hope.vuejs.press/zh/guide/feature/watermark.html
    watermark: {
      enabled: false,
      watermarkOptions: {
        movable: true,
      },
    },

    comment: {
      // 基于三方服务及服务器，普通用户友好
      provider: "Waline",
      serverURL: "https://comment.yzketx.online/",
      // Waline 3.x 新配置格式
      dark: 'auto',
      requiredMeta: ['nick'],
      emoji: [
        '//unpkg.com/@waline/emojis@1.2.0/alus',
        '//unpkg.com/@waline/emojis@1.2.0/bilibili',
        '//unpkg.com/@waline/emojis@1.2.0/tw-emoji'
      ],

      // 基于 Github Discussion，须 Github 账号
      // provider: "Giscus",
      // repo: "ET-yzk/ET-yzk.github.io",
      // repoId: "MDEwOlJlcG9zaXRvcnkzOTE1NTQxMTA=",
      // category: "Announcements",
      // categoryId: "DIC_kwDOF1akPs4CUwTu",
      // mapping: "pathname",
      // strict: true,
      // lazyLoading: true,
      // reactionsEnabled: true,
      // inputPosition: "top",
    },

    feed: {
      json: true,
      rss: true,
    },

    components: {
      // 你想使用的组件
      components: [
        "Badge",
        "BiliBili",
        "PDF",
        "Share",
      ],
    },

    copyright: true,
  },
  // 在开发模式下启用热重载，加载 git 的编辑记录
  hotReload: true,

  encrypt: {
    admin: "yzkext",
    config: {
      "/interview/me": "yzkyzk",
      "/en/guide/encrypt": "yzken",
      "/tip/encrypt": "yzktip",
      "/course/Operating-System-Practice": "czxtlx",
      "/paprikayi/": "paprika",
      "/roast/diary": "yzkroast",
      "/roast/todo-list": "yzktodo",
    },
  },
},
{
  check: true,
  compact: true,
  custom: false,
  debug: false,
}
);
