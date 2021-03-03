<template>
  <div>
    <h3>This's subClass Page</h3>
    <!-- <p>{{this.name}}</p> -->
    <img src="https://picsum.photos/200?random=1" alt="" />
  </div>
</template>

<script>
export default {
  props: ["name"],
  created() {
    console.log("subClass --", this.name);
  },
};
</script>

<style scoped></style>
