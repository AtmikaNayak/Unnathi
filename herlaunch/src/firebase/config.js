// ============================================
// P3's FILE — Fill in your Firebase credentials
// ============================================
// Steps:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project called "herlaunch"
// 3. Add a Web App
// 4. Copy your config values below
// 5. In Firestore, create these collections:
//    - scholarships
//    - schemes
//    - internships

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
