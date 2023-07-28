// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase } from "firebase/database";
import {firebase} from 'firebase'; 
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD71PE__dd3iSsfxnozgj6-KD1cmAb2dTY",
  authDomain: "fir-testjuly8.firebaseapp.com",
  projectId: "fir-testjuly8",
  storageBucket: "fir-testjuly8.appspot.com",
  messagingSenderId: "479502811195",
  appId: "1:479502811195:web:8059bfd20ad184354c9c1e",
  measurementId: "G-3HZ6C1E3QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
