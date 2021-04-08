<template>
  <div class="input-container">
    <component
      :is="currInputComponent"
      ref="textinput"
      v-bind="$attrs"
      :style="resizeAttribute"
    />
    <div class="suffix">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import TextInputInput from "@/common/TextInputInput.vue";
import TextInputTextarea from "@/common/TextInputTextarea.vue";

export default defineComponent({
  name: "TextInput",

  component: {
    TextInputInput,
    TextInputTextarea
  },

  props: {
    variant: { type: String, default: "input" },
    resize: { type: String, default: "" }
  },

  setup(props) {
    const textinput = ref();

    const currInputComponent = computed(() =>
      props.variant === "textarea" ? TextInputTextarea : TextInputInput
    );

    const resizeAttribute = computed(() => `resize: ${props.resize}`);

    return { currInputComponent, resizeAttribute, textinput };
  }
});
</script>

<style scoped>
input,
textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  padding: 0.5rem;
}

.input-container {
  position: relative;
  /* max-width: fit-content; */
}

.suffix {
  position: absolute;
  top: 1.5rem;
  right: 0.5rem;
  transform: translateY(-50%);
}
</style>
