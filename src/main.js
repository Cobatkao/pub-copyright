import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueInputAutowidth from "vue-input-autowidth";
import VueClipboard from "vue-clipboard2";
import Toast from "vue-toastification";
import payModal from "@/components/payModal";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; //这个样式必须引入

NProgress.inc(0.2); //递增进度条
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });

Vue.use(Toast, {
  timeout: 1800,
});
Vue.use(VueInputAutowidth);
Vue.use(VueClipboard);
Vue.use(payModal);
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false;

import "normalize.css/normalize.css";
import "@/assets/style/reset.scss";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
