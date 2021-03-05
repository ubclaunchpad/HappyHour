<template>
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
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import DashboardEvent from "@/user/components/DashboardEvent.vue";

export default defineComponent({
  name: "DashboardEvents",

  component: { DashboardEvent },

  props: {
    events: { type: Array, required: true }
  },

  setup(props) {
    console.log(props.events);
    return {};
  }
});
</script>

<style scoped>
.dashboard-event-container {
  display: flex;
}

.status-block {
  width: 0.5rem;
  height: 2rem;
}

.scheduled {
  background: var(--color-success);
}

.unscheduled {
  background: var(--color-failure);
}

.event-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 0 1rem;
}

.event-text {
  display: flex;
  justify-content: space-between;
}

.separator {
  border-bottom: 1px solid var(--color-text-secondary);
}
</style>
