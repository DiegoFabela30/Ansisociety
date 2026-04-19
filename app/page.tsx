"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Header from "@/components/Header";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      const orbs = heroRef.current.querySelectorAll<HTMLElement>(".orb");
      orbs.forEach((orb, i) => {
        orb.style.transform = `translateY(${y * (0.08 + i * 0.04)}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="homeWrapper">
      <Header variant="home" />

      {/* ── HERO PRINCIPAL ── */}
      <section className="hero" ref={heroRef}>
        <div className="heroBg">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="orb orb3" />
        </div>
        <div className="heroContent">
          <span className="heroBadge">✦ Comunidad de bienestar mental</span>
          <h2 className="heroTitle">
            No estás<br />
            <span className="heroAccent">solo en esto</span>
          </h2>
          <p className="heroDesc">
            Un espacio seguro para compartir, escuchar y crecer.<br />
            Herramientas digitales para tu bienestar emocional.
          </p>

          {/* Paso a paso visual */}
          <div className="heroSteps">
            <div className="heroStep">
              <span className="heroStepNum">1</span>
              <span className="heroStepText">Haz el test GAD-7</span>
            </div>
            <div className="heroStepDivider">→</div>
            <div className="heroStep">
              <span className="heroStepNum">2</span>
              <span className="heroStepText">Crea tu cuenta</span>
            </div>
            <div className="heroStepDivider">→</div>
            <div className="heroStep">
              <span className="heroStepNum">3</span>
              <span className="heroStepText">Explora recursos</span>
            </div>
          </div>

          <div className="heroActions">
            <Link href="/registro">
              <button className="btnHeroPrimary">
                Comenzar ahora — es gratis
              </button>
            </Link>
            <Link href="/test_gad">
              <button className="btnHeroGhost">
                Hacer el test GAD-7 →
              </button>
            </Link>
          </div>

          <p className="heroTrustNote">
            🔒 Tu información es privada y confidencial
          </p>
        </div>
        <div className="scrollHint">
          <span>Explorar</span>
          <div className="scrollArrow" />
        </div>
      </section>

      {/* ── BANNER TEST GAD ── */}
      <section className="gadBanner">
        <div className="gadBannerInner">
          <div className="gadBannerLeft">
            <span className="gadBannerIcon">🧪</span>
            <div>
              <p className="gadBannerTitle">¿No sabes si tienes ansiedad?</p>
              <p className="gadBannerDesc">
                El test GAD-7 tarda solo <strong>2 minutos</strong> y te da una evaluación clínica inicial gratuita.
              </p>
            </div>
          </div>
          <Link href="/test_gad">
            <button className="gadBannerBtn">Hacer el test gratis →</button>
          </Link>
        </div>
      </section>

      {/* ── STATS BAND ── 
      <div className="statsBand">
        <div className="statsInner">
          {[
            { num: "2,400+", label: "Usuarios activos" },
            { num: "98%",    label: "Satisfacción" },
            { num: "24/7",   label: "Soporte disponible" },
            { num: "350+",   label: "Recursos de apoyo" },
          ].map((s) => (
            <div key={s.label} className="statItem">
              <div className="statNumber">{s.num}</div>
              <div className="statLabel">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      */}

      {/* ── ¿CÓMO FUNCIONA? ── */}
      <section className="howSection">
        <p className="sectionLabel">¿Cómo funciona?</p>
        <h2 className="sectionTitle">Tres pasos para empezar</h2>
        <div className="howGrid">
          {[
            {
              step: "01",
              icon: "📋",
              title: "Evalúa tu ansiedad",
              desc: "Responde el test GAD-7 validado clínicamente. En 2 minutos sabrás tu nivel actual de ansiedad.",
              cta: "Hacer el test",
              href: "/test_gad",
            },
            {
              step: "02",
              icon: "✍️",
              title: "Registra tus emociones",
              desc: "Usa el diario emocional para escribir cómo te sientes. Identificar patrones es el primer paso para mejorar.",
              cta: "Ir al diario",
              href: "/notas",
            },
            {
              step: "03",
              icon: "🤝",
              title: "Conéctate con la comunidad",
              desc: "Comparte en el foro con personas que entienden lo que vives. No tienes que enfrentarlo solo.",
              cta: "Ver el foro",
              href: "/foro",
            },
          ].map((item) => (
            <div key={item.step} className="howCard">
              <div className="howStepBadge">{item.step}</div>
              <div className="howIcon">{item.icon}</div>
              <h3 className="howTitle">{item.title}</h3>
              <p className="howDesc">{item.desc}</p>
              <Link href={item.href}>
                <button className="howCta">{item.cta} →</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CARDS DE SECCIONES ── */}
      <section className="cardsSection">
        <p className="sectionLabel">¿Qué encontrarás aquí?</p>
        <h2 className="sectionTitle">
          Todo lo que necesitas<br />en un solo lugar
        </h2>
        <div className="cardsGrid">
          {[
            {
              icon: "🧘",
              color: "teal",
              title: "Diario Emocional",
              desc: "Registra cómo te sientes día a día. Identifica patrones y cuida tu salud mental con reflexiones guiadas.",
              cta: "Abrir mi diario",
              href: "/notas",
            },
            {
              icon: "💬",
              color: "blue",
              title: "Foro Comunitario",
              desc: "Comparte tus experiencias con personas que entienden. Un espacio de escucha sin juicios, con apoyo real.",
              cta: "Unirme al foro",
              href: "/foro",
            },
            {
              icon: "📚",
              color: "green",
              title: "Recursos de Apoyo",
              desc: "Audios, videos y lecturas seleccionadas por especialistas para acompañarte en tu proceso de bienestar.",
              cta: "Ver recursos",
              href: "/recursos",
            },
          ].map((card) => (
            <Link href={card.href} key={card.title} className="card">
              <div className={`cardIcon ${card.color}`}>{card.icon}</div>
              <h3 className="cardTitle">{card.title}</h3>
              <p className="cardDesc">{card.desc}</p>
              <span className="cardArrow">{card.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIAL ── 
      <section className="testimonialSection">
        <p className="sectionLabel">Testimonios</p>
        <h2 className="sectionTitle">Lo que dice nuestra comunidad</h2>
        <div className="testimonialCard">
          <span className="quoteMark">&ldquo;</span>
          <p className="testimonialText">
            Ansisociety me dio las herramientas para entender mis emociones y conectar
            con personas que realmente me escuchan. Es el espacio que siempre necesité
            pero no sabía que existía.
          </p>
          <div className="testimonialAuthor">— Mariana G., usuaria desde 2024</div>
        </div>
      </section>
      */}

      {/* ── CTA FINAL ── */}
      <section className="ctaFinal">
        <div className="ctaFinalInner">
          <h2 className="ctaFinalTitle">¿Listo para empezar?</h2>
          <p className="ctaFinalDesc">
            Únete a las personas que ya cuidan su bienestar emocional con Ansisociety.
          </p>
          <div className="ctaFinalActions">
            <Link href="/registro">
              <button className="btnHeroPrimary">Crear mi cuenta gratis</button>
            </Link>
            <Link href="/login">
              <button className="btnHeroGhost">Ya tengo cuenta →</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footerBrand">ANSISOCIETY</div>
        <div className="footerContact">soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}