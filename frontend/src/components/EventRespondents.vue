<template>
  <div>
    <div class="sub-heading">
      <h3>Respondents ({{ respondents.length }})</h3>
    </div>

    <ul class="respondents">
      <li class="resp-item" v-for="(resp, index) in respondents" :key="index">
        {{ resp }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// FIXME: Pass in prop via EventRespondents respondents="[...]"
export default defineComponent({
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
    }
  }
});
</script>

<style scoped>
/* TODO: Reconsider relative units */
.respondents {
  border-radius: 5px;
  background: RGB(255, 255, 255);
  width: 25ch;
  height: 30ch;
  filter: drop-shadow(0px 4px 4px RGBA(0, 0, 0, 0.25));
  padding: 1rem 1.125rem;
  overflow: hidden;
  overflow-y: auto;
  text-align: left;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.12px;
}

.resp-item {
  margin-bottom: 12px;
}
</style>
