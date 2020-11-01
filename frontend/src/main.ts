import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

// createApp(App).mount("#app");

// 1. Define route components.
// These can be imported from other files
// const Home = { template: '<div><h1 class="font-bold text-center">Home</h1></div>' };
import Calendar from "./components/Calendar.vue";
import Counter from "./components/Counter.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: "/", component: Calendar },
  { path: "/counter", component: Counter }
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes // short for `routes: routes`
});

createApp(App)
  .use(router)
  .mount("#app");
