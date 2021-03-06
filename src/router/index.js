import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Surveillance from "../views/Surveillance.vue";
import Settings from "../views/Settings.vue";
import Companies from "../views/Companies.vue";
import Login from "../views/Login.vue";
import Users from "../views/Users.vue";
import CompanyPage from "../views/CompanyPage";
import NewCompany from "../views/NewCompany";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      title: "Dashboard"
    }
  },
  {
    path: "/companies",
    name: "Companies",
    component: Companies,
    meta: {
      requiresAuth: true,
      title: "Companies"
    }
  },
  {
    path: "/companies/:id",
    name: "Company Page",
    component: CompanyPage,
    meta: {
      title: "Company"
    },
    props: true
  },
  {
    path: "/companies/add_new",
    name: "Add Company",
    component: NewCompany,
    meta: {
      title: "Add Company"
    }
  },
  {
    path: "/surveillance",
    name: "Surveillance",
    component: Surveillance,
    meta: {
      requiresAuth: true,
      title: "Surveillance"
    }
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true,
      title: "Users"
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true,
      title: "Settings"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "is-active"
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!router.app.$store.getters.isAuthenticated) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

router.beforeEach((to, from, next) => {
  document.title = "Spectrum - " + to.meta.title;
  next();
});

export default router;
