<template>
  <div class="container-page">
    <TheNavbar />
    <router-view />
    <SidebarCollapsed />
  </div>
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

/* Reset CSS */
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

ol,
ul {
  list-style: none;
}

/* Global Class Styling */
#app {
  font-family: "IBM Plex Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(48, 48, 48);
}

.container-page {
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  background: RGB(229, 229, 229);
  z-index: -2;
}

.heading {
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 44px;
  letter-spacing: -0.56px;
  color: RGB(48, 48, 48);
}

.sub-heading {
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 44px;
  letter-spacing: -0.56px;
  color: RGB(48, 48, 48);
  text-align: left;
}
</style>
