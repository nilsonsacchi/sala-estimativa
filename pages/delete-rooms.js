// pages/delete-rooms.js
import { useState, useEffect } from "react";
import { getDB } from "../lib/firebaseClient";
import { ref, onValue } from "firebase/database";
import Sidebar from "../components/Sidebar";

export default function DeleteRoomsPage() {
  const [rooms, setRooms] = useState({});
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const db = getDB(); // 🔥 Agora NUNCA é null

    const roomsRef = ref(db, "salas");

    const unsubscribe = onValue(roomsRef, (snap) => {
      setRooms(snap.val() || {});
    });

    return () => unsubscribe();
  }, []);

  const deleteRoom = async (roomId) => {
    const res = await fetch("/api/delete-rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  const clearMembers = async (roomId) => {
    const res = await fetch("/api/clear-members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: 20, width: "100%" }}>
        <h1>Apagar Salas</h1>

        <div style={{ marginBottom: 20 }}>
          <label>
            Senha administrativa:<br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: 8, width: 300 }}
              required
            />
          </label>
        </div>

        <h2>Salas existentes</h2>

        {Object.keys(rooms).length === 0 && <p>Nenhuma sala criada.</p>}

        <ul>
          {Object.entries(rooms).map(([id, sala]) => (
            <li key={id} style={{ marginBottom: 10 }}>
              <strong>{sala.nome}</strong>

              <button
                style={{ marginLeft: 10, background: "#0a74da", color: "white" }}
                onClick={() => clearMembers(id)}
              >
                🧹 Limpar membros
              </button>

              <button
                style={{ marginLeft: 10, background: "red", color: "white" }}
                onClick={() => deleteRoom(id)}
              >
                ❌ Apagar sala
              </button>
            </li>
          ))}
        </ul>

        <hr />

        <button
          onClick={() => deleteRoom("***")}
          style={{ marginTop: 20, color: "white", background: "red" }}
        >
          Apagar TODAS as salas
        </button>

        {message && (
          <p style={{ marginTop: 20, color: "blue" }}>{message}</p>
        )}
      </div>
    </div>
  );
}