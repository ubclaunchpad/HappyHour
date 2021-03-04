<template>
  <div class="login">
    <div class="heading">Log In</div>
    <div class="p1">
      <p>Username/Email:</p>
      <input v-model="username" class="input" />
      <p>Password:</p>
      <input v-model="password" class="input" />
    </div>
    <div class="button">
      <AppButton text="Log in" @update="logIn()" />
    </div>
    <div class="button">
      <AppButton text="Log in with Google Account" @update="logInViaGoogle()" />
    </div>
  </div>
</template>

<script lang="ts">
import firebase from "firebase/app";
import { defineComponent } from "vue";
import client from "../client";
import AppButton from "@/common/AppButton.vue";
import router from "@/router";

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
      client.login(this.username, this.password).then(() => {
        window.location.href = "/";
      });
    },
    logInViaGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          if (result.credential) {
            const credential = result.credential as firebase.auth.OAuthCredential;
            const token = credential.accessToken;
            console.log("OK - OAuth Token: " + token);
          }
        })
        .catch(function(err) {
          console.error("ERR: " + err);
        });
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
