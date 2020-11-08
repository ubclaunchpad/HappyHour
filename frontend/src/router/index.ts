import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Event from "../views/Event.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Event
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/login",
    name: "Log In",
    component: () => import("../components/Counter.vue")
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import("../components/DatePicker.vue")
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
