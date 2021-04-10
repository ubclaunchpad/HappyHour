<template>
  <div class="respondents--container">
    <h5 class="respondents--header">Respondents ({{ respondents.length }})</h5>

    <ul class="respondents--list">
      <li
        v-for="(respondent, index) in respondents"
        :key="index"
        class="respondents--item"
      >
        {{ respondent }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EventRespondents",

  props: {
    respondents: {
      type: Array,
      required: false,
      default: () => Array.from(Array(21), (_, index) => `Demo ${++index}`)
    }
  }
});
</script>

<style scoped>
.respondents--container {
  height: 100%;
}

.respondents--header {
  margin-bottom: 1rem;
}

.respondents--list {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}

.respondents--item {
  margin-bottom: 0.75rem;
}
</style>
