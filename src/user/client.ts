import { db } from "@/db";
import { Calendar } from "@/calendar/client";
import firebase from "firebase/app";
import "firebase/auth";

const googleCalendarClient = {
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  discoveryDocs: [process.env.VUE_APP_GOOGLE_DISCOVERY_DOC],
  scope: process.env.VUE_APP_GOOGLE_SCOPE
};

const Auth = firebase.auth();

export interface User {
  username: string;
  email: string;
  // calendar: Calendar;
}

function saveUserToDb(user: firebase.User) {
  db.ref("users/" + user.uid).set({
    username: user.email,
    email: user.email
  });
}

const client = {
  createUser(email: string, password: string) {
    try {
      const user = Auth.createUserWithEmailAndPassword(email, password).then(
        user => {
          user.user && saveUserToDb(user.user);
        }
      );
      console.log("OK - Token: ");
      console.log(user);
    } catch (err) {
      console.error("ERR: " + err);
      // we should delete the user account here if we cannot save the user to db!
    }
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
  // googleLogin() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   return firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then(result => {
  //       if (result.credential) {
  //         const credential = result.credential as firebase.auth.OAuthCredential;
  //         const token = credential.accessToken;
  //         console.log("OK - OAuth Token: ");
  //         console.log(token);
  //       }
  //       if (result.user != null) {
  //         db.ref("users/" + result.user.uid).once("value", async snapshot => {
  //           if (!snapshot.val()) {
  //             result.user && saveUserToDb(result.user);
  //           }
  //         });
  //       }
  //     })
  //     .catch(function(err) {
  //       console.error("ERR: " + err);
  //     });
  // },
  googleLogin() {
    return new Promise((resolve, reject) => {
      gapi.load("client:auth2", () => {
        gapi.client.init(googleCalendarClient).then(() => {
          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(googleUser => {
              console.log(googleUser);
              const credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.getAuthResponse().id_token
              );
              console.log(credential);
              firebase
                .auth()
                .signInWithCredential(credential)
                .then(result => {
                  console.log(result);
                  if (result.user != null) {
                    console.log("user not null");
                    db.ref("users/" + result.user.uid)
                      .once("value")
                      .then(snapshot => {
                        if (!snapshot.val()) {
                          console.log("snapshot exists");
                          result.user && saveUserToDb(result.user);
                          return resolve();
                        }
                      });
                  }
                })
                .catch(function(err) {
                  console.error("ERR: " + err);
                  return reject("rejected :(");
                });
            });
        });
      });
    });
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
    db.ref("users/" + Auth.currentUser?.uid).set({
      username: "placeholder",
      email: email
    });
  }
};

export default client;
