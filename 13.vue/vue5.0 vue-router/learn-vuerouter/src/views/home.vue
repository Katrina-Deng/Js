<template>
  <div>
    Home Page
    <hr />
    <router-link :to="{ name: 'classPage', params: { id: 123 } }"
      >go to classPage page</router-link
    >
    <button @click="toClasspage">click to classPage page</button>
    <br />
    <router-link :to="'/class/123 / Ellen'">go to subclass page</router-link>

    <router-view name="one"></router-view>
    <router-view name="two"></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    toClasspage() {
      console.log(this.$router);
      this.$router.push({ name: "classPage" });
    },
  },
};
</script>

<style scoped></style>
