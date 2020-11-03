<template>
  <nav class="nav">
    <router-link
      class="router"
      v-for="link in links"
      :key="link.path"
      :to="link.path"
      >{{ link.name }}
    </router-link>
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import { routes } from "../router";

export default defineComponent({
  setup() {
    return { links: routes };
  }
});
</script>

<style scoped>
.nav {
  padding: 1.875rem;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}

.router {
  padding: 0.5rem;
}
</style>
