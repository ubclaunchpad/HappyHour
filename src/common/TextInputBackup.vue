<template class="input-container">
  <button
    v-for="input in inputs"
    :key="input"
    :class="['input-button', { active: currentInput === input }]"
    :click="(currentInput = input)"
  >
    {{ input.name }}
  </button>
  <component :is="currentInput.component"></component>
</template>

<script lang="ts">
const inputs = [
  {
    name: "input",
    component: {
      template: `<h1>Input component</h1>`
    }
  },
  {
    name: "textarea",
    component: {
      template: `<h1>Textarea component</h1>`
    }
  },
  {
    name: "multiline",
    component: {
      template: `<h1>Multiline component</h1>`
    }
  }
];

import { defineComponent } from "vue";
export default defineComponent({
  props: {
    input: { type: String, required: false, default: "" },
    value: { type: String, required: false, default: "" },
    placeholder: { type: String, required: false, default: "" },
    hint: { type: String, required: false, default: "hint" }
  },
  data: () => ({
    isFocus: false,
    inputs,
    currentInput: inputs[0]
  }),
  computed: {
    filled() {
      if (!this.isFocus && this.value) {
        return "hasContent";
      }
      return "";
    },
    // focusBorder() {
    //   return {
    //     "background-color": "indigo"
    //   };
    // },
    currentInputComponent() {
      return "input-" + this.currentInput;
    }
  }
});
</script>

<style scoped>
/* .input-container {
  width: 100%;
  padding: 0.5rem 0.5rem 0 0;
  text-align: left;
}

.input-effect {
  float: left;
  width: 100%;
  margin: 1.5rem 0rem 1.5rem 0;
  position: relative; */
/* }  */
/* necessary to give position: relative to parent. */

/* .input-hint {
  float: left;
  width: 100%;
  margin: -1.2rem 0 0 0;
  position: relative;
  font-size: 0.8rem;
  opacity: 0.6;
}

.effect {
  border: 0;
  padding: 4px 0;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
}

.effect ~ .focus-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: indigo;
  transition: 0.4s;
}

.effect:focus ~ .focus-border,
.has-content.effect ~ .focus-border {
  width: 100%;
  transition: 0.4s;
}

::placeholder {
  opacity: 0.4;
} */

/* input[type="text"] {
  color: #555;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
  outline: none;
} */

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
</style>
