"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  increment,
} from "firebase/firestore";
import Toast from "@/components/Toast";

type ForoPost = {
  id: string;
  title: string;
  text: string;
  category: string;
  authorUid: string;
  authorName: string;
  anonymous?: boolean;
  likes?: number;
  createdAt?: string;
  updatedAt?: string;
  updatedAtRaw?: number;
  commentCount?: number;
};

type ForoComment = {
  id: string;
  authorUid: string;
  authorName: string;
  text: string;
  createdAt?: string;
};

const categories = [
  "Escuela",
  "Trabajo",
  "Ansiedad social",
  "Salud",
  "Desahogo",
  "Técnicas",
];

const categoryIcons: Record<string, string> = {
  Escuela: "🏫",
  Trabajo: "💼",
  "Ansiedad social": "👥",
  Salud: "🏥",
  Desahogo: "💬",
  Técnicas: "🧘",
};

export default function ForoPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState(categories[0]);
  const [posts, setPosts] = useState<ForoPost[]>([]);
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [savingPost, setSavingPost] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentsByPost, setCommentsByPost] = useState<Record<string, ForoComment[]>>({});
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [editingCommentId, setEditingCommentId] = useState<Record<string, string | null>>({});
  const [commentEditText, setCommentEditText] = useState<Record<string, string>>({});
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const postsQuery = query(
          collection(db, "foro"),
          where("category", "==", selectedTopic)
        );
        const snapshot = await getDocs(postsQuery);
        const loadedPosts: ForoPost[] = snapshot.docs
          .map((docItem) => {
            const data = docItem.data();
            return {
              id: docItem.id,
              title: (data.title as string) || "Publicación sin título",
              text: (data.text as string) || "",
              category: (data.category as string) || selectedTopic,
              authorUid: data.authorUid as string,
              authorName: (data.authorName as string) || "Usuario",
              anonymous: (data.anonymous as boolean) || false,
              likes: (data.likes as number) || 0,
              createdAt: data.createdAt?.toDate
                ? data.createdAt.toDate().toLocaleDateString("es-MX")
                : "",
              updatedAt: data.updatedAt?.toDate
                ? data.updatedAt.toDate().toLocaleDateString("es-MX")
                : "",
              updatedAtRaw: data.updatedAt?.toDate ? data.updatedAt.toDate().getTime() : 0,
              commentCount: (data.commentCount as number) || 0,
            };
          })
          .sort((a, b) => (b.updatedAtRaw || 0) - (a.updatedAtRaw || 0));

        setPosts(loadedPosts);

        const counts: Record<string, number> = {};
        categories.forEach((cat) => (counts[cat] = 0));
        const allSnapshot = await getDocs(query(collection(db, "foro")));
        allSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          const cat = data.category as string;
          if (cat && counts[cat] !== undefined) counts[cat]++;
        });
        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error al cargar publicaciones:", error);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, [user, selectedTopic]);

  const resetComposer = () => {
    setPostTitle("");
    setPostText("");
    setIsAnonymous(false);
    setEditingPostId(null);
  };

  const handlePublish = async () => {
    if (!user) {
      setToast({ message: "Debes iniciar sesión para publicar.", type: "error" });
      return;
    }
    if (!postTitle.trim() || !postText.trim()) {
      setToast({ message: "Escribe un título y un mensaje para publicar.", type: "error" });
      return;
    }
    try {
      setSavingPost(true);
      if (editingPostId) {
        await updateDoc(doc(db, "foro", editingPostId), {
          title: postTitle.trim(),
          text: postText.trim(),
          category: selectedTopic,
          anonymous: isAnonymous,
          updatedAt: serverTimestamp(),
        });
        setPosts((prev) =>
          prev.map((post) =>
            post.id === editingPostId
              ? { ...post, title: postTitle.trim(), text: postText.trim(), category: selectedTopic, anonymous: isAnonymous, updatedAt: new Date().toLocaleDateString("es-MX") }
              : post
          )
        );
        resetComposer();
        setToast({ message: "Publicación actualizada correctamente.", type: "success" });
        return;
      }
      const postRef = await addDoc(collection(db, "foro"), {
        title: postTitle.trim(),
        text: postText.trim(),
        category: selectedTopic,
        authorUid: user.uid,
        authorName: userData ? `${userData.nombre} ${userData.apellidos}` : "Usuario",
        anonymous: isAnonymous,
        likes: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        commentCount: 0,
      });
      setPosts((prev) => [
        {
          id: postRef.id,
          title: postTitle.trim(),
          text: postText.trim(),
          category: selectedTopic,
          authorUid: user.uid,
          authorName: userData ? `${userData.nombre} ${userData.apellidos}` : "Usuario",
          anonymous: isAnonymous,
          likes: 0,
          createdAt: new Date().toLocaleDateString("es-MX"),
          updatedAt: new Date().toLocaleDateString("es-MX"),
          commentCount: 0,
        },
        ...prev,
      ]);
      resetComposer();
      setToast({ message: "¡Publicación creada! La comunidad puede verla ahora.", type: "success" });
    } catch (error) {
      console.error(error);
      setToast({ message: "No se pudo publicar. Intenta de nuevo.", type: "error" });
    } finally {
      setSavingPost(false);
    }
  };

  const handleEdit = (post: ForoPost) => {
    setEditingPostId(post.id);
    setPostTitle(post.title);
    setPostText(post.text);
    setSelectedTopic(post.category);
    setIsAnonymous(!!post.anonymous);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (post: ForoPost) => {
    if (!user || user.uid !== post.authorUid) return;
    const confirmDelete = confirm("¿Estás seguro de que quieres eliminar esta publicación?");
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, "foro", post.id));
      setPosts((prev) => prev.filter((item) => item.id !== post.id));
      if (editingPostId === post.id) resetComposer();
      setToast({ message: "Publicación eliminada.", type: "info" });
    } catch (error) {
      console.error(error);
      setToast({ message: "No se pudo eliminar la publicación.", type: "error" });
    }
  };

  const handleLike = async (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
      )
    );
    try {
      await updateDoc(doc(db, "foro", postId), { likes: increment(1) });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      const snapshot = await getDocs(
        query(collection(db, "foro", postId, "comments"), orderBy("createdAt", "asc"))
      );
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: snapshot.docs.map((docItem) => {
          const data = docItem.data();
          return {
            id: docItem.id,
            authorUid: data.authorUid as string,
            authorName: (data.authorName as string) || "Usuario",
            text: (data.text as string) || "",
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
              : "",
          };
        }),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComments = async (postId: string) => {
    const nextOpen = !openComments[postId];
    setOpenComments((prev) => ({ ...prev, [postId]: nextOpen }));
    if (nextOpen && !commentsByPost[postId]) await fetchComments(postId);
  };

  const startCommentEdit = (commentId: string, text: string) => {
    setEditingCommentId((prev) => ({ ...prev, [commentId]: commentId }));
    setCommentEditText((prev) => ({ ...prev, [commentId]: text }));
  };

  const cancelCommentEdit = (commentId: string) => {
    setEditingCommentId((prev) => ({ ...prev, [commentId]: null }));
    setCommentEditText((prev) => { const c = { ...prev }; delete c[commentId]; return c; });
  };

  const handleCommentSave = async (postId: string, commentId: string) => {
    if (!user) return;
    const updatedText = commentEditText[commentId]?.trim();
    if (!updatedText) { setToast({ message: "El comentario no puede estar vacío.", type: "error" }); return; }
    try {
      await updateDoc(doc(db, "foro", postId, "comments", commentId), { text: updatedText });
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: prev[postId]?.map((c) => c.id === commentId ? { ...c, text: updatedText } : c) || [],
      }));
      cancelCommentEdit(commentId);
      setToast({ message: "Comentario guardado.", type: "success" });
    } catch (error) {
      console.error(error);
      setToast({ message: "No se pudo guardar el comentario.", type: "error" });
    }
  };

  const handleCommentDelete = async (postId: string, commentId: string) => {
    if (!user) return;
    if (!confirm("¿Eliminar este comentario?")) return;
    try {
      await deleteDoc(doc(db, "foro", postId, "comments", commentId));
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: prev[postId]?.filter((c) => c.id !== commentId) || [],
      }));
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, commentCount: Math.max((p.commentCount || 1) - 1, 0) } : p
        )
      );
      await updateDoc(doc(db, "foro", postId), { commentCount: increment(-1) });
      setToast({ message: "Comentario eliminado.", type: "info" });
    } catch (error) {
      console.error(error);
      setToast({ message: "No se pudo eliminar el comentario.", type: "error" });
    }
  };

  const handleCommentSubmit = async (postId: string) => {
    if (!user) { setToast({ message: "Debes iniciar sesión para comentar.", type: "error" }); return; }
    const text = commentText[postId]?.trim();
    if (!text) { setToast({ message: "Escribe algo antes de comentar.", type: "error" }); return; }
    try {
      const commentRef = await addDoc(collection(db, "foro", postId, "comments"), {
        authorUid: user.uid,
        authorName: userData ? `${userData.nombre} ${userData.apellidos}` : "Usuario",
        text,
        createdAt: serverTimestamp(),
      });
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: [
          ...(prev[postId] || []),
          {
            id: commentRef.id,
            authorUid: user.uid,
            authorName: userData ? `${userData.nombre} ${userData.apellidos}` : "Usuario",
            text,
            createdAt: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      }));
      await updateDoc(doc(db, "foro", postId), { commentCount: increment(1) });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, commentCount: (p.commentCount || 0) + 1 } : p
        )
      );
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      setToast({ message: "Comentario publicado.", type: "success" });
    } catch (error) {
      console.error(error);
      setToast({ message: "No se pudo enviar el comentario.", type: "error" });
    }
  };

  if (loading || loadingPosts) {
    return (
      <main className="foroPage">
        <div className="bgBlob bgBlob1" />
        <div className="bgBlob bgBlob2" />
        <div className="bgBlob bgBlob3" />
        <Header variant="default" />
        <section className="foroHero">
          <span className="badgeText">Cargando foro…</span>
        </section>
      </main>
    );
  }

  const charPercent = Math.min((postText.length / 800) * 100, 100);
  const charDanger = postText.length > 700;

  return (
    <main className="foroPage">
      <div className="bgBlob bgBlob1" />
      <div className="bgBlob bgBlob2" />
      <div className="bgBlob bgBlob3" />

      <Header variant="default" />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}

      {/* ── HERO ── */}
      <section className="foroHero">
        <span className="badgeText">✦ Espacio seguro para compartir</span>
        <h2 className="foroTitle">Foro comunitario</h2>
        <p className="foroSubtitle">
          Conecta con otras personas, comparte cómo te sientes y encuentra apoyo
          en una comunidad que escucha sin juzgar.
        </p>
      </section>

      <section className="foroLayout">

        {/* ── SIDEBAR ── */}
        <aside className="foroSidebar">
          <div className="foroSidebarHead">
            <p className="foroMiniLabel">Temas disponibles</p>
            <h3 className="foroSidebarTitle">Explora conversaciones</h3>
          </div>

          {/* Categorías ordenadas por actividad */}
          <div className="foroTopics">
            {[...categories]
              .sort((a, b) => (categoryCounts[b] || 0) - (categoryCounts[a] || 0))
              .map((category) => (
                <button
                  key={category}
                  className={`foroTopicBtn ${selectedTopic === category ? "active" : ""}`}
                  onClick={() => setSelectedTopic(category)}
                >
                  <span className="foroTopicIcon">{categoryIcons[category]}</span>
                  <span>
                    {category}
                    <span style={{ opacity: 0.55, fontSize: "0.78rem", marginLeft: "4px" }}>
                      ({categoryCounts[category] || 0})
                    </span>
                  </span>
                </button>
              ))}
          </div>

          {/* Reglas de convivencia */}
          <div className="foroRulesHint">
            <p className="foroRulesTitle">Normas de convivencia</p>
            {[
              "Sé respetuoso y empático con todos.",
              "No compartas información personal sensible.",
              "Evita el lenguaje ofensivo o hiriente.",
              "Apoya con palabras amables, no con juicios.",
            ].map((rule) => (
              <div key={rule} className="foroRuleItem">
                <span className="foroRuleDot" />
                <span>{rule}</span>
              </div>
            ))}
          </div>

          {/* Consejo del día */}
          <div className="foroSideCard">
            <p className="foroMiniLabel">💡 Consejo del día</p>
            <p className="foroSideText">
              Escribir lo que sientes durante 5 minutos puede ayudarte a
              reducir la tensión emocional.
            </p>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="foroMain">

          {/* ── COMPOSER ── */}
          <div className="foroComposer">
            <div className="foroComposerTop">
              <div>
                {editingPostId && (
                  <span className="foroEditingBadge">✏️ Modo edición</span>
                )}
                <p className="foroComposerLabel">
                  {editingPostId ? "Editar publicación" : "Nueva publicación"}
                </p>
                <h3 className="foroComposerTitle">
                  {editingPostId
                    ? "Modifica tu mensaje"
                    : "Comparte con la comunidad"}
                </h3>
              </div>

              {/* Botones de acción */}
              <div className="foroComposerActions">
                {editingPostId && (
                  <button className="foroCancelBtn" onClick={resetComposer}>
                    Cancelar
                  </button>
                )}
                <button
                  className="modernPrimaryButton foroPublishBtn"
                  onClick={handlePublish}
                  disabled={savingPost}
                >
                  {savingPost
                    ? "Guardando…"
                    : editingPostId
                    ? "Guardar cambios"
                    : "Publicar →"}
                </button>
              </div>
            </div>

            {/* Tema seleccionado */}
            <div className="foroTopicPill">
              📌 Tema:{" "}
              <span>{selectedTopic}</span>
              <span style={{ opacity: 0.5, marginLeft: "4px" }}>
                — cambia el tema en el menú lateral
              </span>
            </div>

            {/* Anónimo */}
            <label className="foroAnonymousOption">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              Publicar como anónimo
              <span style={{ fontSize: "0.78rem", color: "#7aaab5", fontWeight: 300 }}>
                — tu nombre no será visible
              </span>
            </label>

            {/* Título */}
            <input
              className="foroInputTitle"
              type="text"
              placeholder="Título de la publicación (ej. ¿Cómo manejan los ataques de pánico?)"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              maxLength={120}
            />
            <p className="foroFieldHint">
              Un buen título ayuda a que más personas encuentren tu publicación.
            </p>

            {/* Textarea */}
            <textarea
              className="foroTextareaModern"
              placeholder="Escribe tu mensaje aquí… Cuéntanos qué sientes, qué estás viviendo o qué pregunta tienes para la comunidad."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              maxLength={800}
            />

            {/* Footer del composer */}
            <div className="foroComposerFoot">
              <span className="foroHint">
                🤝 Sé amable, auténtico y respetuoso.
              </span>
              <span
                className="foroCount"
                style={{ color: charDanger ? "#d44" : undefined }}
              >
                {postText.length} / 800
              </span>
            </div>

            {/* Barra de progreso del contador */}
            <div className="foroCharBar">
              <div
                className={`foroCharBarFill${charDanger ? " danger" : ""}`}
                style={{ width: `${charPercent}%` }}
              />
            </div>
          </div>

          {/* ── PUBLICACIONES ── */}
          <div className="foroPostsWrap">
            <div className="foroPostsHead">
              <p className="foroMiniLabel">Conversaciones en {selectedTopic}</p>
              <h3 className="foroComposerTitle">
                {posts.length > 0
                  ? `${posts.length} publicación${posts.length !== 1 ? "es" : ""}`
                  : "Sin publicaciones aún"}
              </h3>
            </div>

            <div className="foroPostsList">
              {posts.length === 0 ? (
                <div className="foroEmptyState">
                  <span className="foroEmptyIcon">💬</span>
                  <p className="foroEmptyTitle">Nadie ha publicado aquí todavía</p>
                  <p>Sé el primero en iniciar la conversación en <strong>{selectedTopic}</strong>. Tu historia puede ayudar a alguien más.</p>
                </div>
              ) : (
                posts.map((post, index) => (
                  <article
                    key={post.id}
                    className="foroPostCard"
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    {/* Encabezado del post */}
                    <div className="foroPostTop">
                      <div className="foroUserBlock">
                        <div className="foroAvatar">
                          {post.anonymous ? "A" : post.authorName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="foroAuthor">
                            {post.anonymous ? "Usuario anónimo" : post.authorName}
                          </h4>
                          <p className="foroMeta">
                            {categoryIcons[post.category]} {post.category} •{" "}
                            {post.updatedAt || post.createdAt}
                          </p>
                        </div>
                      </div>

                      {/* Acciones del post */}
                      <div className="foroActionGroup">
                        <button
                          className="foroReactionBtn"
                          onClick={() => handleLike(post.id)}
                          title="Marcar como útil"
                        >
                          💙 {post.likes || 0}
                        </button>
                        <button
                          className="foroReactionBtn"
                          onClick={() => toggleComments(post.id)}
                          title="Ver comentarios"
                        >
                          💬 {post.commentCount || 0}
                        </button>
                        {user?.uid === post.authorUid && (
                          <>
                            <span className="foroActionDivider" />
                            <button
                              className="foroActionBtn"
                              onClick={() => handleEdit(post)}
                              title="Editar tu publicación"
                            >
                              ✏️ Editar
                            </button>
                            <button
                              className="foroActionBtn"
                              onClick={() => handleDelete(post)}
                              title="Eliminar tu publicación"
                            >
                              🗑️
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <h4 className="foroPostTitle">{post.title}</h4>
                    <p className="foroPostText">{post.text}</p>

                    {/* ── COMENTARIOS ── */}
                    {openComments[post.id] && (
                      <div className="foroCommentsSection">
                        <div className="foroCommentsList">
                          {(commentsByPost[post.id] || []).length === 0 ? (
                            <p className="foroCommentEmpty">
                              Sé el primero en comentar esta publicación.
                            </p>
                          ) : (
                            (commentsByPost[post.id] || []).map((comment) => (
                              <div key={comment.id} className="foroCommentCard">
                                <div className="foroCommentHeader">
                                  <span className="foroAuthor" style={{ fontSize: "0.95rem" }}>
                                    {comment.authorName}
                                  </span>
                                  <span className="foroMeta">{comment.createdAt}</span>
                                </div>

                                {editingCommentId[comment.id] ? (
                                  <>
                                    <textarea
                                      className="foroTextareaModern"
                                      value={commentEditText[comment.id] || comment.text}
                                      onChange={(e) =>
                                        setCommentEditText((prev) => ({
                                          ...prev,
                                          [comment.id]: e.target.value,
                                        }))
                                      }
                                      rows={3}
                                    />
                                    <div className="foroCommentActions">
                                      <button
                                        className="foroReactionBtn"
                                        onClick={() => handleCommentSave(post.id, comment.id)}
                                      >
                                        💾 Guardar
                                      </button>
                                      <button
                                        className="foroReactionBtn"
                                        onClick={() => cancelCommentEdit(comment.id)}
                                      >
                                        Cancelar
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <p className="foroCommentText">{comment.text}</p>
                                    {comment.authorUid === user?.uid && (
                                      <div className="foroCommentActions">
                                        <button
                                          className="foroReactionBtn"
                                          onClick={() => startCommentEdit(comment.id, comment.text)}
                                        >
                                          ✏️ Editar
                                        </button>
                                        <button
                                          className="foroReactionBtn"
                                          onClick={() => handleCommentDelete(post.id, comment.id)}
                                        >
                                          🗑️ Eliminar
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            ))
                          )}
                        </div>

                        {/* Composer de comentario */}
                        <div className="foroCommentComposer">
                          <textarea
                            className="foroTextareaModern"
                            placeholder="Escribe un comentario con empatía y respeto…"
                            value={commentText[post.id] || ""}
                            onChange={(e) =>
                              setCommentText((prev) => ({ ...prev, [post.id]: e.target.value }))
                            }
                            rows={3}
                          />
                          <button
                            className="modernPrimaryButton foroPublishBtn"
                            onClick={() => handleCommentSubmit(post.id)}
                          >
                            Comentar
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="glassFooter">
        <div>ANSISOCIETY</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}