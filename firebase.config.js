// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from  "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbPUtmYuLAPRXpb-NKZWc4bw7BO3AjYp8",
  authDomain: "marketapp-9b6e7.firebaseapp.com",
  projectId: "marketapp-9b6e7",
  storageBucket: "marketapp-9b6e7.appspot.com",
  messagingSenderId: "682943861693",
  appId: "1:682943861693:web:e4fb9d17646ea0399878d4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();