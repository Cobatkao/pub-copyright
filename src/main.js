import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueInputAutowidth from "vue-input-autowidth";
import VueClipboard from "vue-clipboard2";
import Toast from "vue-toastification";
import payModal from "@/components/payModal";

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
