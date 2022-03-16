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

Vue.filter("fileType", (value) => String(value).split(".").pop().toUpperCase());
Vue.filter("fileSize", (bytes) => {
  if (bytes === 0) return "0 B";
  var k = 1000, // or 1024
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
});

Vue.config.productionTip = false;

import "normalize.css/normalize.css";
import "@/assets/style/reset.scss";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
