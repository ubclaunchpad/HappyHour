<template>
  <nav class="navbar">
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

    <div :class="['nav', { 'nav-open': isNavOpen }]">
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
        ><h6>{{ link.name }}</h6>
      </router-link>

      <!-- <div class="button">
        <AppButton v-if="isUserLoggedIn" class="btn" @click="logout()">
          Log Out</AppButton
        >
        <AppButton v-else class="btn" text="Log In" @click="login()">
          Log In
        </AppButton>
      </div> -->
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from "vue";
import { useRouter } from "vue-router";

import TheLogo from "@/common/TheLogo.vue";
import AppIcon from "@/common/AppIcon.vue";
import AppButton from "@/common/AppButton.vue";
import userClient from "../user/client";
import { routes } from "../router";
import { app } from "../db";
import { useUser } from "@/user/hooks";

export default defineComponent({
  name: "TheNavbar",
  components: {
    AppIcon,
    TheLogo
    // AppButton
  },

  data() {
    return {
      isNavOpen: false,
      isUserLoggedIn: false
    };
  },

  computed: {
    links() {
      return routes;
    }
  },

  mounted() {
    const { user, isLoading } = useUser();
    watchEffect(async () => {
      if (!isLoading.value) {
        if (!user.value) {
          this.isUserLoggedIn = false;
        } else {
          this.isUserLoggedIn = true;
        }
      }
    });
  },

  methods: {
    async logout() {
      this.isUserLoggedIn = false;
      await userClient.logout();
      this.$router.push("/login");
    },
    login() {
      this.$router.push("/login");
    }
  }
});
</script>

<style scoped>
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
  top: 0;
  right: 0;
  width: 60vw;
  height: 100vh;
  padding: 4rem 2rem 2rem 2rem;
  background: var(--color-card);
  box-shadow: var(--shadow-base);
  transition: all 0.2s ease-out;
  transform: translateX(100%);
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

.navbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: var(--color-card);
}

/* Highlight on active router page */
.router.router-link-exact-active {
  color: var(--color-primary);
}
</style>
