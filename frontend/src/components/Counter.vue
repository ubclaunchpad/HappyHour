<template>
  <div>{{ count }}</div>
  <button @click="increment">Increment!</button>
  <button @click="decrement">Decrement!</button>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const count = ref(0);

    function increment() {
      count.value++;
    }

    function decrement() {
      count.value--;
    }

    return { count, increment, decrement };
  }
});
</script>
