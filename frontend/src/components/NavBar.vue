<template>
  <nav>
    <router-link v-for="link in links" :key="link.to" :to="link.to">{{
      link.title
    }}</router-link>
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
          title: "Counter",
          to: "/counter"
        }
      ]
    };
  }
};
</script>

<style></style>
