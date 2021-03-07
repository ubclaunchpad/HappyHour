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
      <AppButton text="fetch busy slots" @update="getBusyCalendar()" />
    </div>
    <div class="button">
      <AppButton text="fetch free slots" @update="getFreeCalendar()" />
    </div>
    <div class="button">
      <AppButton text="free busy test" @update="freeBusyTest()" />
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
    }
  },
  computed: {
    blocks(): Block[] {
      return this.calendar.blocks;
    },
    days(): Day[] {
      return eachDayOfInterval({
        start: this.start,
        end: this.end
      }).map(date => {
        return {
          date: date.toISOString(),
          blocks: this.blocks.filter(block => isSameDay(block.startTime, date))
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
        const otherBlocks = this.blocks.filter(
          block => !originalBlocks.includes(block)
        );
        this.$emit("update:calendar", { blocks: [...otherBlocks, ...blocks] });
      }
    },
    async getBusyCalendar(): Promise<any> {
      const timeMin: Date = new Date();
      const timeMax: Date = new Date(
        timeMin.getFullYear(),
        timeMin.getMonth(),
        timeMin.getDate(),
        timeMin.getHours() + 2,
        timeMin.getMinutes()
      );
      try {
        const busySlots = await client.getBusySlots(timeMin, timeMax);
        console.log("printing busy slots from calendar component: ");
        console.log(busySlots);
        const calendar = client.convertToBusyCalendar(busySlots);
        return calendar;
      } catch (err) {
        console.log("error: " + err);
      }
    },
    async getFreeCalendar(): Promise<any> {
      const timeMin: Date = new Date();
      const timeMax: Date = new Date(
        timeMin.getFullYear(),
        timeMin.getMonth(),
        timeMin.getDate(),
        timeMin.getHours() + 2,
        timeMin.getMinutes()
      );
      try {
        const freeSlots = await client.getFreeSlots(timeMin, timeMax);
        console.log("printing free slots from calendar component: ");
        console.log(freeSlots);
        const calendar = client.convertToFreeCalendar(freeSlots);
        return calendar;
      } catch (err) {
        console.log("error: " + err);
      }
    },
    async freeBusyTest() {
      const timeMin: Date = new Date();
      const timeMax: Date = new Date(
        timeMin.getFullYear(),
        timeMin.getMonth(),
        timeMin.getDate(),
        timeMin.getHours() + 5,
        timeMin.getMinutes()
      );
      try {
        await client.testFreeBusy(timeMin, timeMax);
        console.log("didnt fail?");
      } catch (err) {
        console.log(err);
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
