import { useEffect, useState } from 'react';
import RoomForm from '../components/RoomForm';
import RoomView from '../components/RoomView';
import Sidebar from '../components/Sidebar'; // Importe o Sidebar
import { initFirebase } from '../lib/firebaseClient';
import styles from '../styles/home/Home.module.css';

export default function Home() {
    const [inRoom, setIn] = useState(false);
    const [rid, setRid] = useState('');
    const [name, setName] = useState('');

    useEffect(() => { initFirebase(); }, []);

    function leaveRoom() {
        setIn(false);
        setRid('');
        setName('');
    }

    return (
        <div className={styles.container} style={{ display: 'flex' }}> {/* ⬅️ Adicione o display flex para o layout lateral */}
            
            <Sidebar onLeaveRoom={leaveRoom} /> {/* ⬅️ Adicione o menu lateral */}
            
            <main className={styles.main} style={{ flexGrow: 1, padding: '20px' }}> {/* ⬅️ Container do conteúdo principal */}
                {!inRoom && (
                    <h1 className={styles.title} style={{ textAlign: "center", marginTop: "40px" }}>
                        Sala de Estimativa
                    </h1>
                )}

                {!inRoom && (
                    <RoomForm
                        onEnter={(r, n) => {
                            setRid(r);
                            setName(n);
                            setIn(true);
                        }}
                    />
                )}

                {inRoom && <RoomView roomId={rid} userName={name} />}
            </main>
        </div>
    );
}