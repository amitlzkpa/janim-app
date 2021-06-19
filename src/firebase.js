import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyATv80DF3VOgJSB-COX4vLhsC4cESE2OJQ",
  authDomain: "vyrall.firebaseapp.com",
  projectId: "vyrall",
  storageBucket: "vyrall.appspot.com",
  messagingSenderId: "429094377009",
  appId: "1:429094377009:web:19364668bb00df5fb52710",
  measurementId: "G-SB0E11C90Y",
};
firebase.initializeApp(firebaseConfig);

// utils
let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();

// collection references
let usersCollection = db.collection("users");
let campaignsCollection = db.collection("campaign");
let activityPostsCollection = db.collection("activityPosts");
let organizationsCollection = db.collection("organization");
let permissionsCollection = db.collection("permission");

// export utils/refs
export {
  db,
  auth,
  storage,
  usersCollection,
  campaignsCollection,
  activityPostsCollection,
  organizationsCollection,
  permissionsCollection,
};
