<template>
  <div id="app">
    <h3>Root App</h3>
        <hr>
    <ComA></ComA>
  </div>
</template>

<script>
import ComA from "./components/ComA";
export default {
  name: "App",
  components: { ComA },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
