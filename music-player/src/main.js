import Vue from "vue";
import App from "./App.vue";
import { MusicStore, Mutations } from "./lib/MusicStore.js";
import { MyUtils } from "./lib/MyUtils.js";

Vue.prototype.store = MusicStore;
Vue.prototype.mutations = Mutations;
Vue.prototype.utils = MyUtils;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
