<template>
  <header class="container">
    <button class="logo" @click="$router.push('/')">
      <TheLogo />
    </button>
    <nav>
      <router-link
        class="router"
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        >{{ link.name }}
      </router-link>
    </nav>
  </header>
</template>

<script>
import { defineComponent } from "vue";
import { routes } from "../router";
import TheLogo from "./TheLogo";

export default defineComponent({
  components: { TheLogo },
  setup() {
    return { links: routes };
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(255, 255, 255);
  padding: 1rem 1.875rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.logo {
  border: none;
  background: none;
  cursor: pointer;
  color: rgb(48, 48, 48);
}

.logo:hover {
  color: rgb(71, 96, 243);
}

/* Removed button border on focus - may be an  accessibility issues */
.logo:focus {
  outline: 0 !important;
}

/* Router Links */
.router {
  text-decoration: none;
  font-weight: bold;
  padding: 0 0.5rem;
  color: rgb(48, 48, 48);
}

/* Highlight on active router page */
.router.router-link-exact-active {
  color: rgb(71, 96, 243);
}
</style>
