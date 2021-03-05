<template>
  <main class="dashboard-container">
    <section class="events card">
      <header class="card-heading">
        <h5>My Events</h5>
      </header>
      <article class="event-status">
        <header class="event-status-header">
          <div class="subtitle1">Scheduled</div>
        </header>
        <ul>
          <li v-for="event in events" :key="event.id">
            <template v-if="event.isScheduled">
              <DashboardEvent :event="event" />
            </template>
          </li>
        </ul>
      </article>

      <article class="event-status">
        <header class="event-status-header">
          <div class="subtitle1">Unscheduled</div>
        </header>
        <ul>
          <li v-for="event in events" :key="event.id">
            <template v-if="!event.isScheduled">
              <DashboardEvent :event="event" />
            </template>
          </li>
        </ul>
      </article>
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
import DashboardEvent from "@/user/components/DashboardEvent.vue";

const start = new Date("November 2, 2020 09:00:00");
const end = new Date("November  8, 2020 21:30:00");

export default defineComponent({
  name: "UserDashboard",

  components: { DashboardEvent },

  props: {},

  setup() {
    const startTime = computed(() => start.toISOString());
    const endTime = computed(() => end.toISOString());

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
    return { startTime, endTime, events };
  }
});
</script>

<style scoped>
/*------------------------------------*\
  # GLOBAL
\*------------------------------------*/
.card {
  background: var(--color-card);
  height: 36rem;
  border-radius: 5px;
  margin: 0.5rem;
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

.event-status {
  margin: 2.5rem 0;
}

.events,
.schedule {
  padding: 2rem;
  height: 75%;
}

.card-heading {
  margin-bottom: 2rem;
}

.event-status-header {
  margin: 1rem 0;
}

/*------------------------------------*\
  # LEFT COMPONENTS
\*------------------------------------*/
.events {
  flex-grow: 2;
}
/*------------------------------------*\
  # RIGHT COMPONENTS
\*------------------------------------*/
.schedule {
  flex-grow: 5;
}

li {
  /* margin-bottom: 1rem; */
  margin: 1rem 0;
}
</style>
