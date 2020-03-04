<template>
  <div id="app">
    <div class="song-info-div">
      <h3>Currently Playing: {{title}}</h3>
      <p>Progress: {{musicProgress}}%</p>
      <p>Duration: {{formattedPlayed}}/{{formattedDuration}}</p>
    </div>

    <br />

    <div class="progress-bar-div">
      <progress-bar width="40rem" height="10px" :progress="progress" @jump="seek" />
    </div>

    <br />

    <div class="volume-control-div">
      <p>Volume: {{volume}}</p>
      <button @click="mute">
        <span v-if="!isMute">Mute</span>
        <span v-if="isMute">Unmute</span>
      </button>

      <volume-control
        width="10rem"
        height="7px"
        :initialVolume="volume"
        v-once
        @changeVolume="onChangeVolume"
      />
    </div>

    <br />

    <div class="player-control-div">
      <button v-if="!isPlaying" @click="play">Play</button>
      <button v-if="isPlaying" @click="pause">Pause</button>
      <button @click="skip(-1)">Prev</button>
      <button @click="skip(1)">Next</button>
      Autoplay
      <input type="checkbox" value="true" v-model="autoPlay" />
    </div>
    <notification :messages="notifications" :lifeSpan="10000" @close="onCloseNotification" />
  </div>
</template>

<script>
import ProgressBar from "./components/ProgressBar.vue";
import VolumeControl from "./components/VolumeControl.vue";
import Notification from "./components/Notification.vue";
import Player from "./lib/Player.js";
import cfg from "./config/config.js";

export default {
  name: "App",
  components: {
    ProgressBar,
    VolumeControl,
    Notification
  },
  data: function() {
    return {
      volume: 1,
      player: new Player([]),
      duration: 0,
      progress: 0,
      title: "",
      isPlaying: false,
      isMute: false,
      autoPlay: [true],
      notifications: []
    };
  },
  methods: {
    // Player Functionality
    seek: function(clickPercent) {
      this.player.seek(clickPercent);
    },
    play() {
      this.player.play();
    },
    pause() {
      this.player.pause();
      this.isPlaying = false;
    },
    skip(forward) {
      this.player.skip(forward === 1);
    },
    step() {
      const isPlaying = this.player.isPlaying();
      if (isPlaying) {
        this.progress = this.player.progress();
        requestAnimationFrame(this.step.bind(this));
      }
    },
    mute() {
      this.isMute = !this.isMute;
      this.player.mute(this.isMute);
    },
    // Http Listener
    onCloseNotification(index) {
      this.notifications.splice(index);
    },
    onChangeVolume: function(newValue) {
      newValue = Math.round(newValue);
      this.volume = newValue;
      this.player.volume(newValue / 100);
    },
    // Player Listener
    onPlay(title, duration) {
      this.title = title;
      this.duration = duration;
      this.player.volume(this.volume / 100);
      this.isPlaying = true;
      this.step();
    },
    onSeek() {
      this.progress = this.player.progress();
      this.step();
    },
    onEnd() {
      this.isPlaying = false;
      if (this.autoPlay.length > 0) this.skip(true);
    },
    // Util
    errorHandler(error) {
      console.log(error);
      this.notifications.push(error);
    },
    loadSongList() {
      console.log("Loading List");
      this.axios
        .get(cfg.url + cfg.path)
        .then(response => {
          const data = response.data;
          console.log(data);
          this.player = new Player(data);
          this.player.bindEvent(
            this.onPlay.bind(this),
            this.onSeek.bind(this),
            this.onEnd.bind(this)
          );
        })
        .catch(err => {
          this.errorHandler("Service is not running");
          console.log(err);
          setTimeout(this.loadSongList.bind(this), 5000);
        });
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
  },
  beforeMount() {
    this.loadSongList();
  },
  errorCaptured(err, vm, info) {
    alert(err);
  }
};
</script>

<style>
#app {
  display: block;
}
</style>
