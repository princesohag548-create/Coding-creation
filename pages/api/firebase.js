import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-eUY8plZd5RWFb8OEcyWQXkvWuDgaTF8",
  authDomain: "coding-creation.firebaseapp.com",
  projectId: "coding-creation",
  storageBucket: "coding-creation.firebasestorage.app",
  messagingSenderId: "511379151496",
  appId: "1:511379151496:web:4f78b38a0c88faa3485d3d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
