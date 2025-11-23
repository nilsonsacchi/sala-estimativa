// pages/api/delete-rooms.js
// Esta lógica roda no SERVIDOR (Next.js API Route)

import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, remove } from 'firebase/database';
// Importe a configuração do Firebase
import { firebaseConfig } from '../../lib/firebaseClient'; 

// A senha secreta, NÃO EXPOSTA ao código do cliente
const SECRET_PASSWORD = "@@@Nilson"; 

let db = null;

// Inicializa o Firebase no lado do servidor (se necessário)
if (!getApps().length) {
    initializeApp(firebaseConfig);
}
db = getDatabase();


export default async function handler(req, res) {
    // Apenas permite requisições POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método Não Permitido' });
    }

    const { roomId, password } = req.body;

    // 1. VALIDAÇÃO DA SENHA (NO SERVIDOR)
    if (password !== SECRET_PASSWORD) {
        // Retorna 401 (Não Autorizado) se a senha estiver errada
        return res.status(401).json({ message: 'Senha inválida para exclusão.' });
    }

    if (!roomId) {
        return res.status(400).json({ message: 'ID da Sala não fornecido.' });
    }
    
    // 2. LÓGICA DE EXCLUSÃO (MOVIDA DO CLIENTE)
    try {
        let roomRef;
    
        if (roomId === "***") {
            roomRef = ref(db, 'salas');
        } else {
            roomRef = ref(db, `salas/${roomId}`); 
        }
        
        await remove(roomRef);

        return res.status(200).json({ 
            message: roomId === '***' ? 'Todas as salas foram apagadas.' : `Sala ${roomId} apagada com sucesso.` 
        });

    } catch (error) {
        console.error("[SERVER ERROR]:", error);
        return res.status(500).json({ message: 'Erro ao comunicar com o Firebase. Verifique o console do servidor.' });
    }
}