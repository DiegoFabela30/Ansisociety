"use client";

import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="pageWrapper">
        <Header variant="default" />
        <section className="centerSection">
          <div className="card">
            <p>Cargando dashboard...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pageWrapper">
      <Header variant="default" />

      <section className="centerSection">
        <div className="card">
          <h1 className="perfilName">¡Bienvenido!</h1>
          <p className="perfilEmail" style={{ marginBottom: "24px" }}>
            {user?.email}
          </p>

          <div className="cardsGrid" style={{ marginTop: "32px" }}>
            <Link href="/test_gad" className="card">
              <div className="cardIcon teal">🧪</div>
              <h3 className="cardTitle">Test GAD-7</h3>
              <p className="cardDesc">
                Realiza la evaluación de ansiedad GAD-7
              </p>
              <span className="cardArrow">Ir →</span>
            </Link>

            <Link href="/notas" className="card">
              <div className="cardIcon teal">📔</div>
              <h3 className="cardTitle">Diario Emocional</h3>
              <p className="cardDesc">Registra cómo te sientes día a día</p>
              <span className="cardArrow">Ir →</span>
            </Link>

            <Link href="/foro" className="card">
              <div className="cardIcon blue">💬</div>
              <h3 className="cardTitle">Foro Comunitario</h3>
              <p className="cardDesc">Comparte con otros miembros</p>
              <span className="cardArrow">Ir →</span>
            </Link>

            <Link href="/recursos" className="card">
              <div className="cardIcon green">📚</div>
              <h3 className="cardTitle">Recursos</h3>
              <p className="cardDesc">Audios, videos y más</p>
              <span className="cardArrow">Ir →</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
