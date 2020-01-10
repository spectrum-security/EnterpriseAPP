import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Surveillance from "../views/Surveillance.vue";
import Settings from "../views/Settings.vue";
import Companies from "../views/Companies.vue";
import Login from "../views/Login.vue";
import Users from "../views/Users.vue";

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
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: "/companies",
    name: "companies",
    component: Companies,
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: "/surveillance",
    name: "surveillance",
    component: Surveillance,
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: "/users",
    name: "users",
    component: Users,
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "is-active"
});

export default router;
