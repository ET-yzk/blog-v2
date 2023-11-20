import { sidebar } from "vuepress-theme-hope";

// export const zhSidebarConfig = "structure";  // 通过文件结构自动生成
export const zhSidebarConfig = sidebar({
    "/course/": "structure",
    "/daily/": "structure",
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

    "/book/": [
        {
            text: "《设计数据密集型应用》",
            icon: "s fa-book-atlas",
            collapsible: true,
            prefix: "/book/ddia/",
            children: [
                "preface",
                "ddia_sidebar",
                {
                    text: "卷一",
                    collapsible: true,
                    icon: "s fa-bookmark",
                    children: [
                        "part-i",
                        "ch1",
                        "ch2",
                        "ch3",
                        "ch4",
                    ]
                },
                {
                    text: "卷二",
                    collapsible: true,
                    icon: "s fa-bookmark",
                    children: [
                        "part-ii",
                        "ch5",
                        "ch6",
                        "ch7",
                        "ch8",
                        "ch9",
                    ]
                },
                {
                    text: "卷三",
                    collapsible: true,
                    icon: "s fa-bookmark",
                    children: [
                        "part-iii",
                        "ch10",
                        "ch11",
                        "ch12",
                    ]
                },
                "glossary",
                "colophon",
                "LICENSE",
            ],  // 下拉菜单
        },
        "cxydzwxy",
    ],
});