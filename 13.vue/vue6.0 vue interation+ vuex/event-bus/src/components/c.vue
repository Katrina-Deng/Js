<template>
  <div>
    <h3>C</h3>
    <button @click="handleC">handleC</button>
  </div>
</template>

<script>
import eventbus from "../eventbus";
export default {
  methods: {
    handleC() {
      // eventbus.$emit("helloA", "我是组件C");
      eventbus.$emit("helloA", "我是组件C");
    },
  },
};
</script>

<style scoped></style>
