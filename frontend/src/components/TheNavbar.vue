<template>
  <header class="container">
    <button class="logo" @click="$router.push('/')">
      <TheLogo />
    </button>
    <nav>
      <router-link
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="router h6"
        >{{ link.name }}
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { routes } from "../router";
import TheLogo from "@/components/TheLogo.vue";

export default defineComponent({
  name: "TheNavbar",
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
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  padding: 0 2.5rem;
  background-color: rgb(255, 255, 255);
}

/* Logo Button */
.logo {
  background: none;
  cursor: pointer;
}

.logo:hover {
  color: rgba(55, 87, 134, 0.8);
}

/* Router Links */
.router {
  padding: 0 2rem;
  text-decoration: none;
  color: rgb(2, 15, 34);
}

/* Highlight on active router page */
.router.router-link-exact-active {
  color: rgb(55, 87, 134);
}
</style>
