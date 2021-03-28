<template>
  <div class="login">
    <div class="heading">Log In</div>
    <div class="p1">
      <p>Username/Email:</p>
      <TextInput v-model="username" />
      <p>Password:</p>
      <TextInput v-model="password" />
    </div>
    <AppButton variant="primary" type="submit" class="button" @click="logIn()"
      >Login</AppButton
    >
    <AppButton
      variant="primary"
      type="button"
      class="button"
      @click="logInViaGoogle()"
    >
      <GoogleLogo variant="secondary" class="btn-logo" />
      Login with Google
    </AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import client from "../client";
import AppButton from "@/common/AppButton.vue";
import GoogleLogo from "@/common/app-icon/GoogleLogo.vue";
import TextInput from "@/common/TextInput.vue";

export default defineComponent({
  components: {
    AppButton,
    GoogleLogo,
    TextInput
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    redirectTo() {
      const redirectTo = this.$route.query.redirectTo as string;
      return redirectTo || "/";
    }
  },
  methods: {
    logIn() {
      client.login(this.username, this.password).then(() => {
        this.$router.push(this.redirectTo);
      });
    },
    logInViaGoogle() {
      client.googleLogin().then(() => {
        this.$router.push(this.redirectTo);
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
  margin-bottom: 1.25rem;
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

.btn-logo {
  margin-right: 0.5rem;
}
</style>
