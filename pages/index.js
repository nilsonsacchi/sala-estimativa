// pages/index.js
import { useEffect, useState } from "react";
import RoomForm from "../components/RoomForm";
import RoomView from "../components/RoomView";
import Sidebar from "../components/Sidebar";
import { initFirebase, getAuthInstance, getDB } from "../lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { ref, remove } from "firebase/database";
import styles from "../styles/home/Home.module.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [inRoom, setIn] = useState(false);
  const [rid, setRid] = useState("");

  useEffect(() => {
    initFirebase();
    const auth = getAuthInstance();

    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        window.location.href = "/login";
      } else {
        setUser(u);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  function leaveRoom() {
    if (rid && user) {
      const db = getDB();
      remove(ref(db, `salas/${rid}/participantes/${user.uid}`));
    }

    setIn(false);
    setRid("");
  }

  if (loading) {
    return <div style={{ padding: 40 }}>Carregando...</div>;
  }

  return (
    <div className={styles.container} style={{ display: "flex" }}>
      <Sidebar onLeaveRoom={leaveRoom} user={user} />

      <main className={styles.main} style={{ flexGrow: 1, padding: "20px" }}>
        {!inRoom && (
          <>
            <h1 className={styles.title} style={{ textAlign: "center", marginTop: "40px" }}>
              Sala de Estimativa
            </h1>

            <RoomForm
              onEnter={(roomId) => {
                setRid(roomId);
                setIn(true);
              }}
            />
          </>
        )}

        {inRoom && <RoomView roomId={rid} user={user} />}
      </main>
    </div>
  );
}