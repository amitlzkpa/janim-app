import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
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
let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();

// collection references
let usersCollection = db.collection("users");
let campaignsCollection = db.collection("campaign");
let campaignJoinsCollection = db.collection("campaignJoins");
let hotLinksCollection = db.collection("hotLinks");
let dataPtsCollection = db.collection("dataPts");
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
  campaignJoinsCollection,
  hotLinksCollection,
  dataPtsCollection,
  activityPostsCollection,
  organizationsCollection,
  permissionsCollection,
};
