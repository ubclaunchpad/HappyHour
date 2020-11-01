<template>
  <vue-cal
    today-button
    :time-step="30"
    :disable-views="['years']"
    :snap-to-time="15"
    editable-events
    :events="events"
    class="vuecal--full-height-delete"
  >
  </vue-cal>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  data: () => ({
    events: [
      {
        start: "2020-11-01 11:00",
        end: "2020-11-01 12:00",
        title: "When3Meet Meeting #3",
        content:
          '<i class="icon material-icons">block</i><br>I am not draggable, not resizable and not deletable.',
        class: "blue-event",
        deletable: false,
        resizable: false,
        draggable: false
      }
    ]
  })
};
</script>

<style>
.vuecal__menu,
.vuecal__cell-events-count {
  background-color: #42b983;
}
.vuecal__title-bar {
  background-color: #e4f5ef;
}
.vuecal__cell--today,
.vuecal__cell--current {
  background-color: rgba(240, 240, 255, 0.4);
}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: rgba(235, 255, 245, 0.4);
}
.vuecal__cell--selected:before {
  border-color: rgba(66, 185, 131, 0.5);
}
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
  background-color: rgba(195, 255, 225, 0.5);
}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
  background-color: rgba(136, 236, 191, 0.25);
}
</style>
