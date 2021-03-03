// 封装axios

import axios from "axios";
import store from "../store";
import router from "../router/index";
import Vue from "vue";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = "http://localhost:8080/api/";

axios.interceptors.request.use((config) => {
  // 带上token
  if (store.state.token) {
    config.headers.authorization = "Bearer " + store.state.token;
  }
  return config;
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const { response } = err;
    switch (response.status) {
      case 401:
        //   提示可以弹窗
        Vue.prototype
          .$confirm("登录过期,重新登录")
          .then(() => {
            router.replace({
              name: "login",
            });
          })
          .catch(() => {
            //   取消逻辑
            router.replace({
                name: "login",
              });
          });

        break;

      default:
        break;
    }
  }
);

export default axios;
