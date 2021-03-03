<template>
  <div>
    <!-- // 这里需要名字 和图片的地址 -->
    <div class="photoItem">
        <!-- 动态绑定url -->
      <img :src="imgUrl" />
      <span>
        {{ imgName }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  // 通过props 传参渲染
  props: ["imgName", "imgUrl"],
};
</script>

<style scoped></style>
