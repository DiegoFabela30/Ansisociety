"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/hooks/useAdmin";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, query } from "firebase/firestore";
import Header from "@/components/Header";
import Link from "next/link";
import Toast from "@/components/Toast";

type ForoPost = {
  id: string;
  title: string;
  text: string;
  category: string;
  authorName: string;
  authorUid: string;
  anonymous: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function AdminForoPage() {
  const { user, loading } = useAuth();
  const { isAdmin, loadingAdmin } = useAdmin();
  const router = useRouter();
  const [posts, setPosts] = useState<ForoPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
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

    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const postsQuery = query(collection(db, "foro"));
        const snapshot = await getDocs(postsQuery);
        const postsData: ForoPost[] = snapshot.docs.map((docItem) => {
          const data = docItem.data();
          return {
            id: docItem.id,
            title: (data.title as string) || "Publicación sin título",
            text: (data.text as string) || "",
            category: (data.category as string) || "",
            authorName: (data.authorName as string) || "Usuario",
            authorUid: (data.authorUid as string) || "",
            anonymous: (data.anonymous as boolean) || false,
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate().toLocaleDateString("es-MX")
              : "",
            updatedAt: data.updatedAt?.toDate
              ? data.updatedAt.toDate().toLocaleDateString("es-MX")
              : "",
          };
        });
        setPosts(postsData.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
      } catch (error) {
        console.error("Error al cargar posts:", error);
        setToast({ message: "Error al cargar publicaciones.", type: "error" });
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [user, isAdmin]);

  const handleDeletePost = async (postId: string) => {
    const confirmDelete = confirm("¿Estás seguro de que quieres eliminar esta publicación?");
    if (!confirmDelete) return;

    try {
      setDeletingId(postId);
      await deleteDoc(doc(db, "foro", postId));
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      setToast({ message: "Publicación eliminada correctamente", type: "success" });
    } catch (error) {
      console.error("Error al eliminar publicación:", error);
      setToast({ message: "Error al eliminar la publicación.", type: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.text.toLowerCase().includes(searchTerm.toLowerCase())
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

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}

      <Header variant="default" />

      <section className="adminHero">
        <span className="badgeText">✦ Panel de administración</span>
        <h2 className="adminTitle">Gestión del Foro</h2>
        <p className="adminSubtitle">
          Total de publicaciones: <strong>{posts.length}</strong>
        </p>
      </section>

      {/* Buscador */}
      <div className="adminSearchSection">
        <input
          type="text"
          className="adminSearchInput"
          placeholder="Buscar por título, autor o contenido..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabla de posts */}
      <section className="adminTableSection">
        {loadingPosts ? (
          <p style={{ textAlign: "center", color: "#0d5c6e", padding: "40px" }}>
            Cargando publicaciones...
          </p>
        ) : filteredPosts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#0d5c6e", padding: "40px" }}>
            No hay publicaciones que coincidan con la búsqueda.
          </p>
        ) : (
          <div className="tableWrapper">
            <table className="adminTable">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Autor</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <strong>{post.title}</strong>
                      <br />
                      <small style={{ color: "#999" }}>{post.text.substring(0, 50)}...</small>
                    </td>
                    <td>{post.category}</td>
                    <td>{post.anonymous ? "Usuario anónimo" : post.authorName}</td>
                    <td>{post.updatedAt}</td>
                    <td>
                      <button
                        className="btnDelete"
                        onClick={() => handleDeletePost(post.id)}
                        disabled={deletingId === post.id}
                      >
                        {deletingId === post.id ? "Eliminando..." : "🗑️ Eliminar"}
                      </button>
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
