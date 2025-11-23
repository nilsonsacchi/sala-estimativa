// components/DeleteRoomForm.js

import React, { useState, useEffect } from 'react';
// IMPORTANTE: Apenas getRoomsList é importado do firebaseClient, pois a função deleteRoom
// AGORA está na rota de API do servidor.
import { getRoomsList } from '../lib/firebaseClient';

export default function DeleteRoomForm() {
    // Estados existentes
    const [rooms, setRooms] = useState([]);
    const [roomId, setRoomId] = useState('');
    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(true);

    // --- Função para carregar a lista de salas ---
    const fetchRooms = async () => {
        setListLoading(true);
        try {
            const roomList = await getRoomsList();
            setRooms(roomList);
            // Limpa o ID selecionado se a sala não estiver mais na lista
            if (roomId && !roomList.some(r => r.id === roomId)) {
                setRoomId('');
            }
        } catch (error) {
            console.error("Falha ao carregar salas:", error);
            alert('Não foi possível carregar a lista de salas.');
        } finally {
            setListLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    // --- NOVA FUNÇÃO de Exclusão (Chama a API com Senha) ---
    const handleDelete = async (e) => {
        e.preventDefault();

        if (!roomId) {
            alert('Por favor, selecione ou digite o ID da sala.');
            return;
        }

        // 1. SOLICITA A SENHA AO USUÁRIO
        const password = prompt('⚠️ ATENÇÃO: Digite a senha para confirmar a exclusão:');
        if (!password) {
            return; // Sai se o usuário cancelar
        }

        // 2. CONFIRMAÇÃO DE SEGURANÇA (Mensagem)
        let confirmationMessage;
        if (roomId === '***') {
            confirmationMessage = '⚠️ AVISO: Você tem certeza que deseja APAGAR TODAS AS SALAS? Isso é IRREVERSÍVEL!';
        } else {
            const room = rooms.find(r => r.id === roomId);
            const name = room ? room.nome : roomId;
            confirmationMessage = `Tem certeza que deseja APAGAR a sala "${name}"?`;
        }

        if (!window.confirm(confirmationMessage)) {
            return;
        }

        setLoading(true);
        try {
            // 3. FAZ A REQUISIÇÃO POST PARA A ROTA DE API (Servidor)
            const response = await fetch('/api/delete-rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Envia o ID da sala e a senha para o servidor
                body: JSON.stringify({ roomId, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // O servidor retornou um erro (ex: 401 Senha inválida)
                alert(`Falha na exclusão: ${data.message}`);
                return;
            }

            // Sucesso
            alert(data.message);
            setRoomId('');

            // CHAVE: Recarregar a lista de salas após a exclusão
            await fetchRooms();

        } catch (error) {
            console.error('Erro de rede ou exclusão:', error);
            alert('Erro de rede ou falha ao processar a exclusão.');
        } finally {
            setLoading(false);
        }
    };
    // -------------------------------------------------------------

    return (
        <div style={{
            maxWidth: '500px',
            margin: '20px auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px'
        }}>
            <h3 style={{ marginTop: 0 }}>Apagar Sala por Seleção ou ID</h3>

            {/* 1. SELETOR DE SALAS */}
            <div style={{ marginBottom: '15px' }}>
                <h4>Selecione a Sala:</h4>
                {listLoading && <p>Carregando salas...</p>}
                {!listLoading && rooms.length === 0 && <p>Nenhuma sala encontrada para apagar.</p>}
                {!listLoading && rooms.length > 0 && (
                    <select
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                        disabled={loading}
                    >
                        <option value="">-- Selecione uma Sala --</option>
                        {rooms.map(room => (
                            <option key={room.id} value={room.id}>
                                {room.nome} ({room.id})
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Linha Divisória */}
            <p style={{ textAlign: 'center', margin: '15px 0' }}>— OU —</p>

            {/* 2. INPUT MANUAL */}
            <form onSubmit={handleDelete} style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Digite o ID da Sala (ou *** para todas)"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    required={!rooms.length}
                    disabled={loading}
                    style={{
                        flexGrow: 1,
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                    }}
                />
                <button
                    type="submit"
                    disabled={loading || listLoading}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {loading ? 'Apagando...' : 'Apagar'}
                </button>
            </form>
        </div>
    );
}