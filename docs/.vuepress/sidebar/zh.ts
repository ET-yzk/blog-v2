import { sidebar } from "vuepress-theme-hope";

// export const zhSidebarConfig = "structure";  // 通过文件结构自动生成
export const zhSidebarConfig = sidebar({
    "/course/": "structure",
    "/daily/": "structure",
    "/java/": "structure",
    "/llm/": "structure",
    "/mysql/": "structure",
    "/interview/": "structure",
    "/knowledge_base/": "structure",
    "/leetcode/": "structure",
    "/other/": "structure",
    "/problem/": "structure",
    "/reprint/": "structure",
    "/tip/": "structure",
    "/read-paper/": "structure",
    "/trance/": "structure",
    "/paprikayi/": "structure",
    "/kama-DesignPattern-main/": "structure",
    "/paper/": "structure",

  "/book/": [
    {
      text: "《设计数据密集型应用》",
      icon: "clarity:data-cluster-solid-alerted",
      collapsible: true,
      prefix: "/book/ddia/",
      children: [
        "preface",
        "ddia_sidebar",
        {
          text: "一览",
          collapsible: true,
          icon: "ic:outline-try",
          children: ["part-i", "part-ii", "part-iii"],
        },
        {
          text: "卷一",
          collapsible: true,
          icon: "tabler:square-number-1-filled",
          children: ["ch1", "ch2", "ch3", "ch4"],
        },
        {
          text: "卷二",
          collapsible: true,
          icon: "tabler:square-number-2-filled",
          children: ["ch5", "ch6", "ch7", "ch8", "ch9"],
        },
        {
          text: "卷三",
          collapsible: true,
          icon: "tabler:square-number-3-filled",
          children: ["ch10", "ch11", "ch12"],
        },
        "glossary",
        "colophon",
        "LICENSE",
      ], // 下拉菜单
    },
    "cxydzwxy",
    "test_pdf"
  ],
});
