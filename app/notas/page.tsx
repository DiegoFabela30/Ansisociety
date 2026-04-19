"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";
import Header from "@/components/Header";
import Toast from "@/components/Toast";

type Nota = {
  id: string;
  titulo: string;
  icono: string;
  contenido: string;
  mood: string;
  docId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function NotasPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [notas, setNotas] = useState<Nota[]>([]);
  const [activaId, setActivaId] = useState("");
  const [titulo, setTitulo] = useState("Nueva nota");
  const [contenido, setContenido] = useState("");
  const [mood, setMood] = useState("bien");
  const [guardando, setGuardando] = useState(false);
  const [cargandoNotas, setCargandoNotas] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;

    const fetchNotas = async () => {
      try {
        setCargandoNotas(true);

        const notasQuery = query(
          collection(db, "usuarios", user.uid, "notas"),
          orderBy("updatedAt", "desc")
        );

        const snapshot = await getDocs(notasQuery);
        const loadedNotas: Nota[] = snapshot.docs.map((docItem, index) => {
          const data = docItem.data();
          return {
            id: docItem.id,
            docId: docItem.id,
            titulo: (data.titulo as string) || `Nota ${index + 1}`,
            icono: "📝",
            contenido: (data.contenido as string) || "",
            mood: (data.mood as string) || "bien",
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString("es-MX") : "",
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toLocaleDateString("es-MX") : "",
          };
        });

        setNotas(loadedNotas);

        if (loadedNotas.length > 0) {
          const primeraNota = loadedNotas[0];
          setActivaId(primeraNota.id);
          setTitulo(primeraNota.titulo);
          setContenido(primeraNota.contenido);
          setMood(primeraNota.mood);
        } else {
          setActivaId("");
          setTitulo("Nueva nota");
          setContenido("");
          setMood("bien");
        }
      } catch (error) {
        console.error("Error al cargar notas:", error);
      } finally {
        setCargandoNotas(false);
      }
    };

    fetchNotas();
  }, [user]);

  if (loading || cargandoNotas) {
    return (
      <main className="notasPage">
        <div className="bgBlob bgBlob1" />
        <div className="bgBlob bgBlob2" />
        <Header variant="default" />
        <div style={{ textAlign: "center", padding: "40px", color: "#0d5c6e" }}>
          Cargando notas...
        </div>
      </main>
    );
  }

  const notaActiva = notas.find((n) => n.id === activaId);
  const palabras = contenido.trim() ? contenido.trim().split(/\s+/).length : 0;
  const hoy = new Date().toLocaleDateString("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const seleccionarNota = (nota: Nota) => {
    setActivaId(nota.id);
    setTitulo(nota.titulo);
    setContenido(nota.contenido);
    setMood(nota.mood);
  };

  const guardarNota = async () => {
    if (!user) {
      setToast({ message: "Debes iniciar sesión para guardar notas", type: "error" });
      return;
    }

    try {
      setGuardando(true);

      if (notaActiva && notaActiva.docId) {
        await updateDoc(doc(db, "usuarios", user.uid, "notas", notaActiva.docId), {
          titulo,
          contenido,
          mood,
          updatedAt: serverTimestamp(),
        });

        setNotas((prev) =>
          prev.map((n) =>
            n.id === notaActiva.id
              ? { ...n, titulo, contenido, mood, updatedAt: new Date().toLocaleDateString("es-MX") }
              : n
          )
        );
      } else {
        const docRef = await addDoc(collection(db, "usuarios", user.uid, "notas"), {
          titulo,
          contenido,
          mood,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        const nuevaNota: Nota = {
          id: docRef.id,
          docId: docRef.id,
          titulo,
          icono: "📝",
          contenido,
          mood,
          createdAt: new Date().toLocaleDateString("es-MX"),
          updatedAt: new Date().toLocaleDateString("es-MX"),
        };

        setNotas((prev) =>
          notaActiva ? prev.map((n) => (n.id === notaActiva.id ? nuevaNota : n)) : [nuevaNota, ...prev]
        );
        setActivaId(docRef.id);
      }

      setToast({ message: "Nota guardada correctamente", type: "success" });
    } catch (error) {
      console.error("Error al guardar la nota:", error);
      setToast({ message: "Error al guardar la nota. Intenta de nuevo.", type: "error" });
    } finally {
      setGuardando(false);
    }
  };

  const nuevaNota = () => {
    const nueva: Nota = {
      id: `temp-${Date.now()}`,
      titulo: `Nota ${notas.length + 1}`,
      icono: "✨",
      contenido: "",
      mood: "bien",
    };
    setNotas((prev) => [nueva, ...prev]);
    seleccionarNota(nueva);
  };

  const borrarNota = async () => {
    if (!notaActiva) return;

    try {
      if (notaActiva.docId && user) {
        await deleteDoc(doc(db, "usuarios", user.uid, "notas", notaActiva.docId));
      }

      const restantes = notas.filter((n) => n.id !== notaActiva.id);
      setNotas(restantes);

      if (restantes.length > 0) {
        seleccionarNota(restantes[0]);
      } else {
        setActivaId("");
        setTitulo("Nueva nota");
        setContenido("");
        setMood("bien");
      }

      setToast({ message: "Nota eliminada correctamente", type: "success" });
    } catch (error) {
      console.error("Error al borrar la nota:", error);
      setToast({ message: "No se pudo borrar la nota. Intenta de nuevo.", type: "error" });
    }
  };

  return (
    <main className="notasPage">
      {/* Blobs */}
      <div className="bgBlob bgBlob1" />
      <div className="bgBlob bgBlob2" />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}

      {/* ── TOPBAR ── */}
      <Header variant="default" />

      {/* ── PAGE HEADER ── */}
      <div className="notasPageHead">
        <p className="sectionLabel">✦ Tu espacio privado</p>
        <h2 className="notasTitle">Bloc de Notas</h2>
      </div>

      {/* ── WORKSPACE ── */}
      <div className="notasWorkspace">

        {/* SIDEBAR */}
        <aside className="notasSidebar">
          <p className="notasSideHead">Notas guardadas</p>

          {notas.map((nota) => (
            <button
              key={nota.id}
              className={`notaBtn${activaId === nota.id ? " active" : ""}`}
              onClick={() => seleccionarNota(nota)}
            >
              <span className="notaIcon">{nota.icono}</span>
              <span>{nota.titulo}</span>
            </button>
          ))}

          <button className="nuevaNotaBtn" onClick={nuevaNota}>
            + Nueva nota
          </button>
        </aside>

        {/* EDITOR */}
        <div className="notasEditor">
          {/* Cabecera del editor */}
          <div className="editorTop">
            <input
              className="notaTituloInput"
              type="text"
              placeholder="Título de la nota…"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <div className="editorAcciones">
              <button className="btnAnalizar">✦ Analizar</button>
              <button className="btnGuardar" onClick={guardarNota} disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar"}
              </button>
              {notaActiva && (
                <button className="btnOutline" onClick={borrarNota} disabled={guardando}>
                  Borrar
                </button>
              )}
            </div>
          </div>

          {/* Toolbar de mood */}
          {/* Toolbar de mood */}
<div className="notasToolbar">
  <span className="moodLabel">Estado de ánimo:</span>
  <div className="moodScroll">
    {[
  { key: "excelente",      emoji: "🤩", label: "Excelente"      },
  { key: "bien",           emoji: "😊", label: "Bien"           },
  { key: "contento",       emoji: "🙂", label: "Contento"       },
  { key: "neutral",        emoji: "😐", label: "Neutral"        },
  { key: "cansado",        emoji: "😴", label: "Cansado"        },
  { key: "ansioso",        emoji: "😰", label: "Ansioso"        },
  { key: "triste",         emoji: "😢", label: "Triste"         },
  { key: "enojado",        emoji: "😤", label: "Enojado"        },
  { key: "dificil",        emoji: "😔", label: "Difícil"        },
  { key: "agradecido",     emoji: "🥹", label: "Agradecido"     },
  { key: "emocionado",     emoji: "🎉", label: "Emocionado"     },
  { key: "motivado",       emoji: "💪", label: "Motivado"       },
  { key: "creativo",       emoji: "🎨", label: "Creativo"       },
  { key: "concentrado",    emoji: "🧠", label: "Concentrado"    },
  { key: "esperanzado",    emoji: "🌟", label: "Esperanzado"    },
  { key: "tranquilo",      emoji: "😌", label: "Tranquilo"      },
  { key: "nostalgico",     emoji: "🌧️", label: "Nostálgico"     },
  { key: "confundido",     emoji: "😵", label: "Confundido"     },
  { key: "frustrado",      emoji: "😣", label: "Frustrado"      },
  { key: "solitario",      emoji: "🥀", label: "Solitario"      },
  { key: "asustado",       emoji: "😨", label: "Asustado"       },
  { key: "avergonzado",    emoji: "😳", label: "Avergonzado"    },
  { key: "celoso",         emoji: "💚", label: "Celoso"         },
  { key: "orgulloso",      emoji: "🦁", label: "Orgulloso"      },
  { key: "aliviado",       emoji: "😮‍💨", label: "Aliviado"       },
  { key: "sorprendido",    emoji: "😲", label: "Sorprendido"    },
  { key: "aburrido",       emoji: "🥱", label: "Aburrido"       },
  { key: "curioso",        emoji: "🔍", label: "Curioso"        },
  { key: "romantico",      emoji: "🥰", label: "Romántico"      },
  { key: "melancolico",    emoji: "🌙", label: "Melancólico"    },
  { key: "optimista",      emoji: "☀️", label: "Optimista"      },
  { key: "pesimista",      emoji: "🌫️", label: "Pesimista"      },
  { key: "agotado",        emoji: "🪫",  label: "Agotado"        },
  { key: "poderoso",       emoji: "⚡", label: "Poderoso"       },
  { key: "en_paz",         emoji: "🕊️", label: "En paz"         },
  { key: "vulnerable",     emoji: "🫂", label: "Vulnerable"     },
  { key: "inseguro",       emoji: "🫣", label: "Inseguro"       },
  { key: "determinado",    emoji: "🎯", label: "Determinado"    },
  { key: "soñador",        emoji: "💭", label: "Soñador"        },
  { key: "jugueton",       emoji: "🎈", label: "Juguetón"       },
  { key: "estoico",        emoji: "🗿", label: "Estoico"        },
  { key: "abrumado",       emoji: "🌊", label: "Abrumado"       },
  { key: "libre",          emoji: "🦋", label: "Libre"          },
  { key: "apasionado",     emoji: "🔥", label: "Apasionado"     },
  { key: "reflexivo",      emoji: "🪞", label: "Reflexivo"      },
  { key: "resignado",      emoji: "🍂", label: "Resignado"      },
  { key: "esperanzador",   emoji: "🌱", label: "Esperanzador"   },
  { key: "incomprendido",  emoji: "🫙", label: "Incomprendido"  },
  { key: "agradable",      emoji: "🌸", label: "Agradable"      },
  { key: "vacio",          emoji: "🌑", label: "Vacío"          },
].map((m) => (
  <button
    key={m.key}
    className={`moodPill${mood === m.key ? " on" : ""}`}
    onClick={() => setMood(m.key)}
  >
    {m.emoji} {m.label}
  </button>
))}
  </div>
</div>

          {/* Textarea */}
          <textarea
            className="notasTextarea"
            placeholder="Escribe aquí tu nota… este es tu espacio privado."
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
          />

          {/* Footer del editor */}
          <div className="editorFoot">
            <span className="wordCount">{palabras} {palabras === 1 ? "palabra" : "palabras"}</span>
            <span className="dateBadge">{hoy}</span>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="glassFooter">
        <div>CONTACTO</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}