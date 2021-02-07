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
      <span :class="{ leftEnabled: !modelValue, leftDisabled: modelValue }">{{
        leftText
      }}</span>
      <span :class="{ rightDisabled: !modelValue, rightEnabled: modelValue }">{{
        rightText
      }}</span>
    </span>
  </label>
</template>

<script>
export default {
  name: "Switch",
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
  emits: ["update:checked"],
  methods: {
    update() {
      this.$emit("update");
    }
  }
};
</script>

<style scoped>
.container {
  /* width variable */
  --switch-container-width: 20rem;
  /* dimensions */
  width: var(--switch-container-width);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.leftDisabled {
  flex-shrink: 0;
  margin-left: calc(var(--switch-container-width) * -1 / 2 + 2rem);
  color: #a0aec0;
  z-index: 1;
}

.leftEnabled {
  flex-shrink: 0;
  margin-left: calc(var(--switch-container-width) * -1 / 2 + 2rem);
  color: #020f22;
  z-index: 1;
}

.rightDisabled {
  flex-shrink: 0;
  margin-left: 5rem;
  color: #a0aec0;
  z-index: 1;
}

.rightEnabled {
  flex-shrink: 0;
  margin-left: 5rem;
  color: #020f22;
  z-index: 1;
}

/* Visually hide the checkbox input */
.input {
  width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  border-width: 0;
}

.switch {
  /* colour variables */
  --switch-container-size: 80px;
  --switch-size: calc(var(--switch-container-size) / 2);
  --gray: #cbd5e0;
  --dark-gray: #a0aec0;
  --accent: #375786;
  /* Vertically center the inner circle */
  display: flex;
  align-items: center;
  position: relative;
  height: var(--switch-size);
  flex-basis: var(--switch-container-width);
  /* Make the container element rounded */
  border-radius: var(--switch-size);
  border: 2px solid var(--dark-gray);
  background-color: white;
  /* In case the label gets really long, the toggle shouldn't shrink. */
  flex-shrink: 0;
}

.switch::before {
  content: "";
  /* position: absolute; */
  height: calc(var(--switch-size) - 4px);
  width: calc(var(--switch-container-width) / 2);
  /* Make the inner circle fully rounded */
  border-radius: var(--switch-size);
  background-color: white;
  border: 2px solid var(--accent);
  transition: transform 0.375s ease-in-out;
}

.input:checked + .switch::before {
  /* Move the inner circle to the right */
  transform: translateX(calc(var(--switch-container-width) / 2));
}
</style>
