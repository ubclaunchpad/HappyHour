<template>
  <div class="parent">
    <div class="child">
      <Calendar v-model:calendar="calendar" :startTime="start" :endTime="end" />
      <AvailabilityToggle />
    </div>
    <div class="child">
      <!--<span>Insert Response Component Here</span>-->
      <EventRespondents />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calendar from "../components/Calendar.vue";
import AvailabilityToggle from "../components/AvailabilityToggle.vue";
import EventRespondents from "../components/EventRespondents.vue";
const start = new Date("November 8, 2020 09:00:00");
const end = new Date("November  14, 2020 21:00:00");
export default defineComponent({
  components: {
    Calendar,
    AvailabilityToggle,
    EventRespondents
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
  padding-top: 5rem;
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  margin: 3rem 6rem;
  padding: 3rem;
  border-radius: 20px;
}
.child {
  flex-grow: 4;
  margin: auto;
}
</style>
