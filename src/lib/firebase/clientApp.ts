
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Uncomment if you need Analytics
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRg3EdmVW2iGp12M37RsgZMqxMkSMhs2c",
  authDomain: "polyglot-coder-gwe5d.firebaseapp.com",
  projectId: "polyglot-coder-gwe5d",
  storageBucket: "polyglot-coder-gwe5d.appspot.com", // Corrected from firebasestorage.app to appspot.com
  messagingSenderId: "456251714263",
  appId: "1:456251714263:web:9cdb4b6e484a1ed4539e92"
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
// 1. The Firebase configuration has been updated with the values you provided.
// 2. You can now import 'app', 'auth', or 'firestore' from '@/lib/firebase/clientApp' in your client-side components.
// 3. Remember to set up Firebase Hosting and Firebase Functions for deployment as discussed previously.
// 4. Ensure environment variables like NEXT_PUBLIC_CONVERT_CODE_URL are correctly set for your deployed environment.
