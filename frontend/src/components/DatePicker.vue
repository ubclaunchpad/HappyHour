<template>
  <div class="container">
    <section>
      <button @click="prevMonth">🢠</button>
      <button @click="nextMonth">➪</button>
    </section>

    <section>
      <h2>{{ currMonthName }}</h2>
      <h2>{{ currYear }}</h2>
    </section>

    <section class="flex">
      <p
        class="text-center"
        style="width:calc(100%/7)"
        v-for="day in dayShortNames"
        :key="day"
      >
        {{ day }}
      </p>
    </section>

    <section class="flexwrap">
      <p
        class="text-center"
        style="width:calc(100%/7)"
        v-for="date in monthStartDate()"
        :key="date"
      ></p>
      <p
        class="text-center"
        style="width:calc(100%/7)"
        v-for="date in daysInMonth()"
        :key="date"
        :style="isCurrDate(date) ? 'font-bold text-orange-600' : ''"
      >
        {{ date }}
      </p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currDate: new Date().getUTCDate(),
      currMonthIndex: new Date().getMonth(),
      currYear: new Date().getFullYear(),
      dayShortNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    };
  },
  methods: {
    daysInMonth() {
      return new Date(this.currYear, this.currMonthIndex + 1, 0).getDate();
    },
    monthStartDate() {
      return new Date(this.currYear, this.currMonthIndex).getDay();
    },
    nextMonth() {
      if (this.currMonthIndex === 11) {
        this.currMonthIndex = 0;
        this.currYear++;
      } else {
        this.currMonthIndex++;
      }
    },
    prevMonth() {
      if (this.currMonthIndex === 0) {
        this.currMonthIndex = 11;
        this.currYear--;
      } else {
        this.currMonthIndex--;
      }
    },
    isCurrDate(paramDateDay) {
      const paramDate = new Date(
        this.currYear,
        this.currMonthIndex,
        paramDateDay
      ).toDateString();
      const currDate = new Date().toDateString();
      return paramDate === currDate;
    }
  },
  computed: {
    currMonthName() {
      return new Date(this.currYear, this.currMonthIndex).toLocaleString(
        "default",
        {
          month: "long"
        }
      );
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
}

.flexwrap {
  display: flex;
  flex-wrap: wrap;
}

* {
  text-align: center;
}

.container {
  margin: 2rem;
  padding: 1rem;
  width: 20%;
  height: 50%;
  border: 3px solid green;
  margin-left: auto;
  margin-right: auto;
}
</style>
