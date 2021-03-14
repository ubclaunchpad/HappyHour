<template>
  <section class="day">
    <header>{{ dateText }}</header>
    <div
      v-for="time in times"
      :key="`${dateText}-${time}`"
      :class="['block', { selected: isActive(time) }]"
      @touchstart="handleMouseDown(time, $event)"
      @mousedown="handleMouseDown(time, $event)"
      @touchmove="handleMouseOver(time, $event)"
      @mouseover="handleMouseOver(time, $event)"
      @touchend="handleMouseUp"
      @mouseup="handleMouseUp"
    ></div>
  </section>
</template>

<script lang="ts">
import { format, setHours, setMinutes } from "date-fns";
import { defineComponent, PropType } from "vue";

import { Block, Time } from "../client";
import { toTime } from "../utils";

export default defineComponent({
  props: {
    date: {
      type: String,
      required: true
    },
    times: {
      type: Object as PropType<Array<Time>>,
      required: true
    },
    blocks: {
      type: Object as PropType<Array<Block>>,
      required: true
    }
  },
  data() {
    return {
      dragging: false
    };
  },
  computed: {
    dateText(): string {
      return format(new Date(this.date), "E MMM d");
    }
  },
  mounted() {
    window.addEventListener("touchend", this.handleMouseUp);
    window.addEventListener("mouseup", this.handleMouseUp);
  },
  beforeUnmount() {
    window.removeEventListener("touchend", this.handleMouseUp);
    window.removeEventListener("mouseup", this.handleMouseUp);
  },
  methods: {
    handleMouseOver(time: Time, evt: TouchEvent) {
      if (this.dragging) {
        evt.preventDefault();
        this.toggle(time);
      }
    },
    handleMouseDown(time: Time, evt: TouchEvent) {
      evt.preventDefault();
      this.dragging = true;
      this.toggle(time);
    },
    handleMouseUp(evt: TouchEvent | MouseEvent) {
      evt.preventDefault();
      this.dragging = false;
    },
    isActive(time: Time) {
      const index = this.blocks.findIndex(block =>
        this.equalsBlock(time, block)
      );
      return index >= 0;
    },
    toggle(time: Time) {
      let blocks: Block[] = [];
      if (this.isActive(time)) {
        blocks = this.blocks.filter(block => !this.equalsBlock(time, block));
      } else {
        const newBlock: Block = {
          startTime: setHours(
            setMinutes(new Date(this.date), time.minutes),
            time.hour
          ),
          availableUsers: ["1"] // stub
        };
        blocks = [...this.blocks, newBlock];
      }
      this.$emit("update:blocks", { blocks, date: this.date });
    },
    equalsBlock(time: Time, block: Block) {
      const blockTime = toTime(block.startTime);
      return blockTime.hour === time.hour && blockTime.minutes === time.minutes;
    }
  }
});
</script>

<style scoped>
.day {
  flex: 1;
}

.block {
  /*border: 0.5px solid lightgray;*/
  border: 0.5px solid #f4f4f4;
  height: 2em;
}

.selected {
  background: rgba(143, 192, 198, 1);
}
</style>
