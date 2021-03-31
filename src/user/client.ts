const googleCalendarClient = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: process.env.VUE_APP_GOOGLE_SCOPE
};

import { app, db } from "@/db";
import firebase from "firebase/app";
import "firebase/auth";

export const Auth = app.auth();

export interface User {
  username: string;
  email: string;
  uid: string;
  // calendar: Calendar;
}

function saveUserToDb(user: User) {
  db.collection("users")
    .doc(user.uid)
    .set({
      username: user.email,
      email: user.email
    });
}

export function createUserObject(user: firebase.User) {
  const { uid, email } = user;
  const newUser = {
    uid: uid,
    email: email || "",
    username: email || ""
  };
  return newUser;
}

function loadGoogleAuth(): Promise<gapi.auth2.GoogleAuth> {
  return new Promise(resolve => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: googleCalendarClient.clientId,
        scope: googleCalendarClient.scope
      });
      return resolve(gapi.auth2.getAuthInstance());
    });
  });
}

const client = {
  createUser(email: string, password: string) {
    Auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        if (user.user) {
          const newUser = createUserObject(user.user);
          saveUserToDb(newUser);
        } else {
          throw new Error("No User returned from firebase");
        }
      })
      .catch(err => {
        const errorCode = err.code;
        const errorMessage = err.message;
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else if (errorCode == "auth/email-already-in-use") {
          alert("An account associated with this email already exists");
        } else {
          alert(errorMessage);
        }
        console.log("ERR", err);
      });
  },
  login(email: string, password: string) {
    return Auth.signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log("login success! user ID: ", user?.uid);
      })
      .catch(err => {
        console.log(err);
      });
  },
  googleLogin() {
    return loadGoogleAuth()
      .then(googleAuth => {
        return googleAuth.signIn();
      })
      .then(googleUser => {
        const accessToken = googleUser.getAuthResponse().access_token;
        const credential = firebase.auth.GoogleAuthProvider.credential(
          null,
          accessToken
        );
        return firebase.auth().signInWithCredential(credential);
      })
      .then(result => {
        if (result.user != null) {
          db.collection("users")
            .doc(result.user.uid)
            .get()
            .then(snapshot => {
              if (!snapshot.exists && result.user) {
                const newUser = createUserObject(result.user);
                saveUserToDb(newUser);
              }
            });
        }
      })
      .catch(err => {
        console.error("error in googleLogin: " + err);
      });
  },
  getAccessToken(): Promise<string> {
    return loadGoogleAuth().then(gapi => {
      const currentUser = gapi.currentUser;
      if (currentUser) {
        const accessToken = currentUser.get().getAuthResponse().access_token;
        return accessToken;
      } else {
        return "";
      }
    });
  },
  isGoogleUser() {
    return client.getAccessToken().then(token => token.length > 0);
  },
  logout() {
    if (Auth.currentUser) {
      return Auth.signOut()
        .then(() => {
          console.log("Succesfully signed out");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("No user signed in");
    }
  },
  deleteUser() {
    if (Auth.currentUser) {
      return Auth.currentUser
        .delete()
        .then(() => console.log("User succesfully deleted"))
        .catch(() => console.log("There was a problem deleting the user"));
    } else {
      console.log("No user signed in");
    }
  },
  updateUser(email: string) {
    db.collection("users")
      .doc(Auth.currentUser?.uid)
      .set({
        username: "placeholder",
        email: email
      });
  }
};

export default client;
