<template>
  <div class="container">
    <!-- Left Arrow Icon -->
    <button class="navi-left" type="button" @click="prevMonth">
      <AppIcon icon="left-arrow" width="28"></AppIcon>
    </button>

    <!-- Main DatePicker Display -->
    <div class="main">
      <!-- Month & Year -->
      <section class="month-year">
        {{ currMonthName }}
        {{ currYear }}
      </section>

      <!-- Days -->
      <section class="day-names">
        <p
          v-for="dayName in dayShortNames"
          :key="dayName"
          class="overline"
          style="width:calc(100%/7)"
        >
          {{ dayName }}
        </p>
      </section>

      <!-- Previous overflow -->
      <section class="dates-section">
        <button
          v-for="date in daysInPrevMonthOverflow"
          :key="date"
          class="overflow dates"
          style="width:calc(100%/7)"
          type="button"
        >
          {{ date }}
        </button>

        <!-- Viewing dates -->
        <button
          v-for="date in daysInMonth()"
          :key="date"
          class="dates subtitle2"
          style="width:calc(100%/7)"
          :class="isCurrDate(date) ? 'curr-date' : ''"
          type="button"
        >
          {{ date }}
        </button>

        <!-- Next overlow -->
        <button
          v-for="date in daysInNextMonthOverflow"
          :key="date"
          class="overflow dates"
          style="width:calc(100%/7)"
          type="button"
        >
          {{ date }}
        </button>
      </section>
    </div>
    <!-- End Main DatePicker Display -->

    <!-- Right Arrow Icon -->
    <button class="navi-right" type="button" @click="nextMonth">
      <AppIcon icon="right-arrow" width="28"></AppIcon>
    </button>
  </div>
</template>

<script>
import AppIcon from "./AppIcon.vue";

export default {
  // TODO: Style per design,  remove borders
  // TODO: Support drag & drop & multi-select -> ref CalendarDay.vue
  // TODO: Support drag drop multi-select cross months
  // TODO: Store data -> props?
  // TODO: Add typescripts
  // TODO: Reconsider methods & computed
  // TODO: Comment & clean up code
  // FIXME: Inconsistent sizing in each month
  name: "DatePicker",
  components: {
    AppIcon
  },
  data() {
    return {
      currDate: new Date().getDate(),
      currMonthIndex: new Date().getMonth(),
      currYear: new Date().getFullYear()
    };
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

    dayShortNames() {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  text-align: center;
  width: 100%;
  position: relative;
}

.overline {
  font-weight: bold;
}

/*FIXME: To look into*/
.subtitle2 {
  font-weight: 500;
}

/*------------------------------------*\
  # CALENDAR DATE PICKER COMPONENT
\*------------------------------------*/

.main {
  width: 100%;
  max-width: 20rem;
}

/* Month & Year */
.month-year {
  margin-bottom: 0.875rem;
}

/* Day Names */
.day-names {
  display: flex;
  justify-content: center;

  text-transform: uppercase;
}

/* Dates */
.dates-section {
  display: flex;
  flex-wrap: wrap;
}

.dates {
  background: none;
  padding: 0.7rem; /*FIXME: Only way to get perfect circle*/
  margin: 0.3125rem 0;
  border-radius: 50%;
}

.dates:hover {
  cursor: pointer;
  background: rgba(55, 87, 134, 0.25);
}

.dates:focus {
  background: rgba(55, 87, 134, 0.5);
}

.overflow {
  color: rgba(213, 213, 213, 1);
}

.curr-date {
  font-weight: bold;
  background: rgba(55, 87, 134, 0.5);
}

/*------------------------------------*\
  # DATE PICKER NAVIGATION
\*------------------------------------*/

.navi-left,
.navi-right {
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.navi-left:hover,
.navi-right:hover {
  cursor: pointer;
}

.navi-left {
  left: 0;
}

.navi-right {
  right: 0;
}
</style>
