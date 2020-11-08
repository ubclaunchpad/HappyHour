<template>
  <header class="main-header">
    <div class="container">
      <button class="logo" @click="$router.push('/')"><TheLogo /></button>
      <nav>
        <router-link
          class="router"
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          >{{ link.name }}
        </router-link>
      </nav>
    </div>
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
nav {
  align-self: flex-end;
}

nav a {
  font-weight: bold;
  text-decoration: none;
  /*color: rgb(221, 221, 221);*/
  color: black;
}

nav a.router-link-exact-active {
  color: rgb(71, 96, 243);
}

.router {
  padding: 0 0.5rem;
}

.main-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: white;
  padding: 1rem 1.875rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.container {
  max-width: 100%;
  margin: 0 auto;
}

.logo {
  border: none;
  /*color: rgb(221, 221, 221);*/
  color: black;
  background: none;
  cursor: pointer;
}

.logo:hover,
.logo:active .logo .router-link-exact-active {
  color: rgb(71, 96, 243);
}
</style>
