import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import CreateEventPage from "./event/views/CreateEventPage.vue";
import EventPage from "./event/views/EventPage.vue";
import RegistrationPage from "./user/views/RegistrationPage.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: CreateEventPage
  },
  {
    path: "/event",
    component: EventPage
  },
  {
    path: "/register",
    component: RegistrationPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
