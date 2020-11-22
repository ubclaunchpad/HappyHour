<template>
  <div class="container">
    <!-- Left Arrow Icon -->
    <button class="navi-left" type="button" @click="prevMonth">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 14H7"
          stroke="#375786"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14 21L7 14L14 7"
          stroke="#375786"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <!-- Main DatePicker Display -->
    <div class="main">
      <!-- Month & Year -->
      <section class="header">
        {{ currMonthName }}
        {{ currYear }}
      </section>

      <!-- Days -->
      <section class="day-names">
        <p
          style="width:calc(100%/7)"
          v-for="dayName in dayShortNames"
          :key="dayName"
        >
          {{ dayName }}
        </p>
      </section>

      <!-- Previous overflow -->
      <section class="dates-section">
        <button
          class="overflow dates"
          style="width:calc(100%/7)"
          v-for="date in daysInPrevMonthOverflow"
          :key="date"
          type="button"
        >
          {{ date }}
        </button>

        <!-- Viewing dates -->
        <button
          class="dates"
          style="width:calc(100%/7)"
          v-for="date in daysInMonth()"
          :key="date"
          :class="isCurrDate(date) ? 'curr-date' : ''"
          type="button"
        >
          {{ date }}
        </button>

        <!-- Next overlow -->
        <button
          class="overflow dates"
          style="width:calc(100%/7)"
          v-for="date in daysInNextMonthOverflow"
          :key="date"
          type="button"
        >
          {{ date }}
        </button>
      </section>
    </div>
    <!-- End Main DatePicker Display -->

    <!-- Right Arrow Icon -->
    <button class="navi-right" type="button" @click="nextMonth">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 14H21"
          stroke="#375786"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14 7L21 14L14 21"
          stroke="#375786"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  // TODO: Support drag & drop & multi-select -> ref CalendarDay.vue
  // TODO: Support drag drop multi-select cross months
  // TODO: Store data -> props?
  // TODO: Add typescripts
  // TODO: Reconsider methods & computed
  // TODO: Style per design,  remove borders
  // TODO: Comment & clean up code
  // FIXME: Inconsistent sizing in each month
  data() {
    return {
      currDate: new Date().getDate(),
      currMonthIndex: new Date().getMonth(),
      currYear: new Date().getFullYear(),
      dayShortNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    };
  },

  methods: {
    // Return the number of days for the viewing month
    daysInMonth() {
      return new Date(this.currYear, this.currMonthIndex + 1, 0).getDate();
    },

    // Return the index of the starting dayName of the viewing month
    // 0 = Sun, 7 = Sat
    monthStartDayIndex() {
      return new Date(this.currYear, this.currMonthIndex).getDay();
    },

    // Update currMonthIndex (used by currMonthName) with next month
    nextMonth() {
      if (this.currMonthIndex === 11) {
        this.currMonthIndex = 0;
        this.currYear++;
      } else {
        this.currMonthIndex++;
      }
    },

    // Update currMonthIndex (used by currMonthName) with prev month
    prevMonth() {
      if (this.currMonthIndex === 0) {
        this.currMonthIndex = 11;
        this.currYear--;
      } else {
        this.currMonthIndex--;
      }
    },

    // Return true if param is today's date
    isCurrDate(paramDayNum) {
      const paramDate = new Date(
        this.currYear,
        this.currMonthIndex,
        paramDayNum
      ).toDateString();
      const currDate = new Date().toDateString();

      return paramDate === currDate;
    }
  },
  computed: {
    // Returns the full name of the viewing month
    currMonthName() {
      return new Date(this.currYear, this.currMonthIndex).toLocaleString(
        "default",
        {
          month: "long"
        }
      );
    },

    // Returns array of overflowing dates in first week from the previous month
    daysInPrevMonthOverflow() {
      const lastDateOfPrevMonth = this.daysInMonth(); // 31

      return [...Array(lastDateOfPrevMonth + 1).keys()].slice(
        lastDateOfPrevMonth + 1 - this.monthStartDayIndex()
      );
    },

    // Returns number of days overflowing into next month in the last week
    daysInNextMonthOverflow() {
      const lastDayNameIndex = new Date(
        this.currYear,
        this.currMonthIndex + 1,
        0
      ).getDay(); // 0 = Sun, 7 = Sat

      return 6 - lastDayNameIndex;
    }
  }
};
</script>

<style scoped>
/*------------------------------------*\
  # GLOBAL
\*------------------------------------*/
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/*------------------------------------*\
  # CALENDAR DATE PICKER COMPONENT
\*------------------------------------*/

.main {
  margin: 0 5rem;

  border: 1px solid;
}

/* Month & Year */
.header {
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.12px;
  line-height: 24px;
  text-align: center;

  border: 1px solid;
}

/* Day Names */
.day-names {
  display: flex;
  justify-content: center;

  text-transform: uppercase;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 16px;
}

/* Dates */
.dates-section {
  display: flex;
  flex-wrap: wrap;

  border: 1px solid;
}

.dates {
  background: none;
  padding: 0.6rem;
  border-radius: 50%;

  border: 1px solid rgba(0, 0, 0, 0.2);
}

.dates:hover {
  cursor: pointer;
}

.overflow {
  opacity: 0.5;

  border: none;
}

.curr-date {
  font-weight: bold;
}

/*------------------------------------*\
  # DATE PICKER NAVIGATION
\*------------------------------------*/

.navi-left,
.navi-right {
  background: none;
  border: none;
}

.navi-left:hover,
.navi-right:hover {
  cursor: pointer;
}
</style>
