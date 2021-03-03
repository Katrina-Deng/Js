<template>
  <div>
    <el-container class="detailstyle">
      <el-header>{{ item.name }}</el-header>
      <el-main>
        <!-- <p>{{ id }}</p> -->
        <img :src="item.imgUrl" alt="" style="width: 50%" />
        <br />
        <el-button @click="Back">Go back</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { fetchPhoto } from "../api";
export default {
  props: ["id"],
  data() {
    return {
      item: {},
    };
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
  },
  created() {
    const photoItem = this.$store.getters.getPhotoDetailbyId(this.id);
    if (photoItem) {
      // 如果有值就从 store拿
      this.item = photoItem;
      // console.log("item", this.id);
    } else {
      // 如果没有值说明直接访问url 就请求后端接口
      // 这里有id 可以直接请求后端
      //fetchPhoto
      // 这里不需要 去store因为没有数据需要保存到store 所以直接用就可以了
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      fetchPhoto(this.id).then((res) => {
        // console.log(res.data.data);
        this.item = res.data.data;
        loading.close();
      });
    }
  },
};
</script>

<style scoped>
.detailstyle {
  color: white;
}
</style>
