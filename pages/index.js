// pages/index.js
import { useEffect, useState } from "react";
import RoomForm from "../components/RoomForm";
import RoomView from "../components/RoomView";
import styles from "../styles/home/Home.module.css";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Home({ user, leaveRoom }) {
  const [rid, setRid] = useState(null);
  const [inRoom, setInRoom] = useState(false);

  function handleLeaveRoom() {
    setInRoom(false);
    setRid(null);
  }

  useEffect(() => {
    window.__LEAVE_ROOM_CALLBACK__ = () => handleLeaveRoom();
  }, [rid, inRoom]);

  if (user === undefined) return <div style={{ padding: 40 }}>Carregando...</div>;

  return (
    <ProtectedRoute user={user}>
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
    </ProtectedRoute>
  );
}