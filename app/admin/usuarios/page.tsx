"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/hooks/useAdmin";
import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import Header from "@/components/Header";
import Link from "next/link";

type Usuario = {
  uid: string;
  nombre: string;
  apellidos: string;
  correo: string;
  genero: string;
  fechaNacimiento: string;
  createdAt: string;
  rol: string;
};

export default function AdminUsuariosPage() {
  const { user, loading } = useAuth();
  const { isAdmin, loadingAdmin } = useAdmin();
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

    const fetchUsuarios = async () => {
      try {
        setLoadingUsuarios(true);
        const usuariosQuery = query(collection(db, "usuarios"));
        const snapshot = await getDocs(usuariosQuery);
        const usuariosData: Usuario[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            uid: doc.id,
            nombre: data.nombre || "",
            apellidos: data.apellidos || "",
            correo: data.correo || "",
            genero: data.genero || "",
            fechaNacimiento: data.fechaNacimiento || "",
            createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString("es-MX") : "",
            rol: data.rol || "usuario",
          };
        });
        setUsuarios(usuariosData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setLoadingUsuarios(false);
      }
    };

    fetchUsuarios();
  }, [user, isAdmin]);

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h2 className="adminTitle">Gestión de Usuarios</h2>
        <p className="adminSubtitle">
          Total de usuarios registrados: <strong>{usuarios.length}</strong>
        </p>
      </section>

      {/* Buscador */}
      <div className="adminSearchSection">
        <input
          type="text"
          className="adminSearchInput"
          placeholder="Buscar por nombre, apellido o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabla de usuarios */}
      <section className="adminTableSection">
        {loadingUsuarios ? (
          <p style={{ textAlign: "center", color: "#0d5c6e", padding: "40px" }}>
            Cargando usuarios...
          </p>
        ) : filteredUsuarios.length === 0 ? (
          <p style={{ textAlign: "center", color: "#0d5c6e", padding: "40px" }}>
            No hay usuarios que coincidan con la búsqueda.
          </p>
        ) : (
          <div className="tableWrapper">
            <table className="adminTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Género</th>
                  <th>Fecha de Registro</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.map((usuario) => (
                  <tr key={usuario.uid}>
                    <td>{usuario.nombre} {usuario.apellidos}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.genero}</td>
                    <td>{usuario.createdAt}</td>
                    <td>
                      <span className={`rolBadge ${usuario.rol}`}>
                        {usuario.rol === "admin" ? "👑 Admin" : "👤 Usuario"}
                      </span>
                    </td>
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
