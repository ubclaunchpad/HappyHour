import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Create from "../views/Create.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Create
  },
  {
    path: "/event-create",
    name: "Create Event",
    component: () => import("../views/Create.vue")
  },
  {
    path: "/datepicker",
    name: "DatePicker",
    component: () => import("../components/EventDatePicker.vue")
  },
  {
    path: "/event",
    name: "Event View",
    component: () => import("../views/Event.vue")
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: () => import("../views/Placeholder.vue")
  },
  {
    path: "/login",
    name: "Log In",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import("../views/Placeholder.vue")
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
