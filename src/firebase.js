import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEhgnKq4qlk5pxDFVwzOFb6G9UroAsQww",
  authDomain: "starter-firebase-emul-vuetify.firebaseapp.com",
  projectId: "starter-firebase-emul-vuetify",
  storageBucket: "starter-firebase-emul-vuetify.appspot.com",
  messagingSenderId: "381798323659",
  appId: "1:381798323659:web:837ca1ec008b15bf0d124e",
  measurementId: "G-5E6BB52HXH"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const likesCollection = db.collection("likes");

// export utils/refs
export { db, auth, usersCollection, postsCollection, likesCollection };
