<template>
  <div>
    <div class="eheader">
      <h3 style="display:inline-block">王者荣耀</h3>
      <el-menu
        class="el-menu-demo eItem"
        mode="horizontal"
        :default-active="activeIndex"
      >
        <el-menu-item index="4" class="eItem">
          <router-link :to="{ name: 'home' }" class="itemName">Home</router-link>
        </el-menu-item>
          <el-menu-item
            :index="index.toString()"
            class="eItem"
            v-for="(item, index) in data"
            :key="index">
             <router-link :to="{ name: 'hero', params: { id: index } }">
               <span class="itemName">{{ item.name }}</span> 
             </router-link>
          </el-menu-item>
       
      </el-menu>
    </div>
  </div>
</template>

<script>
import data from "../assets/data.js";
export default {
  data() {
    return {
      msg: "1",
      data,
      activeIndex: null,
    };
  },
};
</script>

<style scoped>
.itemName{
  /* background-color: lightblue; */
  display: block;
  padding: 0px 20px ;
}

.eItem{
   /* background-color: red; */
   padding: 0;
}
</style>
