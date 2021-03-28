<template>
  <div v-if="!event || isLoading">Loading</div>
  <div v-else class="page-container">
    <header>
      <h5>{{ event.title }}</h5>
    </header>

    <div class="main">
      <div class="main-left">
        <h5>Fill out your availability</h5>

        <Calendar
          v-model:calendar="calendar"
          class="calendar"
          :start-time="start"
          :end-time="end"
          :current-user="user.uid"
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
            @click="switchCalendar()"
          />
          <div class="buttons">
            <AppButton
              variant="secondary"
              type="button"
              class="btn"
              @click="handleSave()"
              >Save Response</AppButton
            >
            <AppButton
              variant="secondary"
              type="button"
              class="btn"
              @click="copyLink()"
              >Copy Event Link</AppButton
            >
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
import {
  computed,
  defineComponent,
  ref,
  reactive,
  toRefs,
  watchEffect,
  watch,
  nextTick
} from "vue";
import { useRouter } from "vue-router";

import AppButton from "@/common/AppButton.vue";
import AppSnackbar from "@/common/AppSnackbar.vue";
import AppToggleInternalText from "@/common/AppToggleInternalText.vue";

import Calendar from "@/calendar/components/Calendar.vue";
import calendarClient, { Calendar as CalendarType } from "@/calendar/client";
import { merge } from "@/calendar/utils";
import userClient from "@/user/client";
import { useUser } from "@/user/hooks";

import EventRespondents from "../components/EventRespondents.vue";
import client from "../client";
import { useEvent } from "../hooks";

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
    const { user, isLoading } = useUser();
    const router = useRouter();

    // state
    const state = reactive({
      displayGroupAvail: false,
      notificationText: "Some Notification",
      notificationVisible: false
    });
    const calendar = ref<CalendarType>({ blocks: [] });

    // computed
    const event = useEvent(props.id);
    const start = computed(() =>
      event.value?.scheduleWindow.startTime.toISOString()
    );
    const end = computed(() =>
      event.value?.scheduleWindow.endTime.toISOString()
    );

    /* Keep the calendar blocks in sync with the event's blocks */
    watch(event, newEvent => {
      const blocks = newEvent?.calendar.blocks;
      if (blocks) {
        calendar.value = { blocks };
      }
    });

    /**
     * The user is fetched asynchronously, so initially it's going to be null
     * regardless if the user is logged in or not.
     *
     * This means we can only do stuff with the user _after_ we've fetched that
     * information.
     */
    watchEffect(async () => {
      if (!isLoading.value) {
        /**
         * We want to block users from accessing this page if they're not logged in,
         * so we'll redirect them as soon as the user is fetched and we know they're
         * not logged in.
         *
         * When redirecting, we add the link to the current event so the login page
         * knows where to redirect once logged in.
         */
        if (!user.value) {
          router.replace({
            path: "/login",
            query: {
              redirectTo: router.currentRoute.value.path
            }
          });
        } else {
          /**
           * Otherwise, we want to populate the calendar's blocks with our free
           * blocks.
           *
           * Only populate the calendar with the user's google calendar if it's
           * their first time visiting the event.
           */
          if (
            event.value &&
            !event.value.users.includes(user.value.uid) &&
            (await userClient.isGoogleUser())
          ) {
            const { startTime, endTime } = event.value.scheduleWindow;
            const blocks = await calendarClient.findFreeBlocks(
              startTime,
              endTime,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              user.value!.uid
            );

            /**
             * We can just merge the current calendar here because at this point,
             * events has been loaded.
             */
            calendar.value = merge(calendar.value, { blocks });

            /**
             * Using `nextTick`, we tell vue to call this function once the DOM
             * has been updated.
             */
            nextTick(() => {
              alert(
                `We've pre-populated the event with your Google Calendar availability.`
              );
            });
          }
        }
      }
    });

    return {
      event,
      start,
      end,
      calendar,
      user,
      isLoading,
      ...toRefs(state),
      async handleSave() {
        // save the calendar
        // alert("handleSave is called");
        // and show notification with "Availability saved!"
        await client.saveResponse({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          userId: user.value!.uid,
          eventId: props.id,
          availability: calendar.value.blocks
        });
        state.notificationVisible = true;
        state.notificationText = "Availability saved!";
        setTimeout(() => (state.notificationVisible = false), 5000);
      },
      copyLink() {
        // copy the link to the event
        // alert("copyLink is called");
        // and show notification with "Event link copied to clipboard!"
        state.notificationVisible = true;
        state.notificationText = "Event link copied to clipboard!";
        setTimeout(() => (state.notificationVisible = false), 5000);
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
