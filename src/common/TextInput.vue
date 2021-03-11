<template>
  <div class="input-container">
    <component :is="currInputComponent" v-bind="$attrs" />
    <div class="suffix">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import TextInputInput from "@/common/TextInputInput.vue";
import TextInputTextarea from "@/common/TextInputTextarea.vue";

export default defineComponent({
  name: "TextInput",

  component: {
    TextInputInput,
    TextInputTextarea
  },

  props: {
    type: { type: String, required: true, default: "input" }
  },

  setup(props) {
    const currInputComponent = computed(() =>
      props.type === "textarea" ? TextInputTextarea : TextInputInput
    );

    return { currInputComponent };
  }
});
</script>

<style scoped>
input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgb(240, 243, 245);
  border-radius: 5px;
  background: rgb(255, 255, 255);
  resize: vertical;
}

.input-container {
  position: relative;
  /* max-width: fit-content; */
}

.suffix {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
}
</style>
