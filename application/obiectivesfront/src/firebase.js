// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCzDCcSiCPvFANImjx4lC2ItdU4W8wn2WU",
  authDomain: "database-41d4c.firebaseapp.com",
  projectId: "database-41d4c",
  storageBucket: "database-41d4c.appspot.com",
  messagingSenderId: "289106417707",
  appId: "1:289106417707:web:22849daf9833680e69326e",
  measurementId: "G-683B75QFNP"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, analytics, db };
export default app;
