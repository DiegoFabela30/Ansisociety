import Link from "next/link";

export default function HomePage() {
  return (
    <main className="pageWrapper">
      <header className="topBar">
        <div className="brandBox">
          <div className="logoCircle" />
          <div>
            <h1 className="brandTitle">ANSISOCIETY</h1>
            <p className="brandSubtitle">APOYO EMOCIONAL DIGITAL</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/registro">
            <button className="topButton">Registrate</button>
          </Link>

          <Link href="/login">
            <button className="topButton">Iniciar Sesion</button>
          </Link>
        </div>
      </header>

      <section className="centerSection">
        <div className="animate-fade-in-up">
          <h2 className="font-serif text-center text-[2.6rem] md:text-[3.2rem] tracking-wide mb-4 text-balance leading-tight text-[var(--color-text-primary)]">
            Una sola app para <br className="hidden md:block" /> gestionar la ansiedad
          </h2>
          <p className="text-center text-[var(--color-text-muted)] text-lg mb-8 max-w-xl mx-auto">
            Encuentra paz interior con herramientas diseñadas para tu bienestar emocional
          </p>
        </div>

        <div className="animate-fade-in-up delay-200">
          <p className="font-serif text-center text-xl mb-4 tracking-wide text-[var(--color-text-secondary)]">
            Tips y consejos
          </p>

          <div className="bg-gradient-to-r from-[var(--color-card)] to-[var(--color-cyan-light)] max-w-3xl mx-auto mb-12 rounded-2xl p-6 text-center italic font-serif text-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <svg className="w-8 h-8 mx-auto mb-3 text-[var(--color-text-muted)] opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            Escribir como te sientes y que haces en ese momento te ayudara a
            identificarte mejor. Recuerda usar el bloc de notas de ANSISOCIETY
            para llevar un mejor seguimiento.
          </div>
        </div>

        <h3 className="font-serif text-center text-2xl tracking-wide mb-8 text-[var(--color-text-primary)] animate-fade-in delay-300">
          Recursos
        </h3>

        <div className="cardsGrid3">
          <Link href="/foro" className="no-underline text-inherit">
            <div className="cardBox group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg tracking-wide mb-3 font-semibold">
                FORO
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)]">
                Espacio moderado para compartir y recibir apoyo entre pares.
              </p>
            </div>
          </Link>

          <Link href="/notas" className="no-underline text-inherit">
            <div className="cardBox group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg tracking-wide mb-3 font-semibold">
                BLOC DE NOTAS
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)]">
                Registro de pensamientos y emociones mediante escritura.
              </p>
            </div>
          </Link>

          <Link href="/recursos" className="no-underline text-inherit">
            <div className="cardBox group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg tracking-wide mb-3 font-semibold">
                RECURSOS MULTIMEDIA
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)]">
                Musica, ejercicios de respiracion y videos para alivio inmediato.
              </p>
            </div>
          </Link>
        </div>

        <h3 className="font-serif text-center text-xl tracking-wide mb-6 text-[var(--color-text-primary)] animate-fade-in">
          Recursos rapidos
        </h3>

        <Link href="/recursos" className="block max-w-2xl mx-auto animate-fade-in-up delay-400">
          <div className="bg-gradient-to-r from-[var(--color-card)] to-[var(--color-cyan-light)] rounded-2xl p-5 flex justify-between items-center cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center animate-breathe">
                <svg className="w-6 h-6 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold mb-1 text-[var(--color-text-primary)]">RESPIRACION GUIADA</p>
                <p className="text-sm text-[var(--color-text-muted)]">Guia de respiracion de 2 minutos para reducir la ansiedad</p>
              </div>
            </div>

            <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
              <svg className="w-5 h-5 text-[var(--color-text-primary)] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </Link>
      </section>

      <footer className="contactBar">
        <div>CONTACTO:</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}
