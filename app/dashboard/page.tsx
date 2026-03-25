"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({ email: currentUser.email });
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesion:", error);
    }
  };

  if (loading) {
    return (
      <main className="pageWrapper">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[var(--color-card)] border-t-[var(--color-accent)] rounded-full animate-spin"></div>
        </div>
      </main>
    );
  }

  const quickActions = [
    {
      title: "Bloc de Notas",
      description: "Escribe tus pensamientos",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      href: "/notas",
      color: "from-[var(--color-card)] to-[var(--color-cyan-light)]",
    },
    {
      title: "Foro",
      description: "Conecta con otros",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      href: "/foro",
      color: "from-[var(--color-surface)] to-[var(--color-card)]",
    },
    {
      title: "Recursos",
      description: "Musica y meditacion",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: "/recursos",
      color: "from-[var(--color-accent)]/30 to-[var(--color-card)]",
    },
    {
      title: "Test de Ansiedad",
      description: "Evalua como estas",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      href: "/test",
      color: "from-[#4ea6ff]/30 to-[var(--color-card)]",
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

        <div className="flex items-center gap-3">
          <Link href="/perfil">
            <button className="topButton">PERFIL</button>
          </Link>
          <button onClick={handleLogout} className="topButton !bg-white/80 hover:!bg-white">
            Salir
          </button>
        </div>
      </header>

      <section className="centerSection">
        <div className="animate-fade-in-up">
          <h2 className="font-serif text-center text-2xl md:text-3xl tracking-wide mb-2 text-[var(--color-text-primary)]">
            Bienvenido de vuelta
          </h2>
          <p className="text-center text-[var(--color-text-muted)] mb-10">
            {user?.email}
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-10 animate-fade-in-up delay-100">
          <div className="bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-card)] rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center animate-breathe">
                <svg className="w-6 h-6 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)]">Como te sientes hoy?</h3>
                <p className="text-sm text-[var(--color-text-muted)]">Toma un momento para reflexionar</p>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              {["Muy bien", "Bien", "Regular", "Mal", "Muy mal"].map((mood, index) => (
                <button
                  key={mood}
                  className="px-4 py-2 rounded-full bg-white/60 hover:bg-white text-sm font-medium text-[var(--color-text-secondary)] hover:scale-105 transition-all shadow-sm"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </div>

        <h3 className="font-serif text-center text-xl tracking-wide mb-6 text-[var(--color-text-primary)] animate-fade-in delay-200">
          Acciones rapidas
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {quickActions.map((action, index) => (
            <Link key={action.title} href={action.href} className="no-underline">
              <div 
                className={`bg-gradient-to-br ${action.color} rounded-xl p-5 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer animate-fade-in-up group`}
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {action.icon}
                </div>
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">{action.title}</h4>
                <p className="text-sm text-[var(--color-text-muted)]">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto animate-fade-in-up delay-500">
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="font-serif text-lg mb-4 text-[var(--color-text-primary)] text-center">Tu progreso esta semana</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[var(--color-accent-hover)]">5</p>
                <p className="text-xs text-[var(--color-text-muted)]">Notas escritas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-accent-hover)]">3</p>
                <p className="text-xs text-[var(--color-text-muted)]">Tests completados</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-accent-hover)]">12</p>
                <p className="text-xs text-[var(--color-text-muted)]">Min meditacion</p>
              </div>
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
