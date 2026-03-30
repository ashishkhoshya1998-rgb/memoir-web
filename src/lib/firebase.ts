import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCA_ToIvo-TQ1xQ6_8MkNHopT8X9grE8ZA",
  authDomain: "memoir-d704e.firebaseapp.com",
  projectId: "memoir-d704e",
  storageBucket: "memoir-d704e.firebasestorage.app",
  messagingSenderId: "769758755616",
  appId: "1:769758755616:web:b3ed257144472395c83545",
  measurementId: "G-DCDSFLJEZZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup };
