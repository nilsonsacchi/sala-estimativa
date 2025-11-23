
export const firebaseConfig = {
  apiKey: "AIzaSyCe7rmZj0-vVcAobBeqpyhhqq3DIgP5B28",
  authDomain: "sala-de-estimativa.firebaseapp.com",
  databaseURL: "https://sala-de-estimativa-default-rtdb.firebaseio.com/",
  projectId: "sala-de-estimativa",
  storageBucket: "sala-de-estimativa.firebasestorage.app",
  messagingSenderId: "587703034452",
  appId: "1:587703034452:web:0e50bcc1f2205d34a543c1"
};

import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

let db=null;
export function initFirebase(){
 if(!getApps().length) initializeApp(firebaseConfig);
 db=getDatabase();
 return db;
}
export function getDB(){ return db; }
