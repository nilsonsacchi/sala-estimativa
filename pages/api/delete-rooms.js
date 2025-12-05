// pages/api/delete-rooms.js
import { ref, remove } from "firebase/database";
import { getDB } from "../../lib/firebaseClient";

const SECRET_PASSWORD = "@@@Nilson";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método Não Permitido" });
  }

  const { roomId, password } = req.body;

  if (password !== SECRET_PASSWORD) {
    return res.status(401).json({ message: "Senha inválida para exclusão." });
  }

  if (!roomId) {
    return res.status(400).json({ message: "ID da sala não fornecido." });
  }

  try {
    const db = getDB();

    let roomRef =
      roomId === "***"
        ? ref(db, "salas")
        : ref(db, `salas/${roomId}`);

    await remove(roomRef);

    return res.status(200).json({
      message:
        roomId === "***"
          ? "Todas as salas foram apagadas."
          : `Sala ${roomId} apagada com sucesso.`,
    });
  } catch (error) {
    console.error("[SERVER ERROR]:", error);
    return res
      .status(500)
      .json({ message: "Erro ao comunicar com o Firebase." });
  }
}