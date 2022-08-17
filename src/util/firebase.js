// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import { getDatabase } from "firebase/database";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDu2Jy6ryT2dRlFPNwn5e5GOa8JW9Vl4Fs",
//   authDomain: "ff-with-db-config.firebaseapp.com",
//   projectId: "ff-with-db-config",
//   storageBucket: "ff-with-db-config.appspot.com",
//   messagingSenderId: "259882053867",
//   appId: "1:259882053867:web:49223451931d59498b8eae",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;

// // export default database;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX4JCPKiYNEQH4gtQUKVVUNgd5z3_IWJc",
  authDomain: "football-fanatic-db.firebaseapp.com",
  databaseURL:
    "https://football-fanatic-db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "football-fanatic-db",
  storageBucket: "football-fanatic-db.appspot.com",
  messagingSenderId: "324574483159",
  appId: "1:324574483159:web:4f1461b1fa5e9e7da81692",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default db;
