import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import CreateEventPage from "./event/views/CreateEventPage.vue";
import EventPage from "./event/views/EventPage.vue";
import SignUpPage from "./user/views/SignUpPage.vue";
import LoginPage from "./user/views/Login.vue";
import UserDashboard from "./user/views/UserDashboard.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: CreateEventPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/event/:id",
    component: EventPage,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard",
    component: UserDashboard,
    name: "My Dashboard",
    meta: { requiresAuth: true }
  },
  {
    path: "/signup",
    component: SignUpPage,
    name: "Signup"
  },
  {
    path: "/login",
    component: LoginPage,
    name: "Login"
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
