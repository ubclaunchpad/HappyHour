<template>
  <Calendar v-model:calendar="calendar" :startTime="start" :endTime="end" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Calendar from "../components/Calendar.vue";
import { Calendar as ICalendar } from "../types";

const end = new Date("October 8, 2020 21:00:00");
const start = new Date("October 1, 2020 09:00:00");

export default defineComponent({
  components: {
    Calendar
  },
  setup() {
    const calendar = reactive<ICalendar>({
      blocks: []
    });
    return {
      start: start.toISOString(),
      end: end.toISOString(),
      calendar
    };
  }
});
</script>
