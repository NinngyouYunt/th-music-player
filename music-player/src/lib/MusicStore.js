import Vue from "vue";
import Player from "./List.js";
import SongList from "./SongList.json";

export const MusicStore = Vue.observable({
  progress: 50,
  player: new Player(SongList)
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
