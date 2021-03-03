<template>
  <div>
    <button @click="show = true">open</button>
    <teleport to="body">
      <div class="container" v-if="show">
        你看到我了
        <button @click="show = false">close</button>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped></style>
