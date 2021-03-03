<template>
  <div>
    ComponentA
    <hr />
    <Comb @hello="hello"></Comb>
    <p>
      <userButton disabled></userButton>
    </p>
  </div>
</template>

<script>
import Comb from "./Comb";
import userButton from "./button";
export default {
  components: {
    Comb,
    userButton,
  },
  //   //   依赖注入
  //   provide: {
  //     title: "This is ComA title",
  //   },
  provide() {
    return {
      title: "This is ComA title",
      compA: this,
    };
  },
  methods: {
    sayName() {
      console.log("This is ComponentA");
    },
    hello() {
      console.log("hello components");
    },
  },
};
</script>

<style scoped></style>
