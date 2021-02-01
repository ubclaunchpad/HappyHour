<template>
  <svg
    :width="width"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.75 6.25L6.25 18.75"
      stroke="rgba(55,87,134,1.0)"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.25 6.25L18.75 18.75"
      stroke="rgba(55,87,134,1.0)"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 16
    }
  }
});
</script>
