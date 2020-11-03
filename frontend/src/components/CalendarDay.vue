<template>
  <section class="day">
    <header>{{ dateText }}</header>
    <div
      v-for="time in times"
      :class="['block', { selected: selection.has(`${dateText}-${time}`) }]"
      :key="`${dateText}-${time}`"
      :data-time="`${dateText}-${time}`"
      @touchstart="handleMouseDown"
      @mousedown="handleMouseDown"
      @touchmove="handleMouseOver"
      @mouseover="handleMouseOver"
      @touchend="handleMouseUp"
      @mouseup="handleMouseUp"
    ></div>
  </section>
</template>

<script lang="ts">
import { format } from "date-fns";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    date: {
      type: String,
      required: true
    },
    times: {
      type: Object as PropType<Array<string>>,
      required: true
    }
  },
  data() {
    return {
      dragging: false,
      selection: new Set()
    };
  },
  computed: {
    dateText(): string {
      return format(new Date(this.date), "E MMM d");
    }
  },
  mounted() {
    window.addEventListener("touchstart", this.handleMouseUp);
  },
  beforeUnmount() {
    window.removeEventListener("touchend", this.handleMouseUp);
  },
  methods: {
    handleMouseOver(evt: TouchEvent) {
      if (this.dragging) {
        evt.preventDefault();
        const el = evt.target as HTMLElement;
        this.toggle(el.dataset.time);
      }
    },
    handleMouseDown(evt: TouchEvent) {
      evt.preventDefault();
      this.dragging = true;
      const el = evt.target as HTMLElement;
      this.toggle(el.dataset.time);
    },
    handleMouseUp(evt: TouchEvent) {
      evt.preventDefault();
      this.dragging = false;
    },
    toggle(key: string | undefined) {
      if (this.selection.has(key)) {
        this.selection.delete(key);
      } else if (key) {
        this.selection.add(key);
      }
    }
  }
});
</script>

<style scoped>
.day {
  flex: 1;
}

.block {
  border: 0.5px solid lightgray;
  height: 2em;
}

.selected {
  background: green;
}
</style>
