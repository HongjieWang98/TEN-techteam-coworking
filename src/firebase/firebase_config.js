// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD71PE__dd3iSsfxnozgj6-KD1cmAb2dTY',
  authDomain: 'fir-testjuly8.firebaseapp.com',
  projectId: 'fir-testjuly8',
  storageBucket: 'fir-testjuly8.appspot.com',
  messagingSenderId: '479502811195',
  appId: '1:479502811195:web:8059bfd20ad184354c9c1e',
  measurementId: 'G-3HZ6C1E3QZ'
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
