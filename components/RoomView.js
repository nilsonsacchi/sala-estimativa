// components/RoomView.js
import { useEffect, useState } from "react";
import { ref, set, onValue, update, onDisconnect, remove, get } from "firebase/database";
import { getDB, getFirebaseApp } from "../lib/firebaseClient";
import { getAuth } from "firebase/auth";

/**
 * Props:
 * - roomId: string
 * - user: Firebase User object (preferível) — { uid, displayName, email, photoURL }
 *
 * Behavior:
 * - Uses uid as participant key: salas/{roomId}/participantes/{uid}
 * - If an "old" key exists under displayName, it will migrate that data to uid automatically
 * - Writes participant record: { nome, escolha, revelado, joinedAt }
 */
export default function RoomView({ roomId, user: userProp }) {
  const [part, setPart] = useState({});
  const [selected, setSelected] = useState(null);
  const [roomName, setRoomName] = useState("");

  const OPT = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];

  useEffect(() => {
    // get user (prefer prop, fallback to auth.currentUser)
    const auth = getAuth(getFirebaseApp());
    const user = userProp || auth.currentUser;
    if (!user || !roomId) return;

    const uid = user.uid;
    const displayName = user.displayName || "Usuário";

    const db = getDB();

    // Nome da sala
    const salaRef = ref(db, `salas/${roomId}/nome`);
    const unsubSala = onValue(salaRef, (snap) => {
      setRoomName(snap.val() || "Sala sem nome");
    });

    // PARTICIPANTES: cleanup / migration / registro
    const participantsRefRoot = ref(db, `salas/${roomId}/participantes`);
    // 1) check if old key exists (displayName) and migrate it to uid if needed
    get(participantsRefRoot).then((snap) => {
      const val = snap.val() || {};
      const hadUid = !!val[uid];
      const hadDisplayNameKey = !!val[displayName];

      if (!hadUid && hadDisplayNameKey) {
        // migrate data from displayName -> uid
        const old = val[displayName];
        const newData = {
          nome: displayName,
          escolha: old?.escolha ?? null,
          revelado: old?.revelado ?? false,
          migratedFrom: displayName,
          migratedAt: Date.now(),
        };
        // write new uid key and remove old key
        set(ref(db, `salas/${roomId}/participantes/${uid}`), newData)
          .then(() => remove(ref(db, `salas/${roomId}/participantes/${displayName}`)))
          .catch((err) => console.error("Erro migração participante:", err));
      }
    }).catch((err) => {
      console.warn("Falha ao checar participantes para migração:", err);
    });

    // 2) create/update participant record with uid (join)
    const userRef = ref(db, `salas/${roomId}/participantes/${uid}`);
    set(userRef, {
      nome: displayName,
      escolha: null,
      revelado: false,
      joinedAt: Date.now(),
    }).catch((err) => console.error("Erro ao set participante:", err));

    // ensure remove on disconnect
    onDisconnect(userRef).remove();

    // 3) subscribe to participants list
    const unsub = onValue(participantsRefRoot, (snap) => {
      const val = snap.val() || {};
      setPart(val);

      // If this user has a saved escolha (number) keep selection locally.
      if (val[uid]) {
        if (typeof val[uid].escolha === "number") {
          setSelected(val[uid].escolha);
        } else {
          setSelected(null);
        }
      } else {
        setSelected(null);
      }
    });

    // cleanup on unmount
    return () => {
      try {
        unsub();
        unsubSala();
      } catch (e) {}
    };
  }, [roomId, userProp]);

  // helper to get current user (uid)
  function getCurrentUser() {
    try {
      const app = getFirebaseApp();
      const auth = getAuth(app);
      return auth.currentUser;
    } catch (e) {
      return null;
    }
  }

  // Selecionar voto
  function choose(v) {
    const user = getCurrentUser();
    if (!user) return alert("Usuário não autenticado.");

    const uid = user.uid;
    const db = getDB();
    setSelected(v);
    update(ref(db, `salas/${roomId}/participantes/${uid}`), {
      escolha: v,
      revelado: false,
    }).catch((err) => console.error("Erro ao escolher:", err));
  }

  // Revelar para todos
  function revealAll() {
    const db = getDB();
    Object.keys(part).forEach((p) => {
      update(ref(db, `salas/${roomId}/participantes/${p}`), { revelado: true }).catch((e) =>
        console.error("Erro reveal:", e)
      );
    });
  }

  // Ocultar para todos
  function hideAll() {
    const db = getDB();
    Object.keys(part).forEach((p) => {
      update(ref(db, `salas/${roomId}/participantes/${p}`), { revelado: false }).catch((e) =>
        console.error("Erro hide:", e)
      );
    });
  }

  // Limpar todos os votos
  function clearAll() {
    const db = getDB();
    Object.keys(part).forEach((p) => {
      update(ref(db, `salas/${roomId}/participantes/${p}`), { escolha: null, revelado: false }).catch((e) =>
        console.error("Erro clear:", e)
      );
    });
    setSelected(null);
  }

  // Render participant display name (data may be keyed by uid or older key)
  function participantDisplayName(key, data) {
    if (data && data.nome) return data.nome;
    // fallback: if key looks like uid, hide it; else show key
    return key;
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: 8 }}>
        Sala: <strong>{roomName}</strong>
      </h2>

      <p>
        Você: <strong>{participantDisplayName(getCurrentUser()?.uid || "—", { nome: getCurrentUser()?.displayName })}</strong>
      </p>

      {/* BOTÕES DE HORA */}
      <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {OPT.map((o) => (
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
              fontWeight: selected === o ? "bold" : "normal",
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
            whiteSpace: "nowrap",
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
        {Object.keys(part).length === 0 && <div>Ninguém na sala ainda.</div>}

        {Object.entries(part).map(([key, data]) => {
          let show;

          // Nunca votou
          if (data?.escolha === null || data?.escolha === undefined) {
            show = (
              <span
                style={{
                  opacity: 0.6,
                  fontStyle: "italic",
                  animation: "pulse 1.5s infinite",
                  display: "inline-block",
                }}
              >
                ⏳ aguardando...
              </span>
            );

            // Revelado → mostrar corretamente a hora
          } else if (data?.revelado === true) {
            show = `${data.escolha}h`;

            // Escolheu, mas está oculto
          } else {
            show = (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: "bold",
                }}
              >
                👁️ revelar
              </span>
            );
          }

          const nomeExibir = participantDisplayName(key, data);

          return (
            <div
              key={key}
              style={{
                padding: "6px 0",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                {nomeExibir}:{" "}
                <strong style={{ display: "inline-flex", alignItems: "center" }}>{show}</strong>
              </div>
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