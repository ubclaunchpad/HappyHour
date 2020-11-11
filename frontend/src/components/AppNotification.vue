<!--Notification component shows the notification text
Notification can be shown by usign v-if-->
<template>
  <div class="notification">
    <p class="msg">{{ text }}</p>
    <i class="close"></i>
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
  /*
  position: relative;
  top: 10vh;
  background: rgb(71, 96, 243);
  
  border-radius: 4px;
  */

  position: absolute;
  width: 480px;
  height: 56px;
  right: 0px;
  top: 1.5rem;
  color: RGB(255, 255, 255);
  background: RGB(71, 96, 243);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.msg {
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 0%;

  letter-spacing: 0.5px;
  color: RGB(255, 255, 255);
  padding: 1rem;
}

.close {
  /*
  position: absolute;
  right: 32px;
  top: 32px;
  */
  width: 32px;
  height: 32px;
  opacity: 0.3;
  cursor: pointer;
  align-self: center;
}
.close:hover {
  opacity: 1;
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;

  content: " ";
  height: 33px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>
