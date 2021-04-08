<template>
  <main class="signup-page">
    <section class="marketing">
      <div class="marketing--content">
        <div class="marketing--heading">
          <h2>The Only Tool You Need</h2>
          <h2>for Group Scheduling</h2>
        </div>

        <ul class="marketing--list">
          <li class="marketing--item">
            <FastForward class="marketing--icon" />
            <h4>Faster event creation</h4>
          </li>
          <li class="marketing--item">
            <UserSilhouette class="marketing--icon" />
            <h4>Present schedule for all events</h4>
          </li>
          <li class="marketing--item">
            <Speedometer class="marketing--icon" />
            <h4>Dashboard for easy event management</h4>
          </li>
        </ul>
      </div>
    </section>

    <section class="signup">
      <SignUpCard class="signup--card" />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FastForward from "@/common/app-icon/FastForward.vue";
import UserSilhouette from "@/common/app-icon/UserSilhouette.vue";
import Speedometer from "@/common/app-icon/Speedometer.vue";
import SignUpCard from "@/user/components/SignUpCard.vue";

export default defineComponent({
  name: "SignUpPage",
  components: { FastForward, UserSilhouette, Speedometer, SignUpCard }
});
</script>

<style scoped>
/*------------------------------------*\
  # MAIN COMPONENTS
\*------------------------------------*/
.marketing--content,
.signup--card {
  --content-height: 45rem;
}

.signup-page {
  display: grid;
  grid-template-columns: 5fr 4fr;
  height: inherit;
  width: inherit;
}

/*------------------------------------*\
  # LEFT COMPONENTS
\*------------------------------------*/

.marketing {
  display: grid;
  justify-content: center;
  align-content: center;
  color: var(--color-card);
  background: linear-gradient(
    291.34deg,
    var(--color-primary) 0%,
    var(--color-secondary) 100%
  );
}

.marketing--content {
  display: grid;
  justify-content: center;
  /* align-content: start; */
  row-gap: 5rem;
  height: var(--content-height);
}

.marketing--list {
  display: grid;
  row-gap: 4rem;
}

.marketing--heading {
  display: grid;
  row-gap: 2rem;
}

.marketing--item {
  display: flex;
  align-items: center;
}

.marketing--icon {
  margin-right: 1.5rem;
  width: 3.75rem;
}

/*------------------------------------*\
  # RIGHT COMPONENTS
\*------------------------------------*/

.signup {
  display: grid;
  justify-content: center;
  align-content: center;
  background: linear-gradient(135deg, #6a94ab 0%, var(--color-primary) 60%);
}

.signup--card {
  width: 35rem;
  height: var(--content-height);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

/*------------------------------------*\
  # MEDIA QUERIES
\*------------------------------------*/
@media screen and (max-width: 1440px) {
  h2 {
    font-size: 3rem;
  }

  h4 {
    font-size: 1.8rem;
  }

  .marketing--content,
  .signup--card {
    --content-height: 40rem;
  }

  .signup--card {
    width: 30rem;
  }
}

@media screen and (max-width: 1280px) {
  h2 {
    font-size: 2.5rem;
  }

  h4 {
    font-size: 1.4rem;
  }

  .marketing--content,
  .signup--card {
    --content-height: 35rem;
  }

  .marketing--icon {
    margin-right: 1rem;
    width: 3rem;
  }

  .signup--card {
    width: 25rem;
  }
}

@media screen and (max-width: 1024px) {
  h2 {
    font-size: 2.1rem;
  }

  h4 {
    font-size: 1.2rem;
  }

  .marketing--content,
  .signup--card {
    --content-height: 30rem;
  }

  .marketing--icon {
    width: 2.5rem;
  }

  .signup--card {
    width: 18rem;
    height: 30rem;
  }
}

/* =======  ~~~~~~~~~~~~~ ======= */
/* =======  MOBILE PHONES ======= */
/* =======  ~~~~~~~~~~~~~ ======= */

@media screen and (max-width: 767px) {
  .signup-page {
    display: grid;
    grid-template-columns: none;
    grid-template-rows: auto auto;
    align-content: center;
    padding: 2rem 0;
    height: 200%;
    background: linear-gradient(
      291.34deg,
      var(--color-primary) 0%,
      var(--color-secondary) 100%
    );
  }

  h2 {
    font-size: 1.4rem;
    font-weight: bold;
  }

  h4 {
    font-size: 1rem;
  }

  .marketing {
    padding: 2rem 0;
    background: none;
  }

  .marketing--heading {
    row-gap: 0.8rem;
  }

  .marketing--content {
    row-gap: 1.8rem;
  }

  .marketing--list {
    row-gap: 1rem;
    width: 15rem;
  }

  .marketing--icon {
    margin-right: 0.8rem;
    width: 2rem;
  }

  .marketing--content {
    height: auto;
  }

  .signup {
    background: none;
  }

  .signup--card {
    height: auto;
    width: auto;
  }
}
</style>
