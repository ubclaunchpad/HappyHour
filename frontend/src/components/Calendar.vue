<template>
  <div class="calendar">
    <div class="times">
      <header>Times</header>
      <div class="time" v-for="time in times" :key="`calendar-${time}`">
        {{ time }}
      </div>
    </div>
    <div class="wrapper">
      <CalendarDay
        v-for="date in dateRange"
        :key="date"
        :date="date"
        :times="times"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { eachDayOfInterval, getHours } from "date-fns";
import { defineComponent, PropType } from "vue";

import CalendarDay from "./CalendarDay.vue";
import { Calendar } from "../types";

const Interval = 30; // minutes
const MinsInHour = 60;

const formatHour = (hour: number, minutes: number) => {
  let formattedMinutes = String(minutes);
  if (minutes < 10) {
    formattedMinutes = `0${minutes}`;
  }
  return `${hour}:${formattedMinutes}`;
};

export default defineComponent({
  components: {
    CalendarDay
  },
  props: {
    calendar: {
      type: Object as PropType<Calendar>,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  computed: {
    start(): Date {
      return new Date(this.startTime);
    },
    end(): Date {
      return new Date(this.endTime);
    },
    dateRange(): string[] {
      return eachDayOfInterval({
        start: this.start,
        end: this.end
      }).map(date => date.toISOString());
    },
    earliestTime(): number {
      return getHours(this.start);
    },
    latestTime(): number {
      return getHours(this.end);
    },
    times(): string[] {
      const hours = [] as string[];
      for (let hour = this.earliestTime; hour <= this.latestTime; hour++) {
        for (let i = 0; i < MinsInHour / Interval; i++) {
          hours.push(formatHour(hour, i * Interval));
        }
      }
      return hours.slice(0, hours.length - 1);
    }
  }
});
</script>

<style scoped>
.calendar {
  display: flex;
  padding-left: 4rem;
  padding-right: 4rem;
  font-size: 12px;
}

.times {
  flex: 1;
  text-align: right;
  margin-right: 1rem;
}

.time {
  height: 2em;
  border: 0.5px solid transparent;
}

.wrapper {
  display: flex;
  flex: 12;
  justify-content: space-between;
}
</style>
