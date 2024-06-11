import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDG-1Oer_14WP-0WGExH3vE6CDdfIOZpMg",
  authDomain: "cooking-11f7b.firebaseapp.com",
  projectId: "cooking-11f7b",
  storageBucket: "cooking-11f7b.appspot.com",
  messagingSenderId: "959598760942",
  appId: "1:959598760942:web:e344006dcc97110656b4ff",
  measurementId: "G-WT67YXRX5Y",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
