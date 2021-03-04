<template>
  <main class="dashboard-container">
    <!-- Tommy -->
    <section class="events card">
      <DashboardEvent />
      <header>
        <h5>My Events</h5>
      </header>
      <div>
        <div class="subtitle1">Scheduled</div>
        <div class="subtitle1">Unscheduled</div>
      </div>
    </section>

    <!-- Jill -->
    <section class="schedule card">
      <header>
        <h5>My Set Schedule</h5>
      </header>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Calendar from "@/calendar/components/Calendar.vue";
import DashboardEvent from "@/user/components/DashboardEvent.vue";

const start = new Date("November 2, 2020 09:00:00");
const end = new Date("November  8, 2020 21:30:00");

export default defineComponent({
  name: "UserDashboard",

  component: { Calendar, DashboardEvent },

  props: {},

  setup() {
    const startTime = computed(() => start.toISOString());
    const endTime = computed(() => end.toISOString());

    const events = [
      {
        name: "Team Meeting",
        time: "Sep 15th, 14:00-15:00",
        isScheduled: true
      },
      {
        name: "Project Debrief",
        time: "Sep 20th, 9:00 - 10:00",
        isScheduled: true
      },
      {
        name: "Meet up with the homies",
        time: "Every Monday, 17:00 = 19:00",
        isScheduled: true
      },
      {
        name: "Team Meeting",
        time: "Sep 15th, 14:00-15:00",
        isScheduled: false,
        responses: 6
      },
      {
        name: "110 Group Meeting",
        time: "Volunteer",
        isScheduled: false,
        responses: 4
      }
    ];
    return { startTime, endTime, events };
  }
});
</script>

<style scoped>
/*------------------------------------*\
  # GLOBAL
\*------------------------------------*/
.card {
  background: #fffffc;
  height: 36rem;
  border-radius: 5px;
  margin: 2rem;
}
/*------------------------------------*\
  # MAIN COMPONENTS
\*------------------------------------*/

.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 5rem;
}

.events,
.schedule {
  padding: 2rem;
  height: 75%;
}

/*------------------------------------*\
  # LEFT COMPONENTS
\*------------------------------------*/
.events {
  flex-grow: 3;
}
/*------------------------------------*\
  # RIGHT COMPONENTS
\*------------------------------------*/
.schedule {
  flex-grow: 4;
}
</style>
