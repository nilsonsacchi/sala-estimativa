// pages/api/create-room.js
import { getDB } from "../../lib/firebaseClient";
import { ref, push } from "firebase/database";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido." });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nome da sala é obrigatório" });
  }

  try {
    const db = getDB();
    const salasRef = ref(db, "salas");

    const newRoomRef = await push(salasRef, {
      nome: name,
      createdAt: Date.now(),
    });

    return res
      .status(200)
      .json({ message: `Sala '${name}' criada!`, roomId: newRoomRef.key });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao criar sala." });
  }
}