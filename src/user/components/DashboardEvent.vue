<template>
  <div class="dashboard-event-container">
    <!--    <span-->
    <!--      class="status-block"-->
    <!--      :class="{ scheduled: event.isScheduled, unscheduled: !event.isScheduled }"-->
    <!--    ></span>-->

    <!--    <div class="event-info">-->
    <!--      <div>&lt;!&ndash; spacer  for vertical flex&ndash;&gt;</div>-->
    <!--      <div class="event-text">-->
    <!--        <div class="event-left">{{ event.name }}</div>-->
    <!--        <div class="event-right">-->
    <!--          {{ event.time || eventResponses }}-->
    <!--        </div>-->
    <!--      </div>-->

    <!--      <div class="separator"></div>-->
    <!--    </div>-->

    <div class="event-info">
      <div><!-- spacer for vertical flex--></div>
      <div class="event-text">
        <div class="event-left">{{ event.title }}</div>
        <div class="event-right">
          {{ event.title }}
        </div>
      </div>

      <div class="separator"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "DashboardEvent",

  props: {
    event: { type: Object, required: true }
    // ownerEvent: {type: Object, required: true},
    // participantEvent: {type: Object, required: true}
  },

  setup(props) {
    const eventResponses = computed(
      () =>
        `${props.event.responses} ${
          props.event.responses === 0 || props.event.responses === 1
            ? "response"
            : "responses"
        }`
    );
    return { eventResponses };
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
