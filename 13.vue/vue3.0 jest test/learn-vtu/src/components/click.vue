<template>
  <div>
    <span d-TestId="title"> {{ msg }}</span>
    <br />
    <span d-TestId="count" style="margin-right: 30px">{{ num }}</span>
    <button @click="addNum">addnum</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      msg: "Hello vue",
    };
  },
  methods: {
    addNum() {
      this.num++;
    },
  },
};
</script>

<style scoped></style>
