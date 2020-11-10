<template>
  <div class="container">
    <section>
      <h1>
        <strong>{{ event.title }}</strong>
      </h1>
      <div class="heading">
        <h2>Fill out your availability</h2>
      </div>
    </section>

    <section class="parent">
      <div class="child">
        <div class="calendar">
          <Calendar
            v-model:calendar="calendar"
            :startTime="start"
            :endTime="end"
          />
        </div>
        <div class="timezone">
          <small>(Time displayed in {{ event.timezone }})</small>
        </div>
        <div class="buttons">
          <AppToggleExternalText
            toggleLeftText="My Availability"
            toggleRightText="Group Availability"
          />
          <AppButton text="Save Response" />
          <AppButton text="Copy Event Link" />
        </div>
      </div>
      <div class="child">
        <EventRespondents />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/AppButton.vue";
import AppToggleExternalText from "@/components/AppToggleExternalText.vue";
import Calendar from "@/components/Calendar.vue";
import EventRespondents from "@/components/EventRespondents.vue";

const start = new Date("November 2, 2020 09:00:00");
const end = new Date("November  8, 2020 16:30:00");

export default defineComponent({
  components: {
    AppButton,
    AppToggleExternalText,
    Calendar,
    EventRespondents
  },

  data() {
    return {
      calendar: {
        blocks: []
      },
      event: {
        title: "Event Name",
        timezone: "PST - Vancouver"
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
.calendar {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background: rgb(255, 255, 255);
  margin: 0;
  padding: 0;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
}

.container {
  position: absolute;
  background: rgb(245, 246, 250);
  z-index: -2;
  width: 100vw;
  height: 100vh;
}
.parent {
  padding-top: 5rem;
  display: flex;
  margin: 3rem 9rem;
  padding: 3rem;
}

.child {
  flex-grow: 4;
  /*margin: auto;*/
  align-items: flex-start;
}

.buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 5rem;
}

.timezone {
  color: rgb(129, 146, 158);
  padding: 0 0 1rem 0;
}
</style>
