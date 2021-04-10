<template>
  <AppLoading v-if="!event || isLoading" class="event--container" />
  <main v-else class="event--container">
    <div class="event card">
      <header>
        <h5>Fill out your availability</h5>
        <div class="sub2">{{ event.title }}</div>
      </header>

      <section class="event--availability">
        <Calendar
          v-model:calendar="calendar"
          class="calendar"
          :start-time="start"
          :end-time="end"
          :current-user="user.uid"
        />

        <div class="notification--container">
          <AppSnackbar
            v-show="notificationVisible"
            :text="notificationText"
            class="notification"
            @update="notificationVisible = false"
          />
        </div>

        <div class="event--timezone caption">
          (Time displayed in {{ event.timezone }})
        </div>
      </section>

      <section class="event--triggers">
        <AppToggle
          v-model="displayGroupAvail"
          left-text="My Availability"
          right-text="Group Availability"
          class="toggle"
          @click="switchCalendar()"
        />
        <AppButton
          variant="secondary"
          type="button"
          class="btn"
          @click="copyLink()"
          >Copy Event Link</AppButton
        >
        <AppButton
          variant="secondary"
          type="button"
          class="btn"
          @click="handleSave()"
          >Save Response</AppButton
        >
      </section>

      <section class="event--respondents">
        <EventRespondents class="respondents" />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
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
import AppToggle from "@/common/AppToggle.vue";
import AppLoading from "@/common/AppLoading.vue";
import Calendar from "@/calendar/components/Calendar.vue";
import EventRespondents from "@/event/components/EventRespondents.vue";

import client from "../client";
import { useEvent } from "../hooks";

import calendarClient, { Calendar as CalendarType } from "@/calendar/client";
import { merge } from "@/calendar/utils";

import userClient from "@/user/client";
import { useUser } from "@/user/hooks";

export default defineComponent({
  name: "EventPage",

  components: {
    AppButton,
    AppLoading,
    AppSnackbar,
    AppToggle,
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

.card {
  padding: 3rem;
}

.sub2 {
  color: var(--color-text-secondary);
}

.btn {
  width: 17rem;
  margin: 0 1rem;
}
/*------------------------------------*\
  # MAIN COMPONENTS
\*------------------------------------*/

.event--container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.event {
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: 7fr 2fr;
  grid-gap: 2.5rem;
}

.event--availability {
  grid-area: 2 / 1 / 3 / 2;
  position: relative;
}

.calendar {
  margin: 0;
  padding: 0;
  border-radius: 10px;
  border: 1px solid var(--color-border);
}

.event--timezone {
  margin: 0.5rem;
  text-align: center;
  color: #7d7d7d; /* Missing from global colours */
}

.event--triggers {
  display: flex;
  justify-content: center;
  align-items: center;
}

.event--triggers {
  grid-area: 3 / 1 / 4 / 2;
}

.event--respondents {
  grid-area: 2 / 2 / 3 / 3;
  height: 30rem;
}

.respondents {
  height: 100%;
}

.notification--container {
  display: flex;
  justify-content: center;
}

.notification {
  position: absolute;
  width: 30rem;
  bottom: 3rem;
}
</style>
