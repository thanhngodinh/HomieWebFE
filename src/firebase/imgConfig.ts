import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseImgConfig = {
  apiKey: process.env.IMG_PUBLIC_FB_API_KEY,
  authDomain: process.env.IMG_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.IMG_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.IMG_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.IMG_PUBLIC_FB_MESSAGE_SENDER_ID,
  appId: process.env.IMG_PUBLIC_FB_APP_ID,
};

const imgApp = initializeApp(firebaseImgConfig, 'HomieApp');

export const storage = getStorage(imgApp, 'gs://nextjs-img.appspot.com');
