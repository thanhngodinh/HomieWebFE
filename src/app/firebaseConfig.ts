
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB1p5ekSshGCrglcvFYjfRnr9-FWqxjzIc',
  authDomain: 'nextjs-img.firebaseapp.com',
  projectId: 'nextjs-img',
  storageBucket: 'nextjs-img.appspot.com',
  messagingSenderId: '200614584019',
  appId: '1:200614584019:web:5c4f24110ce57b93b8be26',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage();