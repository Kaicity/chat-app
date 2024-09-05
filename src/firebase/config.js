import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export default app;
