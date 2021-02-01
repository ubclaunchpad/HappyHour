<template>
  <div>
    <h5>Respondents ({{ respondents.length }})</h5>

    <ul class="respondents">
      <li v-for="(resp, index) in respondents" :key="index" class="resp-item">
        {{ resp }}
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
      default: () => [
        "Tommy",
        "James",
        "Francis",
        "Jill",
        "Nanda",
        "Jacky",
        "Gokce",
        "Kai",
        "Henry",
        "Tiffany",
        "Michelle",
        "Tommy",
        "James",
        "Francis",
        "Jill",
        "Nanda",
        "Jacky",
        "Gokce",
        "Kai",
        "Henry",
        "Tiffany",
        "Michelle"
      ]
    }
  }
});
</script>

<style scoped>
h5 {
  font-weight: 500;
}

.respondents {
  width: 14.375rem;
  height: 25.3125rem;
  padding: 1rem 1.125rem;
  border-radius: 5px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background: rgb(255, 255, 255);
  text-align: left;
  font-weight: 500;
  overflow: hidden;
  overflow-y: auto;
}

.resp-item {
  margin-bottom: 0.75rem;
}
</style>
