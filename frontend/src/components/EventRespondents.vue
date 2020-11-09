<template>
  <div class="respondents"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.respondents {
  border-radius: 5px;
  background: rgb(255, 255, 255);
  padding: 20px;
  width: 40%;
  height: 50ch;
  margin: auto;
  margin-bottom: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  transition: 0.3s;
}

.respondents:hover {
  filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.25));
}
</style>
