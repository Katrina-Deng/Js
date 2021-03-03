<template>
  <div>
    <!-- <h3 class="addTitle">
          上传照片-普通上传(H5)<span class="close">╳</span>
        </h3> -->
    <div class="upload-style">
      <div class="photoTitles">
        <span class="uploadTo">上传到</span>
        <div class="photoSelect">
          <img class="showPhoto" src="https://picsum.photos/70" />
          相册名称
        </div>
      </div>

      <!-- 上传按钮 -->
      <div class="showContainer" v-show="showStartUploadContainer">
        <div class="uploadContainer">
          <span class="fileinput-button">
            <span>上传图片</span>
            <input
              class="imgFile"
              type="file"
              name=""
              multiple="multiple"
              @change="handleImg"
            />
          </span>
          <span class="hint">
            按住Ctrl可多选
          </span>
        </div>
      </div>

      <!-- 显示待上传图片  -->
      <div class="loadContainer" v-show="showWantUploadContainer">
        <div class="wantUpload">
          <template v-for="(item, index) in uploadPhotos">
            <uploaditem
              :plan="item.plan"
              :file="item.file"
              :key="index"
            ></uploaditem>
          </template>
          <!-- <uploaditem :plan="50"></uploaditem> -->
        </div>

        <div class="addStyle">
          <span class="fileinput-add">
            <span></span>
            <input class="imgFile-add" type="file" multiple="multiple" />
          </span>
        </div>
        <!-- 开始上传按钮 -->
        <div class="bottomStyle">
          <span class="uploadBtn" @click="handleUploadPhotos">开始上传</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uploaditem from "../components/uploaditem";
import { uploadPhotos } from "../api";
export default {
  components: {
    uploaditem,
  },
  data() {
    return {
      uploadPhotos: [],
    };
  },
  //   如果  uploadPhotos: 有长度就显示待上传页面，如果 没有长度就显示 开始上存页面，依赖数据的属性
  // 用computed
  computed: {
    showStartUploadContainer() {
      return this.uploadPhotos.length === 0;
    },
    showWantUploadContainer() {
      return this.uploadPhotos.length !== 0;
    },
  },
  methods: {
    async handleUploadPhotos() {
      // uploadPhotos
      for (const item of this.uploadPhotos) {
        await uploadPhotos(item.file, (e) => {
          const planPercent = Math.ceil((e.loaded / e.total) * 100);
          item.plan = planPercent;
        });
      }
      this.$message({
        message: "图片上存成功",
        type: "success",
      });
      //  上存完成
      this.reset();
      //   上存完成后要再次调取接口获得数据，那么获得数据逻辑再父组件所以组件之间要通信了
      this.$emit("uploadPhotosCompleted");
    },
    reset() {
      this.uploadPhotos = [];
    },
    handleImg(e) {
      // console.log(e.target.files);
      /* eslint-disable */
      let photoItems = Array.from(e.target.files).map((file) => {
        return {
          plan: 0,
          file,
        };
      });
      /* eslint-disable */
      // console.log("photoItems", photoItems);
      this.uploadPhotos.push(...photoItems);
      // console.log(this.uploadPhotos);
    },
  },
};
</script>

<style scoped>
.upload-style {
  width: 100%;
  height: 500px;
}
</style>
