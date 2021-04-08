import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import CreateEventPage from "./event/views/CreateEventPage.vue";
import EventPage from "./event/views/EventPage.vue";
import SignUpPage from "./user/views/SignUpPage.vue";
import LoginPage from "./user/views/Login.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: CreateEventPage
  },
  {
    path: "/event/:id",
    component: EventPage,
    props: true
  },
  {
    path: "/signup",
    component: SignUpPage
  },
  {
    path: "/login",
    component: LoginPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
