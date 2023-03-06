import { hopeTheme } from "vuepress-theme-hope";

import { enNavbarConfig, zhNavbarConfig } from "./navbar/index.js";
import { enSidebarConfig, zhSidebarConfig } from "./sidebar/index.js";

export default hopeTheme({
  logo: "/logo.png",
  logoDark: "/logo-darkmode.png",

  author: {
    name: "zkye",
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

      footer: "At four o'clock isn the morning, I saw Begonia flowers awake.",
      copyright: 'Copyright © 2021-present zkye | <a href="./LICENSE">MIT License</a>',

      blog: {
        intro: "/intro/",
        sidebarDisplay: "mobile",
        description: "π",
        roundAvatar: true,
        medias: {
          // Zhihu: "https://zhihu.com",
          // Baidu: "https://baidu.com",
          Email: "mailto:yzket@foxmail.com",
          Github: "https://github.com/ET-yzk",
          // Gmail: "mailto:yzketxte@gmail.com",
        },
        articlePerPage: 10,
      },

    },
    "/en/": {
      navbar: enNavbarConfig,
      sidebar: enSidebarConfig,

      footer:
        'Theme by <a href="https://theme-hope.vuejs.press">vuepress-theme-hope</a>',
      copyright: 'Copyright © 2021-present zkye | <a href="../LICENSE">MIT License</a>',

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
          Gmail: "mailto:yzketxte@gmail.com",
        },
        // articlePerPage: 6,
      },
    },
  },

  // iconAssets: "fontawesome",
  iconPrefix: "fa",
  // editLinks: false,  // 是否显示编辑此页面

  // v2 弃用
  // 一种高级搜索插件
  // 不同于开箱即用的 内置搜索，Algolia 搜索需要你在使用之前将你的网站提交给它们用于创建索引。
  // algolia: {
  //   appId: "4581G8F341",
  //   apiKey: "8d2f9fac3ce61ff2dc69c0fb7f4d5c90",
  //   indexName: "vuepress",
  // },
  // algoliaType: "full",

  displayFooter: true,

  copyright: 'Copyright © 2021-present zkye | <a href="https://blog.yzketx.online/LICENSE">MIT License</a>',

  plugins: {
    blog: {
      excerptLength: 24,
    },

    comment: {
      provider: "Waline",
      dark: 'auto',
      requiredMeta: ['nick'],
      serverURL: "https://comment.yzketx.online/",
      emoji: ['//unpkg.com/@waline/emojis@1.1.0/bilibili', '//unpkg.com/@waline/emojis@1.1.0/tw-emoji']
    },

    feed: {
      json: true,
      rss: true,
    },

    mdEnhance: {
      tabs: true,
      align: true,
      codetabs: true,
      demo: true,
      flowchart: true,
      footnote: true,
      // imgLazyload: true,
      imgMark: true,
      katex: true,
      mermaid: true,
      presentation: true,
      sub: true,
      sup: true,
      vPre: true,
    },

    copyright: true,

    // pwa: {
    //   themeColor: "4bbda8",
    //   favicon: "/favicon.ico",
    //   maxSize: 3072,
    //   cachePic: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     // shortcuts: [
    //     //   {
    //     //     name: "Guide",
    //     //     short_name: "Guide",
    //     //     url: "/guide/",
    //     //     icons: [
    //     //       {
    //     //         src: "/assets/icon/guide-maskable.png",
    //     //         sizes: "192x192",
    //     //         purpose: "maskable",
    //     //         type: "image/png",
    //     //       },
    //     //       {
    //     //         src: "/assets/icon/guide-monochrome.png",
    //     //         sizes: "192x192",
    //     //         purpose: "monochrome",
    //     //         type: "image/png",
    //     //       },
    //     //     ],
    //     //   },
    //     // ],
    //   },
    // },

  },

  encrypt: {
    config: {
      "/interview/me": "yzkyzk",
      "/en/guide/encrypt": "yzk123",
      "/tip/encrypt": "yzk123",
      "/course/操作系统练习": "czxtlx",
    }
  }
});