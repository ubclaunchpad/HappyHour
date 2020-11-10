<template>
  <div>
    <p class="label">Respondents</p>
    <div class="respondents">
      <ul class="respondent">
        <li v-for="respondent in respondents" :key="respondent">
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
  padding: 20px;
  width: 40%;
  height: 50ch;
  margin: auto;
  margin-bottom: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  transition: 0.3s;
}

.respondents:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}

.respondent {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 50ch;

  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 25px;

  align-items: center;
  letter-spacing: -0.56px;

  overflow: hidden;
  overflow-y: scroll;
}

.label {
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 44px;

  align-items: center;
  letter-spacing: -0.56px;
  filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.25));
}
</style>
