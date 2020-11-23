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
            <svg
              class="icon-select-arrow"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.74377 0.47241L5.83273 4.90669L1.92169 0.47241C1.82837 0.366602 1.71758 0.282671 1.59565 0.225408C1.47372 0.168145 1.34303 0.138672 1.21105 0.138672C1.07907 0.138672 0.948388 0.168145 0.826456 0.225408C0.704524 0.282671 0.593734 0.366602 0.500412 0.47241C0.407089 0.578218 0.333062 0.70383 0.282556 0.842075C0.23205 0.980319 0.206055 1.12849 0.206055 1.27812C0.206055 1.42776 0.23205 1.57593 0.282556 1.71417C0.333062 1.85242 0.407089 1.97803 0.500412 2.08384L5.12713 7.32955C5.52025 7.77527 6.15529 7.77527 6.54841 7.32955L11.1751 2.08384C11.2686 1.97811 11.3427 1.85252 11.3933 1.71427C11.4439 1.57601 11.4699 1.4278 11.4699 1.27812C11.4699 1.12845 11.4439 0.980237 11.3933 0.841982C11.3427 0.703727 11.2686 0.57814 11.1751 0.47241C10.782 0.0381242 10.1369 0.0266957 9.74377 0.47241Z"
                fill="rgba(55,87,134,1.0)"
              />
            </svg>
          </div>

          and

          <!-- TimeInputs component -->
          <input type="number" required />
          <div class="time-period">
            <select name="dropdown">
              <option value="AM" selected>AM </option>
              <option value="PM">PM </option>
            </select>
            <svg
              class="icon-select-arrow"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.74377 0.47241L5.83273 4.90669L1.92169 0.47241C1.82837 0.366602 1.71758 0.282671 1.59565 0.225408C1.47372 0.168145 1.34303 0.138672 1.21105 0.138672C1.07907 0.138672 0.948388 0.168145 0.826456 0.225408C0.704524 0.282671 0.593734 0.366602 0.500412 0.47241C0.407089 0.578218 0.333062 0.70383 0.282556 0.842075C0.23205 0.980319 0.206055 1.12849 0.206055 1.27812C0.206055 1.42776 0.23205 1.57593 0.282556 1.71417C0.333062 1.85242 0.407089 1.97803 0.500412 2.08384L5.12713 7.32955C5.52025 7.77527 6.15529 7.77527 6.54841 7.32955L11.1751 2.08384C11.2686 1.97811 11.3427 1.85252 11.3933 1.71427C11.4439 1.57601 11.4699 1.4278 11.4699 1.27812C11.4699 1.12845 11.4439 0.980237 11.3933 0.841982C11.3427 0.703727 11.2686 0.57814 11.1751 0.47241C10.782 0.0381242 10.1369 0.0266957 9.74377 0.47241Z"
                fill="rgba(55,87,134,1.0)"
              />
            </svg>
          </div>
        </div>

        <!-- EventTimezonePicker component-->
        <div class="timezone-picker">
          <svg
            class="icon-location"
            width="13"
            height="20"
            viewBox="0 0 13 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5444 9.5C5.94921 9.5 5.3784 9.23661 4.95754 8.76777C4.53668 8.29893 4.30024 7.66304 4.30024 7C4.30024 6.33696 4.53668 5.70107 4.95754 5.23223C5.3784 4.76339 5.94921 4.5 6.5444 4.5C7.13959 4.5 7.71041 4.76339 8.13127 5.23223C8.55213 5.70107 8.78857 6.33696 8.78857 7C8.78857 7.3283 8.73052 7.65339 8.61774 7.95671C8.50496 8.26002 8.33966 8.53562 8.13127 8.76777C7.92288 8.99991 7.67548 9.18406 7.40321 9.3097C7.13093 9.43534 6.83911 9.5 6.5444 9.5ZM6.5444 0C4.87787 0 3.2796 0.737498 2.10118 2.05025C0.922769 3.36301 0.260742 5.14348 0.260742 7C0.260742 12.25 6.5444 20 6.5444 20C6.5444 20 12.8281 12.25 12.8281 7C12.8281 5.14348 12.166 3.36301 10.9876 2.05025C9.80921 0.737498 8.21093 0 6.5444 0Z"
              fill="rgba(120,120,133,1.0)"
            />
          </svg>
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
          <svg
            class="icon-select-arrow"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.74377 0.47241L5.83273 4.90669L1.92169 0.47241C1.82837 0.366602 1.71758 0.282671 1.59565 0.225408C1.47372 0.168145 1.34303 0.138672 1.21105 0.138672C1.07907 0.138672 0.948388 0.168145 0.826456 0.225408C0.704524 0.282671 0.593734 0.366602 0.500412 0.47241C0.407089 0.578218 0.333062 0.70383 0.282556 0.842075C0.23205 0.980319 0.206055 1.12849 0.206055 1.27812C0.206055 1.42776 0.23205 1.57593 0.282556 1.71417C0.333062 1.85242 0.407089 1.97803 0.500412 2.08384L5.12713 7.32955C5.52025 7.77527 6.15529 7.77527 6.54841 7.32955L11.1751 2.08384C11.2686 1.97811 11.3427 1.85252 11.3933 1.71427C11.4439 1.57601 11.4699 1.4278 11.4699 1.27812C11.4699 1.12845 11.4439 0.980237 11.3933 0.841982C11.3427 0.703727 11.2686 0.57814 11.1751 0.47241C10.782 0.0381242 10.1369 0.0266957 9.74377 0.47241Z"
              fill="rgba(55,87,134,1.0)"
            />
          </svg>
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
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.75 6.25L6.25 18.75"
                  stroke="rgba(55,87,134,1.0)"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.25 6.25L18.75 18.75"
                  stroke="rgba(55,87,134,1.0)"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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

export default defineComponent({
  name: "Create",
  components: {
    AppButton,
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
  color: rgb(157, 157, 157);
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
