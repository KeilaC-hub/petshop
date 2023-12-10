import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDB_oNjKWo0Z6P-SXFrlmrpQ-Cl1u-De3A",
  authDomain: "tgfatec-4d40d.firebaseapp.com",
  databaseURL: "https://tgfatec-4d40d-default-rtdb.firebaseio.com",
  projectId: "tgfatec-4d40d",
  storageBucket: "tgfatec-4d40d.appspot.com",
  messagingSenderId: "252926034214",
  appId: "1:252926034214:web:f07523455ac9e16ed641e7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
