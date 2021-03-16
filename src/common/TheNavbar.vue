<template>
  <header class="container">
    <router-link class="logo" to="/">
      <TheLogo />
    </router-link>
    <button
      aria-label="open navigation"
      class="nav-toggle open-nav"
      @click="isNavOpen = true"
    >
      <AppIcon icon="bars" />
    </button>
    <nav :class="['nav', { 'nav-open': isNavOpen }]">
      <button
        aria-label="close navigation"
        class="nav-toggle close-nav"
        @click="isNavOpen = false"
      >
        <AppIcon icon="times" width="32" />
      </button>
      <router-link
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="router"
        >{{ link.name }}
      </router-link>
      <div class="button">
        <AppButton
          v-if="isLoggedIn"
          class="btn"
          text="Log Out"
          @update="logout()"
        />
        <AppButton
          v-if="!isLoggedIn"
          class="btn"
          text="Log In"
          @update="login()"
        />
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TheLogo from "@/common/TheLogo.vue";
import AppIcon from "@/common/AppIcon.vue";
import AppButton from "@/common/AppButton.vue";
import { routes } from "../router";

import userClient from "../user/client";

export default defineComponent({
  name: "TheNavbar",
  components: { AppIcon, TheLogo, AppButton },
  data() {
    return {
      isNavOpen: false
      // isLoggedIn: true
    };
  },
  computed: {
    links() {
      return routes;
    },
    isLoggedIn() {
      return userClient.currentUser() != null;
    }
  },
  methods: {
    logout() {
      userClient.logout();
    },
    login() {
      this.$router.push("/login");
    }
  }
});
</script>

<style scoped>
a {
  text-decoration: none;
  display: block;
  color: inherit;
}

button {
  background: none;
}

.open-nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-nav {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.nav {
  position: fixed;
  height: 100vh;
  background: white;
  top: 0;
  right: 0;
  width: 60vw;
  padding: 2rem;
  padding-top: 4rem;
  color: rgb(2, 15, 34);
  transition: all 0.2s ease-out;
  transform: translateX(100%);
  box-shadow: var(--shadow-base);
  z-index: 10;
}

.nav-open {
  transform: translateX(0);
}

.router {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

@media screen and (min-width: 768px) {
  .nav-toggle {
    display: none;
  }

  .nav {
    position: relative;
    width: auto;
    height: auto;
    padding: 0;
    transform: translateX(0);
    display: flex;
    box-shadow: none;
  }

  .router {
    margin-right: 1rem;
    margin-bottom: 0;
    font-size: initial;
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
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

/* Highlight on active router page */
.router.router-link-exact-active {
  color: rgb(55, 87, 134);
}
</style>
