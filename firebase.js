// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg6BqO_HiqAHffmjpj_6j1CIrM4LRAzJw",
  authDomain: "food-ordering-app-2d4cd.firebaseapp.com",
  projectId: "food-ordering-app-2d4cd",
  storageBucket: "food-ordering-app-2d4cd.firebasestorage.app",
  messagingSenderId: "223922314144",
  appId: "1:223922314144:web:22191fa6417584954762c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
