<template>
  <div>
    <h3>Parent Page</h3>
    <child
      title="Parent title transform to child"
      ref="childComp"
      @child="handlechild"
    ></child>
    <hr />
    <input type="text" name="" id="" ref="inputComp" />
  </div>
</template>

<script>
import child from "./child";
export default {
  components: { child },
  mounted() {
    // console.log(this.$children);
    // console.log(this.$children[0].getTitle())
    // console.log("ref--", this.$refs.childComp);
    // console.log(this.$refs.childComp.getTitle()); //Parent title transform to child

    this.$refs.inputComp.focus();
  },
  methods: {
    handlechild(msg) {
      this.$refs.inputComp.value = msg;
      console.log("child", msg);
    },
  },
};
</script>

<style scoped></style>
