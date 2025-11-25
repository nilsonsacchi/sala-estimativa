// pages/admin/index.js
import Link from "next/link";
import Sidebar from "../../components/Sidebar";

export default function AdminPage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", flexGrow: 1 }}>
        <h1>Painel de Administração</h1>

        <ul style={{ lineHeight: "2rem" }}>
          <li><Link href="/admin/create-room">Criar Sala</Link></li>
          <li><Link href="/admin/delete-room">Excluir Sala</Link></li>
          <li><Link href="/">Voltar ao Início</Link></li>
        </ul>
      </div>
    </div>
  );
}