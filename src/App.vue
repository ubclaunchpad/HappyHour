<template>
  <div class="root-container">
    <TheNavbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheNavbar from "./common/TheNavbar.vue";

export default defineComponent({
  name: "App",
  components: {
    TheNavbar
  }
});
</script>

<style>
@import "~normalize.css";

/*------------------------------------*\
  # Reset CSS
\*------------------------------------*/
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-weight: normal;
  /* line-height: 0%; */
}

ol,
ul {
  list-style: none;
}

a {
  text-decoration: none;
}

/*------------------------------------*\
  # Global Styling
\*------------------------------------*/

/* Colour Theming */
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

/* Text, Font, Colour */
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text-primary);
}

/* Root page container */
.root-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  background: var(--color-background);
}

/* Card Base */
.card {
  padding: 2rem;
  border-radius: 5px;
  background: var(--color-card);
}

/* Headline 1 */
h1 {
  font-size: 5.9375rem; /*95px on default 16px*/
}

/* Headline 2 */
h2 {
  font-size: 3.6875rem; /*59px*/
  /* letter-spacing: -0.5px;
}

/* Headline 3 */
h3 {
  font-size: 3rem; /*48px*/
}

/* Headline 4 */
h4 {
  font-size: 2.125rem; /*34px*/
  /* letter-spacing: 0.25px;
}

/* Headline 5 */
h5 {
  font-size: 1.5rem; /*24px*/
}

/* Headline 6 */
h6 {
  font-size: 1.25rem; /*20px*/
  /* letter-spacing: 0.15px;
}

/* Body 1 */
body {
  font-size: 1rem; /*16px*/
}

.body1 {
  font-size: 1rem; /*16px*/
  /* letter-spacing: 0.5px;
}

/* Body 2 */
.body2 {
  font-size: 0.875rem; /*14px*/
  /* letter-spacing: 0.0025rem; /*0.4px*/
}

/* Subtitle 1 */
.subtitle1,
.sub1 {
  font-size: 1rem; /*16px*/
  /* letter-spacing: 0.15px;
}

/* Subtitle 2 */
.subtitle2,
.sub2 {
  font-size: 0.875rem; /*14px*/
  /* letter-spacing: 0.1px; */
}

/* Button */
button,
.button,
.btn {
  font-size: 0.875rem; /*14px*/
  font-weight: 600;
  letter-spacing: 0.078125rem; /*1.25px*/
  background: none;
  cursor: pointer;
}

button:hover,
.button:hover,
.btn:hover {
  opacity: 0.8;
}

/* Overline */
.overline {
  font-size: 0.625rem; /*10px*/
}

/* Caption */
.caption {
  font-size: 0.75rem; /*12px*/
  /* letter-spacing: 0.0025rem; /*0.4px*/
}
</style>
