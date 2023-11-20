import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

import theme from "./theme.js";

export default defineUserConfig({
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
    [
      "script",
      { src: "https://unpkg.com/axios/dist/axios.min.js" },
    ],
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

  markdown: {
    code: {
      lineNumbers: 10,
    },
  },

  locales: {
    "/": {
      lang: "zh-CN",
      title: "ET-yzk 🌱",
      description: "凌晨四点，见海棠花未眠 🌸",// "At four o'clock in the morning, I saw Begonia flowers awake",
    },
    "/en/": {
      lang: "en-US",
      title: "I'm kfkfka zkye",
      description: "Kfkfka personal blog",
    },
  },

  theme,

  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
    }),
    
  ],
});
