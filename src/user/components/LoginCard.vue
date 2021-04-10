<template>
  <div class="card">
    <div class="login">
      <AppButton v-if="closable" class="btn-close" @click="close()"
        >x</AppButton
      >

      <heading><h3 class="login--heading">Login</h3></heading>

      <form class="form" @submit.prevent="logIn()">
        <div class="form--element">
          <label for="username" class="label">Email:</label>
          <TextInput
            id="username"
            v-model="username"
            name="username"
            type="text"
            required
            class="input"
          />
        </div>

        <div class="form--element">
          <label for="password" class="label">Password:</label>
          <TextInput
            id="password"
            v-model="password"
            name="password"
            type="password"
            required
            class="input"
          />
        </div>

        <AppButton variant="primary" type="submit" class="btn">
          Login
        </AppButton>

        <AppButton
          variant="secondary"
          type="button"
          class="btn"
          @click="logInViaGoogle()"
        >
          <GoogleLogo variant="primary" class="btn-logo" />
          Login with Google
        </AppButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import client from "../client";
import AppButton from "@/common/AppButton.vue";
import TextInput from "@/common/TextInput.vue";
import GoogleLogo from "@/common/app-icon/GoogleLogo.vue";

export default defineComponent({
  components: {
    AppButton,
    GoogleLogo,
    TextInput
  },

  props: {
    closable: {
      default: false,
      type: Boolean
    }
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
        this.$emit("close");
        this.$router.push(this.redirectTo);
      });
    },
    logInViaGoogle() {
      client.googleLogin().then(() => {
        this.$emit("close");
        this.$router.push(this.redirectTo);
      });
    },
    close() {
      this.$emit("close");
    }
  }
});
</script>

<style scoped>
.btn-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
}

.card {
  padding: 2.5rem;
}

.login {
  display: grid;
  grid-template-rows: 0.2fr auto;
  height: 100%;
}

.form {
  display: grid;
  grid-template-rows: auto;
  row-gap: 2rem;
  align-content: center;
}

.input {
  margin-top: 0.25rem;
}

.login--heading {
  color: var(--color-primary);
}

.btn-logo {
  margin-right: 0.5rem;
}
</style>
