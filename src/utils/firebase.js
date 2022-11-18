import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "sharetape-6bd3e.firebaseapp.com",
  databaseURL: "https://sharetape-6bd3e-default-rtdb.firebaseio.com",
  projectId: "sharetape-6bd3e",
  storageBucket: "sharetape-6bd3e.appspot.com",
  messagingSenderId: "885955297478",
  appId: "1:885955297478:web:520b011efa208a8bab97c7",
  measurementId: "G-MYB2KJ7TSH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
