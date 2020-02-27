import Vue from "vue";

export const MusicStore = Vue.observable({
  progress: 50
});

export const Mutations = {
  setProgress(newNumber) {
    MusicStore.progress = newNumber;
  },
  addProgress(increament) {
    MusicStore.progress += increament;
    if (MusicStore.progress > 100) MusicStore.progress = 0;
  }
};
