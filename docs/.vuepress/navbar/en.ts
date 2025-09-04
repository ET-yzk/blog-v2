import { navbar } from "vuepress-theme-hope";

export const enNavbarConfig = navbar([
  { text: "Blog Home", link: "/en/", icon: "mdi:home" },
  // { text: "Project Home", link: "/home/", icon: "home" },
  {
    text: "Guide",
    icon: "icon-park-solid:guide-board",
    link: "/en/guide/",
  },
  {
    text: "Docs",
    link: "/en/docs/",
    // link: "https://vuepress-theme-hope.github.io/",
    icon: "mdi:notebook",
  },
]);
