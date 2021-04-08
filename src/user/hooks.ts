import { ref } from "vue";
import userClient, { Auth, User } from "./client";

/**
 * Returns a reactive user instance that changes when the user logs in and out.
 *
 * The user information is fetched asynchronously, so initially it will always be
 * null regardless if the user is logged in or not. To accomodate for this, we also
 * return an "isLoading" state that determines whether we're still retrieving the
 * user's information.
 *
 * @returns a reative user object and whether the user is still being fetched
 */
export function useUser() {
  const user = ref<User | null>(null);
  const isLoading = ref(true);

  Auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      userClient.subscribe(userResult => {
        user.value = userResult;
        if (isLoading.value) {
          isLoading.value = false;
        }
      });
    } else {
      user.value = null;
      isLoading.value = false;
    }
  });

  return { isLoading, user };
}
