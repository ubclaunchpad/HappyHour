<template>
  <form class="input-container">
    <component
      :is="currInputComponent"
      :autofocus="autofocus"
      :placeholder="placeholder"
      :required="required"
      :resize="resize"
      :style="{ resize }"
    />
    <div class="suffix">
      <slot name="suffix"></slot>
    </div>
  </form>
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
    type: { type: String, required: true, default: "input" },
    value: { type: String, required: false, default: "" },
    placeholder: { type: String, required: false, default: "" },
    required: { type: Boolean, required: false, default: false },
    resize: { type: String, required: false, default: "both" },
    autofocus: { type: Boolean, required: false, default: false }
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
