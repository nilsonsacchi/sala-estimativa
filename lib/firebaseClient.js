
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

let db=null;
export function initFirebase(){
 if(!getApps().length) initializeApp(firebaseConfig);
 db=getDatabase();
 return db;
}
export function getDB(){ return db; }

/**
 * Busca a lista de todas as salas disponíveis no Firebase.
 * @returns {Array<Object>} Uma array de objetos { id: string, nome: string (se houver) }
 */
export async function getRoomsList() {
  if (!db) {
      throw new Error("Firebase não inicializado. Chame initFirebase() primeiro.");
  }

  const roomsRef = ref(db, 'salas');
  
  try {
      const snapshot = await get(roomsRef);
      const roomsData = snapshot.val();
      
      if (!roomsData) {
          return []; // Retorna array vazia se não houver salas
      }

      // Converte o objeto de salas (chaves do Firebase) em um array de objetos legíveis
      return Object.keys(roomsData).map(key => ({
          id: key, // O ID gerado pelo Firebase (ex: -Mq...)
          // Se você armazena o nome da sala (ex: roomsData[key].name)
          // Caso contrário, usamos o próprio ID como 'nome'
          nome: roomsData[key].nome || `Sala ${key}` 
      }));

  } catch (error) {
      console.error("Erro ao buscar a lista de salas:", error);
      return [];
  }
}