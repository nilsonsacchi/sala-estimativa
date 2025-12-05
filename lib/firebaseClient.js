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

/**
 * Compat: inicializa tudo (app/db/auth/provider).
 * Mantido para compatibilidade com código que chama initFirebase().
 * Retorna { app, db, auth }.
 */
export function initFirebase() {
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  if (!db) {
    db = getDatabase(app);
  }
  if (!auth) {
    auth = getAuth(app);
  }
  if (!googleProvider) {
    googleProvider = new GoogleAuthProvider();
  }
  return { app, db, auth };
}

/**
 * Retorna a instância do Firebase App (inicializa se necessário).
 */
export function getFirebaseApp() {
  if (!app) {
    initFirebase();
  }
  return app;
}

/**
 * Retorna o Realtime Database (inicializa se necessário).
 */
export function getDB() {
  if (!db) {
    initFirebase();
  }
  return db;
}

/**
 * Retorna a instância do Auth (inicializa se necessário).
 */
export function getAuthInstance() {
  if (!auth) {
    initFirebase();
  }
  return auth;
}

/**
 * Retorna (interna) o Google Provider, inicializando quando preciso.
 */
function getGoogleProvider() {
  if (!googleProvider) {
    initFirebase();
  }
  return googleProvider;
}

/**
 * Faz login com popup Google.
 */
export function loginWithGoogle() {
  const a = getAuthInstance();
  const p = getGoogleProvider();
  return signInWithPopup(a, p);
}

/**
 * Faz logout do usuário atual.
 */
export function logout() {
  const a = getAuthInstance();
  return signOut(a);
}