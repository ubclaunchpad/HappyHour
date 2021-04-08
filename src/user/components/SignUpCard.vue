<template>
  <div class="card">
    <div class="signup">
      <heading><h3 class="signup--heading">Sign Up</h3></heading>

      <form class="form" @submit.prevent="createAccount()">
        <div class="form--element">
          <label for="name" class="label">Name:</label>
          <TextInput
            id="name"
            v-model="newAccount.name"
            name="name"
            type="text"
            required
            class="input"
          />
        </div>

        <div class="form--element">
          <label for="email" class="label">Email:</label>
          <TextInput
            id="email"
            v-model="newAccount.email"
            name="email"
            type="email"
            required
            class="input"
          />
        </div>

        <div class="form--element">
          <label for="password" class="label">Password:</label>
          <TextInput
            id="password"
            ref="passwordRef"
            v-model="newAccount.password.password"
            name="password"
            type="password"
            minlength="8"
            required
            class="input"
            @change="validatePassword"
          />
        </div>

        <div class="form--element">
          <label for="passwordConfirm" class="label">Confirm Password:</label>
          <TextInput
            id="passwordConfirm"
            v-model="newAccount.password.confirm"
            name="passwordConfirm"
            type="password"
            minlength="8"
            required
            class="input"
            @change="validatePassword"
          />
        </div>

        <AppButton variant="primary" type="submit" class="btn">
          Create account
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
import { defineComponent, ref, computed } from "vue";
import AppButton from "@/common/AppButton.vue";
import TextInput from "@/common/TextInput.vue";
import GoogleLogo from "@/common/app-icon/GoogleLogo.vue";
import { useRouter, useRoute } from "vue-router";
import client from "../client";

export default defineComponent({
  name: "SignUpCard",
  components: { AppButton, TextInput, GoogleLogo },

  setup() {
    const router = useRouter();
    const route = useRoute();

    const newAccount = ref({
      name: "",
      email: "",
      password: {
        password: "",
        confirm: ""
      }
    });

    // const passwordRef = ref<InstanceType<typeof TextInput>>();
    const passwordRef = ref();

    const isPasswordMatch = computed(
      () =>
        newAccount.value.password.password === newAccount.value.password.confirm
    );

    const redirectTo = computed(() => {
      const redirectTo = route.query.redirectTo as string;
      return redirectTo || "/";
    });

    const validatePassword = () => {
      if (isPasswordMatch.value) {
        passwordRef.value.textinput.input.setCustomValidity(""); // Reset HTML validation
      } else {
        passwordRef.value.textinput.input.setCustomValidity(
          "Passwords don't match"
        );
      }
    };

    const createAccount = () => {
      validatePassword();
      passwordRef.value.textinput.input.reportValidity();
      client
        .createUser(newAccount.value.email, newAccount.value.password.password)
        .then(() => router.push(redirectTo.value));
    };

    const logInViaGoogle = () =>
      client.googleLogin().then(() => router.push(redirectTo.value));

    return {
      newAccount,
      passwordRef,
      validatePassword,
      createAccount,
      logInViaGoogle
    };
  }
});
</script>

<style scoped>
.card {
  padding: 2.5rem;
}

.signup {
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

.signup--heading {
  color: var(--color-primary);
}

.btn-logo {
  margin-right: 0.5rem;
}

@media screen and (max-width: 1280px) {
  h3 {
    font-size: 2.8rem;
  }

  .form {
    row-gap: 1.2rem;
  }
}

@media screen and (max-width: 1024px) {
  .card {
    padding: 2rem;
  }

  .signup {
    row-gap: 0.8rem;
  }

  .form {
    row-gap: 0.3rem;
  }
}
</style>
