<template>
  <div>
    <h4>Child Page</h4>
    {{ title }}
    <button @click="child()">Child emit</button>
  </div>
</template>

<script>
export default {
  props: ["title"],

  methods: {
    getTitle() {
      return this.title;
    },

    child() {
      this.$emit("child", "Child emit a message");
    },
  },
};
</script>

<style scoped></style>
