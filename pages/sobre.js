// pages/sobre.js
export default function Sobre() {
  return (
    <div style={{
      maxWidth: "900px",
      margin: "30px auto",
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.8"
    }}>
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Sobre o Projeto</h1>

      <p>
        Este sistema foi criado para auxiliar equipes a escolher estimativas de tempo
        para tarefas de forma simples e colaborativa.
        Cada participante escolhe sua estimativa individualmente, clicando em <strong>Revelar</strong>, as escolhas são mostradas.
      </p>

      <h2 style={{ marginTop: "10px" }}>Objetivo</h2>
      <p>
        Tornar o processo de planejamento mais rápido, organizado e visual, ajudando
        times a chegarem em um consenso com mais facilidade.
      </p>

      <h2 style={{ marginTop: "10px" }}>Tecnologias</h2>
      <ul>
        <li>Next.js 16</li>
        <li>Firebase (Auth + Firestore)</li>
        <li>React</li>
        <li>Vercel Deployment</li>
      </ul>

      <p style={{ marginTop: "20px", fontStyle: "italic" }}>
        <strong>Desenvolvido com foco em simplicidade.</strong>
        <br></br>
        Nilson Sacchi Junior
      </p>
      
    </div>
  );
}