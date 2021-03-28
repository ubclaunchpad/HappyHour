<template>
  <form class="form">
    <button type="button" @click="logout">logout</button>
    <!-- Left Components -->
    <!-- Date Card -->
    <section class="date card">
      <h5 class="heading">Pick the date</h5>
      <!-- EventDateSelectors component -->
      <DatePicker
        v-if="!isChecked"
        v-model:startTime="startTime"
        v-model:endTime="endTime"
        class="date-picker"
      />
      <DayPicker
        v-if="isChecked"
        v-model:startTime="startTime"
        v-model:endTime="endTime"
        class="day-picker"
      />
      <AppToggle
        v-model="isChecked"
        left-text="Single Event"
        right-text="Recurring"
      />
    </section>

    <!-- Right Components -->
    <!-- Time  Card -->
    <section class="time card">
      <h5 class="heading">Pick the time</h5>

      <!-- EventTimePicker component -->
      <div class="time-picker">
        Between
        <TimePicker v-model="startTime" />
        and
        <TimePicker v-model="endTime" />
      </div>

      <!-- EventTimezonePicker component-->
      <div class="timezone-picker">
        <AppIcon class="icon-location" width="12" icon="location-pin"></AppIcon>
        <select v-model="timezone" name="dropdown">
          <option value="America/Vancouver"> America/Vancouver - PST</option>
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
      <section class="event-form">
        <h5>Event Name</h5>

        <TextInput
          v-model="eventTitle"
          class="textinput"
          placeholder="My Awesome Event"
          required
        />

        <LoginPage v-if="isModalVisible" @close="closeModal" />

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
          <TextInput
            v-model="eventDescription"
            class="textarea"
            type="textarea"
            placeholder="Enter Description"
            autofocus
            resize="vertical"
          >
            <template #suffix>
              <button
                class="btn-close-new button"
                type="button"
                @click="isHidden = true"
              >
                <AppIcon width="25" icon="times"></AppIcon>
              </button>
            </template>
          </TextInput>
        </section>
      </section>
      <AppButton variant="primary" type="submit" @click="createEvent"
        >Create Event</AppButton
      >
    </section>
  </form>
</template>

<script lang="ts">
//TODO: Store props/data: selectedDates, selectedDays, start/endTime, start/endTimePeriod, timezone, eventName, eventDescription
//TODO: Add typescripts i.e., eventName & eventDetails to index.ts
//TODO: Validate legal time 0-24hr
//TODO: Validate empty space Event Name " "
//TODO: Support 24HR via auto-changing AM/PM
//TODO: Move Event components to separate files
//TODO: Add responsive support
//TODO: POST to backend
//TODO: Comment & clean up code
//FIXME: Replace toggle and link it up
//FIXME: Align toggle margin with .btn-create
//FIXME: Focus on textarea multiple times
//FIXME: Width size of btn-add-desc
import { defineComponent } from "vue";
import { set } from "date-fns";
import TextInput from "@/common/TextInput.vue";
import AppButton from "@/common/AppButton.vue";
import AppToggle from "@/common/AppToggle.vue";
import AppIcon from "@/common/AppIcon.vue";
import DatePicker from "../components/DatePicker.vue";
import DayPicker from "../components/DayPicker.vue";
import TimePicker from "../components/TimePicker.vue";
import LoginPage from "../../user/components/LoginPage.vue";
import userClient, { Auth } from "../../user/client";
import { Event } from "../client";
import client from "../client";

function initialState() {
  return {
    isHidden: true,
    isDatePickerEvent: true,
    startTime: set(new Date(), { hours: 9, minutes: 0 }),
    endTime: set(new Date(), { hours: 21, minutes: 0 }),
    timezone: "America/Vancouver",
    eventTitle: "",
    eventDescription: "",
    isChecked: true,
    isModalVisible: false
  };
}

export default defineComponent({
  components: {
    AppButton,
    AppIcon,
    AppToggle,
    DatePicker,
    DayPicker,
    TimePicker,
    TextInput,
    LoginPage
  },
  data: function() {
    return initialState();
  },
  methods: {
    toggleEventType(toggleState: boolean) {
      this.isDatePickerEvent = toggleState;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    reset() {
      Object.assign(this.$data, initialState());
    },
    async createEvent(e: any) {
      e.preventDefault();
      if (!Auth.currentUser) {
        console.log("not logged in!");
        this.showModal();
        return;
      } else {
        console.log("logged in!");
        const event: Event = {
          users: [],
          owners: [Auth.currentUser.uid],
          scheduleWindow: {
            startTime: this.startTime,
            endTime: this.endTime
          },
          calendar: {
            blocks: []
          },
          title: this.eventTitle,
          timezone: this.timezone,
          description: this.eventDescription
        };
        client
          .addEvent(event)
          .then(eventId => {
            console.log("created new event with id: " + eventId);
            this.$router.push(`/event/${eventId}`);
          })
          .catch(err => {
            console.log("could not create event: " + err);
          });
        this.reset();
      }
    },
    logout() {
      userClient.logout();
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
  padding: 1.5rem;
  border-radius: 5px;
  background: rgb(255, 255, 255);
  box-shadow: var(--shadow-base);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
.event-form {
  display: flex;
  flex-direction: column;
}
@media screen and (min-width: 1150px) {
  .card {
    margin: 0;
    padding: 3rem;
  }
}
/*------------------------------------*\
  # MAIN COMPONENTS
\*------------------------------------*/
.form {
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 3rem;
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
@media screen and (min-width: 1150px) {
  .form {
    display: grid;
    grid-template-areas:
      "date time"
      "date event";
    width: 80vw;
    height: 70vh;
    max-width: 80rem;
    margin: auto;
    grid-gap: 1.5rem;
    grid-template-rows: 1fr 2fr;
    grid-template-columns: 3fr 2fr;
  }
}
/*------------------------------------*\
  # LEFT COMPONENTS
\*------------------------------------*/
/* ========= Date ========= */
.date {
  grid-area: date;
  align-items: center;
}
.date-picker {
  margin: 0 -1.25rem;
  margin-bottom: 2rem;
  max-width: 32rem;
  padding: 0 1rem;
}
.heading {
  margin-bottom: 1.5rem;
}
/*------------------------------------*\
  # RIGHT COMPONENTS
\*------------------------------------*/
/* ========= Time ========= */
.time {
  grid-area: time;
}
.time-picker {
  column-gap: 1rem;
  row-gap: 0.5rem;
  align-items: center;
  justify-items: end;
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-bottom: 1rem;
}
.timezone-picker {
  margin-bottom: 0.25rem;
}
.timezone-picker select {
  width: 100%;
  padding-left: 1.75rem;
}
/* Icon containers & icons*/
.timezone-picker {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon-select-arrow,
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
  grid-area: event;
}
.textinput {
  margin: 1rem 0;
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
.btn-create {
  width: 100%;
  background: rgb(55, 87, 134);
  color: rgb(255, 255, 255);
}
.btn-create:hover {
  color: rgb(55, 87, 134);
  background: rgba(255, 255, 255, 0);
}
.textarea {
  margin: 1rem 0;
}
.button {
  cursor: pointer;
}
.button:hover {
  opacity: 0.3;
}
</style>
