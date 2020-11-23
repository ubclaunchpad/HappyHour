<template>
  <div class="root-container">
    <TheNavbar />
    <router-view />
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
@import "~normalize.css";
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap");
/* Reset CSS in addition to Normalize.css*/
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-weight: normal;
}

ol,
ul {
  list-style: none;
}

/* Global Class Styling */
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(48, 48, 48);
}

.root-container {
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
/*
.heading {
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 44px;
  letter-spacing: -0.56px;
  color: RGB(48, 48, 48);
}
*/

.sub-heading {
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 44px;
  letter-spacing: -0.56px;
  color: RGB(48, 48, 48);
  text-align: left;
}

/* Headline 1 */
h1 {
  font-size: 5.9375rem; /*95px on default 16px*/
}

/* Headline 2 */
h2 {
  font-size: 3.6875rem; /*59px*/
}

/* Headline 3 */
h3 {
  font-size: 3rem; /*48px*/
}

/* Headline 4 */
h4 {
  font-size: 2.125rem; /*34px*/
}

/* Headline 5 */
h5 {
  font-size: 1.5rem; /*24px*/
}

/* Headline 6 */
h6 {
  font-size: 1.25rem; /*20px*/
}

/* Body1 */
body {
  font-size: 1rem; /*16px*/
}
</style>
