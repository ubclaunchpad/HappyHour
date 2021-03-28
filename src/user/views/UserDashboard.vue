<template>
  <main class="dashboard">
    <!-- Left Events Card -->
    <div class="card--events card">
      <section class="events">
        <header class="card--heading">
          <h5>My Events</h5>
        </header>

        <!-- All Events -->
        <div class="events--all">
          <!-- Scheduled Events -->
          <section class="event-status">
            <header class="event-status--header">
              <div class="subtitle1">Scheduled</div>
            </header>
            <ul class="dashboard-events">
              <li v-for="event in events" :key="event.id">
                <template v-if="event.isScheduled">
                  <DashboardEvent :event="event" />
                </template>
              </li>
            </ul>
          </section>

          <!-- Unscheduled Events -->
          <section class="event-status">
            <header class="event-status--header">
              <div class="subtitle1">Unscheduled</div>
            </header>
            <ul class="dashboard-events">
              <li v-for="event in events" :key="event.id">
                <template v-if="!event.isScheduled">
                  <DashboardEvent :event="event" />
                </template>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </div>

    <!-- Right Calendar Card -->
    <div class="card--schedule card">
      <section class="schedule">
        <header class="card--heading">
          <h5>My Set Schedule</h5>
        </header>
        <div v-if="loadingCalendar">Loading...</div>
        <template v-else>
          <Calendar
            v-model:calendar="calendar"
            :start-time="startTime"
            :end-time="endTime"
            :read-only="!isEditable"
            :current-user="user.uid"
            class="schedule--calendar"
          />
          <div class="schedule--subsection">
            <div class="schedule--timezone caption">
              (Time displayed in PST—Vancouver)
            </div>
            <button
              class="schedule--edit button"
              type="button"
              @click="toggleEdit"
            >
              {{ isEditable ? "View Schedule" : "Edit Schedule" }}
            </button>
          </div>
        </template>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { startOfWeek, endOfWeek, set } from "date-fns";
import { useRouter } from "vue-router";

import DashboardEvent from "@/user/components/DashboardEvent.vue";
import Calendar from "@/calendar/components/Calendar.vue";
import calendarClient, { Calendar as CalendarType } from "@/calendar/client";
import { merge } from "@/calendar/utils";
import userClient from "../client";
import { useUser } from "../hooks";

export default defineComponent({
  name: "UserDashboard",

  components: { DashboardEvent, Calendar },

  props: {},

  setup() {
    const { user, isLoading } = useUser();
    const router = useRouter();

    const calendar = ref<CalendarType>({
      blocks: []
    });
    const loadingCalendar = ref(true);
    const startTime = set(startOfWeek(new Date()), { hours: 9 });
    const endTime = set(endOfWeek(new Date()), { hours: 21 });

    /**
     * Fetch the user's google calendar, if they're a google account.
     * TODO: Abstract this so it's reusable across this component and the Event page.
     */
    watchEffect(async () => {
      if (!isLoading.value) {
        if (!user.value) {
          router.replace({
            path: "/login",
            query: {
              redirectTo: router.currentRoute.value.path
            }
          });
        } else {
          if (user.value.calendar) {
            calendar.value = user.value.calendar;
          }

          if (await userClient.isGoogleUser()) {
            const blocks = await calendarClient.findBusyBlocks(
              startTime,
              endTime,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              user.value!.uid
            );
            const merged = merge(calendar.value, { blocks });
            calendar.value = merged;
          }
          loadingCalendar.value = false;
        }
      }
    });

    const isEditable = ref(false);

    // Example  Events
    const events = [
      {
        id: 0,
        name: "Team Meeting",
        time: "Sep 15th, 14:00  -15:00",
        isScheduled: true
      },
      {
        id: 1,
        name: "Project Debrief",
        time: "Sep 20th, 9:00 - 10:00",
        isScheduled: true
      },
      {
        id: 2,
        name: "Meet up with the homies",
        time: "Every Monday, 17:00 - 19:00",
        isScheduled: true
      },
      {
        id: 3,
        name: "110 Group Meeting",
        isScheduled: false,
        responses: 6
      },
      {
        id: 4,
        name: "Volunteer",
        isScheduled: false,
        responses: 1
      }
    ];

    // To see scrollbar
    for (let i = 0; i < 20; i++) {
      events.push({
        id: Math.random(),
        name: "Demo Scrollbar",
        isScheduled: false,
        responses: 0
      });
    }

    const toggleEdit = async () => {
      // If the user goes from editing -> not editing, save the calendar to the db
      if (isEditable.value) {
        loadingCalendar.value = true;
        await userClient.updateUser({ calendar: calendar.value });
      }
      isEditable.value = !isEditable.value;
    };

    return {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      events,
      calendar,
      isEditable,
      toggleEdit,
      loadingCalendar,
      user
    };
  }
});
</script>

<style scoped>
/*------------------------------------*\
  # MAIN COMPONENTS
\*------------------------------------*/

.dashboard {
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 100%;
  align-items: center;
  height: calc(100% - 4.5rem);
  margin: 0 5rem;
}

.card {
  margin: 0.5rem;
  border-radius: 5px;
  padding: 2rem;
  background: var(--color-card);
  height: 80%;
}

.card--heading {
  margin-bottom: 1rem;
}

/*------------------------------------*\
  # LEFT COMPONENTS
\*------------------------------------*/
.card--events {
  grid-column: 1;
}

.events {
  height: 100%;
}

.events li {
  margin: 1rem 0;
}

.events--all {
  overflow: hidden;
  overflow-y: auto;
  height: 90%;
}

.event-status {
  margin: 2.5rem 0;
}

.event-status_--header {
  margin: 1rem 0;
}

.dashboard-events {
  overflow: hidden;
  overflow-y: auto;
}

/*------------------------------------*\
  # RIGHT COMPONENTS
\*------------------------------------*/
.card--schedule {
  grid-column: 2;
}

.schedule--calendar {
  margin: 0;
  padding: 0;
  border-radius: 10px;
}

.schedule--subsection {
  display: flex;
  justify-content: space-between;
}

.schedule--timezone {
  color: #7d7d7d; /* Colour not in App.vue theme*/
  margin: auto;
}

.schedule--edit {
  color: var(--color-primary);
  text-decoration: underline;
  font-weight: 600;
  cursor: pointer;
}
</style>
