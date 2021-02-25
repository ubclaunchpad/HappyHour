import { app, db } from "@/db";
import { Calendar } from "@/calendar/client";
import firebase from "firebase/app";
import "firebase/auth";
import gapiClient from "@/calendar/gapiClient";

const Auth = app.auth();

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
          db.ref("users/" + user.user?.uid).set({
            username: "placeholder",
            email: email
          });
        }
      );
      console.log("OK - Token: " + user);
    } catch (err) {
      console.error("ERR: " + err);
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
  googleLogin() {
    return new Promise<void>((resolve, reject) => {
      gapiClient
        .startClient(true)
        .then(googleUser => {
          console.log(googleUser);
          const credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.getAuthResponse().id_token
          );
          return firebase.auth().signInWithCredential(credential);
        })
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
                } else {
                  // idk what to do in this case?
                }
              });
          }
        })
        .catch(err => {
          console.error("ERR: ");
          console.log(err);
          return reject(err);
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
