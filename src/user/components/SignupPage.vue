<template>
  <div class="signup">
    <div class="heading">Sign up</div>
    <div class="p1">
      <p>Email:</p>
      <input v-model="email" class="input" />
      <p>Password:</p>
      <input v-model="password" class="input" />
    </div>
    <div class="button">
      <AppButton text="Sign up" @update="signUp()" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/common/AppButton.vue";
import client from "../client";

export default defineComponent({
  components: {
    AppButton
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp() {
      client.createUser(this.email, this.password);
      this.$router.push("/login");
    }
  }
});
</script>

<style scoped>
.heading {
  font-weight: 500;
}
.input {
  width: 422px;
  height: 38px;
  background: #ffffff;
  border: 1px solid #4760f3;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin-bottom: 20px;
}
.p1 {
  text-align: left;
}
.button {
  width: 422px;
  padding-top: 10px;
  margin-bottom: 10px;
}
.signup {
  position: absolute;
  width: 556px;
  height: 484px;
  left: 442px;
  top: 234px;
  background: #ffffff;
  border-radius: 8px;
  padding: 55px;
}
</style>
