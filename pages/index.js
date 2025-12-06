// pages/index.js
import { useEffect, useState } from "react";
import RoomForm from "../components/RoomForm";
import RoomView from "../components/RoomView";
import styles from "../styles/home/Home.module.css";

export default function Home({ user, leaveRoom }) {
    const [rid, setRid] = useState(null);
    const [inRoom, setInRoom] = useState(false);

    // Função chamada quando sai da sala (Sidebar chama isso!)
    function handleLeaveRoom() {
        setInRoom(false);
        setRid(null);
    }

    // Disponibiliza a função global para o _app.js acessar
    useEffect(() => {
        window.__LEAVE_ROOM_CALLBACK__ = () => handleLeaveRoom();
    }, [rid, inRoom]);

    return (
        <div style={{ padding: 24 }}>
            <h1 className={styles.title} style={{ textAlign: "center", marginTop: "-10px" }}>
                Sala de Estimativa
            </h1>

            {!inRoom && (
                <RoomForm
                    onEnter={(roomId) => {
                        setRid(roomId);
                        setInRoom(true);
                    }}
                />
            )}

            {inRoom && user && (
                <RoomView
                    roomId={rid}
                    user={user}
                    onLeave={handleLeaveRoom}
                />
            )}
        </div>
    );
}