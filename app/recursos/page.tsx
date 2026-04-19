"use client";

import { useState } from "react";
import Header from "@/components/Header";

type Filtro = "todos" | "audio" | "video" | "meditacion";

const audios = [
  {
    titulo: "Lluvia suave para dormir",
    desc: "Sonidos de naturaleza para relajar el sistema nervioso",
    duracion: "45 min",
    url: "#",
  },
  {
    titulo: "Bosque al amanecer",
    desc: "Pájaros y brisa matutina para iniciar el día con calma",
    duracion: "30 min",
    url: "#",
  },
  {
    titulo: "Olas del mar",
    desc: "Ritmo constante del océano para reducir la ansiedad",
    duracion: "60 min",
    url: "#",
  },
];

const videos = [
  {
    titulo: "Respiración 4-7-8",
    desc: "Técnica clínica para calmar la ansiedad en minutos",
    duracion: "8 min",
    tag: "Técnica",
    gradiente: "linear-gradient(135deg, #0d5c6e 0%, #4ea6ff 100%)",
    url: "#",
  },
  {
    titulo: "Relajación muscular progresiva",
    desc: "Libera tensión física acumulada paso a paso",
    duracion: "15 min",
    tag: "Ejercicio",
    gradiente: "linear-gradient(135deg, #2a8fa0 0%, #7ee8a0 100%)",
    url: "#",
  },
  {
    titulo: "Naturaleza en 4K — Paisajes calmantes",
    desc: "Videos de naturaleza para momentos de descanso visual",
    duracion: "20 min",
    tag: "Relajación",
    gradiente: "linear-gradient(135deg, #1a5060 0%, #5ee8d0 100%)",
    url: "#",
  },
];

const meditaciones = [
  {
    icono: "🧘",
    titulo: "Atención plena — Principiantes",
    desc: "Introducción al mindfulness para reducir pensamientos intrusivos",
    duracion: "10 min",
    progreso: 0,
    url: "#",
  },
  {
    icono: "🌬️",
    titulo: "Respiración consciente",
    desc: "Ancla tu atención en la respiración para salir del modo ansiedad",
    duracion: "7 min",
    progreso: 0,
    url: "#",
  },
  {
    icono: "🌙",
    titulo: "Meditación para dormir",
    desc: "Relaja cuerpo y mente antes de acostarte con esta guía nocturna",
    duracion: "20 min",
    progreso: 0,
    url: "#",
  },
  {
    icono: "💙",
    titulo: "Autocompasión guiada",
    desc: "Cultiva una relación más amable contigo mismo en momentos difíciles",
    duracion: "12 min",
    progreso: 0,
    url: "#",
  },
];

const filtros: { key: Filtro; emoji: string; label: string }[] = [
  { key: "todos",      emoji: "✨", label: "Todos"      },
  { key: "audio",      emoji: "🎵", label: "Audio"      },
  { key: "video",      emoji: "▶️",  label: "Video"      },
  { key: "meditacion", emoji: "🧘", label: "Meditación" },
];

export default function RecursosPage() {
  const [filtroActivo, setFiltroActivo] = useState<Filtro>("todos");

  const mostrarAudio      = filtroActivo === "todos" || filtroActivo === "audio";
  const mostrarVideo      = filtroActivo === "todos" || filtroActivo === "video";
  const mostrarMeditacion = filtroActivo === "todos" || filtroActivo === "meditacion";

  return (
    <main className="pageWrapper">
      <Header variant="default" />

      {/* ── HERO ── */}
      <section className="recursosHero">
        <span className="badgeText">✦ Cuida tu bienestar emocional</span>
        <h2 className="recursosTitle">Recursos de apoyo</h2>
        <p className="recursosSubtitle">
          Audios, videos y meditaciones guiadas seleccionadas para acompañarte
          en momentos difíciles y ayudarte a encontrar calma.
        </p>
      </section>

      {/* ── FILTROS ── */}
      <div className="recursosFiltros">
        {filtros.map((f) => (
          <button
            key={f.key}
            className={`recursosFiltroBtn${filtroActivo === f.key ? " active" : ""}`}
            onClick={() => setFiltroActivo(f.key)}
          >
            <span>{f.emoji}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* ── CONTENIDO ── */}
      <div className="recursosSection">
        <div className="cardsGrid2">

          {/* ── MÚSICA RELAJANTE ── */}
          {mostrarAudio && (
            <div className="resourceCard">
              <div className="recursosSectionHead">
                <h3 style={{ margin: 0 }}>🎵 Música relajante</h3>
                <span className="recursosSectionCount">{audios.length} pistas</span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#5d8792", fontWeight: 300, marginBottom: "18px", lineHeight: 1.6 }}>
                Sonidos de naturaleza y ambientes calmantes para reducir el estrés y la ansiedad.
              </p>
              {audios.map((audio) => (
                <div
                  key={audio.titulo}
                  className="audioCard"
                  onClick={() => window.open(audio.url, "_blank")}
                >
                  <div className="audioCardPlay">▶</div>
                  <div className="audioCardInfo">
                    <p className="audioCardTitle">{audio.titulo}</p>
                    <p className="audioCardDesc">{audio.desc}</p>
                  </div>
                  <span className="audioCardMeta">{audio.duracion}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── MEDITACIÓN GUIADA ── */}
          {mostrarMeditacion && (
            <div className="resourceCard">
              <div className="recursosSectionHead">
                <h3 style={{ margin: 0 }}>🧘 Meditación guiada</h3>
                <span className="recursosSectionCount">{meditaciones.length} sesiones</span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#5d8792", fontWeight: 300, marginBottom: "18px", lineHeight: 1.6 }}>
                Prácticas de mindfulness y relajación guiadas por especialistas en salud mental.
              </p>
              {meditaciones.map((med) => (
                <div
                  key={med.titulo}
                  className="meditacionPlayer"
                  onClick={() => window.open(med.url, "_blank")}
                >
                  <div className="meditacionPlayerTop">
                    <div className="meditacionPlayerIcon">{med.icono}</div>
                    <div className="meditacionPlayerInfo">
                      <p className="meditacionPlayerTitle">{med.titulo}</p>
                      <p className="meditacionPlayerDesc">{med.desc}</p>
                    </div>
                    <span className="meditacionPlayerDuration">{med.duracion}</span>
                  </div>
                  <div className="meditacionProgressBar">
                    <div
                      className="meditacionProgressFill"
                      style={{ width: `${med.progreso}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── EJERCICIOS DE RESPIRACIÓN ── */}
          {mostrarVideo && (
            <div className="resourceCard">
              <div className="recursosSectionHead">
                <h3 style={{ margin: 0 }}>▶️ Ejercicios en video</h3>
                <span className="recursosSectionCount">{videos.filter((_, i) => i < 2).length} videos</span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#5d8792", fontWeight: 300, marginBottom: "18px", lineHeight: 1.6 }}>
                Técnicas visuales de respiración y relajación con guía paso a paso.
              </p>
              {videos.slice(0, 2).map((video) => (
                <div
                  key={video.titulo}
                  className="videoCard"
                  style={{ background: video.gradiente }}
                  onClick={() => window.open(video.url, "_blank")}
                >
                  <span className="videoCardTag">{video.tag}</span>
                  <div className="videoCardOverlay">
                    <div className="videoCardBtn">▶</div>
                    <span className="videoCardLabel">{video.titulo}</span>
                  </div>
                  <span className="videoCardDuration">{video.duracion}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── VIDEOS RELAJANTES ── */}
          {mostrarVideo && (
            <div className="resourceCard">
              <div className="recursosSectionHead">
                <h3 style={{ margin: 0 }}>🎬 Videos relajantes</h3>
                <span className="recursosSectionCount">1 video</span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#5d8792", fontWeight: 300, marginBottom: "18px", lineHeight: 1.6 }}>
                Paisajes naturales y escenas tranquilas para un descanso visual profundo.
              </p>
              {videos.slice(2).map((video) => (
                <div
                  key={video.titulo}
                  className="videoCard"
                  style={{ background: video.gradiente, height: "220px" }}
                  onClick={() => window.open(video.url, "_blank")}
                >
                  <span className="videoCardTag">{video.tag}</span>
                  <div className="videoCardOverlay">
                    <div className="videoCardBtn">▶</div>
                    <span className="videoCardLabel">{video.titulo}</span>
                  </div>
                  <span className="videoCardDuration">{video.duracion}</span>
                </div>
              ))}

              {/* Hint de bienestar */}
              <div style={{
                marginTop: "18px",
                background: "rgba(94, 232, 208, 0.12)",
                border: "1px solid rgba(94, 232, 208, 0.3)",
                borderRadius: "14px",
                padding: "14px 16px",
              }}>
                <p style={{ fontSize: "0.78rem", color: "#1f5563", lineHeight: 1.6, fontWeight: 300 }}>
                  💡 <strong>Tip:</strong> Ver naturaleza en video durante 10 minutos puede reducir
                  el cortisol (hormona del estrés) de forma significativa.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <div className="recursosCta">
        <div className="recursosCtaInner">
          <p className="sectionLabel" style={{ marginBottom: "10px" }}>¿Necesitas más apoyo?</p>
          <h3 className="recursosCtaTitle">Combina los recursos con tu diario</h3>
          <p className="recursosCtaDesc">
            Después de cada sesión, escribe en tu diario emocional cómo te sentiste.
            Registrar el cambio te ayuda a identificar qué técnicas funcionan mejor para ti.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/notas" className="btnHeroPrimary" style={{ fontSize: "0.9rem", padding: "12px 28px" }}>
              Abrir mi diario →
            </a>
            <a href="/test_gad" className="btnHeroGhost" style={{ fontSize: "0.9rem", padding: "12px 28px" }}>
              Hacer el test GAD-7
            </a>
          </div>
        </div>
      </div>

      <footer className="glassFooter">
        <div>ANSISOCIETY</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}
