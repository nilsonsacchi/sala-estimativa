import CreateRoomForm from "./CreateRoomForm";
import DeleteRoomForm from "./DeleteRoomForm";

export default function AdminMenu() {
  return (
    <div style={{ padding: "12px" }}>
      <h3>Administração</h3>

      <div style={{ marginTop: "12px" }}>
        <CreateRoomForm />
      </div>

      <div style={{ marginTop: "20px" }}>
        <DeleteRoomForm />
      </div>
    </div>
  );
}