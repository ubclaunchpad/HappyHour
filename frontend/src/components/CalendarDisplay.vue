<template>
  <VueCal
    today-button
    :time-step="30"
    :disable-views="['years']"
    :snap-to-time="15"
    editable-events
    :events="events"
    active-view="week"
    startWeekOnSunday
    events-on-month-view="short"
    class="vuecal--full-height-delete"
    style="height: 50rem"
  >
  </VueCal>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  data: () => ({
    events: [
      {
        start: "2020-11-01 9:00",
        end: "2020-11-01 14:00",
        title: "When3Meet Meeting",
        content:
          '<i class="emojiIcon">🚫</i><br>I am not draggable, not resizable and not deletable.',
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

.vuecal__event-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 4px 0 8px;
}

.vuecal__event-time {
  display: inline-block;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
  font-style: italic;
}

.vuecal__event.blue-event {
  background-color: rgba(164, 230, 210, 0.9);
  border: 1px solid rgb(144, 210, 190);
}

/*Not working. IDK Why */
.vuecal__event--dragging {
  background-color: rgba(51, 153, 0, 0.8);
}

.emojiIcon {
}
</style>
