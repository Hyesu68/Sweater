// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUGn1W3Ykdnw-YDEv6kHeair-1cxDJYHY",
  authDomain: "sweater-7e1ba.firebaseapp.com",
  projectId: "sweater-7e1ba",
  storageBucket: "sweater-7e1ba.appspot.com",
  messagingSenderId: "977449059978",
  appId: "1:977449059978:web:46d94b91fe5fb99c9b0f73",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const authService = getAuth(app);

export const dbService = getFirestore(app);
