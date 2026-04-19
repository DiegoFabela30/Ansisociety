"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import Header from "@/components/Header";
import Link from "next/link";

interface UserData {
  nombre: string;
  apellidos: string;
  correo: string;
  genero: string;
  fechaNacimiento: string;
  createdAt: string;
}

interface TestResult {
  interpretacion?: string;
  puntuacion?: number;
  createdAt?: string;
}

interface ForoPost {
  id: string;
  title: string;
  category: string;
  createdAt?: string;
  createdAtRaw?: number;
}

export default function PerfilPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [latestTest, setLatestTest] = useState<TestResult | null>(null);
  const [userPosts, setUserPosts] = useState<ForoPost[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, "usuarios", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
          }

          const testsQuery = query(
            collection(db, "usuarios", user.uid, "tests"),
            orderBy("createdAt", "desc"),
            limit(1)
          );
          const testsSnapshot = await getDocs(testsQuery);
          if (!testsSnapshot.empty) {
            const testData = testsSnapshot.docs[0].data();
            setLatestTest({
              interpretacion: testData.interpretacion as string,
              puntuacion: testData.puntuacion as number,
              createdAt: testData.createdAt?.toDate ? testData.createdAt.toDate().toLocaleDateString("es-ES") : "",
            });
          }

          const postsQuery = query(
            collection(db, "foro"),
            where("authorUid", "==", user.uid)
          );
          const postsSnapshot = await getDocs(postsQuery);
          setUserPosts(
            postsSnapshot.docs
              .map((docItem) => {
                const data = docItem.data();
                return {
                  id: docItem.id,
                  title: (data.title as string) || "Publicación sin título",
                  category: (data.category as string) || "Sin tema",
                  createdAt: data.createdAt?.toDate
                    ? data.createdAt.toDate().toLocaleDateString("es-ES")
                    : "",
                  createdAtRaw: data.createdAt?.toDate ? data.createdAt.toDate().getTime() : 0,
                };
              })
              .sort((a, b) => (b.createdAtRaw || 0) - (a.createdAtRaw || 0))
          );
        } catch (error) {
          console.error("Error al cargar datos del usuario:", error);
        } finally {
          setLoadingData(false);
        }
      };

      fetchUserData();
    }
  }, [user, loading, router]);

  if (loading || loadingData) {
    return (
      <main className="pageWrapper">
        <Header variant="default" />
        <section className="centerSection">
          <div className="card">
            <p>Cargando perfil...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pageWrapper">
      <Header variant="default" />

      <section className="centerSection">
        <div className="card perfilCard">
          <div className="perfilHeader">
            <div className="perfilAvatar">👤</div>
            <div className="perfilInfo">
              <h1 className="perfilName">
                {userData?.nombre} {userData?.apellidos}
              </h1>
              <p className="perfilEmail">{userData?.correo}</p>
            </div>
          </div>

          <div className="perfilDetails">
            <div className="detailRow">
              <span className="detailLabel">Género:</span>
              <span className="detailValue">{userData?.genero}</span>
            </div>
            <div className="detailRow">
              <span className="detailLabel">Fecha de Nacimiento:</span>
              <span className="detailValue">{userData?.fechaNacimiento}</span>
            </div>
            <div className="detailRow">
              <span className="detailLabel">Miembro desde:</span>
              <span className="detailValue">
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString("es-ES")
                  : ""}
              </span>
            </div>
            <div className="detailRow">
              <span className="detailLabel">Nivel de ansiedad:</span>
              <span className="detailValue">
                {latestTest
                  ? `${latestTest.interpretacion || "Sin resultado"} (${latestTest.puntuacion ?? "-"}/21)`
                  : "Sin resultados de test aún"}
              </span>
            </div>
          </div>

          <div className="perfilPostsSection">
            <h2 className="perfilSectionTitle">Publicaciones en el foro</h2>
            {userPosts.length > 0 ? (
              <div className="perfilPostsList">
                {userPosts.map((post) => (
                  <div key={post.id} className="perfilPostCard">
                    <h3 className="perfilPostTitle">{post.title}</h3>
                    <p className="perfilPostMeta">{post.category} • {post.createdAt}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="perfilEmptyText">Aún no has publicado en el foro.</p>
            )}
          </div>

          <div className="perfilActions">
            <Link href="/">
              <button className="btnOutline">Volver al menú principal</button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
