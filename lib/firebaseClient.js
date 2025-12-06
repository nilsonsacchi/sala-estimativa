// lib/firebaseClient.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app = null;
let db = null;
let auth = null;
let googleProvider = null;

// Inicializam TUDO corretamente
export function initFirebase() {
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getDatabase(app);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  }
  return app;
}

export function getFirebaseApp() {
  if (!app) initFirebase();
  return app;
}

export function getDB() {
  if (!db) initFirebase();
  return db;
}

export function getAuthInstance() {
  if (!auth) initFirebase();
  return auth;
}

export function loginWithGoogle() {
  return signInWithPopup(getAuthInstance(), googleProvider);
}

export function logout() {
  return signOut(getAuthInstance());
}