<template>
  <div class="day-picker">
    <!-- Day names ordered via data() -->
    <ul class="days">
      <li
        v-for="day in days"
        :key="day"
        class="day-name day"
        :class="{ selected: day.isSelected }"
      >
        {{ day.dayName }}
      </li>
    </ul>

    <!-- Selectable day blocks -->
    <ul class="days button">
      <li v-for="day in days" :key="day">
        <button
          type="button"
          class="day-block day button"
          :class="{ selected: day.isSelected }"
          @click="day.isSelected = !day.isSelected"
        ></button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DayPicker",

  data: () => ({
    // Days ordered as listed
    days: [
      { dayName: "Sun", isSelected: false },
      { dayName: "Mon", isSelected: false },
      { dayName: "Tue", isSelected: false },
      { dayName: "Wed", isSelected: false },
      { dayName: "Thu", isSelected: false },
      { dayName: "Fri", isSelected: false },
      { dayName: "Sat", isSelected: false }
    ]
  })
});
</script>

<style scoped>
.day-picker {
  width: 100%;
}

.days {
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
}

.day {
  width: 100%;
}

.day-name {
  text-align: center;
  text-transform: capitalize;
  font-weight: 600;
}

/* Underline day names when selected */
/* .day-name.selected {
  text-decoration: underline;
} */

.button {
  cursor: pointer;
}

.day-block {
  padding: 0 1.5rem;
  height: 15rem;
  background: var(--color-card);
  border: 3px solid var(--color-disabled);
  border-radius: 8px;
}

.day-block.selected {
  background: var(--color-primary);
  opacity: 0.5;
}

/*------------------------------------*\
  # MEDIA QUERIES
\*------------------------------------*/
@media screen and (max-width: 520px) {
  /* For <520px: */
  .day-block {
    padding: 0 1rem;
    height: 10rem;
  }
}

/* Good for min-width 250px */
@media screen and (max-width: 400px) {
  /* For <400px: */
  .day-block {
    padding: 0 0.75rem;
  }
}
</style>
