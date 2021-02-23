import { app, db } from "@/db";
import { Calendar } from "@/calendar/client";

const Auth = app.auth();

export interface User {
  username: string;
  email: string;
  // calendar: Calendar;
}

// TODO: Fill this in with methods
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
