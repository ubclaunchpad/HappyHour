<template>
  <component :is="currInput.component" :placeholder="placeholder"></component>
  <br />
  <button
    v-for="input in inputs"
    :key="input"
    :class="['input-button', { active: currInput === input }]"
    @click="currInput = input"
  >
    {{ input.name }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextInputInput from "@/common/TextInputInput.vue";
import TextInputTextarea from "@/common/TextInputTextarea.vue";

const inputs = [
  {
    name: "InputComponent",
    component: TextInputInput
  },
  {
    name: "TextareaComponent",
    component: TextInputTextarea
  }
];

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
  data: () => ({
    inputs,
    currInput: inputs[0]
  }),
  computed: {},
  methods: {
    setInputComponent() {
      if (this.type === "textarea") {
        this.currInput = inputs[1];
        console.log("currInput: ", this.currInput);
      } else this.currInput = inputs[0];
    }
  }
});
</script>

<style scoped>
.input-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.input-button:hover {
  background: #e0e0e0;
}
.input-button.active {
  background: #e0e0e0;
}

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
