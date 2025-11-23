import { useEffect, useState } from "react";
import { ref, set, onValue, update } from "firebase/database";
import { getDB } from "../lib/firebaseClient";

const OPT = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];

export default function RoomView({ roomId, userName }) {
  const [part, setPart] = useState({});
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const db = getDB();

    // garante que o participante exista
    set(
      ref(db, `salas/${roomId}/participantes/${userName}`),
      { escolha: null, revelado: false }
    );

    const roomRef = ref(db, `salas/${roomId}/participantes`);

    const unsub = onValue(roomRef, snap => {
      const val = snap.val() || {};
      setPart(val);

      // se minha escolha já estiver no db, sincroniza o botão escolhido
      if (val[userName] && val[userName].escolha !== null) {
        setSelected(val[userName].escolha);
      }

      // NÃO definir revealed automaticamente!
      // Só muda quando clicar explicitamente no botão Revelar.
    });

    return () => unsub();
  }, [roomId, userName]);

  function choose(v) {
    const db = getDB();
    setSelected(v);
    update(
      ref(db, `salas/${roomId}/participantes/${userName}`),
      { escolha: v, revelado: false }
    );
  }

  function revealAll() {
    const db = getDB();
    const data = part || {};

    Object.keys(data).forEach(p => {
      update(ref(db, `salas/${roomId}/participantes/${p}`), { revelado: true });
    });

    setRevealed(true);
  }

  function clearAll() {
    const db = getDB();
    const data = part || {};

    Object.keys(data).forEach(p => {
      update(
        ref(db, `salas/${roomId}/participantes/${p}`),
        { escolha: null, revelado: false }
      );
    });

    setSelected(null);
    setRevealed(false);
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: 8 }}>Sala: {roomId}</h2>
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

      {/* BOTÕES REVELAR / LIMPAR */}
      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <button className="reveal-btn" onClick={revealAll}>
          Mostrar escolhas
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
          let show = "—";

          if (i) {
            if (i.revelado) {
              // Revelado → todos veem a hora
              show = i.escolha ? i.escolha + "h" : "—";
            } else {
              // Ainda NÃO revelado
              if (n === userName) {
                // Para mim → vejo minha própria escolha
                show = i.escolha ? i.escolha + "h" : "—";
              } else {
                // Para outros membros
                if (i.escolha === null) {
                  // Ainda não votou → aguardando discreto
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
                } else {
                  // Já votou → mas está oculto
                  show = (
                    <span
                      style={{
                        cursor: "default",
                        opacity: 0.8,
                        fontWeight: "bold"
                      }}
                    >
                      ⏳ aguardando..
                    </span>
                  );
                }
              }
            }
          }

          return (
            <div
              key={n}
              style={{
                padding: "6px 0",
                borderBottom: "1px solid #eee"
              }}
            >
              {n}: <strong>{show}</strong>
            </div>
          );
        })}
      </div>

      {/* Animação CSS */}
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