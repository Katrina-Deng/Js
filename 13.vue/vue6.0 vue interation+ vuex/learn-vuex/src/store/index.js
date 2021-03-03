import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: "katrina",
    age: 18,
    hobby: "read",
  },
  getters: {
    ageplus: (state) => {
      return state.age + 5;
    },
  },
  mutations: {
    ageCount: (state, payload) => {
      console.log("payload", payload);
      state.age++;
    },
    changemsg: (state) => {
      state.name = state.name + "Deng";
    },
  },
  actions: {
    getMsg({ commit }) {
      console.log("run here");
      setTimeout(() => {
        commit("changemsg");
      }, 1000);
    },
  },
  modules: {},
});
