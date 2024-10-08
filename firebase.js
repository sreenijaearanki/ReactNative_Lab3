// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4raE4DGeLVfUgTNOj_v31yjWJa2LA2ss",
  authDomain: "myapp-a6697.firebaseapp.com",
  projectId: "myapp-a6697",
  storageBucket: "myapp-a6697.appspot.com",
  messagingSenderId: "709427578949",
  appId: "1:709427578949:web:aa8e1a858ee8b64ee87b2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Get the authentication instance
const db = getFirestore(app);

export { auth, db};