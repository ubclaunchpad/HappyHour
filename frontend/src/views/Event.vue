<template>
  <div class="parent">
    <div class="child">
      <Calendar v-model:calendar="calendar" :startTime="start" :endTime="end" />
      <AvailabilityToggle />
    </div>
    <div class="child">
      <span>Insert Response Component Here</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calendar from "../components/Calendar.vue";
import AvailabilityToggle from "../components/AvailabilityToggle.vue";

const end = new Date("October 8, 2020 21:00:00");
const start = new Date("October 1, 2020 09:00:00");

export default defineComponent({
  components: {
    Calendar,
    AvailabilityToggle
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

<style scoped>
.parent {
  display: flex;
  flex-direction: row;
}
.child {
  flex-grow: 4;
  margin: auto;
}
</style>
