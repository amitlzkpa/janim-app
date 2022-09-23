import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfVrd6QVMKNDXtFgDNLEI0bmzuvSOa8Xw",
  authDomain: "janim-9c51f.firebaseapp.com",
  projectId: "janim-9c51f",
  storageBucket: "janim-9c51f.appspot.com",
  messagingSenderId: "265122126516",
  appId: "1:265122126516:web:269433c9c13ba57e8515e1"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");

// export utils/refs
export { db, auth, usersCollection };
