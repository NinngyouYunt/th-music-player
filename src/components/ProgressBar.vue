<template>
  <div class="progress-bar-container" :style="containerStyle">
    <div class="background-bar" :style="barStyle" @click="jumpTo">
      <div class="foreground-bar" :style="[{width:foregroundWidth}, barStyle]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  data: function() {
    return {
      containerStyle: {
        width: this.width,
        height: this.height
      },
      barStyle: {
        height: this.height
      }
    };
  },
  props: {
    width: {
      type: String,
      default: "100%"
    },
    progress: {
      type: Number,
      default: 0
    },
    height: {
      type: String,
      default: "1rem"
    }
  },
  methods: {
    jumpTo: function(event) {
      const boundingRect = event.target.getBoundingClientRect();
      const mouseX = event.clientX - boundingRect.left;
      const clickPercent = (mouseX / this.$el.clientWidth) * 100;
      this.$emit("jump", clickPercent);
    }
  },
  computed: {
    foregroundWidth: function() {
      return `${this.progress}%`;
    },
    sliderPosition: function() {
      return "0";
    }
  }
};
</script>

<style scoped>
.progress-bar-container {
  position: relative;
  opacity: 0.8;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}
.progress-bar-container:hover {
  opacity: 1;
}
.background-bar {
  background-color: lightgrey;
  width: 100%;
}
.foreground-bar {
  background-color: black;
}
</style>
