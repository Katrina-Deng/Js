import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home.vue";
import notFound from "../views/404.vue";
import heroDetail from "../views/heroDetail.vue";
import secret from "../views/secret.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/hero/:id",
    name: "hero",
    component: heroDetail,
    props: true,
    children: [
      {
        path: ":name",
        name: "secret",
        component: secret,
        props: true,
      },
    ],
  },
  {
    path: "*",
    name: "404",
    component: notFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
