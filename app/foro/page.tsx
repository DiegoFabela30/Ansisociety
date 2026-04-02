"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForoPage() {
  const [selectedTopic, setSelectedTopic] = useState("Ansiedad en clases");

  const topics = [
    "Ansiedad en clases",
    "Respiración",
    "Cómo me siento hoy",
    "Estrés por tareas",
    "Dormir mejor",
  ];

  const posts = [
    {
      user: "Mariana",
      tag: "Reflexión",
      time: "Hace 15 min",
      text: "Hoy me ayudó mucho escribir lo que sentía antes de entrar a clases. Me di cuenta de que mi ansiedad baja cuando organizo lo que pienso.",
    },
    {
      user: "Carlos",
      tag: "Consejo",
      time: "Hace 1 hora",
      text: "Los ejercicios de respiración de 4 segundos me ayudaron bastante antes de dormir. También dejé el celular 20 minutos antes.",
    },
    {
      user: "Fernanda",
      tag: "Apoyo",
      time: "Hace 2 horas",
      text: "Compartir aquí me hace sentir menos sola. A veces solo necesito saber que alguien más entiende lo que estoy pasando.",
    },
  ];

  return (
    <main className="foroPage">
      {/* blobs decorativos */}
      <div className="bgBlob bgBlob1" />
      <div className="bgBlob bgBlob2" />
      <div className="bgBlob bgBlob3" />

      {/* topbar */}
      <header className="glassBar">
        <div className="brandBox">
          <div className="logoCircle" />
          <div>
            <h1 className="brandTitle">ANSISOCIETY</h1>
            <p className="brandSubtitle">APOYO EMOCIONAL DIGITAL</p>
          </div>
        </div>

        <Link href="/" className="topButtonLink">
          <button className="btnOutline">Menú</button>
        </Link>
      </header>

      {/* encabezado */}
      <section className="foroHero">
        <span className="badgeText">✦ Espacio seguro para compartir</span>
        <h2 className="foroTitle">Foro interactivo</h2>
        <p className="foroSubtitle">
          Conecta con otras personas, comparte cómo te sientes y encuentra apoyo
          en una comunidad que escucha sin juzgar.
        </p>
      </section>

      {/* layout principal */}
      <section className="foroLayout">
        {/* sidebar */}
        <aside className="foroSidebar">
          <div className="foroSidebarHead">
            <p className="foroSidebarLabel">Temas recientes</p>
            <h3 className="foroSidebarTitle">Explora conversaciones</h3>
          </div>

          <div className="foroTopics">
            {topics.map((topic, index) => (
              <button
                key={topic}
                className={`foroTopicBtn ${
                  selectedTopic === topic ? "active" : ""
                }`}
                onClick={() => setSelectedTopic(topic)}
              >
                <span className="foroTopicIcon">
                  {index === 0
                    ? "💭"
                    : index === 1
                    ? "🌿"
                    : index === 2
                    ? "🫶"
                    : index === 3
                    ? "📚"
                    : "🌙"}
                </span>
                <span>{topic}</span>
              </button>
            ))}
          </div>

          <div className="foroSideCard">
            <p className="foroMiniLabel">Consejo del día</p>
            <p className="foroSideText">
              Escribir lo que sientes durante 5 minutos puede ayudarte a reducir
              la tensión emocional.
            </p>
          </div>
        </aside>

        {/* panel principal */}
        <div className="foroMain">
          {/* nueva publicación */}
          <div className="foroComposer">
            <div className="foroComposerTop">
              <div>
                <p className="foroMiniLabel">Nueva publicación</p>
                <h3 className="foroComposerTitle">Comparte con la comunidad</h3>
              </div>

              <button className="modernPrimaryButton foroPublishBtn">
                Publicar
              </button>
            </div>

            <div className="foroTopicPill">
              Tema actual: <span>{selectedTopic}</span>
            </div>

            <textarea
              className="foroTextareaModern"
              placeholder="Escribe aquí tu mensaje para la comunidad..."
            />

            <div className="foroComposerFoot">
              <span className="foroHint">
                Sé amable, auténtico y respetuoso con los demás.
              </span>
              <span className="foroCount">0 / 500</span>
            </div>
          </div>

          {/* publicaciones */}
          <div className="foroPostsWrap">
            <div className="foroPostsHead">
              <p className="foroMiniLabel">Conversaciones</p>
              <h3 className="foroComposerTitle">Publicaciones recientes</h3>
            </div>

            <div className="foroPostsList">
              {posts.map((post, index) => (
                <article
                  key={index}
                  className="foroPostCard"
                  style={{ animationDelay: `${0.1 + index * 0.12}s` }}
                >
                  <div className="foroPostTop">
                    <div className="foroUserBlock">
                      <div className="foroAvatar">{post.user.charAt(0)}</div>
                      <div>
                        <h4 className="foroAuthor">{post.user}</h4>
                        <p className="foroMeta">
                          {post.tag} • {post.time}
                        </p>
                      </div>
                    </div>

                    <button className="foroActionBtn">Responder</button>
                  </div>

                  <p className="foroPostText">{post.text}</p>

                  <div className="foroPostActions">
                    <button className="foroReactionBtn">💙 Me ayuda</button>
                    <button className="foroReactionBtn">💬 Comentar</button>
                    <button className="foroReactionBtn">🤍 Guardar</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="glassFooter">
        <div>ANSISOCIETY</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}