<template>
  <label
    :for="id + '_button'"
    :class="{ active: isActive }"
    class="toggle__button"
  >
    <span class="toggle__label">{{ toggleLeftText }}</span>

    <input
      type="checkbox"
      :disabled="disabled"
      :id="id + '_button'"
      v-model="checkedValue"
    />

    <span class="toggle__switch"></span>

    <span class="toggle__label">{{ toggleRightText }}</span>
  </label>
</template>

<script>
export default {
  props: {
    /*TODO: Grey out disabled toggle */
    disabled: {
      type: Boolean,
      default: false
    },

    toggleLeftText: {
      type: String,
      default: "«Left«"
    },

    toggleRightText: {
      type: String,
      default: "»Right»"
    },

    id: {
      type: String,
      default: "primary"
    },

    defaultState: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      myAvail: this.defaultState
    };
  },

  watch: {
    defaultState: function defaultState() {
      this.myAvail = Boolean(this.defaultState);
    }
  },

  computed: {
    isActive() {
      return this.myAvail;
    },

    enableText() {
      return this.toggledLeftText;
    },

    disabledText() {
      return this.labelDisableText;
    },

    checkedValue: {
      get() {
        return this.myAvail;
      },
      set(newValue) {
        this.myAvail = newValue;
        this.$emit("change", newValue);
      }
    }
  }
};
</script>

<style scoped>
/*TODO: Clean up styling */

.toggle__label {
  padding: 0 1rem;
  font-size: 0.875em;
}

/* Hide Checkbox */
.toggle__button input[type="checkbox"] {
  display: none;
}

.toggle__button {
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
}

.toggle__button button[disabled] {
  opacity: 0.5;
  pointer-events: none;
}

/* Toggle Button Shape */

.toggle__button .toggle__switch::after,
.toggle__button .toggle__switch::before {
  content: "";
  position: absolute;
  display: block;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  left: 0;
  top: -3px;
  transform: translateX(0);
  transition: all 0.25s cubic-bezier(0.5, -0.6, 0.5, 1.6);
}

.toggle__button .toggle__switch {
  display: inline-block;
  height: 12px;
  border-radius: 6px;
  width: 40px;
  background: #b6caf7;
  box-shadow: inset 0 0 1px #b6caf7;
  position: relative;
  margin-left: 10px;
  transition: all 0.25s;
}

/* Toggle Left */
.toggle__button .toggle__switch::after {
  background: #6791f0;
  box-shadow: 0 0 1px #666;
}

/*
.toggle__button .toggle__switch::before {
  background: #6791f0;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  opacity: 0;
} 
*/

/* Toggle Right */
.active .toggle__switch {
  background: #adedcb;
  box-shadow: inset 0 0 1px #adedcb;
}

.active .toggle__switch::after,
.active .toggle__switch::before {
  transform: translateX(40px - 18px);
}

.active .toggle__switch::after {
  left: 23px;
  background: #53b883;
  box-shadow: 0 0 1px #53b883;
}
</style>
