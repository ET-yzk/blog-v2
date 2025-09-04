import { defineClientConfig } from "vuepress/client";

import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
import Hitokoto from "./components/Hitokoto.vue";

interface APIResult {
  code: number;
  msg: string;
  result: {
    list: {
      word: string;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      word_tag: string;
      index: string;
    }[];
  };
}

export default defineClientConfig({
  setup() {
    setupRunningTimeFooter(
      // blog v2 第一次 git 提交
      new Date("2022-01-20"),
      {
        "/en/": "<br>🐋 Running time: <b>:day</b> days <b>:hour</b> hours <b>:minute</b> minutes <b>:second</b> seconds 🐳",
        "/": "<br>🐋 已运行 <b>:day</b> 天 <b>:hour</b> 小时 <b>:minute</b> 分钟 <b>:second</b> 秒 🐳",
      },
      true,
    );
    setupTransparentNavbar();
  },
  // 添加自定义组件
  enhance: ({ app, router, siteData }) => {
    app.component("Hitokoto", Hitokoto);
  },
});
