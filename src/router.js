import Vue from "vue";
import Router from "vue-router";
const _import = file => () => import("@/views/" + file + ".vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: _import(/* webpackChunkName: "home" */ "home")
    },
    {
      path: "/about",
      name: "about",
      component: _import(/* webpackChunkName: "about" */ "about")
    },
    {
      path: "/demo",
      name: "demo",
      component: _import(/* webpackChunkName: "demo" */ "demo")
    }
  ]
});
