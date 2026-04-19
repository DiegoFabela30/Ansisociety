"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/hooks/useAdmin";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Header from "@/components/Header";
import Link from "next/link";
import * as XLSX from "xlsx";

type TestResult = {
  uid: string;
  nombre: string;
  apellidos: string;
  puntuacion: number;
  nivel: string;
  fecha: string;
};

export default function AdminReportesPage() {
  const { user, loading } = useAuth();
  const { isAdmin, loadingAdmin } = useAdmin();
  const router = useRouter();
  const [resultados, setResultados] = useState<TestResult[]>([]);
  const [loadingResultados, setLoadingResultados] = useState(true);
  const [estadisticas, setEstadisticas] = useState({
    totalTests: 0,
    promedioPuntuacion: 0,
    nivelMasComun: "",
    distribucion: { leve: 0, moderado: 0, moderadoGrave: 0, grave: 0 },
  });

  const exportToExcel = () => {
    if (!resultados.length) return;

    const exportData = resultados.map((resultado) => ({
      Usuario: `${resultado.nombre} ${resultado.apellidos}`,
      Puntuación: resultado.puntuacion,
      "Nivel de Ansiedad": resultado.nivel,
      Fecha: resultado.fecha,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reportes GAD-7");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `reportes-gad7-${new Date().toISOString().slice(0, 10)}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

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

  useEffect(() => {
    if (!user || !isAdmin) return;

    const fetchResultados = async () => {
      try {
        setLoadingResultados(true);
        const usuariosSnapshot = await getDocs(collection(db, "usuarios"));
        const allResults: TestResult[] = [];

        for (const usuarioDoc of usuariosSnapshot.docs) {
          const userData = usuarioDoc.data();
          const testsSnapshot = await getDocs(collection(db, "usuarios", usuarioDoc.id, "tests"));

          testsSnapshot.docs.forEach((testDoc) => {
            const testData = testDoc.data();
            const puntuacion = testData.puntuacion || 0;
            let nivel = "";

            if (puntuacion <= 4) nivel = "Ansiedad Leve";
            else if (puntuacion <= 9) nivel = "Ansiedad Moderada";
            else if (puntuacion <= 14) nivel = "Ansiedad Moderada-Grave";
            else nivel = "Ansiedad Grave";

            allResults.push({
              uid: usuarioDoc.id,
              nombre: userData.nombre || "",
              apellidos: userData.apellidos || "",
              puntuacion,
              nivel,
              fecha: testData.fecha
                ? new Date(testData.fecha).toLocaleDateString("es-MX")
                : new Date(testData.createdAt?.toDate ? testData.createdAt.toDate() : Date.now()).toLocaleDateString("es-MX"),
            });
          });
        }

        setResultados(allResults.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()));

        // Calcular estadísticas
        if (allResults.length > 0) {
          const promedio = allResults.reduce((acc, r) => acc + r.puntuacion, 0) / allResults.length;
          const distribucion = {
            leve: allResults.filter((r) => r.puntuacion <= 4).length,
            moderado: allResults.filter((r) => r.puntuacion > 4 && r.puntuacion <= 9).length,
            moderadoGrave: allResults.filter((r) => r.puntuacion > 9 && r.puntuacion <= 14).length,
            grave: allResults.filter((r) => r.puntuacion > 14).length,
          };

          const niveles = Object.entries(distribucion);
          const nivelMasComun = niveles.reduce((prev, current) =>
            prev[1] > current[1] ? prev : current
          )[0];

          setEstadisticas({
            totalTests: allResults.length,
            promedioPuntuacion: parseFloat(promedio.toFixed(2)),
            nivelMasComun: nivelMasComun === "leve" ? "Ansiedad Leve" : nivelMasComun === "moderado" ? "Ansiedad Moderada" : nivelMasComun === "moderadoGrave" ? "Ansiedad Moderada-Grave" : "Ansiedad Grave",
            distribucion,
          });
        }
      } catch (error) {
        console.error("Error al cargar resultados:", error);
      } finally {
        setLoadingResultados(false);
      }
    };

    fetchResultados();
  }, [user, isAdmin]);

  if (loading || loadingAdmin) {
    return (
      <main className="adminPage">
        <div className="bgBlob bgBlob1" />
        <div className="bgBlob bgBlob2" />
        <Header variant="default" />
        <div style={{ textAlign: "center", padding: "40px", color: "#0d5c6e" }}>
          Cargando...
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

      <Header variant="default" />

      <section className="adminHero">
        <span className="badgeText">✦ Panel de administración</span>
        <h2 className="adminTitle">Reportes GAD-7</h2>
        <p className="adminSubtitle">Análisis de resultados de pruebas de ansiedad</p>

        <div style={{ marginTop: "24px", display: "flex", justifyContent: "center", gap: "12px" }}>
          <button className="btnSolid" onClick={exportToExcel} disabled={!resultados.length}>
            Exportar a Excel
          </button>
        </div>
      </section>

      {/* Tarjetas de Estadísticas */}
      <section className="statsCardsSection">
        <div className="statCard">
          <h3 className="statLabel">Total de Tests</h3>
          <p className="statValue">{estadisticas.totalTests}</p>
        </div>
        <div className="statCard">
          <h3 className="statLabel">Puntuación Promedio</h3>
          <p className="statValue">{estadisticas.promedioPuntuacion}</p>
        </div>
        <div className="statCard">
          <h3 className="statLabel">Nivel Más Común</h3>
          <p className="statValue">{estadisticas.nivelMasComun}</p>
        </div>
      </section>

      {/* Distribución */}
      <section className="adminTableSection" style={{ marginTop: "40px" }}>
        <h3 style={{ color: "#0d5c6e", marginBottom: "20px" }}>Distribución de Niveles de Ansiedad</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          <div className="distributionCard">
            <p className="distLabel">🟢 Ansiedad Leve</p>
            <p className="distValue">{estadisticas.distribucion.leve}</p>
          </div>
          <div className="distributionCard">
            <p className="distLabel">🟡 Ansiedad Moderada</p>
            <p className="distValue">{estadisticas.distribucion.moderado}</p>
          </div>
          <div className="distributionCard">
            <p className="distLabel">🟠 Ansiedad Moderada-Grave</p>
            <p className="distValue">{estadisticas.distribucion.moderadoGrave}</p>
          </div>
          <div className="distributionCard">
            <p className="distLabel">🔴 Ansiedad Grave</p>
            <p className="distValue">{estadisticas.distribucion.grave}</p>
          </div>
        </div>
      </section>

      {/* Tabla de resultados detallados */}
      <section className="adminTableSection" style={{ marginTop: "40px" }}>
        <h3 style={{ color: "#0d5c6e", marginBottom: "20px" }}>Resultados Detallados</h3>
        {loadingResultados ? (
          <p style={{ textAlign: "center", color: "#0d5c6e", padding: "40px" }}>
            Cargando resultados...
          </p>
        ) : resultados.length === 0 ? (
          <p style={{ textAlign: "center", color: "#0d5c6e", padding: "40px" }}>
            No hay resultados de tests registrados.
          </p>
        ) : (
          <div className="tableWrapper">
            <table className="adminTable">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Puntuación</th>
                  <th>Nivel de Ansiedad</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {resultados.slice(0, 50).map((resultado, index) => (
                  <tr key={index}>
                    <td>{resultado.nombre} {resultado.apellidos}</td>
                    <td>{resultado.puntuacion}</td>
                    <td>{resultado.nivel}</td>
                    <td>{resultado.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div style={{ textAlign: "center", margin: "40px 0" }}>
        <Link href="/admin">
          <button className="btnOutline">← Volver al Panel</button>
        </Link>
      </div>

      <footer className="glassFooter">
        <div>ANSISOCIETY - Panel Admin</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}
