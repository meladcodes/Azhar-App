// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDKYbMk0aaHs1YKQkrwYZKArCNYvcUtr0",
  authDomain: "azhar-app-90e78.firebaseapp.com",
  projectId: "azhar-app-90e78",
  storageBucket: "azhar-app-90e78.appspot.com",
  messagingSenderId: "158928086731",
  appId: "1:158928086731:web:c8d15264e717688567dd4e",
  measurementId: "G-VHVB6J2Y90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)