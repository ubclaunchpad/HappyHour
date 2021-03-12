<template>
  <button :variant="variant" :class="currButtonVariant" class="app-btn">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "AppButton",

  props: {
    variant: { type: String, required: true }
  },

  setup(props) {
    const currButtonVariant = computed(() => {
      switch (props.variant) {
        case "secondary":
          return "btn-secondary";
        case "success":
          return "btn-success";
        default:
          return "btn-primary";
      }
    });

    return { currButtonVariant };
  }
});
</script>

<style scoped>
.app-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  height: 2.5rem;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-card);
}

.btn-secondary {
  background: var(--color-card);
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.btn-success {
  background: var(--color-success);
  color: var(--color-card);
}
</style>
