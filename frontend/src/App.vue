<template>
  <TheNavbar />
  <router-view />
  <SidebarCollapsed />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheNavbar from "./components/TheNavbar.vue";

export default defineComponent({
  name: "App",
  components: {
    TheNavbar
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap");
#app {
  font-family: "IBM Plex Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(48, 48, 48);
}

/* Reset CSS */
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}
</style>
