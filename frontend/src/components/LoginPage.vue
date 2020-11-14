<template>
  <div class="login">
    <div class="heading">Log In</div>
    <div class="p1">
      <p>Username/Email:</p>
      <input class="input" v-model="username" />
      <p>Password:</p>
      <input class="input" v-model="password" />
    </div>
    <div class="button">
      <AppButton @update="logIn()" text="Log in" />
    </div>
    <div class="button">
      <AppButton @update="logInViaGoogle()" text="Log in with Google Account" />
    </div>
    <div class="button">
      <AppButton @update="signUp()" text="Sign up" />
    </div>
  </div>
</template>

<script lang="ts">
import { Auth } from "../auth";

import { defineComponent } from "vue";
import AppButton from "@/components/AppButton.vue";
export default defineComponent({
  components: {
    AppButton
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async logIn() {
      try {
        const user = Auth.signInWithEmailAndPassword(
          this.username,
          this.password
        );
        console.log("OK - Token: " + user); // TODO: post to server
      } catch (err) {
        console.error("ERR: " + err);
      }
    },
    logInViaGoogle() {
      // log in via Google Account
    },
    async signUp() {
      try {
        const user = Auth.createUserWithEmailAndPassword(
          this.username,
          this.password
        );
        console.log("OK - Token: " + user); // TODO: post to server
      } catch (err) {
        console.error("ERR: " + err);
      }
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
.login {
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
