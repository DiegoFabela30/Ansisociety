"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Header from "@/components/Header";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax suave en los orbs del hero
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
      {/* ── TOPBAR ── */}
      <Header variant="home" />
      

      <section className="hero" ref={heroRef}>
  <div className="heroBg">
    <div className="orb orb1" />
    <div className="orb orb2" />
    <div className="orb orb3" />
  </div>

  <div className="heroContent">
    <span className="heroBadge">✦ Evaluación emocional</span>

    <h2 className="heroTitle">
      ¿Tienes ansiedad?<br />
      <span className="heroAccent">Descúbrelo ahora</span>
    </h2>

    <p className="heroDesc">
      Realiza el test GAD-7 para determinar tu nivel de ansiedad.
    </p>

    <div className="heroActions">
      <Link href="/test_gad">
        <button className="btnHeroPrimary">
          Realizar test GAD-7
        </button>
      </Link>

      <button className="btnHeroGhost">
        Conocer más
      </button>
    </div>
  </div>
</section>


     
     {/* ── SECCIÓN TEST GAD ── 
     
     <section className="gadPromoSection">
        <div className="gadPromoCard">
          <div className="gadPromoText">
            <span className="gadPromoBadge">✦ Evaluación emocional</span>
            <h2 className="gadPromoTitle">
              ¿Quieres saber si tienes ansiedad?
            </h2>
            <p className="gadPromoDesc">
              Antes de usar Ancisociety te recomendamos realizar el test para averiguar tu nivel de ansiedad.
            </p>
          </div>

          <div className="gadPromoAction">
            <Link href="/test_gad">
              <button className="gadPromoButton">Realizar test GAD-7</button>
            </Link>
          </div>
        </div>
      </section> 
     */}
      
      
      

      {/* ── HERO ── */}
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
          <div className="heroActions">
            <Link href="/registro">
              <button className="btnHeroPrimary">Comenzar ahora</button>
            </Link>
            <button className="btnHeroGhost">Conocer más</button>
          </div>
        </div>
        <div className="scrollHint">
          <span>Explorar</span>
          <div className="scrollArrow" />
        </div>
      </section>

      

      {/* ── STATS BAND ── */}
      <div className="statsBand">
        <div className="statsInner">
          {[
            { num: "2,400+", label: "Usuarios activos" },
            { num: "98%", label: "Satisfacción" },
            { num: "24/7", label: "Soporte disponible" },
            { num: "350+", label: "Recursos de apoyo" },
          ].map((s) => (
            <div key={s.label} className="statItem">
              <div className="statNumber">{s.num}</div>
              <div className="statLabel">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CARDS ── */}
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
              href: "/notas",
            },
            {
              icon: "💬",
              color: "blue",
              title: "Foro Comunitario",
              desc: "Comparte tus experiencias con personas que entienden. Un espacio de escucha sin juicios, con apoyo real.",
              href: "/foro",
            },
            {
              icon: "📚",
              color: "green",
              title: "Recursos de Apoyo",
              desc: "Audios, videos y lecturas seleccionadas por especialistas para acompañarte en tu proceso de bienestar.",
              href: "/recursos",
            },
          ].map((card) => (
            <Link href={card.href} key={card.title} className="card">
              <div className={`cardIcon ${card.color}`}>{card.icon}</div>
              <h3 className="cardTitle">{card.title}</h3>
              <p className="cardDesc">{card.desc}</p>
              <span className="cardArrow">Explorar →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
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

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footerBrand">ANSISOCIETY</div>
        <div className="footerContact">soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}