import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWChTRT1syIVL3JG1kCTKaq3kbhndEnt8",
  authDomain: "takealook-fc2a9.firebaseapp.com",
  projectId: "takealook-fc2a9",
  storageBucket: "takealook-fc2a9.firebasestorage.app",
  messagingSenderId: "497626880249",
  appId: "1:497626880249:web:87f34a26140e38defeea28",
  measurementId: "G-6DJHTZ8YTJ",
};

// Initializing The Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Firebase Firestore Service
export const db = getFirestore(firebaseApp);

// Firebase Authentication Service
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
