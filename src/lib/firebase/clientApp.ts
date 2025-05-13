
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Uncomment if you need Analytics

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

auth = getAuth(app);
firestore = getFirestore(app);

// const analytics = getAnalytics(app); // Uncomment if you need Analytics

export { app, auth, firestore };

// Instructions for the user:
// 1. Go to your Firebase project settings in the Firebase console.
// 2. Under the "General" tab, find your project's "Web app" configuration.
// 3. Copy the apiKey, authDomain, projectId, storageBucket, messagingSenderId, and appId.
// 4. Paste these values into your .env file (or .env.local) for the corresponding NEXT_PUBLIC_FIREBASE_... variables.
// 5. If you want to use Firebase Analytics, also copy the measurementId and uncomment the related lines in this file.
// 6. You can now import 'app', 'auth', or 'firestore' from '@/lib/firebase/clientApp' in your client-side components.
