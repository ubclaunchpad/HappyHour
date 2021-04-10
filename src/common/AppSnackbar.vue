<template>
  <div :variant="variant" :class="currVariant" class="snackbar">
    <p class="text">{{ text }}</p>

    <button class="btn btn--close" @click="$emit('update')">
      <svg
        width="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
          fill="var(--color-card)"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "AppSnackbar",

  props: {
    variant: { type: String, required: false, default: "primary" },
    text: { type: String, required: true }
  },

  emits: ["update"],

  setup(props) {
    const currVariant = computed(() => {
      switch (props.variant) {
        case "secondary":
          return "snackbar__secondary";
        case "success":
          return "snackbar__success";
        default:
          return "snackbar__primary";
      }
    });

    return { currVariant };
  }
});
</script>

<style scoped>
.snackbar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  height: 2.5rem;
}

.snackbar__primary {
  background: var(--color-primary);
  color: var(--color-card);
}

.snackbar__secondary {
  background: var(--color-card);
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.snackbar__success {
  background: var(--color-success);
  color: var(--color-card);
}

.btn--close {
  position: absolute;
  right: 1.5rem;
  align-self: center;
}

.btn--close:hover {
  opacity: 0.3;
}
</style>
