<template>
  <div class="container">
    <header class="heading">
      <h3>{{ title }}</h3>
    </header>

    <section class="main">
      <div class="parent">
        <div class="child">
          <div class="sub-heading">
            <h3>Fill out your availability</h3>
          </div>
          <div class="calendar">
            <Calendar
              v-model:calendar="calendar"
              :startTime="start"
              :endTime="end"
            />
          </div>
          <div class="timezone">(Time displayed in {{ timezone }})</div>
          <div class="buttons">
            <AppToggleExternalText
              toggleLeftText="My Availability"
              toggleRightText="Group Availability"
            />
            <AppButton text="Save Response" />
            <AppButton text="Copy Event Link" />
          </div>
        </div>
        <div class="respondents">
          <EventRespondents />
        </div>
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

  props: {
    title: {
      type: String,
      required: true,
      default: () => "Event Title"
    },
    timezone: {
      type: String,
      required: true,
      default: () => "PST - Vancouver time"
    }
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
.container {
  margin: 1rem 10rem;
}

.calendar {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background: rgb(255, 255, 255);
  margin: 0;
  padding: 0;
  border-radius: 10px;
  /*
  justify-content: center;
  align-items: center;
  */
}

.parent {
  display: flex;
}

.child {
  flex-grow: 4;
  /*margin: auto;*/
  align-items: flex-start;
  padding: 0 5rem;
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
  font-size: 12px;
  font-family: "Open Sans";
  margin: 0.5rem;
}

.respondents {
  margin: 0;
  padding: 0;
}
</style>
