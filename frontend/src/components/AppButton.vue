<template>
  <button class="button">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppButton",
  props: {
    text: String
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap");

.button {
  background: rgb(71, 96, 243);
  border: 1px solid rgb(71, 96, 243);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 9px 26px;

  font-family: "IBM Plex Sans", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;

  color: rgb(255, 255, 255);
}
</style>
