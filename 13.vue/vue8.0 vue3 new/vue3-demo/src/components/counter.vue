<template>
  <div>
    {{ countNum }} -- {{ double }} -- {{ info.name }}
    <br />
    <button @click="handleClick">add</button>
    <br />
    <input type="text" ref="input"/>
  </div>
</template>

<script>
import { computed, watch, ref, readonly, inject, onMounted } from "vue";
export default {
  props: ["count"],
  setup(props, context) {
    console.log("props", props);
    console.log("context", context);
    const countNum = ref(props.count);
    const info = readonly({ name: "Katrina" });
    const handleClick = () => {
      countNum.value++;
      context.emit("changeCount", countNum);
    };
    const double = computed(() => {
      return countNum.value * 2;
    });

    watch(double, (n, o) => {
      //   console.log(double);
      console.log("n", n);
      console.log("o", o);
    });

    const appMsg = inject("appProvide");
    console.log("appMsg", appMsg);

    // refs
    const input = ref('');
    onMounted(() => {
      console.log("input", input);
      input.value.focus();
    });
    return {
      countNum,
      double,
      handleClick,
      info,
      input
    };
  },
};
</script>

<style scoped></style>
