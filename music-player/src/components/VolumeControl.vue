<template>
  <div class="volumeControlContainer" :style="containerStyle">
    <input
      type="range"
      min="1"
      max="100"
      value="0"
      class="slider"
      id="volume"
      v-model="volume"
      :style="sliderStyle"
    />
  </div>
</template>

<script>
export default {
  name: "VolumeControl",
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "1.5rem"
    },
    initialVolume: {
      type: Number,
      default: 50
    }
  },
  data: function() {
    return {
      volume: this.initialVolume,
      containerStyle: {
        width: this.width,
        height: this.height
      },
      sliderStyle: {
        height: this.height
      }
    };
  },
  watch: {
    volume() {
      this.$emit("changeVolume", this.volume);
    }
  },
  methods: {
    applyCSS() {
      const tagId = "runtime-style-volume-height";
      const cssRule = `.slider::-webkit-slider-thumb { height: ${this.height}} .slider::-moz-range-thumb {height: ${this.height}}`;
      this.utils.applyCSS(this, tagId, cssRule);
    }
  },
  mounted: function() {
    this.applyCSS();
  },
  beforeUpdate: function() {
    this.applyCSS();
  }
};
</script>

<style scoped>
.slider {
  appearance: none;
  width: 100%;
  background: lightblue;
  opacity: 0.7;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 8%; /* Set a specific slider handle width */
  background: lightcoral; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  appearance: none;
  width: 8%; /* Set a specific slider handle width */
  background: lightcoral; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
</style>
