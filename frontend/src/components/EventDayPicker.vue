<template>
  <table>
    <tr>
      <th v-for="(day, i) in week" :key="i">{{ day[0] }}</th>
    </tr>
    <tr>
      <td
        v-for="(day, i) in week"
        :key="i"
        v-bind:class="{ selected: day[1] }"
        @click="day[1] = !day[1]"
      ></td>
    </tr>
  </table>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "EventDayPicker",

  data() {
    return {
      // each day of the week has name and selected state
      week: [
        ["Mon", false],
        ["Tue", false],
        ["Wed", false],
        ["Thu", false],
        ["Fri", false],
        ["Sat", false],
        ["Sun", false]
      ]
    };
  },

  methods: {}
});
</script>

<style scoped>
table {
  width: 100%;
  padding: 20px;
  border-spacing: 7px 49px;
  border-collapse: separate;
}

tr {
  padding: 20px;
}

td {
  width: 57px;
  height: 238px;
  background: rgb(255, 255, 252);
  border: 3px solid rgb(196, 196, 196);
  border-radius: 8px;
}

td.selected {
  width: 57px;
  height: 238px;
  background: rgba(55, 87, 134, 0.5);
  border: 0px solid rgb(196, 196, 196);
  border-radius: 8px;
}
</style>
