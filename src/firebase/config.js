// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCTWgpThytrVJKOZ18KiAO2RzLgek222g",
  authDomain: "hi-chat-9ad6a.firebaseapp.com",
  projectId: "hi-chat-9ad6a",
  storageBucket: "hi-chat-9ad6a.appspot.com",
  messagingSenderId: "583929630142",
  appId: "1:583929630142:web:db2734d68a08b0ee2cbdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// konsoldaki authenitcaion bölümünün referansını alır
export const auth = getAuth(app);

// google sağlayıcısının referansını alma
export const provider = new GoogleAuthProvider()

// veritabanının referansını alır
export const db = getFirestore(app);