// components/ProtectedRoute.js
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ user, children }) {
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return; // ainda inicializando
    if (!user) router.replace("/login"); // redireciona se não logado
  }, [user, router]);

  if (user === undefined || !user) return <div style={{ padding: 40 }}>Carregando...</div>;

  return <>{children}</>;
}