import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBU743r6NSvvGiGcYqCaVE-NJaZzP6bgjQ',
  authDomain: 'smart-spend-f906a.firebaseapp.com',
  projectId: 'smart-spend-f906a',
  storageBucket: 'smart-spend-f906a.appspot.com',
  messagingSenderId: '405819031167',
  appId: '1:405819031167:web:8da895a22658472aad094a',
  measurementId: 'G-Q2058Z767H'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

export { app, auth, database as db };
