import Vue from "vue";
import App from "./App.vue";
import { MusicStore, Mutations } from "./stores/MusicStore.js";

Vue.prototype.store = MusicStore;
Vue.prototype.mutations = Mutations;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
