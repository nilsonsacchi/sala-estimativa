// components/Sidebar.js
import React from "react";
import { useRouter } from "next/router"; // <-- pages router
import { getDB } from "../lib/firebaseClient";
import { ref, remove } from "firebase/database";

/**
 * Sidebar que remove o usuário da sala antes de navegar.
 * Compatível com Pages Router (next/router).
 *
 * Props:
 *  - onLeaveRoom: função opcional que limpa o estado local (inRoom, rid, name)
 */
export default function Sidebar({ onLeaveRoom }) {
  const router = useRouter();

  // tenta remover participante do firebase (se roomId+userName existirem)
  async function tryRemoveParticipant() {
    try {
      if (typeof window === "undefined") return;

      const roomId = localStorage.getItem("roomId");
      const userName = localStorage.getItem("userName");

      if (!roomId || !userName) return;

      const db = getDB();
      if (!db) {
        console.warn("Firebase DB não inicializado ao tentar remover participante.");
        return;
      }

      await remove(ref(db, `salas/${roomId}/participantes/${userName}`));
      console.log("Participante removido:", userName, "sala:", roomId);

      // opcional: limpar storage local
      localStorage.removeItem("roomId");
      localStorage.removeItem("userName");
    } catch (err) {
      console.error("Erro ao remover participante (não impede navegação):", err);
    }
  }

  // fluxo seguro: chama onLeaveRoom (se houver), tenta remover do DB e navega
  async function clearAndGo(path) {
    try {
      if (onLeaveRoom) {
        try {
          onLeaveRoom();
        } catch (e) {
          console.warn("onLeaveRoom lançou erro:", e);
        }
      }

      // removemos participante em background, mas aguardamos para reduzir chances de ghost
      await tryRemoveParticipant();
    } finally {
      // sempre navega, mesmo que a remoção falhe
      router.push(path);
    }
  }

  return (
    <nav>
      <ul
        style={{
          listStyle: "none",
          padding: "20px",
          margin: 0,
          width: "220px",
          height: "100vh",
          backgroundColor: "#f4f4f4",
          borderRight: "1px solid #ddd",
          boxSizing: "border-box",
        }}
      >
        <li
          style={{ marginBottom: "10px", cursor: "pointer" }}
          onClick={() => clearAndGo("/")}
        >
          🏠 Home
        </li>

        <hr style={{ margin: "15px 0", border: "none", borderBottom: "1px solid #ccc" }} />

        <li
          style={{ marginBottom: "10px", cursor: "pointer" }}
          onClick={() => clearAndGo("/create-rooms")}
        >
          🏗️ Criar Salas
        </li>

        <li
          style={{ marginBottom: "10px", cursor: "pointer" }}
          onClick={() => clearAndGo("/delete-rooms")}
        >
          🗑️ Apagar Salas
        </li>
      </ul>
    </nav>
  );
}