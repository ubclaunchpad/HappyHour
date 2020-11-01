<template>
  <nav class="nav">
    <router-link
      class="router"
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      >{{ link.title }}
    </router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: "Home",
          to: "/"
        },
        {
          title: "About",
          to: "/about"
        },
        {
          title: "Counter",
          to: "/counter"
        },
        {
          title: "Calendar",
          to: "/calendar"
        }
      ]
    };
  }
};
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
