<template>
  <div>
    ComponentB
    <hr />
    <ComC v-on="$listeners"></ComC>
  </div>
</template>

<script>
import ComC from "./ComC";
export default {
  components: {
    ComC,
  },
  mounted() {
    console.log(this.$listeners);
  },
};
</script>

<style scoped></style>
