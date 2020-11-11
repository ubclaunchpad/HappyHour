<template>
  <button class="button" @click="update">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppButton",
  props: {
    text: String
  },
  methods: {
    update() {
      this.$emit("update");
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  background: rgb(71, 96, 243);
  border: 1px solid rgb(71, 96, 243);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 25px;

  font-size: 16px;
  line-height: 24px;
  align-items: center;
  letter-spacing: 0.12px;

  color: rgb(255, 255, 255);

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.button:hover {
  cursor: pointer;
  background: rgba(71, 96, 243, 0.8);
  border: 1px solid rgba(71, 96, 243, 0.8);
}
</style>
