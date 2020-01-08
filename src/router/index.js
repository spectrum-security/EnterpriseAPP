import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Surveillance from "../views/Surveillance.vue";
import Settings from "../views/Settings.vue";
import Companies from "../views/Companies.vue";
import Login from "../views/Login.vue";

// import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard, 
    requiresAuth: true
  },
  {
    path: "/companies",
    name: "companies",
    component: Companies
  },
  {
    path: "/surveillance",
    name: "surveillance",
    component: Surveillance
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings
  },
  {
    path: "*",
    name: "dashboard",
    component: Dashboard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "is-active"
});

// router.beforeEach((to, from, next) => {
//   console.log(store.state.isAuthenticated);
//   if (!store.state.isAuthenticated) next("/login");
//   else next();
// });

export default router;
