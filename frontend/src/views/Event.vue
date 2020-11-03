<template>
  <Calendar :calendar="calendar" :startTime="start" :endTime="end" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calendar from "../components/Calendar.vue";
import { Calendar as ICalendar } from "../types";

const mockCalendar: ICalendar = {
  blocks: []
};

const end = new Date("October 8, 2020 21:00:00");
const start = new Date("October 1, 2020 09:00:00");

export default defineComponent({
  components: {
    Calendar
  },
  setup() {
    return {
      calendar: mockCalendar,
      start: start.toISOString(),
      end: end.toISOString()
    };
  }
});
</script>
