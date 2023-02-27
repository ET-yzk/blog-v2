
import { sidebar } from "vuepress-theme-hope";

export const enSidebarConfig = sidebar({
    "/en/": [
        "",
        "home",
        {
            text: "Guide",
            icon: "creative",
            prefix: "guide/",
            children: ["", "page", "markdown", "disable", "encrypt"],
        },
    ],
});