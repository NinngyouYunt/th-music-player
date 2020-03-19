import Vue from "vue";
import Vuex from "vuex";
import musicStore from "./modules/MusicStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    musicStore
  }
});
