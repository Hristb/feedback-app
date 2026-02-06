import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDfTowjTVvCnWHRhPvQFPGJXrYBh6U8cww",
  authDomain: "feedback-app-d1552.firebaseapp.com",
  projectId: "feedback-app-d1552",
  storageBucket: "feedback-app-d1552.firebasestorage.app",
  messagingSenderId: "445126232870",
  appId: "1:445126232870:web:5b725c4e1a43c9eec60fe7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
