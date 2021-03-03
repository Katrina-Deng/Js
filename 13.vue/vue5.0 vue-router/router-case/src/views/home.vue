<template>
  <div>
    <div class="home">
      <h3 class="mainTitle">All Heros</h3>
      <ul class="mainContianer">
        <li class="heroItem" v-for="(item, index) in data" :key="index">
          <img :src="require(`@/assets/images/${item.imgUrl}`)" alt="" />
          <router-link :to="{ name: 'hero', params: { id: index } }"
            ><span>{{ item.name }}</span></router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import data from "../assets/data.js";
export default {
  data() {
    return {
      data,
    };
  },
  methods: {},
};
</script>

<style scoped></style>
