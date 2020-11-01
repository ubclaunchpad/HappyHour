<template>
  <vue-cal
    today-button
    :time-step="30"
    :disable-views="['years']"
    :snap-to-time="15"
    editable-events
    :events="events"
    class="vuecal--full-height-delete"
  >
  </vue-cal>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  data: () => ({})
};
</script>

<style></style>
