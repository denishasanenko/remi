// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAykfI8fPM5C3ETDuykNduVfuCxlCzZ6D0",
    authDomain: "horemi-ed1b4.firebaseapp.com",
    projectId: "horemi-ed1b4",
    storageBucket: "horemi-ed1b4.appspot.com",
    messagingSenderId: "865381209369",
    appId: "1:865381209369:web:15f1d7e14d10b10d9aa188",
    measurementId: "G-EF5N1J7MEW",
    databaseURL: "https://horemi-ed1b4-default-rtdb.europe-west1.firebasedatabase.app",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

const database = getFirestore(app);

export { app, analytics, database, signInWithRedirect, getRedirectResult };