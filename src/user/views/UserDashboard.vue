<template>
  <main class="dashboard">
    <section class="events card">
      <header class="card__heading">
        <h5>My Events</h5>
      </header>
      <article class="event-status">
        <header class="event-status__header">
          <div class="subtitle1">Scheduled</div>
        </header>
        <ul class="dashboard-events">
          <li v-for="event in events" :key="event.id">
            <template v-if="event.isScheduled">
              <DashboardEvent :event="event" />
            </template>
          </li>
        </ul>
      </article>

      <article class="event-status">
        <header class="event-status__header">
          <div class="subtitle1">Unscheduled</div>
        </header>
        <ul class="dashboard-events">
          <li v-for="event in events" :key="event.id">
            <template v-if="!event.isScheduled">
              <DashboardEvent :event="event" />
            </template>
          </li>
        </ul>
      </article>
    </section>

    <section class="schedule card">
      <header class="card__heading">
        <h5>My Set Schedule</h5>
      </header>
      <Calendar
        v-model:calendar="calendar"
        :start-time="startTime"
        :end-time="endTime"
        :edit-mode="editMode"
        class="schedule__calendar"
      />
      <div class="schedule__subsection">
        <div><!-- spacer  for flex--></div>
        <div class="schedule__timezone caption">
          (Time displayed in PST—Vancouver)
        </div>
        <button
          class="schedule__edit button"
          type="button"
          @click="switchEditMode"
        >
          Edit Schedule
        </button>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
// TODO: Turn article into component
// TODO: Handle overflow events scrollbar
// TODO: Better page layout
// TODO: Toggle Edit Schedule => View schedule
// TODO: Fix Calendar select
// TODO: Fix Calendar design
// TODO: Prevent overflow of Calendar on zooming
// TODO: Mobile support
// TODO: Figure out "Cannot find name 'Calendar'.Vetur(2304)""

import { defineComponent, computed, ref, reactive } from "vue";
import DashboardEvent from "@/user/components/DashboardEvent.vue";
import Calendar from "@/calendar/components/Calendar.vue";

const start = new Date("April 1, 2021 09:00:00");
const end = new Date("April  7, 2021 21:30:00");

export default defineComponent({
  name: "UserDashboard",

  components: { DashboardEvent, Calendar },

  props: {},

  setup() {
    const startTime = computed(() => start.toISOString());
    const endTime = computed(() => end.toISOString());
    const isEditable = ref(false);

    const calendar = reactive({
      blocks: []
    });
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
    return { startTime, endTime, events, calendar, isEditable };
  },

  data() {
    return {
      editMode: false
    };
  },
  methods: {
    switchEditMode: function() {
      this.editMode = true;
      console.log("Switched to Edit Mode");
    }
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

.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 5rem;
}

.card {
  padding: 2rem;
  height: 75%;
}

.card__heading {
  margin-bottom: 2rem;
}

/*------------------------------------*\
  # LEFT COMPONENTS
\*------------------------------------*/
.events {
  flex-grow: 2;
}

.events li {
  margin: 1rem 0;
}

.event-status {
  margin: 2.5rem 0;
}

.event-status__header {
  margin: 1rem 0;
}

/*------------------------------------*\
  # RIGHT COMPONENTS
\*------------------------------------*/
.schedule {
  flex-grow: 5;
}

.schedule__calendar {
  margin: 0;
  padding: 0;
  border-radius: 10px;
}

.schedule__subsection {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.schedule__timezone {
  /* Colour is not in App.vue */
  color: #7d7d7d;
}

.schedule__edit {
  color: var(--color-primary);
  text-decoration: underline;
  font-weight: 600;
  cursor: pointer;
}
</style>
