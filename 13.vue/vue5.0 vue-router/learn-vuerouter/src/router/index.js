import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import classPage from "../views/classPage.vue";
import NotFound from "../views/NotFound.vue";
import subclass from "../views/subclass.vue";
import oneView from "../views/oneView.vue";
import twoView from "../views/twoView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/homePage",
    redirect: "/",
  },

  {
    path: "/",
    alias: "/home",
    components: {
      default: Home,
      one: oneView,
      two: twoView,
    },
  },
  {
    path: "/class/:id",
    component: classPage,
    props: true,
    name: "classPage",
    children: [
      {
        path: ":name",
        component: subclass,
        props: true,
      },
    ],
    meta: {
      isRequired: true,
    },
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({ routes });

export default router;
