import Link from "next/link";

export default function ForoPage() {
  const posts = [
    {
      author: "Maria G.",
      time: "Hace 2 horas",
      content: "Hoy me ayudo mucho escribir lo que sentia antes de contestar el test. Me siento mas tranquila.",
      likes: 12,
    },
    {
      author: "Carlos R.",
      time: "Hace 5 horas",
      content: "Los ejercicios de respiracion me ayudaron a bajar la tension antes de dormir. Los recomiendo!",
      likes: 8,
    },
    {
      author: "Ana L.",
      time: "Hace 1 dia",
      content: "Compartir aqui me hace sentir menos sola con lo que estoy pasando. Gracias por este espacio.",
      likes: 24,
    },
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
          Foro Interactivo
        </h2>

        <div className="twoCols flex-1">
          <aside className="sidebarPanel animate-slide-in">
            <h3 className="sidebarTitle">TEMAS RECIENTES</h3>
            
            <button className="sideButton flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
              Ansiedad en clases
            </button>
            <button className="sideButton flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
              Respiracion
            </button>
            <button className="sideButton flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
              Como me siento hoy
            </button>

            <div className="mt-8 pt-6 border-t border-[var(--color-card)]">
              <h3 className="sidebarTitle mb-4">ESTADISTICAS</h3>
              <div className="text-center text-sm text-[var(--color-text-muted)]">
                <p className="mb-2"><span className="font-bold text-[var(--color-text-primary)]">128</span> miembros activos</p>
                <p><span className="font-bold text-[var(--color-text-primary)]">45</span> publicaciones hoy</p>
              </div>
            </div>
          </aside>

          <div className="mainPanel animate-fade-in">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-lg text-[var(--color-text-primary)]">
                Nueva Publicacion
              </h3>
              <button className="primaryButton flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                PUBLICAR
              </button>
            </div>

            <textarea
              className="forumTextarea"
              placeholder="Comparte como te sientes hoy con la comunidad..."
            />

            <div className="space-y-4 mt-6">
              <h4 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                Publicaciones recientes
              </h4>
              
              {posts.map((post, index) => (
                <div 
                  key={index} 
                  className="forumPost animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-card)] to-[var(--color-cyan-light)] flex items-center justify-center font-semibold text-[var(--color-text-secondary)]">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <p className="forumAuthor !mb-0">{post.author}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">{post.time}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed mb-3">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                    <button className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-hover)] transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-hover)] transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Responder
                    </button>
                  </div>
                </div>
              ))}
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
