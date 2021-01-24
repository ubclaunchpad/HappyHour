<template>
  <button class="button" @click="update">{{ text }}</button>
</template>

<script lang="ts">
// TODO: Consider AppPrimaryButton & AppSecondaryButton
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppButton",
  props: {
    text: {
      type: String,
      required: true
    }
  },
  emits: ["update"],
  methods: {
    update() {
      this.$emit("update");
    }
  }
});
</script>

<style scoped>
.button {
  height: 2.5rem;
  border-radius: 5px;
  border: 2px solid rgb(55, 87, 134);
  background: rgb(255, 255, 255);
  color: rgb(55, 87, 134);
  cursor: pointer;
}

.button:hover {
  background: rgba(255, 255, 255, 0.8);
}
</style>
