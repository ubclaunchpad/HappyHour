import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
<<<<<<< HEAD
import Event from "../views/Event.vue";
=======
import Create from "../views/Create.vue";
>>>>>>> #21 implement participant event screen (#46)

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
<<<<<<< HEAD
    component: Event
=======
    component: Create
  },
  {
    path: "/event-create",
    name: "Create Event",
    component: () => import("../views/Create.vue")
>>>>>>> #21 implement participant event screen (#46)
  },
  {
    path: "/datepicker",
    name: "DatePicker",
<<<<<<< HEAD
    component: () => import("../components/DatePicker.vue")
=======
    component: () => import("../components/EventDatePicker.vue")
>>>>>>> #21 implement participant event screen (#46)
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
