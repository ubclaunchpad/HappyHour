<template>
  <svg
    :width="width"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30 0C13.737 0 0 13.737 0 30C0 46.263 13.737 60 30 60C46.263 60 60 46.263 60 30C60 13.737 46.263 0 30 0ZM30 15C35.181 15 39 18.816 39 24C39 29.184 35.181 33 30 33C24.822 33 21 29.184 21 24C21 18.816 24.822 15 30 15ZM14.682 44.316C17.373 40.356 21.861 37.716 27 37.716H33C38.142 37.716 42.627 40.356 45.318 44.316C41.484 48.42 36.045 51 30 51C23.955 51 18.516 48.42 14.682 44.316Z"
      fill="var(--color-card)"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserSilhouette",

  props: {
    width: {
      type: Number,
      default: 16
    }
  }
});
</script>
