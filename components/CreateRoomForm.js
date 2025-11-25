// components/CreateRoomForm.js
import { useState } from "react";

export default function CreateRoomForm() {
    const [roomName, setRoomName] = useState("");
    const [loading, setLoading] = useState(false);

    const createRoom = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/create-room", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: roomName })
        });

        const data = await res.json();

        alert(data.message);
        setRoomName("");
        setLoading(false);
    };

    return (
        <form onSubmit={createRoom} style={{ marginTop: "20px" }}>
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value.toUpperCase())}
                style={{
                    padding: 8,
                    width: 300,
                    textTransform: "uppercase"  // ← deixa visualmente maiúsculo
                }}
            />

            <button
                type="submit"
                disabled={loading}
                style={{
                    padding: 10,
                    marginLeft: 10,
                    backgroundColor: "#0070f3",
                    color: "white",
                    border: "none",
                    borderRadius: 4
                }}
            >
                Criar
            </button>
        </form>
    );
}