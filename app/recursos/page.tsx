import Link from "next/link";

export default function RecursosPage() {
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

        <Link href="/perfil">
          <button className="topButton">PERFIL</button>
        </Link>
      </header>

      <section className="centerSection">
        <h2 className="font-serif text-center text-2xl md:text-3xl tracking-wide mb-2 text-[var(--color-text-primary)] animate-fade-in">
          Recursos Multimedia
        </h2>
        <p className="text-center text-[var(--color-text-muted)] mb-10 animate-fade-in">
          Herramientas para tu bienestar emocional
        </p>

        <div className="cardsGrid2">
          <div className="resourceCard">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Musica Relajante</h3>
            </div>

            <div className="audioItem group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-card)] flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <div>
                  <strong>Sonidos de la naturaleza</strong>
                  <p>Bosque y lluvia suave - 10 min</p>
                </div>
              </div>
            </div>

            <div className="audioItem group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-card)] flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <div>
                  <strong>Piano tranquilo</strong>
                  <p>Melodias para calmar - 15 min</p>
                </div>
              </div>
            </div>
          </div>

          <div className="resourceCard">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center animate-breathe">
                <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Ejercicio de Respiracion</h3>
            </div>

            <div className="videoMock group relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform animate-breathe">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-sm opacity-80">Tecnica 4-7-8</p>
              </div>
            </div>
          </div>

          <div className="resourceCard">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Meditacion Guiada</h3>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">Meditacion para principiantes</span>
                <span className="text-xs text-[var(--color-text-muted)]">5 min</span>
              </div>
              <div className="h-2 bg-[var(--color-card)] rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-[var(--color-accent)] to-[#4ea6ff] rounded-full"></div>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <button className="w-8 h-8 rounded-full bg-[var(--color-card)] flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 20L9 12l10-8v16z"/>
                  </svg>
                </button>
                <button className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-[var(--color-card)] flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 4l10 8-10 8V4z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="resourceCard">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Videos Relajantes</h3>
            </div>

            <div className="videoMock group relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-sm opacity-80">Paisajes naturales</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-2xl mx-auto animate-fade-in-up delay-500">
          <div className="bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-card)] rounded-2xl p-6 text-center shadow-lg">
            <h3 className="font-serif text-xl mb-2 text-[var(--color-text-primary)]">Consejo del dia</h3>
            <p className="text-[var(--color-text-secondary)] italic">
              &ldquo;Dedica al menos 5 minutos al dia a respirar conscientemente. 
              Tu cuerpo y mente te lo agradeceran.&rdquo;
            </p>
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
