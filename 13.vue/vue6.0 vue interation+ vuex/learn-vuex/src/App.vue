<template>
  <div id="app">
    {{ myname }} -- {{ myage }} -- {{ myhobby }}
    <p>root app ageplus {{ ageplus }}</p>
    <componentA></componentA>
    <p><button @click="commitAge">click to plus age</button></p>
    <hr />
    async change actions
    <div>{{ myname }}</div>
    <button @click="handlemsg">changemsg</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import componentA from "./components/componentA.vue";

export default {
  components: { componentA },
  name: "App",
  mounted() {
    console.log(this.$store.state);
  },
  computed: {
    // ...mapState(["name", "age", "hobby"]),
    ...mapState({
      myname: "name",
      myage: "age",
      myhobby: "hobby",
    }),
    ...mapGetters(["ageplus"]),
  },
  methods: {
    commitAge() {
      this.$store.commit("ageCount", "我增加了一岁");
    },
    handlemsg() {
      this.$store.dispatch("getMsg");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
