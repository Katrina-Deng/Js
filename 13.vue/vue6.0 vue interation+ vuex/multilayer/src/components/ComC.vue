<template>
  <div>
    ComponentC
    <div>{{ title }}</div>
  </div>
</template>

<script>
export default {
  inject: ["title", "compA"],
  mounted() {
    this.compA.sayName();
    console.log(this.$listeners);
  },
};
</script>

<style scoped></style>
