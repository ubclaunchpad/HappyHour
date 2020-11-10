<template>
  <div>
    <div class="sub-heading">
      <h3>Respondents ({{ respondents.length }})</h3>
    </div>
    <div class="respondents">
      <ul>
        <li
          class="respondent"
          v-for="respondent in respondents"
          :key="respondent"
        >
          {{ respondent }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data: () => {
    return {
      respondents: [
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
        "This",
        "List",
        "Is",
        "Very",
        "Long",
        "Wow",
        "It's",
        "Hard",
        "To",
        "Saturate",
        "Okay",
        "Maybe",
        "I'm",
        "Close",
        "Now",
        "?"
      ]
    };
  },

  components: {}
});
</script>

<style scoped>
.respondents {
  border-radius: 5px;
  background: rgb(255, 255, 255);
  width: 230px;
  height: 405px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  padding: 1rem 1.125rem;

  overflow: hidden;
  overflow-y: scroll;
  text-align: left;

  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.12px;
}

.respondent {
  list-style-type: none;
  margin-bottom: 12px;
}
</style>
