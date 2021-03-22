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
import client, { Block, Calendar } from "../client";
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
    editMode: {
      type: Boolean,
      required: false
    }
  },
  computed: {
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
    },
    async getBusyBlocks(): Promise<any> {
      const currentTime: Date = new Date();
      const timeMin: Date = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        currentTime.getHours() - 5,
        30
      );
      const timeMax: Date = new Date(
        timeMin.getFullYear(),
        timeMin.getMonth(),
        timeMin.getDate(),
        timeMin.getHours() + 4,
        0
      );
      console.log(`min: ${timeMin}, max: ${timeMax}`);
      try {
        const busyBlocks = await client.findBusyBlocks(timeMin, timeMax);
        console.log("printing busy blocks from calendar component: ");
        console.log(busyBlocks);
        return busyBlocks;
      } catch (err) {
        console.log("error: " + err);
        return err;
      }
    },
    async getFreeBlocks(): Promise<any> {
      const currentTime: Date = new Date();
      const timeMin: Date = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        currentTime.getHours() - 5,
        30
      );
      const timeMax: Date = new Date(
        timeMin.getFullYear(),
        timeMin.getMonth(),
        timeMin.getDate(),
        timeMin.getHours() + 4,
        0
      );
      console.log(`min: ${timeMin}, max: ${timeMax}`);
      try {
        const freeBlocks = await client.findFreeBlocks(timeMin, timeMax);
        console.log("printing free blocks from calendar component: ");
        console.log(freeBlocks);
        return freeBlocks;
      } catch (err) {
        console.log("error: " + err);
        return err;
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
  margin-top: 2rem;
  margin-left: 2rem;
}

.time {
  height: 2em;
  border: 0.5px solid transparent;
}

.wrapper {
  display: flex;
  flex: 12;
  justify-content: space-between;
  margin-top: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
}
</style>
