import Vue from "vue";
import Vuex from "vuex";
import { fetchLogin, fetchPhotos } from "../api/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  // 把token 读取存起来
  state: {
    token: localStorage.getItem("token") || "",
    photos: [],
    pageSize: 5,
    pageTotal: 10,
  },
  getters: {
    getPhotoDetailbyId(state) {
      return (id) => {
        return  state.photos.find((photoItem) => {
          return photoItem.id == id;
        });
      };
    },
  },
  mutations: {
    login(state, payload) {
      state.token = payload.token;
      // 把token存起来
      localStorage.setItem("token", state.token);
      // console.log("token", state.token);
    },
    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
    updatePhotos(state, payload) {
      state.photos = payload;
      console.log("state", state.photos);
    },
    photosPage(state, payload) {
      state.pageSize = payload.prepage;
      state.pageTotal = payload.total;
      console.log(state);
    },
  },
  actions: {
    //请求后端是异步的要通过actions
    login({ commit }, payload) {
      const { username, password } = payload;
      // 把这个promise返回出去，目的是让它赋值之后才给我们跳转
      return fetchLogin(username, password).then((res) => {
        console.log("res-", res);
        commit("login", {
          token: res.data.data.token,
        });
      });
    },
    updatePhotos({ commit }, payload) {
      const { p } = payload;
      console.log("payload", p);
      return fetchPhotos(p).then((res) => {
        console.log(res.data);
        commit("updatePhotos", res.data.data.photos);
        const { prepage, total } = res.data.data.page;
        commit("photosPage", { prepage, total });
      });
    },
  },
  modules: {},
});

export default store;
