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

:root {
  --shadow-base: 0px 4px 4px rgba(0, 0, 0, 0.25);
  --color-text-primary: #020f22;
  --color-text-secondary: #81929e;
  --color-primary: #375786;
  --color-secondary: #8fc0c6;
  --color-background: #f2f7fa;
  --color-disabled: #c4c4c4;
  --color-failure: #cf5c36;
  --color-success: #acc196;
  --color-card: #fffffc;
  --color-border: #c0cbd2;
}

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
  color: rgba(2, 15, 34, 1);
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
  display: flex;
  flex-direction: column;
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
h6,
.h6 {
  font-size: 1.25rem; /*20px*/
}

/* Body 1 */
body {
  font-size: 1rem; /*16px*/
}

/* Body 2 */
.body2 {
  font-size: 0.875rem; /*14px*/
}

/* Subtitle 1 */
.subtitle1 {
  font-size: 1rem; /*16px*/
}

/* Subtitle 2 */
.subtitle2 {
  font-size: 0.875rem; /*14px*/
}

/* Button */
.button {
  background: none;
  font-size: 0.875rem; /*14px*/
  /*font-weight: 600;*/
  /*letter-spacing: 0.078125rem; /*1.25px*/
}

/* Overline */
.overline {
  font-size: 0.625rem; /*10px*/
}

/* Caption */
.caption {
  font-size: 0.75rem; /*12px*/
}
</style>
