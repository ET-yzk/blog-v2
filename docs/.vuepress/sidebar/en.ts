import { sidebar } from "vuepress-theme-hope";

export const enSidebarConfig = sidebar({
  "/en/": [
    "",
    "home",
    {
      text: "Guide",
      icon: "icon-park-solid:guide-board",
      prefix: "guide/",
      children: ["", "page", "markdown", "disable", "encrypt"],
    },
  ],
});
