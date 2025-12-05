// components/RoomForm.js
import { useState, useEffect } from "react";
import { getDB } from "../lib/firebaseClient";
import { ref, onValue } from "firebase/database";
import styless from "../styles/home/RoomForm.module.css";

export default function RoomForm({ onEnter }) {
  const [roomId, setRoom] = useState("");
  const [dbReady, setDbReady] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const db = getDB();
      if (db) {
        setDbReady(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!dbReady) return;

    const db = getDB();
    const roomsRef = ref(db, "salas");

    const unsub = onValue(roomsRef, (snap) => {
      const val = snap.val() || {};
      const list = Object.entries(val).map(([id, sala]) => ({
        id,
        nome: sala.nome,
      }));
      setRooms(list);
    });

    return () => unsub();
  }, [dbReady]);

  const handleEnter = () => {
    if (!roomId) {
      setError("Selecione uma sala antes de entrar.");
      return;
    }

    setError("");
    onEnter(roomId);
  };

  const isDisabled = !dbReady || !roomId;

  return (
    <div className={styless.wrapper}>
      <div className={styless.box}>
        <h2 className={styless.title}>Entrar na Sala</h2>

        <div className={styless.combobox}>
          <select className={styless.input} value={roomId} onChange={(e) => setRoom(e.target.value)}>
            <option value="">Selecione uma Sala...</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nome}
              </option>
            ))}
          </select>
        </div>

        {error && <p className={styless.error}>{error}</p>}

        <button
          className={`${styless.button} ${isDisabled ? styless.disabled : ""}`}
          onClick={handleEnter}
          disabled={isDisabled}
        >
          {dbReady ? "Entrar" : "Carregando..."}
        </button>
      </div>
    </div>
  );
}