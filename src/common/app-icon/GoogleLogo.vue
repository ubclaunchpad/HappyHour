<template>
  <svg
    :width="width"
    height="22"
    viewBox="0 0 23 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.2127 3.91037C16.4171 2.46738 14.1608 1.65377 11.8166 1.60399C9.47237 1.55421 7.18055 2.27124 5.31985 3.6366C3.45914 5.00196 2.1409 6.93393 1.58297 9.11326C1.02504 11.2926 1.26081 13.5889 2.25131 15.6226C3.24181 17.6564 4.92776 19.3059 7.03058 20.2986C9.1334 21.2913 11.5272 21.5678 13.8165 21.0824C16.1058 20.597 18.1535 19.3788 19.6212 17.629C21.089 15.8792 21.889 13.7025 21.889 11.4588H12.7326"
      :stroke="currIconVariant"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 16
    },
    variant: { type: String, required: true }
  },
  setup(props) {
    const currIconVariant = computed(() =>
      props.variant === "secondary"
        ? "var(--color-card)"
        : "var(--color-primary)"
    );

    return { currIconVariant };
  }
});
</script>
