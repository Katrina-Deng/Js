<template>
  <div>
    componentA

    <p>componentA get ageplus {{ ageplus }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["ageplus"]),
  },
};
</script>

<style scoped></style>
