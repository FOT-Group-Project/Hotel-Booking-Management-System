// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hotel-management-system-5fa84.firebaseapp.com",
  projectId: "hotel-management-system-5fa84",
  storageBucket: "hotel-management-system-5fa84.appspot.com",
  messagingSenderId: "388624998909",
  appId: "1:388624998909:web:581157d5609b2256913994"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);