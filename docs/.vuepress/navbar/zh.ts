import { navbar } from "vuepress-theme-hope";

export const zhNavbarConfig = navbar([
    "/",
    // { text: "主页", link: "/", icon: "b fa-blogger" },
    // { text: "项目主页", link: "/home/", icon: "home" },
    {
        text: "开源书籍",
        icon: "s fa-book-open-reader",
        prefix: "/book/",
        children: [
            {
                text: "《设计密集型应用》",
                link: "ddia/",
                icon: "s fa-book-atlas"
            },
            {
                text: "《阿里工程师的自我修养》",
                link: "cxydzwxy",
                icon: "s fa-book-atlas"
            }
        ]
    },
    {
        text: "导航",
        icon: "s fa-paper-plane",
        prefix: "/",
        children: [
            { text: "天天笔记", link: "daily/", icon: "s fa-pen-clip" },
            { text: "力扣笔记", link: "leetcode/", icon: "s fa-code" },
            { text: "踩坑指南", link: "problem/", icon: "s fa-shoe-prints" },
            { text: "转载整理", link: "reprint/", icon: "s fa-clipboard" },
            { text: "使用指南 v1", link: "tip/", icon: "s fa-compass" },
        ]
    },
    {
        text: "iSTEP Blog",
        icon: "s fa-blog",
        link: "https://blog.yzketx.online/iSTEP.github.io/",
    },
]);