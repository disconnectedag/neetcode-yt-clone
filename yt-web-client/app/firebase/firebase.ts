import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB7Y-3R03DrvjhaewcVdkI_PCeK7wtJriE',
  authDomain: 'ag-yt-clone.firebaseapp.com',
  projectId: 'ag-yt-clone',
  storageBucket: 'ag-yt-clone.appspot.com',
  messagingSenderId: '665475765069',
  appId: '1:665475765069:web:1d2fde5284c5d26fb55d04',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

/* 
  signs the user in with a google pop up
*/
export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

/**
 * signs the user out
 */
export function signOut() {
  return auth.signOut();
}

/*
 * Trigger a callback when the user auth state changes
 */
export function onAuthStateChangedHelper(
  callback: (user: User | null) => void
) {
  return onAuthStateChanged(auth, callback);
}
