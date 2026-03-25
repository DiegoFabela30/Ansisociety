"use client";

import { useState } from "react";
import Link from "next/link";

export default function NotasPage() {
  const [selectedNote, setSelectedNote] = useState(0);
  const [noteContent, setNoteContent] = useState("");

  const notes = [
    { id: 1, title: "Nota 1", date: "23 Mar 2026" },
    { id: 2, title: "Nota 2", date: "22 Mar 2026" },
    { id: 3, title: "Nota 3", date: "20 Mar 2026" },
  ];

  return (
    <main className="pageWrapper">
      <header className="topBar">
        <Link href="/" className="brandBox no-underline">
          <div className="logoCircle" />
          <div>
            <h1 className="brandTitle">ANSISOCIETY</h1>
            <p className="brandSubtitle">APOYO EMOCIONAL DIGITAL</p>
          </div>
        </Link>

        <Link href="/dashboard">
          <button className="topButton">MENU</button>
        </Link>
      </header>

      <section className="px-0 py-0 flex-1 flex flex-col">
        <h2 className="font-serif text-center text-2xl md:text-3xl tracking-wide my-6 text-[var(--color-text-primary)] animate-fade-in">
          Bloc de Notas
        </h2>

        <div className="twoCols flex-1">
          <aside className="sidebarPanel animate-slide-in">
            <h3 className="sidebarTitle">NOTAS GUARDADAS</h3>
            
            {notes.map((note, index) => (
              <button 
                key={note.id}
                className={`sideButton flex flex-col items-start text-left transition-all ${
                  selectedNote === index ? '!bg-gradient-to-r from-[var(--color-card)] to-[var(--color-cyan-light)] shadow-md' : ''
                }`}
                onClick={() => setSelectedNote(index)}
              >
                <span className="font-medium">{note.title}</span>
                <span className="text-xs text-[var(--color-text-muted)] mt-1">{note.date}</span>
              </button>
            ))}

            <button className="sideButton mt-4 flex items-center justify-center gap-2 !bg-[var(--color-accent)] hover:!bg-[var(--color-accent-hover)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nueva Nota
            </button>

            <div className="mt-8 pt-6 border-t border-[var(--color-card)]">
              <div className="bg-white/50 rounded-xl p-4 text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Escribir te ayuda a procesar tus emociones
                </p>
              </div>
            </div>
          </aside>

          <div className="mainPanel animate-fade-in flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <input 
                  type="text"
                  placeholder="Titulo de la nota"
                  className="text-lg font-semibold bg-transparent border-none outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                  defaultValue={notes[selectedNote]?.title}
                />
                <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-card)] px-2 py-1 rounded-full">
                  {notes[selectedNote]?.date}
                </span>
              </div>

              <div className="flex gap-2">
                <button className="primaryButton flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  GUARDAR
                </button>
              </div>
            </div>

            <textarea
              className="noteArea flex-1"
              placeholder="Escribe aqui lo que sientes, lo que piensas, o simplemente lo que paso hoy...

Este es tu espacio seguro para expresarte sin juicios. Algunas ideas para empezar:

- Como te sientes hoy del 1 al 10?
- Que situacion te genero ansiedad?
- Que pensamientos tuviste?
- Que hiciste para sentirte mejor?"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />

            <div className="flex justify-center mt-4 pb-4">
              <button className="primaryButton flex items-center gap-2 !bg-gradient-to-r from-[var(--color-accent)] to-[#4ea6ff] !text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                ANALIZAR CON IA
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="contactBar">
        <div>CONTACTO:</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}
