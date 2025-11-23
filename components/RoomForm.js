import { useState } from 'react';

export default function RoomForm({ onEnter }) {
  const [roomId, setRoom] = useState('');
  const [name, setName] = useState('');

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <h2 style={styles.title}>Entrar na Sala</h2>

        <input
          style={styles.input}
          placeholder="Sala"
          value={roomId}
          onChange={(e) => setRoom(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={() => onEnter(roomId, name)}
        >
          Entrar
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
    cursor: "pointer",
    alignSelf: "center",     // 🔸 centraliza dentro do container
    width: "120px"
  },
};