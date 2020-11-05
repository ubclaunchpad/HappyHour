<template>
  <Calendar v-model:calendar="calendar" :startTime="start" :endTime="end" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calendar from "../components/Calendar.vue";

const end = new Date("October 8, 2020 21:00:00");
const start = new Date("October 1, 2020 09:00:00");

export default defineComponent({
  components: {
    Calendar
  },
  data() {
    return {
      calendar: {
        blocks: []
      }
    };
  },
  computed: {
    start() {
      return start.toISOString();
    },
    end() {
      return end.toISOString();
    }
  }
});
</script>
