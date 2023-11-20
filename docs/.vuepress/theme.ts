import { hopeTheme } from "vuepress-theme-hope";

import { enNavbarConfig, zhNavbarConfig } from "./navbar/index.js";
import { enSidebarConfig, zhSidebarConfig } from "./sidebar/index.js";

export default hopeTheme({
  logo: "/logo.png",
  logoDark: "/logo-darkmode.png",

  author: {
    name: "kfkfka zkye",
    url: "https://blog.yzketx.online/"
  },

  hostname: "https://blog.yzketx.online/",

  docsDir: "docs",  // 文档目录
  docsBranch: "v2",

  repo: "https://github.com/ET-yzk/ET-yzk.github.io",
  repoDisplay: false,

  themeColor: false,
  darkmode: "switch",
  fullscreen: false,

  locales: {
    "/": {
      navbar: zhNavbarConfig,
      sidebar: zhSidebarConfig,

      footer: "At four o'clock in the morning, I saw Begonia flowers awake. ❀",
      copyright: 'Copyright © 2021-present zkye | <a href="/LICENSE">MIT License</a>',

      blog: {
        intro: "/intro/",
        sidebarDisplay: "mobile",
        description: "near zero",
        roundAvatar: true,
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
        'Theme by <a href="https://theme-hope.vuejs.press">vuepress-theme-hope</a>',
      copyright: 'Copyright © 2021-PRESRENT zkye | <a href="/LICENSE">MIT License</a>',

      blog: {
        intro: "/en/intro/",
        sidebarDisplay: "mobile",
        description: "π",
        roundAvatar: true,
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

  iconPrefix: "fa",
  // editLinks: false,  // 是否显示编辑此页面

  displayFooter: true,

  copyright: 'Copyright © 2021-present zkye | <a href="https://blog.yzketx.online/LICENSE">MIT License</a>',

  plugins: {
    blog: {
      excerptLength: 24,
    },

    comment: {
      // 基于三方服务及服务器，普通用户友好
      provider: "Waline",
      dark: 'auto',
      requiredMeta: ['nick'],
      serverURL: "https://comment.yzketx.online/",
      emoji: ['//unpkg.com/@waline/emojis@1.2.0/alus', '//unpkg.com/@waline/emojis@1.2.0/bilibili', '//unpkg.com/@waline/emojis@1.2.0/tw-emoji']

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

    mdEnhance: {
      tabs: true,
      align: true,
      codetabs: true,
      // demo: true,
      // flowchart: true,
      footnote: true,
      // 启用 figure
      figure: true,
      // 启用图片懒加载
      // imgLazyload: true,
      // 启用图片标记
      imgMark: true,
      // 启用图片大小
      imgSize: true,
      katex: true,
      tasklist: true,
      include: true,
      attrs: true,
      mermaid: true,
      sub: true,
      sup: true,
      vPre: true,
      mark: true,
      component: true,
      container: true,
    },

    copyright: true,
  },

  encrypt: {
    admin: "yzkext",
    config: {
      "/interview/me": "yzkyzk",
      "/en/guide/encrypt": "yzken",
      "/tip/encrypt": "yzktip",
      "/course/操作系统练习": "czxtlx",
      "/paprikayi/": "paprika",
      "/roast/diary": "yzkroast",
      "/roast/todo-list": "yzktodo",
    }
  }
},
{
  check: true,
  compact:true,
  custom :false,
  debug: false
}
);