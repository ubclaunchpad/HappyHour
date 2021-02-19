<template>
  <component :is="currInputComponent" :placeholder="placeholder"></component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextInputInput from "@/common/TextInputInput.vue";
import TextInputTextarea from "@/common/TextInputTextarea.vue";

export default defineComponent({
  component: {
    TextInputInput,
    TextInputTextarea
  },
  props: {
    type: { type: String, required: true, default: "textarea" },
    value: { type: String, required: false, default: "" },
    placeholder: { type: String, required: false, default: "" }
  },
  computed: {
    currInputComponent(): any {
      return this.type === "textarea" ? TextInputTextarea : TextInputInput;
    }
  }
});
</script>

<style scoped>
input,
textarea {
  height: 2.5rem;
  padding: 0.5rem;
  border: 1px solid rgb(240, 243, 245);
  border-radius: 5px;
  background: rgb(255, 255, 255);
}

input {
  margin: 1rem 0;
}

textarea {
  width: 100%;
  min-height: 3.5rem;
  resize: none;
}
</style>
