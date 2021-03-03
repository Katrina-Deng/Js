<template>
  <div>
    <h3>{{ data[id].name }}</h3>
        <div class="secret">
      <router-link :to="{ name: 'secret', params: { name: data[id].name } }">
        <div class="backLink">win secret</div></router-link>
      <router-view></router-view>
    </div>
    <div class="mainPanel">
      <img :src="require(`@/assets/images/${data[id].imgUrl}`)" />
      <section class="detail">
        <div class="pos">定位: {{ data[id].position }}</div>
        <div class="des">
          描述:
          {{ data[id].description }}
        </div>
      </section>
    </div>

  </div>
</template>

<script>
import data from "../assets/data.js";
export default {
  props: ["id"],
  data() {
    return {
      data,
      result: null,
    };
  },
};
</script>

<style scoped>
h3 {
  font-size: 35px;
  padding: 5px;
}
</style>
