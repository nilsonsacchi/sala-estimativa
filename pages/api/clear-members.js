// pages/api/clear-members.js
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, remove } from "firebase/database";
import { firebaseConfig } from "../../lib/firebaseClient";

const SECRET_PASSWORD = "@@@Nilson";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getDatabase();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido." });
  }

  const { roomId, password } = req.body;

  if (password !== SECRET_PASSWORD) {
    return res.status(401).json({ message: "Senha inválida." });
  }

  if (!roomId) {
    return res.status(400).json({ message: "ID da sala não fornecido." });
  }

  try {
    const membersRef = ref(db, `salas/${roomId}/participantes`);
    await remove(membersRef);

    return res.status(200).json({
      message: `Todos os membros da sala "${roomId}" foram removidos.`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao limpar membros." });
  }
}