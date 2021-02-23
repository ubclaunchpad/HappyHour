import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import CreateEventPage from "./event/views/CreateEventPage.vue";
import EventPage from "./event/views/EventPage.vue";
import RegistrationPage from "./user/views/RegistrationPage.vue";
import Login from "./user/views/Login.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: Login,
    name: "Log In",
    meta: { requiresAuth: false }
  },
  {
    path: "/register",
    component: RegistrationPage,
    name: "Sign Up",
    meta: { requiresAuth: false }
  },
  {
    // placeholder
    path: "/",
    component: CreateEventPage,
    name: "About",
    meta: { requiresAuth: false }
  },
  {
    path: "/event",
    component: EventPage,
    name: "Event",
    meta: { requiresAuth: true }
  },
  {
    // placeholder
    path: "/",
    component: CreateEventPage,
    name: "Settings",
    meta: { requiresAuth: true }
  },
  {
    // placeholder
    path: "/",
    component: CreateEventPage,
    name: "About",
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
