import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { getDB } from "../lib/firebaseClient";
import { ref, remove } from "firebase/database";

export default function Sidebar() {

    const router = useRouter();

    async function clearAndGo(path) {
        try {
            const roomId = localStorage.getItem("roomId");
            const userName = localStorage.getItem("userName");

            if (roomId && userName) {
                const db = getDB();
                await remove(ref(db, `salas/${roomId}/participantes/${userName}`));
            }

            localStorage.removeItem("roomId");
            localStorage.removeItem("userName");

        } catch (e) {
            console.error("Erro ao remover usuário:", e);
        }

        router.push(path);  // AGORA GARANTE A NAVEGAÇÃO
    }

    return (
        <nav>
            <ul style={{
                listStyle: 'none',
                padding: '20px',
                margin: 0,
                width: '220px',
                height: '100vh',
                backgroundColor: '#f4f4f4',
                borderRight: '1px solid #ddd',
                boxSizing: 'border-box'
            }}>

                {/* Home */}
                <li style={{ marginBottom: '10px', cursor:'pointer' }}
                    onClick={() => clearAndGo('/')}
                >
                    🏠 Home
                </li>

                <hr style={{ margin: '15px 0', border: 'none', borderBottom: '1px solid #ccc' }} />

                <li style={{ marginBottom: '10px', cursor:'pointer' }}
                    onClick={() => clearAndGo('/create-rooms')}
                >
                    🏗️ Criar Salas
                </li>

                <li style={{ marginBottom: '10px', cursor:'pointer' }}
                    onClick={() => clearAndGo('/delete-rooms')}
                >
                    🗑️ Apagar Salas
                </li>
            </ul>
        </nav>
    );
}