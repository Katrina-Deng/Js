<template>
  <div id="app">
    <!-- <Photo></Photo> -->
    <!-- <login></login> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Photo from "./views/photo.vue";
// import login from "./views/login";
export default {
  name: "app",
  // Photo
  components: {},
  created() {},
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
