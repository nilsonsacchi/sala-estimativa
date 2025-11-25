// pages/admin/create-room.js
import CreateRoomForm from "../../components/CreateRoomForm";
import Sidebar from "../../components/Sidebar";

export default function CreateRoomPage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px", flexGrow: 1 }}>
        <h1>Criar Nova Sala</h1>
        <CreateRoomForm />
      </div>
    </div>
  );
}