// pages/_app.js
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import { getFirebaseApp } from "../lib/firebaseClient";

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Função usada globalmente para mandar sair da sala
  function handleLeaveRoom() {
    if (window.__LEAVE_ROOM_CALLBACK__) {
      try {
        window.__LEAVE_ROOM_CALLBACK__();
      } catch {}
    }
  }

  const hideSidebar = router.pathname === "/login";

  useEffect(() => {
    const app = getFirebaseApp();
    const auth = getAuth(app);

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {!hideSidebar && (
        <Sidebar
          user={user}
          onLeaveRoom={handleLeaveRoom}
        />
      )}

      <main style={{ flex: 1 }}>
        <Component
          {...pageProps}
          user={user}
          leaveRoom={handleLeaveRoom}
        />
      </main>
    </div>
  );
}