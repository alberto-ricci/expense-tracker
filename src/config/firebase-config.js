// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfKaibmDFj6XZ63bZeV718S3rpG2GAuA4",
  authDomain: "expense-tracker-630ad.firebaseapp.com",
  projectId: "expense-tracker-630ad",
  storageBucket: "expense-tracker-630ad.appspot.com",
  messagingSenderId: "726764977872",
  appId: "1:726764977872:web:e3e8b2ee7622e31bf568d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
