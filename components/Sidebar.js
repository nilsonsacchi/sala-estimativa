// components/Sidebar.js
import { useRouter } from "next/router";
import { getDB } from "../lib/firebaseClient";
import { remove, ref } from "firebase/database";
import { logout } from "../lib/firebaseClient";
import { getAuth } from "firebase/auth";
import { getFirebaseApp } from "../lib/firebaseClient";

/**
 * Sidebar:
 * - Recebe user prop (firebase user) ou usa auth.currentUser
 * - Remove participante usando uid
 */
export default function Sidebar({ user: userProp, onLeaveRoom }) {
  const router = useRouter();

  function getUser() {
    if (userProp) return userProp;
    try {
      const app = getFirebaseApp();
      const auth = getAuth(app);
      return auth.currentUser;
    } catch (e) {
      return null;
    }
  }

  // remove participante da sala no Firebase, se existir
  async function tryRemoveParticipant() {
    try {
      if (typeof window === "undefined") return;

      const roomId = localStorage.getItem("roomId"); // still keep roomId in localStorage to know last room (optional)
      const user = getUser();

      if (!roomId || !user) return;

      const uid = user.uid;

      const db = getDB();
      if (!db) return;

      await remove(ref(db, `salas/${roomId}/participantes/${uid}`));

      // optional: clear localStorage room markers
      localStorage.removeItem("roomId");
    } catch (err) {
      console.error("Erro ao remover participante:", err);
    }
  }

  async function clearAndGo(path) {
    try {
      if (onLeaveRoom) {
        try {
          onLeaveRoom();
        } catch (e) {
          console.warn("Erro no onLeaveRoom:", e);
        }
      }

      await tryRemoveParticipant();
    } finally {
      router.push(path);
    }
  }

  async function handleLogout() {
    await tryRemoveParticipant();
    await logout();
    router.push("/login");
  }

  const user = getUser();

  return (
    <nav>
      <ul
        style={{
          listStyle: "none",
          padding: "20px",
          margin: 0,
          width: "220px",
          height: "100vh",
          backgroundColor: "#222",
          color: "white",
          borderRight: "1px solid #444",
          boxSizing: "border-box",
        }}
      >
        {/* Usuário logado */}
        {user && (
          <li style={{ marginBottom: "20px" }}>
            <strong>{user.displayName}</strong>
            <br />
            <small>{user.email}</small>
            <hr style={{ border: "none", borderBottom: "1px solid #444", marginTop: "15px" }} />
          </li>
        )}

        <li style={{ marginBottom: "10px", cursor: "pointer" }} onClick={() => clearAndGo("/")}>
          🏠 Home
        </li>

        <hr style={{ margin: "15px 0", border: "none", borderBottom: "1px solid #444" }} />

        <li style={{ marginBottom: "10px", cursor: "pointer" }} onClick={() => clearAndGo("/create-rooms")}>
          🏗️ Criar Salas
        </li>

        <li style={{ marginBottom: "10px", cursor: "pointer" }} onClick={() => clearAndGo("/delete-rooms")}>
          🗑️ Apagar Salas
        </li>

        <hr style={{ margin: "15px 0", border: "none", borderBottom: "1px solid #444" }} />

        {/* Botão de logout */}
        <li
          style={{
            marginTop: "20px",
            cursor: "pointer",
            padding: "10px",
            background: "#e74c3c",
            color: "white",
            textAlign: "center",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
          onClick={handleLogout}
        >
          🚪 Sair
        </li>
      </ul>
    </nav>
  );
}