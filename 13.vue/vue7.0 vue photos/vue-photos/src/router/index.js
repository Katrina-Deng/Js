import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login.vue";
import photo from "../views/photo.vue";
import store from "../store/";
import Detail from "../views/Detail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/getPhotos",
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/getPhotos",
    name: "getPhotos",
    component: photo,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: Detail,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

// 检测token
router.beforeEach((to, form, next) => {
  // 判断需要鉴权？ 如果要就看有没有token 没有就返回login
  // 确保next()必须执行
  if (to.meta.requiredAuth) {
    if (store.state.token) {
      next();
    } else {
      next({
        name: "login",
      });
    }
  } else {
    next();
  }
});

export default router;

// 动态引入
/**
 *     // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ //'../views/About.vue')
