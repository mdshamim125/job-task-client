// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC12BSuM-oRu-pmF-JzpFOgmj5NKvlCmp0",
  authDomain: "job-task-ad4b4.firebaseapp.com",
  projectId: "job-task-ad4b4",
  storageBucket: "job-task-ad4b4.appspot.com",
  messagingSenderId: "416392923274",
  appId: "1:416392923274:web:c39a14666e0a9431438573"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;