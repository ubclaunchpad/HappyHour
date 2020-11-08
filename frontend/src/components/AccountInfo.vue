<template>
  <!--<div>
    <button @click="increment">Login with email</button>
    <button @click="decrement">Login with Google account</button>
  </div> -->
  <div>
    <p class="label">Respondants</p>
    <div class="respondants"></div>
  </div>
  <div>
    <button @click="increment">Save Response</button>
    <button @click="decrement">Share Event Link</button>
    <AppButton text="Copy Event Link" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/AppButton.vue";

export default defineComponent({
  components: {
    AppButton
  }
});
</script>

<style>
.respondants {
  border-radius: 25px;
  background: rgb(221, 221, 221);
  padding: 20px;
  width: 50%;
  height: 60vh;
  margin: auto;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}

.respondants:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}

.label {
}
</style>
