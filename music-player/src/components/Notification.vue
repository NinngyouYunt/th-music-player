<template>
  <div class="notification-container">
    <div
      class="notification-box"
      @click="close(index)"
      v-for="(message, index) in messages"
      :key="index"
    >
      <div>{{message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return { timeouts: [] };
  },
  props: {
    messages: {
      type: Array,
      default: () => ["Default Message 1", "Default Message 2"]
    },
    lifeSpan: {
      type: Number,
      default: 5000
    }
  },
  methods: {
    close: function(index) {
      window.clearTimeout(this.timeouts[index]);
      this.timeouts.splice(index);
      this.$emit("close", index);
    }
  },
  watch: {
    messages: function() {
      const index = this.messages.length - 1;
      this.timeouts.push(
        window.setTimeout(() => {
          this.close(index);
        }, this.lifeSpan)
      );
    }
  }
};
</script>

<style scoped>
.notification-container {
  display: flex;
  flex-direction: column-reverse;
}
.notification-box {
  background-color: pink;
  width: 15rem;
  height: 3rem;
  line-height: 3rem;
  font-size: 1rem;
  margin-top: 10px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
}
</style>
