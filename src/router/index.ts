import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Create from "../views/Create.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Create
  },
  {
    path: "/datepicker",
    name: "DatePicker",
    component: () => import("../components/DatePicker.vue")
  },
  {
    path: "/event",
    name: "Event View",
    component: () => import("../views/Event.vue")
  },
  {
    path: "/login",
    name: "Log In",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: () => import("../views/Signup.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
