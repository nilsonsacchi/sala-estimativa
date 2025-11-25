import { useEffect, useState } from "react";
import { ref, set, onValue, update, onDisconnect } from "firebase/database";
import { getDB } from "../lib/firebaseClient";

const OPT = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];

export default function RoomView({ roomId, userName }) {
  const [part, setPart] = useState({});
  const [selected, setSelected] = useState(null);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    const db = getDB();

    // Nome da sala
    const salaRef = ref(db, `salas/${roomId}/nome`);
    onValue(salaRef, snap => {
      setRoomName(snap.val() || "Sala sem nome");
    });

    // Caminho do participante
    const userRef = ref(db, `salas/${roomId}/participantes/${userName}`);

    // Criar participante ao entrar
    set(userRef, { escolha: null, revelado: false });

    // 🔥 Remove o usuário automaticamente ao fechar o navegador
    onDisconnect(userRef).remove();

    // Participantes
    const roomRef = ref(db, `salas/${roomId}/participantes`);

    const unsub = onValue(roomRef, snap => {
      const val = snap.val() || {};
      setPart(val);

      if (val[userName] && typeof val[userName].escolha === "number") {
        setSelected(val[userName].escolha);
      }
    });

    return () => unsub();
  }, [roomId, userName]);

  // Selecionar voto
  function choose(v) {
    const db = getDB();
    setSelected(v);
    update(
      ref(db, `salas/${roomId}/participantes/${userName}`),
      { escolha: v, revelado: false }
    );
  }

  // Revelar para todos
  function revealAll() {
    const db = getDB();
    Object.keys(part).forEach(p => {
      update(ref(db, `salas/${roomId}/participantes/${p}`), { revelado: true });
    });
  }

  // Ocultar para todos
  function hideAll() {
    const db = getDB();
    Object.keys(part).forEach(p => {
      update(
        ref(db, `salas/${roomId}/participantes/${p}`),
        { revelado: false }
      );
    });
  }

  // Limpar todos os votos
  function clearAll() {
    const db = getDB();
    Object.keys(part).forEach(p => {
      update(
        ref(db, `salas/${roomId}/participantes/${p}`),
        { escolha: null, revelado: false }
      );
    });

    setSelected(null);
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: 8 }}>
        Sala: <strong>{roomName}</strong>
      </h2>

      <p>Você: <strong>{userName}</strong></p>

      {/* BOTÕES DE HORA */}
      <div className="grid">
        {OPT.map(o => (
          <button
            key={o}
            onClick={() => choose(o)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: selected === o ? "2px solid #4A90E2" : "1px solid #ccc",
              backgroundColor: selected === o ? "#4A90E2" : "#ffffff",
              color: selected === o ? "#ffffff" : "#333",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: selected === o ? "bold" : "normal"
            }}
          >
            {o}h
          </button>
        ))}
      </div>

      {/* BOTÕES */}
      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <button className="reveal-btn" onClick={revealAll}>
          Mostrar escolhas
        </button>

        <button
          onClick={hideAll}
          style={{
            backgroundColor: "#0a74da",
            color: "white",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap"
          }}
        >
          Ocultar escolhas
        </button>

        <button className="clear-btn" onClick={clearAll}>
          Limpar
        </button>
      </div>

      {/* RESULTADOS */}
      <h3 style={{ marginTop: 16 }}>Resultados</h3>

      <div>
        {Object.keys(part).length === 0 && (
          <div>Ninguém na sala ainda.</div>
        )}

        {Object.entries(part).map(([n, i]) => {
          let show;

          // Nunca votou
          if (i.escolha === null || i.escolha === undefined) {
            show = (
              <span
                style={{
                  opacity: 0.6,
                  fontStyle: "italic",
                  animation: "pulse 1.5s infinite",
                  display: "inline-block"
                }}
              >
                ⏳ aguardando...
              </span>
            );

          // Revelado → mostrar corretamente a hora
          } else if (i.revelado === true) {
            show = `${i.escolha}h`;

          // Escolheu, mas está oculto
          } else {
            show = (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: "bold"
                }}
              >
                👁️ revelar
              </span>
            );
          }

          return (
            <div
              key={n}
              style={{
                padding: "6px 0",
                borderBottom: "1px solid #eee"
              }}
            >
              {n}:{" "}
              <strong style={{ display: "inline-flex", alignItems: "center" }}>
                {show}
              </strong>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}