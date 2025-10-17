// lib/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyATXhmJwCQmCt9cjw4C8F3WikKKC0pFJkg",
  authDomain: "future-abode-406723.firebaseapp.com",
  databaseURL: "https://future-abode-406723-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "future-abode-406723",
  storageBucket: "future-abode-406723.appspot.com",
  messagingSenderId: "395684154431",
  appId: "1:395684154431:web:1101da885fe166cf54bc8a",
  measurementId: "G-M5Q8KGFZ6P"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app