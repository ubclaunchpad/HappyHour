<template>
  <h1>Hello World</h1>
  <!-- <div class="dashboard-event-container">
    <div class="status-block"></div>
    <div>Hello</div>
  </div> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DashboardEvent"
});
</script>

<style scoped>
.dashboard-event-container {
  display: flex;
}

.status-block {
  width: 0.5rem;
  height: 2rem;
  background: red;
}
</style>
