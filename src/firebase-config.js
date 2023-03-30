// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEGAMgdWyP1fIcDv7vkMRxFlepjXur6I4",
  authDomain: "chat-mate-1b23d.firebaseapp.com",
  projectId: "chat-mate-1b23d",
  storageBucket: "chat-mate-1b23d.appspot.com",
  messagingSenderId: "768037803341",
  appId: "1:768037803341:web:428efd6ca10c61f4b51304"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);