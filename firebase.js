import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-eUY8plZd5RWFb8OEcyWQXkvWuDgaTF8",
  authDomain: "coding-creation.firebaseapp.com",
  projectId: "coding-creation",
  storageBucket: "coding-creation.firebasestorage.app",
  messagingSenderId: "511379151496",
  appId: "1:511379151496:web:a663c06086ad4882485d3d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
