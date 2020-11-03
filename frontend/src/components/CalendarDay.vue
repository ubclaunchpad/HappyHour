<template>
  <section class="day">
    <header>{{ dateText }}</header>
    <div class="block" v-for="time in times" :key="`${dateText}-${time}`"></div>
  </section>
</template>

<script lang="ts">
import { format } from "date-fns";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    date: {
      type: String,
      required: true
    },
    times: {
      type: Object as PropType<Array<string>>,
      required: true
    }
  },
  computed: {
    dateText(): string {
      return format(new Date(this.date), "E MMM d");
    }
  }
});
</script>

<style scoped>
.day {
  flex: 1;
}

.block {
  border: 0.5px solid lightgray;
  height: 2em;
}
</style>
