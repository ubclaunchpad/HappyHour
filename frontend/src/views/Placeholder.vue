<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <PlaceholderComponent text="This is a placeholder page." />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlaceholderComponent from "@/components/PlaceholderComponent.vue"; // @ is an alias to /src

export default defineComponent({
  components: {
    PlaceholderComponent
  }
});
</script>
