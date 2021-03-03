<template>
  <div>
    <h3>class Page Params</h3>
    <img src="https://picsum.photos/200/300?random=1" alt="" />
    <!-- 子路由注入 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ["id"],
  created() {
    console.log(this.id);
  },
};
</script>

<style scoped></style>
