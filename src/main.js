import { createSSRApp } from "vue";
import App from "./App.vue";
import uviewPlus, { setConfig } from "uview-plus";

import { createI18n } from "vue-i18n";
import en from "./langurage/en";
import zh from "./langurage/zh";
import zh_hk from "./langurage/zh_hk";
import vi from "./langurage/vi";
import ja from "./langurage/ja";
// 这是移动端控制台调试工具，需要调试就打开,不用就注释
import "@/utils/vconsole.js";
// 导入store
import store from "./store";
const messages = {
  en,
  zh,
  zh_hk,
  vi,
  ja,
};

const i18n = createI18n({
  legacy: false, // 设置为 false，启用 composition API 模式
  messages,
  locale: "en", // 设置默认语言
});
export function createApp() {
  const app = createSSRApp(App); // {{ $t("navigateBar.hotspot") }}
  app.use(i18n);

  // 使用store
  app.use(store);
  setConfig({
    // 修改$u.config对象的属性
    config: {
      // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
      unit: "px",
    },
    // 修改$u.props对象的属性
    props: {
      // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
      radio: {
        // size: 20
      },
      // 其他组件属性配置
      // ......
    },
  });

  app.use(uviewPlus);
  return {
    app,
    i18n,
  };
}
