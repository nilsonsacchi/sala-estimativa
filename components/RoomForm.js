import { useState, useEffect } from "react";
import { getDB } from "../lib/firebaseClient";
import { ref, onValue } from "firebase/database";

export default function RoomForm({ onEnter }) {
  const [roomId, setRoom] = useState("");
  const [name, setName] = useState("");
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
    if (!name.trim()) {
      setError("Digite seu nome para entrar.");
      return;
    }

    setError("");
    onEnter(roomId, name);
  };

  const isDisabled = !dbReady || !roomId || !name.trim();

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <h2 style={styles.title}>Entrar na Sala</h2>

        {/* SELECT de salas */}
        <select
          style={styles.input}
          value={roomId}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option value="">Selecione uma Sala...</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nome}
            </option>
          ))}
        </select>

        {/* Nome livre */}
        <input
          style={styles.input}
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Mensagem de erro */}
        {error && <p style={{ color: "red", fontSize: 14 }}>{error}</p>}

        <button
          style={{
            ...styles.button,
            backgroundColor: isDisabled ? "#9BBCE8" : "#4A90E2",
            cursor: isDisabled ? "not-allowed" : "pointer",
          }}
          onClick={handleEnter}
          disabled={isDisabled}
        >
          {dbReady ? "Entrar" : "Carregando..."}
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  box: {
    width: "300px",
    padding: "0px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
    fontSize: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
    outline: "none",
  },
  button: {
    backgroundColor: "#4A90E2",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    width: "120px",
    alignSelf: "center",
  },
};