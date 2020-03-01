import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import { MusicStore, Mutations } from "./lib/MusicStore.js";
import { MyUtils } from "./lib/MyUtils.js";

Vue.prototype.store = MusicStore;
Vue.prototype.mutations = Mutations;
Vue.prototype.utils = MyUtils;
Vue.prototype.axios = axios;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
