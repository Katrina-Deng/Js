<template>
  <div>
    <h3>B</h3>
    <button @click="handleB">handleB</button>
  </div>
</template>

<script>
import eventbus from "../eventbus";
export default {
  methods: {
    handleB() {
      eventbus.$emit("helloA", "我是组件b");
    },
  },
};
</script>

<style scoped></style>
