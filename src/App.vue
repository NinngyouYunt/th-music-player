<template>
  <div id="app">
    <button @click="addProgress">Increase Progress</button>
    <p>Progress: {{musicProgress}}%</p>
    <br />
    <progress-bar width="40rem" height="10px" :progress="musicProgress" @jump="onProgressJump" />
    <volume-control
      width="10rem"
      height="7px"
      :initialVolume="volume" v-once
      @changeVolume="onChangeVolume"
    />
    <br />
    <p>Volume: {{volume}}</p>
  </div>
</template>

<script>
import ProgressBar from "./components/ProgressBar.vue";
import VolumeControl from "./components/VolumeControl.vue";
export default {
  name: "App",
  components: {
    ProgressBar,
    VolumeControl
  },
  data: function() {
    return {
      volume: 10
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
    }
  }
};
</script>

<style>
</style>
