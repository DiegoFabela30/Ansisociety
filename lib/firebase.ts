import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvphtbiHAd_md5KH9sfxHy-aWI1KADB9s",
  authDomain: "ansisociety.firebaseapp.com",
  projectId: "ansisociety",
  storageBucket: "ansisociety.firebasestorage.app",
  messagingSenderId: "529741192547",
  appId: "1:529741192547:web:e377ee67549ab586590756",
  measurementId: "G-WSLSNLKEMW",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// 🔥 ESTO ES LO IMPORTANTE
export const auth = getAuth(app);
export const db = getFirestore(app);