// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAlPgWSk-VRuRXKr37k_2qeXY3O-OY_3qs",
    authDomain: "handyhire-00000.firebaseapp.com",
    projectId: "handyhire-00000",
    storageBucket: "handyhire-00000.appspot.com",
    messagingSenderId: "193728266107",
    appId: "1:193728266107:web:c04e6c16070317df92c7de",
    measurementId: "G-VVE6HLX0SE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Get the Firebase authentication and Firestore database instances
//const auth = getAuth(app); // add
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const database = getFirestore(app); // add
const storage = getStorage(app); // add


// Export the Firebase authentication and Firestore database instances
export {
    auth,
    database,
    storage,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
}; 