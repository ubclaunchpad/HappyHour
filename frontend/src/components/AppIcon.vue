<template>
  <component :is="icon" :width="widthAsNum"></component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import LeftArrow from "./app-icon/LeftArrow.vue";
import RightArrow from "./app-icon/RightArrow.vue";
import ChevronDown from "./app-icon/ChevronDown.vue";
import Times from "./app-icon/Times.vue";
import LocationPin from "./app-icon/LocationPin.vue";
import Bars from "./app-icon/Bars.vue";

const toCamelCase = (kebabCase: string) => {
  const words = kebabCase.split("-");
  return words.map(word => word[0].toUpperCase() + word.slice(1)).join("");
};

export default defineComponent({
  components: {
    LeftArrow,
    RightArrow,
    ChevronDown,
    Times,
    LocationPin,
    Bars
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    width: {
      type: [String, Number],
      required: false,
      default: 16
    }
  },
  computed: {
    component(): string {
      return toCamelCase(this.icon);
    },
    widthAsNum(): number {
      return Number(this.width);
    }
  }
});
</script>
