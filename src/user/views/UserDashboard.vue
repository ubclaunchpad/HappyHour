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
        <Calendar
          v-model:calendar="calendar"
          :start-time="startTime"
          :end-time="endTime"
          :edit-mode="isEditable"
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
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { startOfWeek, endOfWeek } from "date-fns";
import DashboardEvent from "@/user/components/DashboardEvent.vue";
import Calendar from "@/calendar/components/Calendar.vue";

export default defineComponent({
  name: "UserDashboard",

  components: { DashboardEvent, Calendar },

  props: {},

  setup() {
    const startTime = computed(() => startOfWeek(new Date()).toISOString());
    const endTime = computed(() => endOfWeek(new Date()).toISOString());

    const calendar = ref({
      blocks: []
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

    const toggleEdit = () => {
      isEditable.value = !isEditable.value;
    };

    return { startTime, endTime, events, calendar, isEditable, toggleEdit };
  }
});
</script>

<style scoped>
/*------------------------------------*\
  # MAIN COMPONENTS
\*------------------------------------*/

.dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 5rem;
}

.card {
  margin: 0.5rem;
  border-radius: 5px;
  padding: 2rem;
  background: var(--color-card);
  /* height: 36rem; */
  height: 75%;
}

.card--heading {
  margin-bottom: 2rem;
}

/*------------------------------------*\
  # LEFT COMPONENTS
\*------------------------------------*/
.card--events {
  flex-grow: 2;
}

.events {
  height: 100%;
  /* border: 1px solid red; */
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
  flex-grow: 5;
}

.schedule {
  /* border: 1px solid red; */
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
