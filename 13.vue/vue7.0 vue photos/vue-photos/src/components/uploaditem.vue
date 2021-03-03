<template>
  <div>
    <div class="uploadPhotoItem">
      <span class="myProgress" v-show="showPlan">
        <span class="plan" :style="{ width: plan + '%' }"></span>
        {{ plan }}%
      </span>
      <img :src="imgUrl" />
      <span class="pictureName">
        {{ file.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["plan", "file"],
  data() {
    return {
      imgUrl: "",
    };
  },
  computed: {
    showPlan() {
      return this.plan !== 0 && this.plan !== 100;
    },
  },
  //   把文件转换成base64显示
  created() {
    this.setImgUrl();
  },

  methods: {
    setImgUrl() {
      const fileRender = new FileReader();
      fileRender.readAsDataURL(this.file);
      fileRender.onload = () => {
        this.imgUrl = fileRender.result;
      };
    },
  },
};
</script>

<style scoped></style>
