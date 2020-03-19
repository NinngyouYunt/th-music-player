import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import { MyUtils } from "./lib/MyUtils.js";
import store from "./stores";

Vue.prototype.utils = MyUtils;
Vue.prototype.axios = axios;
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
