import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD61r27C6szC31mpxzJlOTAmYkKtqyw3gY",
  authDomain: "unnathi-f3d35.firebaseapp.com",
  projectId: "unnathi-f3d35",
  storageBucket: "unnathi-f3d35.firebasestorage.app",
  messagingSenderId: "719515032847",
  appId: "1:719515032847:web:5898c41f19999e7dcf327a"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)