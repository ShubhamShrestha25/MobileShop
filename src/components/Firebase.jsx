import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseAppp = firebase.initializeApp({
  apiKey: "AIzaSyBLRUjKAmYVjNbTuHYk1TYQBJAR019pcv8",
  authDomain: "mobilestore-a1c78.firebaseapp.com",
  projectId: "mobilestore-a1c78",
  storageBucket: "mobilestore-a1c78.appspot.com",
  messagingSenderId: "152935509514",
  appId: "1:152935509514:web:27176139358391a24439f3",
});

const db = firebaseAppp.firestore();
const storage = firebase.storage();

export { db, storage };
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
