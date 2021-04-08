<template>
  <svg
    :width="width"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30 0C13.455 0 0 13.455 0 30C0 46.545 13.455 60 30 60C46.542 60 60 46.545 60 30C60 13.455 46.542 0 30 0ZM33 42V30L15 42V18L33 30V18L51 30L33 42Z"
      fill="var(--color-card)"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FastForward",

  props: {
    width: {
      type: Number,
      default: 16
    }
  }
});
</script>
