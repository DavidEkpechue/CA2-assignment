import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTfXC2zcr4W_Rc8gc92CQRDC6smdYTBRo",
  authDomain: "ca2-assignment-3d86e.firebaseapp.com",
  projectId: "ca2-assignment-3d86e",
  storageBucket: "ca2-assignment-3d86e.firebasestorage.app",
  messagingSenderId: "146936498604",
  appId: "1:146936498604:web:7f007eb7fa6c6b38669209"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
