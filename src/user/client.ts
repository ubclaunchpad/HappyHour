import { app, db } from "@/db";
import { Calendar } from "@/calendar/client";
import firebase from "firebase/app";
import "firebase/auth";

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
          user.user && saveUserToDb(user.user);
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
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        if (result.credential) {
          const credential = result.credential as firebase.auth.OAuthCredential;
          const token = credential.accessToken;
          console.log("OK - OAuth Token: " + token);
        }
        if (result.user != null) {
          db.ref("users/" + result.user.uid).once("value", async snapshot => {
            if (!snapshot.val()) {
              result.user && saveUserToDb(result.user);
            }
          });
        }
      })
      .catch(function(err) {
        console.error("ERR: " + err);
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
