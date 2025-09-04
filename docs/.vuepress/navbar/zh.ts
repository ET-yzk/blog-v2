import { navbar } from "vuepress-theme-hope";

export const zhNavbarConfig = navbar([
  // "/",
  { text: "主页", link: "/", icon: "iconamoon:home-fill" },
  // { text: "项目主页", link: "/home/", icon: "home" },
  {
    text: "开源书籍",
    icon: "lets-icons:book-open-alt-fill",
    prefix: "/book/",
    children: [
      {
        text: "《设计密集型应用》",
        link: "ddia/",
        icon: "clarity:data-cluster-solid-alerted",
      },
      {
        text: "《阿里工程师的自我修养》",
        link: "cxydzwxy",
        icon: "material-symbols:computer-rounded",
      },
    ],
  },
  {
    text: "导航",
    icon: "fa6-solid:compass",
    prefix: "/",
    children: [
      { text: "天天笔记", link: "daily/", icon: "ri:quill-pen-fill", children: [] },
      { text: "踩坑指南", link: "problem/", icon: "mdi:shoe-print", children: [] },
      { text: "转载整理", link: "reprint/", icon: "mdi:clipboard", children: [] },
      { text: "力扣刷题", prefix: "leetcode/", icon: "ph:code-fill", children: [
        // 数组 -> 链表-> 哈希表 -> 字符串 -> 栈与队列 -> 树 -> 回溯 -> 贪心 -> 动态规划 -> 图论 -> 高级数据结构
        {
          text: "数组",
          link: "array/",
          icon: "mdi:numeric"
        },
        {
          text: "链表",
          link: "linkedlist/",
          icon: "mdi:format-list-bulleted"
        },
        {
          text: "哈希表",
          link: "hashtable/",
          icon: "ph:hash"
        },
        {
          text: "字符串",
          link: "string/",
          icon: "mdi:format-letter-case"
        },
        {
          text: "栈与队列",
          link: "stackandqueue/",
          icon: "ph:stack"
        },
        {
          text: "树",
          link: "tree/",
          icon: "ph:tree-view"
        },
        {
          text: "回溯",
          link: "backtracking/",
          icon: "fluent:arrow-step-back-16-regular"
        },
        {
          text: "贪心",
          link: "greedy/",
          icon: "material-symbols:all-inclusive"
        },
        {
          text: "动态规划",
          link: "dynamicprogramming/",
          icon: "ic:round-auto-mode"
        },
        {
          text: "图论",
          link: "graph/",
          icon: "ph:graph"
        }
      ] },
      { text: "使用指南", prefix: "tip/", icon: "mdi:compass", children: [
        {
          text: "Markdown",
          link: "markdown/",
          icon: "ph:markdown-logo"
        },
        {
          text: "Typora",
          link: "typora",
          icon: "fluent:scan-type-24-filled"
        }
      ] },
    ],
  },
  {
    text: "iSTEP Blog",
    icon: "brandico:blogger-rect",
    link: "https://blog.yzketx.online/iSTEP.github.io/",
  },
]);
