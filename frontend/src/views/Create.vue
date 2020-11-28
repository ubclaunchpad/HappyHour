<template>
  <form class="main">
    <!-- Left Components -->
    <div class="main-left">
      <!-- Date Card -->
      <section class="date card">
        <h5>Pick the date</h5>

        <!-- EventDateSelectors component -->
        <DatePicker v-if="isDatePickerEvent" class="date-picker" />
        <DayPicker v-if="!isDatePickerEvent" class="day-picker" />
        <AppToggleExternalText
          class="date-toggle"
          toggle-left-text="Single"
          toggle-right-text="Recurring"
          :default-state="false"
          @toggled="toggleEventType"
        />
        <AppToggleInternalText
          style="display: none"
          left-text="My Availability"
          right-text="Group Availability"
          checked="false"
          @update="toggleEventType()"
        />
      </section>
    </div>

    <!-- Right Components -->
    <div class="main-right">
      <!-- Time  Card -->
      <section class="time card">
        <h5>Pick the time</h5>

        <!-- EventTimePicker component -->
        <div class="time-picker">
          Between

          <!-- TimeInputs component -->
          <input type="number" required />
          <div class="time-period">
            <select name="dropdown">
              <option value="AM" selected>AM</option>
              <option value="PM">PM</option>
            </select>
            <AppIcon
              class="icon-select-arrow"
              width="12"
              icon="chevron-down"
            ></AppIcon>
          </div>

          and

          <!-- TimeInputs component -->
          <input type="number" required />
          <div class="time-period">
            <select name="dropdown">
              <option value="AM" selected>AM </option>
              <option value="PM">PM </option>
            </select>
            <AppIcon
              class="icon-select-arrow"
              width="12"
              icon="chevron-down"
            ></AppIcon>
          </div>
        </div>

        <!-- EventTimezonePicker component-->
        <div class="timezone-picker">
          <AppIcon
            class="icon-location"
            width="12"
            icon="location-pin"
          ></AppIcon>
          <select name="dropdown">
            <option value="America/Vancouver - PST" selected>
              America/Vancouver - PST</option
            >
            <option value="Option #2"> Option #2</option>
            <option value="Option #3"> Option #3</option>
            <option value="Option #4"> Option #4</option>
            <option value="Option #5"> Option #5</option>
            <option value="Option #6"> Option #6</option>
          </select>
          <AppIcon
            class="icon-select-arrow"
            width="12"
            icon="chevron-down"
          ></AppIcon>
        </div>
      </section>

      <!-- Event Card -->
      <section class="event card">
        <h5>Event Name</h5>

        <input type="text" required />

        <button
          v-if="isHidden"
          class="btn-add-desc button"
          type="button"
          @click="isHidden = false"
        >
          Add a description
        </button>

        <!-- EventDescription Component -->
        <section v-if="!isHidden" class="event-description">
          <h5>Description</h5>

          <div class="description-textarea-container">
            <button
              class="btn-close button"
              type="button"
              @click="isHidden = true"
            >
              <AppIcon
                class="icon-select-arrow"
                width="25"
                icon="times"
              ></AppIcon>
            </button>
            <textarea autofocus />
          </div>
        </section>

        <AppButton class="btn-create" text="Create Event" type="submit" />
      </section>
    </div>
  </form>
</template>

<script lang="ts">
//TODO: Store props/data: selectedDates, selectedDays, start/endTime, start/endTimePeriod, timezone, eventName, eventDescription
//TODO: Add typescripts i.e., eventName & eventDetails to index.ts
//TODO: Validate legal time 0-24hr
//TODO: Validate empty space Event Name " "
//TODO: Support 24HR via auto-changing AM/PM
//TODO: Move svg to a separate files
//TODO: Move Event components to separate files
//TODO: Add responsive support
//TODO: POST to backend
//TODO: Comment & clean up code
//FIXME: Replace toggle and link it up
//FIXME: Align toggle margin with .btn-create
//FIXME: Focus on textarea multiple times
//FIXME: Width size of btn-add-desc

import { defineComponent } from "vue";
import AppButton from "@/components/AppButton.vue";
import AppToggleExternalText from "@/components/AppToggleExternalText.vue";
import AppToggleInternalText from "@/components/AppToggleInternalText.vue";
import DatePicker from "@/components/DatePicker.vue";
import DayPicker from "@/components/DayPicker.vue";
import AppIcon from "@/components/AppIcon.vue";

export default defineComponent({
  name: "Create",
  components: {
    AppButton,
    AppIcon,
    AppToggleExternalText,
    AppToggleInternalText,
    DatePicker,
    DayPicker
  },
  props: {},

  data() {
    return {
      isHidden: true,
      isDatePickerEvent: true
    };
  },

  computed: {},

  methods: {
    toggleEventType(toggleState: boolean) {
      this.isDatePickerEvent = toggleState;
    }
  }
});
</script>

<style scoped>
/*------------------------------------*\
  # GLOBAL
\*------------------------------------*/

/* Override Global Heading */
h5 {
  text-align: left;
  align-self: flex-start;
}

/* Hides drop-down arrow */
select {
  -webkit-appearance: none;
}

/* Card styling */
.card {
  width: 100%;
  padding: 1.75rem;
  border-radius: 5px;
  background: rgb(255, 255, 255);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

/* Input boxes */
.time-picker input,
.time-picker select,
.timezone-picker select,
.event input,
.event-description textarea {
  height: 2.5rem;
  padding: 0.5rem;
  border: 1px solid rgb(240, 243, 245);
  border-radius: 5px;
  background: rgb(255, 255, 255);
}

/*------------------------------------*\
  # MAIN COMPONENTS
\*------------------------------------*/

.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 7.875rem;
}

.main-left,
.main-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 560px; /*FIXME: */
  height: 576px; /*FIXME: */
  /* width: calc(100% / (1440 / 560)); /*560px for 1440px width*/
  margin: 0 0.4375rem 0.875rem 0.4375rem;
}

/*------------------------------------*\
  # LEFT COMPONENTS
\*------------------------------------*/

/* ========= Date ========= */
.date {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.day-picker {
}

.date-toggle {
}
/*------------------------------------*\
  # RIGHT COMPONENTS
\*------------------------------------*/

/* ========= Time ========= */

.time {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.time-picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
}

.time-picker input {
  width: 4rem;
  /*text-align: center;*/

  /* Hide input spin buttons*/
  -webkit-appearance: none;
  -moz-appearance: textfield;
}

/* Display input spin buttons on Firefox hover*/
.time-picker input:hover {
  -moz-appearance: button;
}

.time-period select {
  width: 5rem;
}

.timezone-picker {
  margin-bottom: 0.25rem;
}

.timezone-picker select {
  width: 100%;
  padding-left: 1.75rem;
}

/* Icon containers & icons*/
.time-period,
.timezone-picker {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time-period .icon-select-arrow,
.timezone-picker .icon-select-arrow {
  position: absolute;
  right: 1rem;
}

.timezone-picker .icon-location {
  position: absolute;
  left: 0.75rem;
}

/* ========= Event ========= */

.event {
  display: flex;
  flex-direction: column;
  height: 60%;
}

.event input {
  margin: 1.5rem 0;
}

.btn-add-desc {
  margin-bottom: 4.875rem;
  color: rgb(114, 122, 137);
  font-weight: 400;
  text-align: left;
  text-decoration-line: underline;
}

.btn-add-desc:hover {
  cursor: pointer;
  opacity: 0.8;
}

.event-description textarea {
  width: 100%;
  min-height: 3.5rem;
  resize: none;
}

.btn-create {
  width: 100%;
  background: rgb(55, 87, 134);
  color: rgb(255, 255, 255);
}

.btn-create:hover {
  color: rgb(55, 87, 134);
  background: rgba(255, 255, 255, 0);
}

/* Icon containers & icons*/
.description-textarea-container {
  position: relative;
  margin: 1.5rem 0;
}

.btn-close {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  cursor: pointer;
}

.btn-close:hover {
  opacity: 0.3;
}
</style>
