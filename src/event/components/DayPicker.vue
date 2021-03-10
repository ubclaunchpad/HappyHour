<template>
  <div class="day-picker">
    <!-- Day names ordered via data() -->
    <ul class="days button">
      <li
        v-for="(day, i) in days"
        :key="i"
        class="day-name button"
        :class="{ selected: day[1] }"
      >
        {{ day[0] }}
      </li>
    </ul>

    <!-- Selectable day blocks -->
    <ul class="days button">
      <li
        v-for="(day, i) in days"
        :key="i"
        :class="{ selected: day[1] }"
        class="day-block"
        @click="day[1] = !day[1]"
      ></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DayPicker",

  data() {
    return {
      // Each day of the week has name and selected state
      // Ordered as listed
      days: [
        ["Sun", false],
        ["Mon", false],
        ["Tue", false],
        ["Wed", false],
        ["Thu", false],
        ["Fri", false],
        ["Sat", false]
      ]
    };
  }
});
</script>

<style scoped>
.days {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 2rem;
}

.button {
  font-weight: 600;
}

.day-name {
  width: 4rem;
  text-align: center;
}

/* Underline day names when selected */
/* .day-name.selected {
  text-decoration: underline;
} */

.day-block {
  width: 4rem;
  height: 15rem;
  background: var(--color-card);
  border: 3px solid var(--color-disabled);
  border-radius: 8px;
  cursor: pointer;
}

.day-block.selected {
  background: var(--color-primary);
  opacity: 0.5;
}
</style>
