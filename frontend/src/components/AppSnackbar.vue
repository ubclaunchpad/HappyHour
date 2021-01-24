<!--Notification component shows the notification text
Notification can be shown by usign v-if-->
<template>
  <div class="snackbar">
    <p class="msg">{{ text }}</p>
    <!--<i class="close" @click="update"></i>-->
    <svg
      class="close"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @click="update"
    >
      <path
        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
        fill="white"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppSnackbar",
  props: {
    text: {
      type: String,
      required: true
    }
  },
  emits: ["update"],
  methods: {
    update() {
      this.$emit("update");
    }
  }
});
</script>

<style scoped>
.snackbar {
  position: absolute;
  width: 480px;
  height: 56px;
  right: 0;
  top: 1.5rem;
  color: rgbB(255, 255, 255);
  background: rgb(55, 87, 134);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.msg {
  color: rgb(255, 255, 255);
  padding: 1rem;
}

/* FIXME: Adjust relative units */
.close {
  position: absolute;
  right: 1.5rem;
  width: 20px;
  height: 20px;
  opacity: 1;
  cursor: pointer;
  align-self: center;
}

.close:hover {
  opacity: 0.3;
}

.close:before,
.close:after {
  position: absolute;
  right: 1.5rem;

  content: " ";
  height: 21px;
  width: 2px;
  background-color: RGB(255, 255, 255);
}
</style>
