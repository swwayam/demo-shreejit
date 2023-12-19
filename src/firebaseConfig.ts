// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2L_Pe4fgh41PwKRSxyF9Kcg01ABKtM8Q",
  authDomain: "fir-5c1ee.firebaseapp.com",
  projectId: "fir-5c1ee",
  storageBucket: "fir-5c1ee.appspot.com",
  messagingSenderId: "515287345473",
  appId: "1:515287345473:web:d740d6a05c1c492fad59c0",
  measurementId: "G-ZTGVBV5XW7"
};

// Initialize Firebase
export const  firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)