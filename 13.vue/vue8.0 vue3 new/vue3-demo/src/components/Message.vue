<template>
  <div>
    {{ reactMsg.message }}
    <br/>
    {{ refMsg }}
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup() {
    const reactMsg = reactive({ message: "title" });
    const refMsg = ref("ref title");
    return {
      reactMsg,
      refMsg,
    };
  },
};
</script>

<style scoped></style>
