<template>
  <div class="notification-container">
    <div
      class="notification-box"
      @click="close(index)"
      v-for="(message, index) in messages"
      :key="message.time"
    >{{message.content}}</div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  props: {
    messages: {
      type: Array,
      default: () => []
    },
    maxLimit: {
      type: Number,
      default: 5
    }
  },
  methods: {
    close: function(index) {
      this.$emit("close", index);
    }
  },
  watch: {
    messages: function() {
      if (this.messages.length > this.maxLimit) {
        this.$emit("close", 0);
      }
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
  width: auto;
  height: 3rem;
  line-height: 3rem;
  font-size: 1rem;
  margin-top: 10px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
}
</style>
