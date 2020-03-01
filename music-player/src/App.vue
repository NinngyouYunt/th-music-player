<template>
  <div id="app">
    <br />
    <p>Progress: {{musicProgress}}%</p>
    <progress-bar width="40rem" height="10px" :progress="progress" @jump="seek" />
    <volume-control
      width="10rem"
      height="7px"
      :initialVolume="volume"
      v-once
      @changeVolume="onChangeVolume"
    />
    <br />
    <p>Volume: {{volume}}</p>
    <p>Duration: {{formattedPlayed}}/{{formattedDuration}}</p>
    <br />

    <button @click="play">Play</button>

    <button @click="pause">Pause</button>

    <button @click="skip(-1)">Prev</button>

    <button @click="skip(1)">Next</button>
  </div>
</template>

<script>
import ProgressBar from "./components/ProgressBar.vue";
import VolumeControl from "./components/VolumeControl.vue";
import Player from "./lib/Player.js";
import SongList from "./lib/SongList.json";

export default {
  name: "App",
  components: {
    ProgressBar,
    VolumeControl
  },
  data: function() {
    return {
      volume: 10,
      player: new Player(SongList),
      duration: 0,
      progress: 20
    };
  },
  methods: {
    seek: function(clickPercent) {
      console.log("Seeked");
      this.progress = clickPercent;
      this.player.seek(clickPercent);
      this.step();
    },
    onChangeVolume: function(newValue) {
      this.volume = newValue;
      this.player.volume(newValue / 100);
    },
    play() {
      this.player.bindEvent(this.onPlay.bind(this), this.onSeek.bind(this));
      this.player.play();
    },
    pause() {
      this.player.pause();
    },
    skip(forward) {
      this.player.skip(forward === 1);
    },
    step() {
      console.log("Step");
      const isPlaying = this.player.isPlaying();
      this.progress = this.player.progress();
      // console.log(`Currently Playing: ${this.getSong()._source}`);
      if (isPlaying) requestAnimationFrame(this.step.bind(this));
    },
    onPlay() {
      console.log("On Play Triggered");
      this.duration = this.player.duration();
      this.player.volume(this.volume / 100);
      this.step();
    },
    onSeek() {
      this.progress = this.player.progress();
      this.step();
    }
  },
  computed: {
    musicProgress() {
      return this.progress;
    },
    formattedDuration() {
      const total = this.duration;
      const minute = Math.floor(total / 60);
      const second = Math.round(total - minute * 60);
      return `${minute < 10 ? 0 : ""}${minute}:${
        second < 10 ? 0 : ""
      }${second}`;
    },
    formattedPlayed() {
      const total = (this.musicProgress / 100) * this.duration;
      const minute = Math.floor(total / 60);
      const second = Math.round(total - minute * 60);
      return `${minute < 10 ? 0 : ""}${minute}:${
        second < 10 ? 0 : ""
      }${second}`;
    }
  }
};
</script>

<style>
</style>
