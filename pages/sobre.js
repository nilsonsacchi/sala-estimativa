// pages/sobre.js
export default function Sobre() {
  return (
    <div style={{
      maxWidth: "900px",
      margin: "30px auto",
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.8"
    }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Sobre o Projeto</h1>

      <p>
        Este sistema foi criado para auxiliar equipes a escolher estimativas de tempo
        para tarefas de forma simples e colaborativa.
      </p>

      <p>
        Cada participante escolhe sua estimativa individualmente, clicando em <strong>Revelar</strong>, as escolhas são mostradas.
      </p>

      <h2 style={{ marginTop: "30px" }}>Objetivo</h2>
      <p>
        Tornar o processo de planejamento mais rápido, organizado e visual, ajudando
        times a chegarem em um consenso com mais facilidade.
      </p>

      <h2 style={{ marginTop: "30px" }}>Tecnologias</h2>
      <ul>
        <li>Next.js 16</li>
        <li>Firebase (Auth + Firestore)</li>
        <li>React</li>
        <li>Vercel Deployment</li>
      </ul>

      <p style={{ marginTop: "40px", fontStyle: "italic" }}>
        Desenvolvido com foco em simplicidade.
      </p>
    </div>
  );
}