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
  </div>
</template>

<script lang="ts">
import { Auth } from "../auth";
import firebase from "firebase/app";
import { defineComponent } from "vue";
import AppButton from "@/components/AppButton.vue";
import axios from "axios";

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
        console.log("OK - Token: " + user);
      } catch (err) {
        console.error("ERR: " + err);
      }
    },
    logInViaGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      provider.addScope("https://www.googleapis.com/auth/calendar");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          if (result.credential && result.user) {
            const credential = result.credential as firebase.auth.OAuthCredential;
            const token = credential.accessToken;
            const firebaseID = result.user.uid;
            const uname = result.user.displayName;
            const email = result.user.email;
            console.log("OK - OAuth Token: " + token);
            console.log(
              `firebaseID: ${firebaseID}, uname: ${uname}, email: ${email}`
            );
            axios
              .post("", {
                AccessToken: token,
                FirebaseID: firebaseID,
                Username: uname,
                Email: email,
                Events: [],
                Calendar: null
              })
              .then(function(r) {
                console.log(`made request, heres the response: ${r}`);
              })
              .catch(function(e) {
                console.log(`could not make the request: ${e}`);
              });
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
