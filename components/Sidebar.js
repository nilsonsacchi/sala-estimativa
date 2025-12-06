// components/Sidebar.js
import { useRouter } from "next/router";
import { getDB } from "../lib/firebaseClient";
import { remove, ref } from "firebase/database";
import { logout } from "../lib/firebaseClient";
import { getAuth } from "firebase/auth";
import { getFirebaseApp } from "../lib/firebaseClient";

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

  async function tryRemoveParticipant() {
    try {
      if (typeof window === "undefined") return;

      const roomId = localStorage.getItem("roomId");
      const user = getUser();

      if (!roomId || !user) return;

      const uid = user.uid;
      const db = getDB();
      if (!db) return;

      await remove(ref(db, `salas/${roomId}/participantes/${uid}`));
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
        } catch {}
      }
      await tryRemoveParticipant();
    } finally {
      router.push(path).catch(console.error);
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
      <ul style={{
        listStyle: "none",
        padding: "20px",
        margin: 0,
        width: "210px",
        height: "100vh",
        backgroundColor: "#111010ff",
        color: "white",
        borderRight: "1px solid #444",
        boxSizing: "border-box",
      }}>
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

        <li style={{ marginBottom: "10px", cursor: "pointer" }} onClick={() => clearAndGo("/sobre")}>
          ℹ️ Sobre
        </li>
        <hr style={{ margin: "15px 0", border: "none", borderBottom: "1px solid #444" }} />

        <li style={{
          marginTop: "20px",
          cursor: "pointer",
          padding: "10px",
          background: "#e74c3c",
          color: "white",
          textAlign: "center",
          borderRadius: "8px",
          fontWeight: "bold",
        }} onClick={handleLogout}>
          🚪 Sair
        </li>
      </ul>
    </nav>
  );
}