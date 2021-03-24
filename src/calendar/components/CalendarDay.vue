<template>
  <section class="day">
    <header>{{ dateText }}</header>
    <div
      v-for="time in times"
      :key="`${dateText}-${time}`"
      :style="{ '--opacity': getOpacity(time) }"
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
    },
    respondents: {
      type: Number,
      required: true
    },
    currentUser: {
      type: String,
      required: true
    }
  },
  emits: ["update:blocks"],
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
    getBlock(time: Time) {
      return this.blocks.find(block => this.equalsBlock(time, block));
    },
    getOpacity(time: Time) {
      const block = this.getBlock(time);
      if (block) {
        return block.availableUsers.length / this.respondents;
      }
      return 1;
    },
    isActive(time: Time) {
      return this.getBlock(time) !== undefined;
    },
    /**
     * When a block is toggled, we first check if the block is currently active.
     *
     * If the block is NOT active, we create a new block using the current user's id
     * and the given date/time.
     *
     * If the block IS active, we check if the block contains the current user's id.
     * If the block contains the current user id, we remove that user from the list;
     * otherwise, we add the user to the list of users.
     *
     * If, after removing the user, the block has no active users, we remove the
     * block from the calendar.
     */
    toggle(time: Time) {
      const currentBlock = this.getBlock(time);
      let blocks: Block[] = [];
      if (currentBlock) {
        if (currentBlock.availableUsers.includes(this.currentUser)) {
          currentBlock.availableUsers = currentBlock.availableUsers.filter(
            user => user !== this.currentUser
          );
        } else {
          currentBlock.availableUsers.push(this.currentUser);
        }
        if (currentBlock.availableUsers.length === 0) {
          blocks = this.blocks.filter(block => block !== currentBlock);
        } else {
          // Copy this.blocks to make sure Vue reacts to the update.
          blocks = [...this.blocks];
        }
      } else {
        const newBlock: Block = {
          startTime: setHours(
            setMinutes(new Date(this.date), time.minutes),
            time.hour
          ),
          availableUsers: [this.currentUser]
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
  opacity: var(--opacity);
}
</style>
