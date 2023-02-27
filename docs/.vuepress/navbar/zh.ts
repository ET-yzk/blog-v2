import { navbar } from "vuepress-theme-hope";

export const zhNavbarConfig = navbar([
    "/",
    // { text: "主页", link: "/", icon: "b fa-blogger" },
    // { text: "项目主页", link: "/home/", icon: "home" },
    {
        text: "小提示",
        icon: "s fa-lightbulb",
        prefix: "/tip/",
        children: [
            { text: "导航", link: "", icon: "s fa-atlas" },
            {
                text: "Markdown",
                link: "markdown/",
                icon: "b fa-markdown",
                children: [
                    { text: "Emoji", link: "markdown/emoji", icon: "s fa-laugh" },
                    { text: "提示块", link: "markdown/#自定义容器", icon: "s fa-exclamation-circle" },
                ]
            },
        ]
    },
    {
        text: "iSTEP Blog",
        icon: "s fa-blog",
        link: "https://blog.yzketx.online/iSTEP.github.io/",
    },
]);