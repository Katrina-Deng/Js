<template>
  <div>
    <h3>A</h3>
    <comb></comb>
    <comc></comc>
  </div>
</template>

<script>
import comb from "./b";
import comc from "./c";
import eventbus from "../eventbus";
export default {
  components: { comb, comc },
  mounted() {
    eventbus.$on("helloA", (msg) => {
      console.log(msg);
    });
  },
};
</script>

<style scoped></style>
