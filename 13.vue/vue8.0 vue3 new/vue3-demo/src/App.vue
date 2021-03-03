<template>
  <Counter :count="10" @changeCount="handleChange"></Counter>
</template>

<script>
// import Buttom from "./components/buttom.vue";
// import ButtonA from "./components/ButtonA";
// import Message from "./components/Message";
import Counter from "./components/counter";
import {provide} from 'vue';
export default {
  name: "App",
  components: { Counter },

  setup() {
    const handleChange = (count) => {
      console.log("father"+count.value);
    };
    provide('appProvide','123456')
    return {
      handleChange,
    };
  },
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
