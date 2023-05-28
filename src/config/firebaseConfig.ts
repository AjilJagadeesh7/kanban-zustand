// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDSRsAA_aqBn8JJql4ZQnazAxYr8LbDrk4",
  authDomain: "kanban-app-f950d.firebaseapp.com",
  projectId: "kanban-app-f950d",
  storageBucket: "kanban-app-f950d.appspot.com",
  messagingSenderId: "77183850322",
  appId: "1:77183850322:web:38dccb7bc65c3e5cc04c8b",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
