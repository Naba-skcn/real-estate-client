// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByIK3HyKOUS58H0oRHx4vKOSRjjUY_q5o",
  authDomain: "real-estate-a12-8fb29.firebaseapp.com",
  projectId: "real-estate-a12-8fb29",
  storageBucket: "real-estate-a12-8fb29.appspot.com",
  messagingSenderId: "706304424413",
  appId: "1:706304424413:web:ac078ab49665b001769e34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;