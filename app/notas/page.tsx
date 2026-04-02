"use client";

import { useState } from "react";
import Link from "next/link";

const NOTAS_INICIALES = [
  { id: 1, titulo: "Nota 1", icono: "📝", contenido: "" },
  { id: 2, titulo: "Nota 2", icono: "💭", contenido: "" },
  { id: 3, titulo: "Nota 3", icono: "🌿", contenido: "" },
];

export default function NotasPage() {
  const [notas, setNotas] = useState(NOTAS_INICIALES);
  const [activaId, setActivaId] = useState(1);
  const [titulo, setTitulo] = useState("Nota 1");
  const [contenido, setContenido] = useState("");
  const [mood, setMood] = useState("bien");

  const notaActiva = notas.find((n) => n.id === activaId);
  const palabras = contenido.trim() ? contenido.trim().split(/\s+/).length : 0;
  const hoy = new Date().toLocaleDateString("es-MX", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });

  const seleccionarNota = (nota: typeof NOTAS_INICIALES[0]) => {
    setActivaId(nota.id);
    setTitulo(nota.titulo);
    setContenido(nota.contenido);
  };

  const guardarNota = () => {
    setNotas((prev) =>
      prev.map((n) =>
        n.id === activaId ? { ...n, titulo, contenido } : n
      )
    );
  };

  const nuevaNota = () => {
    const id = Date.now();
    const nueva = { id, titulo: `Nota ${notas.length + 1}`, icono: "✨", contenido: "" };
    setNotas((prev) => [...prev, nueva]);
    seleccionarNota(nueva);
  };

  return (
    <main className="notasPage">
      {/* Blobs */}
      <div className="bgBlob bgBlob1" />
      <div className="bgBlob bgBlob2" />

      {/* ── TOPBAR ── */}
      <header className="glassBar">
        <div className="brandBox">
          <div className="logoCircle" />
          <div>
            <h1 className="brandTitle">ANSISOCIETY</h1>
            <p className="brandSubtitle">APOYO EMOCIONAL DIGITAL</p>
          </div>
        </div>
        <Link href="/">
          <button className="btnOutline">← Menú</button>
        </Link>
      </header>

      {/* ── PAGE HEADER ── */}
      <div className="notasPageHead">
        <p className="sectionLabel">✦ Tu espacio privado</p>
        <h2 className="notasTitle">Bloc de Notas</h2>
      </div>

      {/* ── WORKSPACE ── */}
      <div className="notasWorkspace">

        {/* SIDEBAR */}
        <aside className="notasSidebar">
          <p className="notasSideHead">Notas guardadas</p>

          {notas.map((nota) => (
            <button
              key={nota.id}
              className={`notaBtn${activaId === nota.id ? " active" : ""}`}
              onClick={() => seleccionarNota(nota)}
            >
              <span className="notaIcon">{nota.icono}</span>
              <span>{nota.titulo}</span>
            </button>
          ))}

          <button className="nuevaNotaBtn" onClick={nuevaNota}>
            + Nueva nota
          </button>
        </aside>

        {/* EDITOR */}
        <div className="notasEditor">
          {/* Cabecera del editor */}
          <div className="editorTop">
            <input
              className="notaTituloInput"
              type="text"
              placeholder="Título de la nota…"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <div className="editorAcciones">
              <button className="btnAnalizar">✦ Analizar</button>
              <button className="btnGuardar" onClick={guardarNota}>
                Guardar
              </button>
            </div>
          </div>

          {/* Toolbar de mood */}
          <div className="notasToolbar">
            <span className="moodLabel">Estado de ánimo:</span>
            {[
              { key: "bien",    emoji: "😊", label: "Bien"    },
              { key: "neutral", emoji: "😐", label: "Neutral" },
              { key: "dificil", emoji: "😔", label: "Difícil" },
            ].map((m) => (
              <button
                key={m.key}
                className={`moodPill${mood === m.key ? " on" : ""}`}
                onClick={() => setMood(m.key)}
              >
                {m.emoji} {m.label}
              </button>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            className="notasTextarea"
            placeholder="Escribe aquí tu nota… este es tu espacio privado."
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
          />

          {/* Footer del editor */}
          <div className="editorFoot">
            <span className="wordCount">{palabras} {palabras === 1 ? "palabra" : "palabras"}</span>
            <span className="dateBadge">{hoy}</span>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="glassFooter">
        <div>CONTACTO</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}