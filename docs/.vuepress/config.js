const { config } = require("vuepress-theme-hope");
// const navBarConfig = require("./config/navbar");
// const sideBarConfig = require("./config/sideBar");

module.exports = config({
  title: "ET-yzk 🌱",
  description: "凌晨四点，见海棠花未眠 🌸",// "At four o'clock in the morning, I saw Begonia flowers awake",

  dest: "docs/.vuepress/dist",

  head: [
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
    // [
    //   "script",
    //   { src: "https://unpkg.com/axios/dist/axios.min.js" },
    // ],
    // 官方已内置该 icon 库，也可在styles中引入，并将 themeConfig.iconPrefix 设置为 'fas fa-'
    [
      "script",
      {
        src: "https://kit.fontawesome.com/f13755d114.js",
        crossorigin: "anonymous"  // 跨域请求
      },
    ],
  ],

  // 控制需要生成 <link rel="prefetch"> 资源提示的文件
  shouldPrefetch: (filename) => !filename.includes("page-"),

  locales: {
    "/": {
      lang: "zh-CN",
    },
    "/en/": {
      lang: "en-US",
      title: "I'm Zkye",
      description: "Zkye personal blog",
    },
  },

  evergreen: true,

  themeConfig: {
    logo: "/logo.png",
    darkLogo: "/logo-darkmode.png",
    author: "zkye",  // 默认作者及 blog.name

    hostname: "https://blog.yzketx.online/",

    docsDir: "docs",  // 文档目录
    docsBranch: "master",

    repo: "https://github.com/ET-yzk/ET-yzk.github.io",
    repoDisplay: false,

    themeColor: false,
    darkmode: "auto-switch",
    fullscreen: false,

    iconPrefix: "fa",
    // editLinks: false,

    // 一种高级搜索插件
    // 不同于开箱即用的 内置搜索，Algolia 搜索需要你在使用之前将你的网站提交给它们用于创建索引。
    algolia: {
      appId: "4581G8F341",
      apiKey: "8d2f9fac3ce61ff2dc69c0fb7f4d5c90",
      indexName: "vuepress",
    },
    algoliaType: "full",

    // 配合import使用，高级用法
    // nav: navBarConfig.en,
    // sidebar: sideBarConfig.en,

    nav: [
      { text: "主页", link: "/", icon: "b fa-blogger" },
      // { text: "项目主页", link: "/home/", icon: "home" },
      {
        text: "小提示",
        icon: "s fa-lightbulb",
        prefix: "/tip/",
        items: [
          { text: "导航", link: "", icon: "s fa-atlas" },
          {
            text: "Markdown",
            link: "markdown/",
            icon: "b fa-markdown",
            items: [
              { text: "Emoji", link: "markdown/emoji", icon: "s fa-laugh" },
              { text: "提示块", link: "markdown/#自定义容器", icon: "s fa-exclamation-circle" },
            ]
          },
          // { text: "导航", link: "", icon: "s fa-atlas" },
          // { text: "导航", link: "", icon: "s fa-atlas" },
          // { text: "导航", link: "", icon: "s fa-atlas" },
          // { text: "导航", link: "", icon: "s fa-atlas" },
        ]
      },
      {
        text: "iSTEP Blog",
        icon: "s fa-blog",
        link: "https://blog.yzketx.online/iSTEP.github.io/",
      },
    ],
    sidebar:
    // "auto",
    {
      "/": [
        "home",
        {
          title: "小提示",
          icon: "s fa-lightbulb",
          prefix: "tip/",
          children: ["", "page", "markdown/", "disable", "encrypt"],  // 下拉菜单
        },
      ],
    },

    locales: {
      "/en/": {
        // nav: navBarConfig.zh,
        // sidebar: sideBarConfig.zh,
        nav: [
          { text: "Home", link: "/en/", icon: "home" },
          // { text: "Project Home", link: "/home/", icon: "home" },
          {
            text: "Guide",
            icon: "creative",
            link: "/en/guide/",
          },
          {
            text: "Docs",
            link: "/en/docs/",
            // link: "https://vuepress-theme-hope.github.io/",
            icon: "note",
          },
        ],

        sidebar: {
          "/en/": [
            "",
            "home",
            {
              title: "Guide",
              icon: "creative",
              prefix: "guide/",
              children: ["", "page", "markdown", "disable", "encrypt"],
            },
          ],
        },
      },
    },

    blog: {
      intro: "/intro/",
      sidebarDisplay: "mobile",
      links: {
        // Zhihu: "https://zhihu.com",
        // Baidu: "https://baidu.com",
        Email: "mailto:yzket@foxmail.com",
        Github: "https://github.com/ET-yzk",
        Gmail: "mailto:yzketxte@gmail.com",
      },
      perPage: 6,
    },

    footer: {
      display: true,
      copyright: "Copyright © 2021-present zkye",
      content: "At four o'clock isn the morning, I saw Begonia flowers awake.",
    },

    comment: {
      comment: false,
      type: "waline",
      serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    // 复制与版权提示相关限制
    copyright: {
      status: "global",
    },

    git: {
      timezone: "Asia/Shanghai",
    },

    // markdown代码增强
    mdEnhance: {
      enableAll: true,
      // align: true,
      // demo: true,
      // flowchart: true,
      // footnote: true,
      // presentation: true,
      // sub: true,
      // sup: true,
      // tex: true,
      // mark: true,
      // lineNumbers: false,  // 行号
      // 幻灯片语法支持
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },

    pwa: {
      favicon: "/favicon.ico",
      cachePic: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        // shortcuts: [
        //   {
        //     name: "Guide",
        //     short_name: "Guide",
        //     url: "/guide/",
        //     icons: [
        //       {
        //         src: "/assets/icon/guide-maskable.png",
        //         sizes: "192x192",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/guide-monochrome.png",
        //         sizes: "192x192",
        //         purpose: "monochrome",
        //         type: "image/png",
        //       },
        //     ],
        //   },
        // ],
      },
    },
  },
});
