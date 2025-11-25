// pages/api/create-room.js
import { db } from "../../lib/firebaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Método não permitido" });

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nome da sala é obrigatório" });
  }

  const roomRef = db.collection("rooms").doc();
  await roomRef.set({
    nome: name,
    createdAt: new Date()
  });

  return res.status(200).json({ message: `Sala '${name}' criada com sucesso!` });
}