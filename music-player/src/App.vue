<template>
  <div id="app">
    <button @click="addProgress">Increase Progress</button>
    <p>Progress: {{musicProgress}}%</p>
    <br />
    <progress-bar width="40rem" height="10px" :progress="musicProgress" @jump="onProgressJump" />
    <volume-control
      width="10rem"
      height="7px"
      :initialVolume="volume"
      v-once
      @changeVolume="onChangeVolume"
    />
    <br />
    <p>Volume: {{volume}}</p>
  </div>
</template>

<script>
import ProgressBar from "./components/ProgressBar.vue";
import VolumeControl from "./components/VolumeControl.vue";
import { songList } from 

export default {
  name: "App",
  components: {
    ProgressBar,
    VolumeControl
  },
  data: function() {
    return {
      volume: 10,
      currentSong: 0 // soundId
    };
  },
  methods: {
    onProgressJump: function(clickPercent) {
      this.mutations.setProgress(clickPercent);
    },
    addProgress: function() {
      this.mutations.addProgress(10);
    },
    onChangeVolume: function(newValue) {
      this.volume = newValue;
    }
  },
  computed: {
    musicProgress() {
      return this.store.progress;
    },
    totalTime() {
      const total = this.currentSong.duration();
      const minute = Math.floor(total / 60);
      const second = total - minute * 60;
      return `${minute}:${second}`;
    },
    isPlaying() {
      return this.currentSong.playing();
    }
  }
};
</script>

<style>
</style>
