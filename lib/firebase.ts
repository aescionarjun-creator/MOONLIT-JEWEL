import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAb0yW0gwnYXAvNMWjA1_kaztnsGHa64SI",
  authDomain: "moonlit-jewels.firebaseapp.com",
  projectId: "moonlit-jewels",
  storageBucket: "moonlit-jewels.firebasestorage.app",
  messagingSenderId: "93862848545",
  appId: "1:93862848545:web:61acc7d86caf6942cadb60",
  measurementId: "G-P62VSZJL98"
};

// Initialize Firebase (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics client-only initialization
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, storage, analytics };
