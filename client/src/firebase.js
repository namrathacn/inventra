import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";


import {
  getFirestore
} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCnCAdQvpU50RvtHEmlgg57E5eGFizcqo8",
  authDomain: "inventra-ac40f.firebaseapp.com",
  projectId: "inventra-ac40f",
  storageBucket: "inventra-ac40f.firebasestorage.app",
  messagingSenderId: "866967755700",
  appId: "1:866967755700:web:0b1748df1fcd1a48a2b0e1"
};




const app = initializeApp(firebaseConfig);





// Authentication

export const auth = getAuth(app);




// Google Authentication

export const googleProvider =
new GoogleAuthProvider();


googleProvider.setCustomParameters({

  prompt: "select_account"

});




// Firestore Database

export const db =
getFirestore(app);