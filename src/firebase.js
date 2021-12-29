import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyBJ7gxAK4s0iZCyVsWC7ThZrgPe96GpgEA",
  authDomain: "bidfriday-vyrall.firebaseapp.com",
  projectId: "bidfriday-vyrall",
  storageBucket: "bidfriday-vyrall.appspot.com",
  messagingSenderId: "454872732540",
  appId: "1:454872732540:web:04d3649ca12f63e2a84af9",
  measurementId: "G-8EE3KC8CND"
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
