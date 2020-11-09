<template>
  <!--<div>
    <button @click="increment">Login with email</button>
    <button @click="decrement">Login with Google account</button>
  </div> -->
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
  <div>
    <AppButton text="Save Response" />
    <AppButton text="Copy Event Link" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/AppButton.vue";

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

  components: {
    AppButton
  }
});
</script>

<style>
.respondents {
  border-radius: 25px;
  background: rgb(221, 221, 221);
  padding: 20px;
  width: 50%;
  height: 60vh;
  margin: auto;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}

.respondents:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}

.respondent {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 60vh;

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
}
</style>
