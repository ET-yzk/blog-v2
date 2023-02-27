import { navbar } from "vuepress-theme-hope";

export const enNavbarConfig = navbar([
    "/en/",
    // { text: "Home", link: "/en/", icon: "home" },
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
    }
]);