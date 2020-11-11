<!--Notification component shows the notification text
Notification can be shown by usign v-if-->
<template>
  <div class="notification">
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Notification",
  props: {
    text: String
  }
});
</script>

<style scoped>
.notification {
  position: relative;
  top: 10vh;
  background: rgb(71, 96, 243);
  color: rgb(255, 255, 255);
  border-radius: 4px;
}
</style>
