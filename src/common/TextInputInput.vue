<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextInputInput",

  // Allow for v-model to work in custom component TextInput
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ["update:modelValue"]
});
</script>
