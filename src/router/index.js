import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "Home",
    component: Vue.component("page-not-found", {
      template: "",
      created: function() {
        window.location.href = "/drink";
      },
    }),
  },
  {
    path: "/drink",
    name: "Drink",
    component: () => import("../views/Drinks.vue"),
  },
  {
   path: "/food",
   name: "Food",
   component: () => import("../views/Food.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
