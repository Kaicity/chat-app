import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  connectFirestoreEmulator,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  limit,
  updateDoc,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAsd4Cjj3BmL2UDOSzm7D3KudtFWjFMvXg",
  authDomain: "chat-app-itmix.firebaseapp.com",
  projectId: "chat-app-itmix",
  storageBucket: "chat-app-itmix.appspot.com",
  messagingSenderId: "670819334933",
  appId: "1:670819334933:web:f926b24715294ebf53c71c",
  measurementId: "G-8CW68DG02H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

if (
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost"
) {
  // console.log("connect successfully");
  // connectAuthEmulator(auth, "http://127.0.0.1:9099");
  // connectFirestoreEmulator(db, "127.0.0.1", 8080);
}

export {
  auth,
  db,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  limit,
  updateDoc,
};

export default app;
