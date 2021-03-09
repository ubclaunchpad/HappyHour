import { app, db } from "@/db";
import { Calendar } from "@/calendar/client";
import firebase from "firebase/app";
import "firebase/auth";

const Auth = app.auth();

export interface User {
  username: string;
  email: string;
  uid: string;
  // calendar: Calendar;
  accessToken?: string;
}

function saveUserToDb(user: User) {
  db.ref("users/" + user.uid).set({
    username: user.email,
    email: user.email,
    accessToken: user.accessToken
  });
}

function createUserObject(user: firebase.User, token: string) {
  const { uid, email } = user;
  const newUser = {
    uid: uid,
    email: email || "",
    username: email || "",
    accessToken: token || ""
  };
  return newUser;
}

const client = {
  createUser(email: string, password: string) {
    Auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        if (user.user) {
          const newUser = createUserObject(user.user, "");
          saveUserToDb(newUser);
        } else {
          throw new Error("No User returned from firebase");
        }
        console.log("OK - Token: " + user);
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
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/calendar");
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        let token: string;
        if (result.credential) {
          const credential = result.credential as firebase.auth.OAuthCredential;
          token = credential.accessToken || "";
          console.log("OK - OAuth Token: " + token);
        }
        if (result.user != null) {
          db.ref("users/" + result.user.uid).once("value", async snapshot => {
            if (!snapshot.val() && result.user) {
              const newUser = createUserObject(result.user, token);
              saveUserToDb(newUser);
            }
          });
        }
      })
      .catch(function(err) {
        console.error("ERR: " + err);
      });
  },
  getAccessToken(): Promise<string> {
    console.log("current user: " + Auth.currentUser?.uid);
    return db
      .ref("users/" + Auth.currentUser?.uid)
      .once("value")
      .then(snapshot => {
        const user = snapshot.val();
        console.log(user);
        console.log("returning token: " + user.accessToken);
        return user.accessToken;
      })
      .catch(err => {
        console.log("error: " + err);
        return "";
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
