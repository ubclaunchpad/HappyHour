<template>
  <main class="login-page"><LoginCard class="login--card" /></main>
</template>

<script>
import LoginCard from "../components/LoginCard.vue";

export default {
  components: {
    LoginCard
  }
};
</script>

<style>
.login-page {
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100%;
  background: linear-gradient(135deg, #6a94ab 0%, var(--color-primary) 60%);
}

.login--card {
  width: 35rem;
  height: var(--content-height);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
