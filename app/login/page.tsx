"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function LoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarLogin = async () => {
    setError("");

    if (!correo || !contrasena) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      setCargando(true);
      const userCredential = await signInWithEmailAndPassword(auth, correo, contrasena);

      const userDoc = await getDoc(doc(db, "usuarios", userCredential.user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      const isAdmin = userData?.rol === "admin";

      router.push(isAdmin ? "/admin" : "/dashboard");
    } catch (err: unknown) {
      const errorCode =
        err && typeof err === "object" && "code" in err ? String(err.code) : "";

      if (errorCode === "auth/invalid-credential") {
        setError("Correo o contraseña incorrectos.");
      } else if (errorCode === "auth/user-not-found") {
        setError("No existe una cuenta con este correo.");
      } else if (errorCode === "auth/too-many-requests") {
        setError("Demasiados intentos fallidos. Intenta más tarde.");
      } else {
        setError("Error al iniciar sesión. Intenta de nuevo.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="pageWrapper authPage">
      <div className="bgBlob bgBlob1"></div>
      <div className="bgBlob bgBlob2"></div>
      <div className="bgBlob bgBlob3"></div>

      {/* ── TOPBAR ── */}
      <Header variant="auth" />

      <section className="centerSection authCenter">
        <div className="authCard loginCard fadeUp">
          <div className="authIntro">
            <p className="badgeText">Bienvenido de nuevo</p>
            <h2 className="bigTitle modernBigTitle">Inicia sesión</h2>
            <p className="authDescription">
              Accede a tu espacio personal para continuar con tu evaluación,
              revisar tu progreso y consultar recursos de apoyo emocional.
            </p>
          </div>

          <div className="loginFormWrap">
            {error && <div className="errorMessage">{error}</div>}

            <div className="fullInputWrap">
              <label className="labelTitle">CORREO ELECTRÓNICO</label>
              <input
                className="softInput modernInput"
                type="email"
                placeholder="ejemplo@correo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                disabled={cargando}
              />
            </div>

            <div className="fullInputWrap">
              <label className="labelTitle">CONTRASEÑA</label>
              <input
                className="softInput modernInput"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                disabled={cargando}
              />
            </div>

            <div className="forgotPasswordBox">
              <p className="authText modernAuthText">¿Olvidaste tu contraseña?</p>
              <button className="forgotLink">Recuperar acceso</button>
            </div>

            <div className="authActions">
              <button
                className="primaryButton modernPrimaryButton loginButton"
                onClick={manejarLogin}
                disabled={cargando}
              >
                {cargando ? "CARGANDO..." : "ACCEDER"}
              </button>
            </div>

            <p className="bottomHelperText">
              ¿Aún no tienes cuenta?{" "}
              <a href="/registro" className="inlineAuthLink">
                Crear una ahora
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="contactBar glassFooter">
        <div>CONTACTO</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}