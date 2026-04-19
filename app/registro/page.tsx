"use client";

import { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function RegistroPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [genero, setGenero] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarRegistro = async () => {
    setError("");

    if (!nombre || !apellidos || !genero || !fechaNacimiento || !correo || !contrasena) {
      setError("Completa todos los campos.");
      return;
    }

    try {
      setCargando(true);

      const usuarioCreado = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const uid = usuarioCreado.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        uid, nombre, apellidos, genero, fechaNacimiento, correo,
        rol: "usuario",
        createdAt: new Date().toISOString(),
      });

      // Actualizar displayName en Firebase Auth
      await updateProfile(usuarioCreado.user, {
        displayName: `${nombre} ${apellidos}`,
      });

      alert("Cuenta creada correctamente");
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorCode =
        err && typeof err === "object" && "code" in err ? String(err.code) : "";

      if (errorCode === "auth/email-already-in-use") {
        setError("Ese correo ya está registrado.");
      } else if (errorCode === "auth/invalid-email") {
        setError("El correo no es válido.");
      } else if (errorCode === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setError("No se pudo crear la cuenta. Intenta de nuevo.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="authPage">
      {/* Blobs de fondo */}
      <div className="bgBlob bgBlob1" />
      <div className="bgBlob bgBlob2" />
      <div className="bgBlob bgBlob3" />

      {/* ── TOPBAR ── */}
      <Header variant="auth" />

      {/* ── FORMULARIO ── */}
      <section className="regCenter">
        <div className="regCard">
          <span className="regBadge">✦ Únete a la comunidad</span>
          <h2 className="regTitle">Crea tu cuenta</h2>
          <p className="regSubtitle">
            Completa tu información para comenzar tu camino hacia el bienestar emocional.
          </p>

          {/* Grid de campos */}
          <div className="formGrid">
            <div className="formField">
              <label className="fieldLabel">Nombre</label>
              <input
                className="regInput"
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="formField">
              <label className="fieldLabel">Apellidos</label>
              <input
                className="regInput"
                type="text"
                placeholder="Tus apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
            </div>

            <div className="formField">
              <label className="fieldLabel">Género</label>
              <div className="selectWrap">
                <select
                  className="regSelect"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                </select>
              </div>
            </div>

            <div className="formField">
              <label className="fieldLabel">Fecha de Nacimiento</label>
              <input
                className="regInput"
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>

            <div className="formField full">
              <label className="fieldLabel">Correo Electrónico</label>
              <input
                className="regInput"
                type="email"
                placeholder="ejemplo@correo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>

            <div className="formField full">
              <label className="fieldLabel">Contraseña</label>
              <input
                className="regInput"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="errorBox">{error}</div>}

          <div className="regActions">
            <button
              className="btnRegister"
              onClick={manejarRegistro}
              disabled={cargando}
            >
              {cargando ? "CREANDO CUENTA..." : "CREAR CUENTA"}
            </button>
            <p className="loginHint">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="inlineAuthLink">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="glassFooter">
        <div>CONTACTO</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}