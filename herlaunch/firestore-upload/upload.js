import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";

const firebaseConfig = {
  apiKey: "AIzaSyD61r27C6szC31mpxzJlOTAmYkKtqyw3gY",
  authDomain: "unnathi-f3d35.firebaseapp.com",
  projectId: "unnathi-f3d35",
  storageBucket: "unnathi-f3d35.firebasestorage.app",
  messagingSenderId: "719515032847",
  appId: "1:719515032847:web:5898c41f19999e7dcf327a",
  measurementId: "G-P8K430D0P8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadData(fileName, collectionName) {

  const data = JSON.parse(fs.readFileSync(`./${fileName}`, "utf8"));

  for (const item of data) {

    let id = item.name || item.role || item.title;

    // 🔹 Remove illegal Firestore characters
    id = id.replace(/[\/#?]/g, "-");

    await setDoc(doc(db, collectionName, id), item);

    console.log(`Uploaded: ${id}`);
  }

  console.log(`${collectionName} upload complete`);
}

async function main() {

  await uploadData("schemes.json", "schemes");
  await uploadData("internships.json", "internships");
  await uploadData("scholarships.json", "scholarships");

}

main();