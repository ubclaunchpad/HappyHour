<template>
  <div class="calendar">
    <div class="times">
      <header>Times</header>
      <div v-for="time in timeList" :key="`calendar-${time}`" class="time">
        {{ time }}
      </div>
    </div>
    <div class="wrapper">
      <CalendarDay
        v-for="{ date, blocks } in days"
        :key="date"
        :date="date"
        :times="times"
        :blocks="blocks"
        :respondents="respondents"
        :current-user="currentUser"
        :read-only="readOnly"
        @update:blocks="updateCalendar"
      />
    </div>
    <div class="button">
      <AppButton text="busy blocks" @update="getBusyBlocks()" />
    </div>
    <div class="button">
      <AppButton text="free blocks" @update="getFreeBlocks()" />
    </div>
  </div>
</template>

<script lang="ts">
import { eachDayOfInterval, getHours, isSameDay } from "date-fns";
import { defineComponent, PropType } from "vue";

import CalendarDay from "./CalendarDay.vue";
import { Block, Calendar } from "../client";
import { formatHour } from "../utils";
import AppButton from "@/common/AppButton.vue";

interface Day {
  date: string;
  blocks: Block[];
}

interface Time {
  hour: number;
  minutes: number;
}

const Interval = 30; // minutes
const MinsInHour = 60;

export default defineComponent({
  components: {
    CalendarDay,
    AppButton
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
    },
    readOnly: {
      type: Boolean,
      required: false
    },
    currentUser: {
      type: String,
      required: true
    }
  },
  emits: ["update:calendar"],
  computed: {
    respondents() {
      const respondents = new Set();
      for (const block of this.calendar.blocks) {
        block.availableUsers.forEach(user => respondents.add(user));
      }
      return respondents.size;
    },
    days(): Day[] {
      return eachDayOfInterval({
        start: this.start,
        end: this.end
      }).map(date => {
        return {
          date: date.toISOString(),
          blocks: this.calendar.blocks.filter(block =>
            isSameDay(block.startTime, date)
          )
        };
      });
    },
    earliestTime(): number {
      return getHours(this.start);
    },
    end(): Date {
      return new Date(this.endTime);
    },
    latestTime(): number {
      return getHours(this.end);
    },
    start(): Date {
      return new Date(this.startTime);
    },
    times(): Time[] {
      const hours = [];
      for (let hour = this.earliestTime; hour <= this.latestTime; hour++) {
        for (let i = 0; i < MinsInHour / Interval; i++) {
          hours.push({ hour, minutes: i * Interval });
        }
      }
      return hours.slice(0, hours.length - 1);
    },
    timeList(): string[] {
      return this.times.map(time => formatHour(time.hour, time.minutes));
    }
  },
  methods: {
    updateCalendar({ blocks, date }: { blocks: Block[]; date: string }) {
      const originalBlocks = this.days.find(day => day.date === date)?.blocks;
      if (originalBlocks) {
        const otherBlocks = this.calendar.blocks.filter(
          block => !originalBlocks.includes(block)
        );
        this.$emit("update:calendar", { blocks: [...otherBlocks, ...blocks] });
      }
    }
  }
});
</script>

<style scoped>
.calendar {
  display: flex;
  padding-left: 4rem;
  padding-right: 4rem;
  margin-bottom: 2rem;
  font-size: 12px;
}

.times {
  flex: 1;
  text-align: center;
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
