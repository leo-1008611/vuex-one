import Vue from "vue";
import App from "./App.vue";
import router from "../router";
import store from "../store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import filters from "../utils/filters";
import api from "@/api";
import "@s/index.styl";

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.config.devtools = true; // 浏览器 vue vdom节点
Vue.use(ElementUI, {
  zhLocale
});

for (let key in filters) {
  Vue.filter(key, filters[key]);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
