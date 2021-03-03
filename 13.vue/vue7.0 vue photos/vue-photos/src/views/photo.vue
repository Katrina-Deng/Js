<template>
  <div>
    <!-- 展示相关 -->
    <div class="container">
      <div class="photoHeader">
        <div class="imgContainer">
          <img class="photoName" src="http://localhost:8081/img/1.jpg" />
        </div>
        <div class="btnContainer">
          <span class="photoTitle">相册名称</span>
          <el-button type="primary" round @click="showUpload = true"
            >上传照片</el-button
          >
          <!-- <button class="mybtn" >上传照片</button> -->
        </div>
        <el-button
          type="warning"
          round
          class="logoutStyle"
          @click="handleLogout"
          >用户登出</el-button
        >
      </div>

      <div class="photoContainer" style="min-width : 1000px;">
        <template v-for="item in photos">
          <router-link
            :key="item.id"
            :to="{ name: 'detail', params: { id: item.id } }"
          >
            <photoItem :imgName="item.name" :imgUrl="item.imgUrl"></photoItem>
          </router-link>
        </template>

        <!-- <div class="photoItem">
          <img src="img/Home.png" />
          <span>
            home
          </span>
        </div> -->
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageTotal"
        :page-size="pageSize"
        @current-change="handleCurrentPage"
      >
      </el-pagination>
    </div>
    <!-- 上传相关 -->
    <el-dialog
      :visible.sync="showUpload"
      width="75%"
      title="上传照片-普通上传(H5)"
    >
      <uploadview
        @uploadPhotosCompleted="handleUploadPhotosCompleted"
      ></uploadview>
    </el-dialog>
  </div>
</template>

<script>
// import { getPhotos } from "../api";
import photoItem from "../components/photoItem";
import uploadview from "../components/uploadview";
import { mapState } from "vuex";
export default {
  data() {
    return {
      // photos: [],
      showUpload: false,
    };
  },
  components: {
    photoItem,
    uploadview,
  },
  created() {
    // 调用
    this.updatePhotos(1);
  },
  computed: {
    ...mapState(["photos", "pageSize", "pageTotal"]),
  },

  methods: {
    handleUploadPhotosCompleted() {
      // this.updatePhotos(1);
    },
    handleCurrentPage(page) {
      console.log(page);
      this.updatePhotos(page);
      // 请求后端接口更新页数的数
    },
    handleLogout() {
      this.$store.commit("logout");
      this.$router.replace({
        name: "login",
      });
    },
    // 有了鉴权之后这里就请求不到了。做一个请求拦截
    async updatePhotos(p) {
      this.$store.dispatch("updatePhotos", {
        p,
      });
      // const { data: resData } = await getPhotos();
      // this.photos = resData.data;
      // console.log("res-", this.photos);
    },
  },
};
</script>

<style scoped>
.logoutStyle {
  margin-top: 38.5px;
  margin-left: 10px;
  width: 104px;
  height: 40px;
}
</style>
