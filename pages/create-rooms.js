// pages/create-rooms.js
import { useState } from "react";
import { getDB } from "../lib/firebaseClient";
import { ref, push, set } from "firebase/database";
import styles from "../styles/home/Home.module.css";

export default function CreateRoomsPage() {
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    const db = getDB();
    const roomsRef = ref(db, "salas");
    const newRoomRef = push(roomsRef);

    await set(newRoomRef, {
      nome: roomName.toUpperCase(),
      createdAt: Date.now(),
    });

    setMessage(`Sala "${roomName}" criada com sucesso!`);
    setRoomName("");
  };

  return (
    <div style={{ display: "flex" }}>

      <div style={{ padding: 20, width: "100%" }}>
        <h1>Criar Salas</h1>

        <form onSubmit={handleCreate}>
          <label>
            Nome da sala:<br />
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value.toUpperCase())}
              required
              style={{
                padding: 8,
                width: 300,
                textTransform: "uppercase",
              }}
            />
          </label>

          <br /><br />

          <button type="submit">Criar sala</button>
        </form>

        {message && (
          <p style={{ marginTop: 20, color: "green" }}>{message}</p>
        )}
      </div>
    </div>
  );
}