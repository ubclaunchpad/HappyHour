<template>
  <TheNavbar />
  <router-view />
  <SidebarCollapsed />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheNavbar from "./components/TheNavbar.vue";
import SidebarCollapsed from "./components/SidebarCollapsed.vue";

export default defineComponent({
  name: "App",
  components: {
    TheNavbar,
    SidebarCollapsed
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
}
</style>
