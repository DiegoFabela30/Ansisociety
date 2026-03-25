"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface UserData {
  nombre: string;
  apellidos: string;
  correo: string;
  genero: string;
  fechaNacimiento: string;
  rol: string;
}

export default function PerfilPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "usuarios", currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <main className="pageWrapper">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[var(--color-card)] border-t-[var(--color-accent)] rounded-full animate-spin"></div>
        </div>
      </main>
    );
  }

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

      <section className="centerSection">
        <div className="max-w-2xl mx-auto">
          <div className="animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-card)] to-[var(--color-cyan-light)] flex items-center justify-center shadow-lg animate-float">
                <span className="text-3xl font-bold text-[var(--color-text-secondary)]">
                  {userData?.nombre?.charAt(0) || "U"}
                </span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl tracking-wide text-[var(--color-text-primary)]">
                {userData?.nombre} {userData?.apellidos}
              </h2>
              <p className="text-[var(--color-text-muted)] mt-1">{userData?.correo}</p>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-fade-in-up delay-100">
            <h3 className="font-semibold text-lg mb-6 text-[var(--color-text-primary)] flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Informacion Personal
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">Nombre</label>
                <p className="mt-1 text-[var(--color-text-primary)]">{userData?.nombre || "-"}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">Apellidos</label>
                <p className="mt-1 text-[var(--color-text-primary)]">{userData?.apellidos || "-"}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">Genero</label>
                <p className="mt-1 text-[var(--color-text-primary)]">{userData?.genero || "-"}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">Fecha de Nacimiento</label>
                <p className="mt-1 text-[var(--color-text-primary)]">{userData?.fechaNacimiento || "-"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg mt-6 animate-fade-in-up delay-200">
            <h3 className="font-semibold text-lg mb-6 text-[var(--color-text-primary)] flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Estadisticas
            </h3>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gradient-to-br from-[var(--color-card)] to-[var(--color-cyan-light)] rounded-xl p-4">
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">12</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">Notas totales</p>
              </div>
              <div className="bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-card)] rounded-xl p-4">
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">8</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">Tests realizados</p>
              </div>
              <div className="bg-gradient-to-br from-[var(--color-accent)]/30 to-[var(--color-card)] rounded-xl p-4">
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">45</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">Min meditacion</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8 animate-fade-in-up delay-300">
            <button className="primaryButton flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar Perfil
            </button>
            <button className="primaryButton !bg-white/60 hover:!bg-white flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Configuracion
            </button>
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
