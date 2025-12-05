// pages/login.js
import { useEffect } from "react";
import {
  initFirebase,
  loginWithGoogle,
  getAuthInstance,
} from "../lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

export default function Login() {
  useEffect(() => {
    initFirebase();
    const auth = getAuthInstance();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) window.location.href = "/";
    });
    return () => unsub();
  }, []);

  async function handleGoogle() {
    try {
      initFirebase();
      await loginWithGoogle();
      window.location.href = "/";
    } catch (err) {
      alert("Erro ao fazer login: " + (err?.message || err));
    }
  }

  return (
    <div className="login-bg">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap");

        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          font-family: "Inter", sans-serif;
        }

        /* Fundo Premium com animação */
        .login-bg {
          height: 100dvh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at 20% 20%, #4f5bd5, #962fbf, #d62976);
          background-size: 200% 200%;
          animation: bgMove 12s ease infinite;
          position: relative;
        }

        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Luz atmosférica */
        .light {
          position: absolute;
          width: 500px;
          height: 500px;
          background: rgba(255, 255, 255, 0.07);
          filter: blur(120px);
          border-radius: 50%;
          top: -150px;
          right: -120px;
          animation: floatLight 8s ease-in-out infinite alternate;
        }
        
        @keyframes floatLight {
          from { transform: translateY(0px); }
          to { transform: translateY(40px); }
        }
        
        /* Card Premium com animação */
        .card {
        width: 100%;
        max-width: 380px;
        padding: 55px 40px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.10);
        backdrop-filter: blur(18px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 18px 45px rgba(0,0,0,0.35);
        text-align: center;
        color: white;

        opacity: 0;
        transform: translateY(40px);

        /* NOVO: animação mais lenta e com delay */
        animation: fadeUp 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }


        @keyframes fadeUp {
        0% {
            opacity: 0;
            transform: translateY(40px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
      }

        
      .title {
          font-size: 34px;
          font-weight: 700;
          margin-bottom: 25px;
          letter-spacing: -0.5px;
        }

        /* Botão Google Premium */
        .google-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px 20px;
          border: none;
          border-radius: 12px;
          background: white;
          color: #444;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
          transition: 0.25s ease;
        }

        .google-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 22px rgba(0,0,0,0.20);
        }
      `}</style>

      <div className="light"></div>

      <div className="card">
        <h1 className="title">Bem-vindo</h1>

        <button className="google-btn" onClick={handleGoogle}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            style={{ width: 22, height: 22 }}
          />
          Entrar com Google
        </button>
      </div>
    </div>
  );
}