import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCSljBMT_KMprvI0MvD8Xv1QzqXf_R4iPQ",
  authDomain: "campusapp-8242.firebaseapp.com",
  databaseURL: "https://campusapp-8242-default-rtdb.firebaseio.com/",
  projectId: "campusapp-8242",
  storageBucket: "campusapp-8242.firebasestorage.app",
  messagingSenderId: "372734918554",
  appId: "1:372734918554:web:ea9a5cefce5a37127f4423",
  measurementId: "G-M54QKE21DM",
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
