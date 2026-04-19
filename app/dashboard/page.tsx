"use client";

import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const tools = [
  {
    href: "/test_gad",
    emoji: "🧪",
    iconClass: "teal",
    title: "Test GAD-7",
    desc: "Evaluación clínica de ansiedad en menos de 2 minutos",
    tag: "Evaluación",
    tagColor: "#0d8fa0",
    hint: "Responde 7 preguntas y obtén tu nivel de ansiedad al instante",
    cta: "Comenzar test",
    time: "~2 min",
  },
  {
    href: "/notas",
    emoji: "📔",
    iconClass: "teal",
    title: "Diario Emocional",
    desc: "Registra cómo te sientes cada día y observa tu evolución",
    tag: "Diario",
    tagColor: "#2a8fa0",
    hint: "Escribe libremente o elige un estado de ánimo con un clic",
    cta: "Ir al diario",
    time: "Cuando quieras",
  },
  {
    href: "/foro",
    emoji: "💬",
    iconClass: "blue",
    title: "Foro Comunitario",
    desc: "Comparte experiencias con personas que entienden lo que sientes",
    tag: "Comunidad",
    tagColor: "#4ea6ff",
    hint: "Publica, comenta o simplemente lee — sin presiones",
    cta: "Ver foro",
    time: "Siempre activo",
  },
  {
    href: "/recursos",
    emoji: "📚",
    iconClass: "green",
    title: "Recursos",
    desc: "Audios guiados, videos y lecturas para tu bienestar",
    tag: "Contenido",
    tagColor: "#3dba7e",
    hint: "Filtra por tipo: meditación, respiración, psicoeducación y más",
    cta: "Explorar",
    time: "A tu ritmo",
  },
];

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user) setTimeout(() => setVisible(true), 80);
  }, [user, loading, router]);

  const firstName = user?.email?.split("@")[0] ?? "Usuario";

  if (loading) {
    return (
      <main className="pageWrapper">
        <Header variant="default" />
        <section className="centerSection">
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>⏳</div>
            <p style={{ color: "#2a6070" }}>Cargando tu espacio…</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pageWrapper">
      <Header variant="default" />

      {/* ── BANNER DE BIENVENIDA ── */}
      <div className={`dashWelcomeBanner ${visible ? "visible" : ""}`}>
        <div className="dashWelcomeInner">
          <div>
            <p className="dashWelcomeLabel">Tu espacio de bienestar</p>
            <h1 className="dashWelcomeTitle">¡Hola, {firstName}! 👋</h1>
            <p className="dashWelcomeSub">
              ¿Cómo te sientes hoy? Elige una herramienta para comenzar.
            </p>
          </div>
          <div className="dashStatBox">
            <div className="dashStatNum">4</div>
            <div className="dashStatLbl">Herramientas</div>
          </div>
        </div>
      </div>

      {/* ── GUÍA RÁPIDA ── */}
      <div className={`dashGuide ${visible ? "visible" : ""}`}>
        <div className="dashGuideInner">
          <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>💡</span>
          <p className="dashGuideText">
            <strong>¿Primera vez aquí?</strong> Te recomendamos empezar con el{" "}
            <Link href="/test_gad" className="dashGuideLink">
              Test GAD-7
            </Link>{" "}
            para conocer tu nivel de ansiedad actual. Solo toma 2 minutos.
          </p>
        </div>
      </div>

      {/* ── TARJETAS ── */}
      <section className="dashToolsSection">
        <p className="sectionLabel" style={{ textAlign: "left", marginBottom: "18px" }}>
          Tus herramientas
        </p>

        <div className="cardsGrid">
          {tools.map((tool, i) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="card"
              style={{
                animationDelay: `${0.05 + i * 0.1}s`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Tag + tiempo — igual al heroBadge pero compacto */}
              <div className="dashCardMeta">
                <span
                  className="dashCardTag"
                  style={{
                    color: tool.tagColor,
                    background: `${tool.tagColor}18`,
                    border: `1px solid ${tool.tagColor}35`,
                  }}
                >
                  {tool.tag}
                </span>
                <span className="dashCardTime">{tool.time}</span>
              </div>

              {/* Ícono + título — mismo patrón que howCard */}
              <div className="dashCardHeader">
                <div
                  className={`cardIcon ${tool.iconClass}`}
                  style={{ marginBottom: 0, flexShrink: 0 }}
                >
                  {tool.emoji}
                </div>
                <h3 className="cardTitle" style={{ marginBottom: 0 }}>
                  {tool.title}
                </h3>
              </div>

              {/* Descripción — igual a cardDesc */}
              <p className="cardDesc">{tool.desc}</p>

              {/* Hint de uso — mismo tono que gadBannerDesc */}
              <div className="dashCardHint">
                <p className="dashCardHintText">ℹ️ {tool.hint}</p>
              </div>

              {/* CTA — mismo patrón que howCta pero inline */}
              <div className="dashCardFooter">
                <span className="dashCardCta">{tool.cta}</span>
                <span className="dashCardArrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}