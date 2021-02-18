<template>
  <button :class="'btn-primary'" @click="update">
    <slot>{{ content }}</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppButton",
  props: {
    content: {
      type: null,
      default: null
    }
  },
  methods: {
    update() {
      this.$emit("update");
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-primary {
  background: rgb(55, 87, 134);
  border: 2px solid rgb(55, 87, 134);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 25px;

  font-size: 16px;
  line-height: 24px;
  align-items: center;
  letter-spacing: 0.12px;

  color: rgb(255, 255, 252);

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.btn-primary:hover {
  cursor: pointer;
  background: rgba(55, 87, 134, 0.8);
  border: 2px solid rgba(55, 87, 134, 0.8);
}

.btn-secondary {
  background: rgb(55, 87, 134, 0);
  border: 2px solid rgb(55, 87, 134);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 25px;

  font-size: 16px;
  line-height: 24px;
  align-items: center;
  letter-spacing: 0.12px;

  color: rgb(55, 87, 134);

  filter: drop-shadow(0px 0.5px 0.5px rgba(0, 0, 0, 0.15));
}

.btn-secondary:hover {
  cursor: pointer;
  background: rgba(55, 87, 134, 0);
  border: 2px solid rgba(55, 87, 134, 0.8);
}
</style>
