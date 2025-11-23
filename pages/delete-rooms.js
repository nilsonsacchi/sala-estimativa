// pages/delete-rooms.js

import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DeleteRoomForm from '../components/DeleteRoomForm';
import { initFirebase } from '../lib/firebaseClient';

export default function DeleteRoomsPage() {
    // Inicializa o Firebase ao carregar esta página, se ainda não estiver inicializado
    useEffect(() => { initFirebase(); }, []);

    return (
        <div style={{ display: 'flex' }}>
            {/* 1. Menu Lateral */}
            <Sidebar />

            {/* 2. Conteúdo Principal */}
            <main style={{ flexGrow: 1, padding: '20px' }}>
                <h1>🗑️ Gerenciamento de Salas</h1>
                <p>Use o formulário abaixo para apagar salas permanentemente. **Cuidado, esta ação é irreversível.**</p>
                
                {/* 3. Formulário de Exclusão (que criamos antes) */}
                <DeleteRoomForm />

                <div style={{ marginTop: '40px', padding: '15px', border: '1px dashed #f00', backgroundColor: '#fee' }}>
                    <h3>Comando de Exclusão em Massa</h3>
                    <p>Para apagar **TODAS** as salas do banco de dados, digite **<code style={{fontWeight: 'bold'}}>***</code>** no campo acima e clique em "Apagar".</p>
                </div>
            </main>
        </div>
    );
}