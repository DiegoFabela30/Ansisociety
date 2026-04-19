"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/hooks/useAdmin";
import Link from "next/link";
import Header from "@/components/Header";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const { isAdmin, loadingAdmin } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!loadingAdmin && !isAdmin) {
      router.push("/");
    }
  }, [isAdmin, loadingAdmin, router]);

  if (loading || loadingAdmin) {
    return (
      <main className="adminPage">
        <div className="bgBlob bgBlob1" />
        <div className="bgBlob bgBlob2" />
        <Header variant="default" />
        <div style={{ textAlign: "center", padding: "40px", color: "#0d5c6e" }}>
          Cargando panel administrativo...
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <main className="adminPage">
      <div className="bgBlob bgBlob1" />
      <div className="bgBlob bgBlob2" />
      <div className="bgBlob bgBlob3" />

      <Header variant="default" />

      {/* ── HERO SECTION ── */}
      <section className="adminHero">
        <span className="badgeText">✦ Panel de administración</span>
        <h2 className="adminTitle">Dashboard Administrativo</h2>
        <p className="adminSubtitle">
          Gestiona usuarios, reportes y contenido de ANSISOCIETY
        </p>
      </section>

      {/* ── ADMIN CARDS ── */}
      <section className="adminCardsSection">
        <div className="adminCardsGrid">
          {/* Card: Usuarios */}
          <Link href="/admin/usuarios">
            <div className="adminCard">
              <div className="adminCardIcon">👥</div>
              <h3 className="adminCardTitle">Usuarios Registrados</h3>
              <p className="adminCardDescription">
                Visualiza y gestiona todos los usuarios registrados en el sistema
              </p>
              <button className="btnPrimary">Ver Usuarios →</button>
            </div>
          </Link>

          {/* Card: Reportes */}
          <Link href="/admin/reportes">
            <div className="adminCard">
              <div className="adminCardIcon">📊</div>
              <h3 className="adminCardTitle">Reportes GAD-7</h3>
              <p className="adminCardDescription">
                Genera reportes de los resultados de pruebas de ansiedad
              </p>
              <button className="btnPrimary">Ver Reportes →</button>
            </div>
          </Link>

          {/* Card: Foro */}
          <Link href="/admin/foro">
            <div className="adminCard">
              <div className="adminCardIcon">💬</div>
              <h3 className="adminCardTitle">Gestión del Foro</h3>
              <p className="adminCardDescription">
                Moderación y eliminación de publicaciones inapropiadas
              </p>
              <button className="btnPrimary">Ir al Foro →</button>
            </div>
          </Link>
        </div>
      </section>

      <footer className="glassFooter">
        <div>ANSISOCIETY - Panel Admin</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}
