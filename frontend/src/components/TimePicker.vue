<template>
  <input
    ref="input"
    type="time"
    required
    :step="step"
    :value="time"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { set, getHours, getMinutes } from "date-fns";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<Date>,
      required: true
    }
  },
  emits: ["update:modelValue"],
  computed: {
    time(): string {
      let hours = String(getHours(this.modelValue));
      if (getHours(this.modelValue) < 10) {
        hours = "0" + hours;
      }

      let minutes = String(getMinutes(this.modelValue));
      if (getMinutes(this.modelValue) < 10) {
        minutes = "0" + minutes;
      }
      return `${hours}:${minutes}`;
    },
    step(): number {
      return 60 * 30; // 30 minutes in seconds
    }
  },
  methods: {
    handleInput(evt) {
      const [hours, minutes] = evt.target.value.split(":").map(Number);
      this.$emit("update:modelValue", set(this.modelValue, { hours, minutes }));
    }
  }
});
</script>

<style scoped>
input {
  text-align: center;
  width: 100%;
  appearance: none;
}
</style>
