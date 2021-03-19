<template>
  <div v-if="!event">Loading</div>
  <div v-else class="page-container">
    <header>
      <h5>{{ event.title }}</h5>
    </header>

    <div class="main">
      <div class="main-left">
        <h5>Fill out your availability</h5>

        <Calendar
          v-model:calendar="calendar"
          :start-time="start"
          :end-time="end"
          class="calendar"
        />

        <AppSnackbar
          v-show="notificationVisible"
          :text="notificationText"
          @update="notificationVisible = false"
        />

        <div class="timezone caption">
          (Time displayed in {{ event.timezone }})
        </div>

        <section class="toggle-buttons">
          <AppToggleInternalText
            v-model:checked="displayGroupAvail"
            left-text="My Availability"
            right-text="Group Availability"
            @update="switchCalendar()"
          />
          <div class="buttons">
            <AppButton
              class="btn"
              text="Save Response"
              @update="handleSave()"
            />
            <AppButton
              class="btn"
              text="Copy Event Link"
              @update="copyLink()"
            />
          </div>
        </section>
      </div>
      <div class="main-right">
        <EventRespondents />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//FIXME: AppSnackbar location
//FIXME: Layout
//FIXME: Multiple timers clashing in AppSnackbar notifications
import { computed, defineComponent, watch, ref } from "vue";
import AppButton from "@/common/AppButton.vue";
import AppToggleInternalText from "@/common/AppToggleInternalText.vue";
import AppSnackbar from "@/common/AppSnackbar.vue";
import Calendar from "@/calendar/components/Calendar.vue";
import EventRespondents from "../components/EventRespondents.vue";
import client from "../client";
import { useEvent } from "../hooks";
import { Calendar as CalendarType } from "@/calendar/client";

export default defineComponent({
  components: {
    AppButton,
    AppSnackbar,
    AppToggleInternalText,
    Calendar,
    EventRespondents
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // state
    const displayGroupAvail = ref(false);
    const notificationText = ref("Some Notification");
    const notificationVisible = ref(false);
    const calendar = ref<CalendarType>({ blocks: [] });

    // computed
    const event = useEvent(props.id);

    const start = computed(() =>
      event.value?.scheduleWindow.startTime.toISOString()
    );
    const end = computed(() =>
      event.value?.scheduleWindow.endTime.toISOString()
    );

    watch(event, newEvent => {
      const blocks = newEvent?.calendar.blocks;
      if (blocks) {
        calendar.value.blocks = blocks;
      }
    });

    return {
      event,
      start,
      end,
      calendar,
      displayGroupAvail,
      notificationText,
      notificationVisible,
      async handleSave() {
        // save the calendar
        // alert("handleSave is called");
        // and show notification with "Availability saved!"
        await client.addUserAvailability(calendar.value);
        notificationVisible.value = true;
        notificationText.value = "Availability saved!";
        setTimeout(() => (notificationVisible.value = false), 5000);
      },
      copyLink() {
        // copy the link to the event
        // alert("copyLink is called");
        // and show notification with "Event link copied to clipboard!"
        notificationVisible.value = true;
        notificationText.value = "Event link copied to clipboard!";
        setTimeout(() => (notificationVisible.value = false), 5000);
      },
      switchCalendar() {
        // method to switch between user's calendar and group calendar
        console.log("calendar switched");
      }
    };
  }
});
</script>

<style scoped>
/*------------------------------------*\
  # GLOBAL
\*------------------------------------*/

/* Override Global Heading */
header h5 {
  text-align: center;
  font-weight: 600;
}

h5 {
  font-weight: 500;
}

.page-container {
  margin-top: 0.5625rem;
}
/*------------------------------------*\
  # MAIN COMPONENTS
\*------------------------------------*/

.main {
  display: flex;
  justify-content: center;
}

.main-left,
.main-right {
  justify-content: center;
  align-items: flex-start;
  /*margin: auto;*/
}

.main-left {
  flex-grow: 4;
}

/*------------------------------------*\
  # LEFT COMPONENTS
\*------------------------------------*/

.calendar {
  margin: 0;
  padding: 0;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: rgb(255, 255, 255);
}

.timezone {
  padding: 0 0 1rem 0;
  margin: 0.5rem;
  text-align: center;
  letter-spacing: 0.4px;
  color: rgb(125, 125, 125);
}

.toggle-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 1rem;
}

.buttons {
  display: flex;
  flex-shrink: 0;
}

.btn {
  width: 17rem;
  margin: 0 1rem;
}
</style>
