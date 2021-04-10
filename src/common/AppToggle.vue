<template>
  <label class="container">
    <input
      v-bind="$attrs"
      class="input"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />

    <span class="switch">
      <span :class="['trigger', { disabled: modelValue }]">{{ leftText }}</span>
      <span :class="['trigger', { disabled: !modelValue }]">{{
        rightText
      }}</span>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    leftText: {
      type: String,
      required: true
    },
    rightText: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ["update:modelValue"]
};
</script>

<style scoped>
.container {
  cursor: pointer;
  display: flex;
  box-sizing: border-box;
  min-width: 20rem;
}

.trigger {
  flex: 1;
  color: var(--color-text-primary);
  text-align: center;
  padding: 8px;
  opacity: 1;
  transition: opacity 0.375s ease-in-out;
}

.trigger.disabled {
  opacity: 0.3;
}

/* Visually hide the checkbox input */
.input {
  display: none;
}

.switch {
  /* Vertically center the inner circle */
  display: flex;
  align-items: center;
  position: relative;
  /* Make the container element rounded */
  border-radius: 9999px;
  border: 2px solid var(--color-border);
  background-color: white;
  width: 100%;
}

.switch::before {
  content: "";
  position: absolute;
  left: -2px;
  height: 100%;
  width: 50%;
  /* Make the inner circle fully rounded */
  border-radius: 9999px;
  border: 2px solid var(--color-primary);
  transition: transform 0.375s ease-in-out;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.input:checked + .switch::before {
  /* Move the inner circle to the right */
  transform: translateX(calc(100% - 4px));
}
</style>
