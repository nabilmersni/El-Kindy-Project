// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "el-kindy-auth.firebaseapp.com",
  projectId: "el-kindy-auth",
  storageBucket: "el-kindy-auth.appspot.com",
  messagingSenderId: "1007166632800",
  appId: "1:1007166632800:web:753c889d7f75d301016405",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
