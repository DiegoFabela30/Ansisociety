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
    if (!loading && !user) {
      router.push("/login");
    }
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

        // Contar posts por categoría
        const counts: Record<string, number> = {};
        categories.forEach((cat) => (counts[cat] = 0));
        const allPostsQuery = query(collection(db, "foro"));
        const allSnapshot = await getDocs(allPostsQuery);
        allSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          const cat = data.category as string;
          if (cat && counts[cat] !== undefined) {
            counts[cat]++;
          }
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
      setToast({ message: "Debes iniciar sesión para crear una publicación.", type: "error" });
      return;
    }

    if (!postTitle.trim() || !postText.trim()) {
      setToast({ message: "Ingresa un título y un mensaje para publicar.", type: "error" });
      return;
    }

    try {
      setSavingPost(true);

      if (editingPostId) {
        const postDoc = doc(db, "foro", editingPostId);
        await updateDoc(postDoc, {
          title: postTitle.trim(),
          text: postText.trim(),
          category: selectedTopic,
          anonymous: isAnonymous,
          updatedAt: serverTimestamp(),
        });

        setPosts((prev) =>
          prev.map((post) =>
            post.id === editingPostId
              ? {
                  ...post,
                  title: postTitle.trim(),
                  text: postText.trim(),
                  category: selectedTopic,
                  anonymous: isAnonymous,
                  updatedAt: new Date().toLocaleDateString("es-MX"),
                }
              : post
          )
        );
        resetComposer();
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
      setToast({ message: "Publicación creada correctamente", type: "success" });
    } catch (error) {
      console.error("Error al guardar la publicación:", error);
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
  };

  const handleDelete = async (post: ForoPost) => {
    if (!user || user.uid !== post.authorUid) {
      return;
    }

    const confirmDelete = confirm("¿Estás seguro de que quieres eliminar esta publicación?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "foro", post.id));
      setPosts((prev) => prev.filter((item) => item.id !== post.id));
      if (editingPostId === post.id) {
        resetComposer();
      }
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      alert("No se pudo eliminar la publicación.");
    }
  };

  const handleLike = async (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, likes: (post.likes || 0) + 1 }
          : post
      )
    );

    try {
      await updateDoc(doc(db, "foro", postId), {
        likes: increment(1),
      });
    } catch (error) {
      console.error("Error al actualizar likes:", error);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      const commentsQuery = query(
        collection(db, "foro", postId, "comments"),
        orderBy("createdAt", "asc")
      );
      const snapshot = await getDocs(commentsQuery);
      const loadedComments: ForoComment[] = snapshot.docs.map((docItem) => {
        const data = docItem.data();
        return {
          id: docItem.id,
          authorUid: data.authorUid as string,
          authorName: (data.authorName as string) || "Usuario",
          text: (data.text as string) || "",
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate().toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
        };
      });
      setCommentsByPost((prev) => ({ ...prev, [postId]: loadedComments }));
    } catch (error) {
      console.error("Error al cargar comentarios:", error);
    }
  };

  const toggleComments = async (postId: string) => {
    const nextOpen = !openComments[postId];
    setOpenComments((prev) => ({ ...prev, [postId]: nextOpen }));
    if (nextOpen && !commentsByPost[postId]) {
      await fetchComments(postId);
    }
  };

  const handleCommentChange = (postId: string, value: string) => {
    setCommentText((prev) => ({ ...prev, [postId]: value }));
  };

  const startCommentEdit = (commentId: string, commentTextValue: string) => {
    setEditingCommentId((prev) => ({ ...prev, [commentId]: commentId }));
    setCommentEditText((prev) => ({ ...prev, [commentId]: commentTextValue }));
  };

  const cancelCommentEdit = (commentId: string) => {
    setEditingCommentId((prev) => ({ ...prev, [commentId]: null }));
    setCommentEditText((prev) => {
      const copy = { ...prev };
      delete copy[commentId];
      return copy;
    });
  };

  const handleCommentSave = async (postId: string, commentId: string) => {
    if (!user) {
      setToast({ message: "Debes iniciar sesión para editar comentarios.", type: "error" });
      return;
    }

    const updatedText = commentEditText[commentId]?.trim();
    if (!updatedText) {
      setToast({ message: "El comentario no puede estar vacío.", type: "error" });
      return;
    }

    try {
      await updateDoc(doc(db, "foro", postId, "comments", commentId), {
        text: updatedText,
      });

      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: prev[postId]?.map((comment) =>
          comment.id === commentId ? { ...comment, text: updatedText } : comment
        ) || [],
      }));
      cancelCommentEdit(commentId);
      setToast({ message: "Comentario guardado correctamente", type: "success" });
    } catch (error) {
      console.error("Error al guardar el comentario:", error);
      setToast({ message: "No se pudo guardar el comentario. Intenta de nuevo.", type: "error" });
    }
  };

  const handleCommentDelete = async (postId: string, commentId: string) => {
    if (!user) {
      setToast({ message: "Debes iniciar sesión para eliminar comentarios.", type: "error" });
      return;
    }

    const confirmDelete = confirm("¿Estás seguro de que quieres borrar este comentario?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "foro", postId, "comments", commentId));

      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: prev[postId]?.filter((comment) => comment.id !== commentId) || [],
      }));

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                commentCount: Math.max((post.commentCount || 1) - 1, 0),
              }
            : post
        )
      );

      await updateDoc(doc(db, "foro", postId), {
        commentCount: increment(-1),
      });
      setToast({ message: "Comentario eliminado correctamente", type: "success" });
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
      setToast({ message: "No se pudo borrar el comentario.", type: "error" });
    }
  };

  const handleCommentSubmit = async (postId: string) => {
    if (!user) {
      setToast({ message: "Debes iniciar sesión para comentar.", type: "error" });
      return;
    }

    const text = commentText[postId]?.trim();
    if (!text) {
      setToast({ message: "Escribe un comentario antes de enviar.", type: "error" });
      return;
    }

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
            createdAt: new Date().toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      }));

      await updateDoc(doc(db, "foro", postId), {
        commentCount: increment(1),
      });

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, commentCount: (post.commentCount || 0) + 1 }
            : post
        )
      );
      handleCommentChange(postId, "");
      setToast({ message: "Comentario publicado correctamente", type: "success" });
    } catch (error) {
      console.error("Error al enviar comentario:", error);
      setToast({ message: "No se pudo enviar el comentario. Intenta de nuevo.", type: "error" });
    }
  };

  if (loading || loadingPosts) {
    return (
      <main className="foroPage">
        <div className="bgBlob bgBlob1" />
        <div className="bgBlob bgBlob2" />
        <div className="bgBlob bgBlob3" />
        <section className="foroHero">
          <span className="badgeText">Cargando foro...</span>
        </section>
      </main>
    );
  }

  return (
    <main className="foroPage">
      <div className="bgBlob bgBlob1" />
      <div className="bgBlob bgBlob2" />
      <div className="bgBlob bgBlob3" />

      <Header variant="default" />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}

      <section className="foroHero">
        <span className="badgeText">✦ Espacio seguro para compartir</span>
        <h2 className="foroTitle">Foro interactivo</h2>
        <p className="foroSubtitle">
          Conecta con otras personas, comparte cómo te sientes y encuentra apoyo
          en una comunidad que escucha sin juzgar.
        </p>
      </section>

      <section className="foroLayout">
        <aside className="foroSidebar">
          <div className="foroSidebarHead">
            <p className="foroSidebarLabel">Temas recientes</p>
            <h3 className="foroSidebarTitle">Explora conversaciones</h3>
          </div>

          <div className="foroTopics">
            {categories
              .sort((a, b) => (categoryCounts[b] || 0) - (categoryCounts[a] || 0))
              .map((category, index) => (
                <button
                  key={category}
                  className={`foroTopicBtn ${
                    selectedTopic === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedTopic(category)}
                >
                  <span className="foroTopicIcon">
                    {index === 0
                      ? "🏫"
                      : index === 1
                      ? "💼"
                      : index === 2
                      ? "👥"
                      : index === 3
                      ? "🏥"
                      : index === 4
                      ? "💬"
                      : "🧘"}
                  </span>
                  <span>
                    {category} ({categoryCounts[category] || 0})
                  </span>
                </button>
              ))}
          </div>

          <div className="foroSideCard">
            <p className="foroMiniLabel">Consejo del día</p>
            <p className="foroSideText">
              Escribir lo que sientes durante 5 minutos puede ayudarte a reducir
              la tensión emocional.
            </p>
          </div>
        </aside>

        <div className="foroMain">
          <div className="foroComposer">
            <div className="foroComposerTop">
              <div>
                <p className="foroMiniLabel">Nueva publicación</p>
                <h3 className="foroComposerTitle">
                  {editingPostId ? "Editar publicación" : "Comparte con la comunidad"}
                </h3>
              </div>

              <button
                className="modernPrimaryButton foroPublishBtn"
                onClick={handlePublish}
                disabled={savingPost}
              >
                {savingPost ? "Guardando..." : editingPostId ? "Guardar cambios" : "Publicar"}
              </button>
            </div>

            <div className="foroTopicPill">
              Tema actual: <span>{selectedTopic}</span>
            </div>

            <label className="foroAnonymousOption">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              Publicar como anónimo
            </label>

            <input
              className="foroInputTitle"
              type="text"
              placeholder="Título de la publicación"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />

            <textarea
              className="foroTextareaModern"
              placeholder="Escribe aquí tu mensaje para la comunidad..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              maxLength={800}
            />

            <div className="foroComposerFoot">
              <span className="foroHint">
                Sé amable, auténtico y respetuoso con los demás.
              </span>
              <span className="foroCount">{postText.length} / 800</span>
            </div>
          </div>

          <div className="foroPostsWrap">
            <div className="foroPostsHead">
              <p className="foroMiniLabel">Conversaciones</p>
              <h3 className="foroComposerTitle">Publicaciones recientes</h3>
            </div>

            <div className="foroPostsList">
              {posts.length === 0 ? (
                <div className="foroEmptyState">
                  <p>No hay publicaciones en este tema aún. Sé el primero en empezar la conversación.</p>
                </div>
              ) : (
                posts.map((post, index) => (
                  <article
                    key={post.id}
                    className="foroPostCard"
                    style={{ animationDelay: `${0.1 + index * 0.12}s` }}
                  >
                    <div className="foroPostTop">
                      <div className="foroUserBlock">
                        <div className="foroAvatar">
                          {post.anonymous ? "U" : post.authorName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="foroAuthor">
                            {post.anonymous ? "Usuario anónimo" : post.authorName}
                          </h4>
                          <p className="foroMeta">
                            {post.category} • {post.updatedAt || post.createdAt}
                          </p>
                        </div>
                      </div>

                      <div className="foroPostActions">
                        {user?.uid === post.authorUid && (
                          <>
                            <button className="foroReactionBtn" onClick={() => handleEdit(post)}>
                              ✏️ Editar
                            </button>
                            <button className="foroReactionBtn" onClick={() => handleDelete(post)}>
                              🗑️ Eliminar
                            </button>
                          </>
                        )}
                        <button className="foroReactionBtn" onClick={() => handleLike(post.id)}>
                          💙 Me interesa {post.likes || 0}
                        </button>
                        <button className="foroReactionBtn" onClick={() => toggleComments(post.id)}>
                          💬 Comentarios ({post.commentCount || 0})
                        </button>
                      </div>
                    </div>

                    <h4 className="foroPostTitle">{post.title}</h4>
                    <p className="foroPostText">{post.text}</p>

                    {openComments[post.id] && (
                      <div className="foroCommentsSection">
                        <div className="foroCommentsList">
                          {(commentsByPost[post.id] || []).map((comment) => (
                            <div key={comment.id} className="foroCommentCard">
                              <div className="foroCommentHeader">
                                <span className="foroAuthor">{comment.authorName}</span>
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
                                      ❌ Cancelar
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <p className="foroCommentText">{comment.text}</p>
                                  <div className="foroCommentActions">
                                    {comment.authorUid === user?.uid && (
                                      <>
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
                                      </>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                          {(!commentsByPost[post.id] || commentsByPost[post.id].length === 0) && (
                            <p className="foroCommentEmpty">Sé el primero en comentar esta publicación.</p>
                          )}
                        </div>

                        <div className="foroCommentComposer">
                          <textarea
                            className="foroTextareaModern"
                            placeholder="Escribe un comentario..."
                            value={commentText[post.id] || ""}
                            onChange={(e) => handleCommentChange(post.id, e.target.value)}
                            rows={3}
                          />
                          <button className="foroPublishBtn" onClick={() => handleCommentSubmit(post.id)}>
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
