import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

 export const firebaseConfig = {
    apiKey: "AIzaSyAIeCq-ttFEhMN4U7MhSm3CE2wCOdne55Y",
    authDomain: "dynamicweb-final.firebaseapp.com",
    projectId: "dynamicweb-final",
    storageBucket: "dynamicweb-final.firebasestorage.app",
    messagingSenderId: "1093245485374",
    appId: "1:1093245485374:web:894b0bfae24951c0b7ac6f"
};

Object.keys(firebaseConfig).forEach((key) => {
  const configValue = firebaseConfig[key] + "";
  if (configValue.charAt(0) === '"') {
    firebaseConfig[key] = configValue.substring(1, configValue.length - 1);
  }
});

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  export const auth = getAuth(firebaseApp);