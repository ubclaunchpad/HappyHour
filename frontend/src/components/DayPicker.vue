<template>
  <table>
    <tr>
      <th v-for="(day, i) in days" :key="i" class="body2">{{ day[0] }}</th>
    </tr>
    <tr>
      <td
        v-for="(day, i) in days"
        :key="i"
        :class="{ selected: day[1] }"
        @click="day[1] = !day[1]"
      ></td>
    </tr>
  </table>
</template>

<script>
//TODO: Make buttons for day selection
//FIXME: Flexbox instead of tables
//FIXME: Styling
//FIXME: Relative units
import { defineComponent } from "vue";
export default defineComponent({
  name: "DayPicker",

  data() {
    return {
      // Each day of the week has name and selected state
      days: [
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
.body2 {
  font-weight: 600;
}

table {
  width: 100%;
  padding: 20px;
  border-collapse: separate;
  border-spacing: 7px 49px;
}

tr {
  padding: 20px;
}

td {
  width: 57px;
  height: 238px;
  border: 3px solid rgb(196, 196, 196);
  border-radius: 8px;
  background: rgb(255, 255, 252);
}

td.selected {
  width: 57px;
  height: 238px;
  border: 0px solid rgb(196, 196, 196);
  border-radius: 8px;
  background: rgba(55, 87, 134, 0.5);
}
</style>
