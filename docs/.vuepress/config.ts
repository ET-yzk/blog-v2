import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { slimsearchPlugin } from "@vuepress/plugin-slimsearch";

import theme from "./theme.js";

export default defineUserConfig({
  bundler: viteBundler(),
  dest: "docs/.vuepress/dist",

  head: [
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js",
      },
    ],
    [
      "script",
      {
          src: "https://unpkg.com/axios/dist/axios.min.js",
      },
    ],
    // 官方已内置该 icon 库，也可在styles中引入，并将 themeConfig.iconPrefix 设置为 'fa'
    // [
    //   "script",
    //   {
    //     src: "https://kit.fontawesome.com/f13755d114.js",
    //     crossorigin: "anonymous", // 跨域请求
    //   },
    // ],
  ],

  // 控制需要生成 <link rel="prefetch"> 资源提示的文件，不包含 "page-" 前缀的文件进行预加载
  // shouldPrefetch: (filename) => !filename.includes("page-"),
  shouldPrefetch: false,

  locales: {
    "/": {
      lang: "zh-CN",
      title: "ET-yzk 🌱",
      description: "凌晨四点，见海棠花未眠 🌸", // "At four o'clock in the morning, I saw Begonia flowers awake",
    },
    "/en/": {
      lang: "en-US",
      title: "Kfkfka ✨",
      description: "Kfkfka personal blog",
    },
  },

  theme,
});
