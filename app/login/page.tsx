"use client";

import { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!correo || !contrasena) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      setCargando(true);
      await signInWithEmailAndPassword(auth, correo, contrasena);
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error("Error al iniciar sesion:", err);
      const errorCode = err && typeof err === "object" && "code" in err ? String(err.code) : "";
      
      if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
        setError("Correo o contrasena incorrectos.");
      } else if (errorCode === "auth/invalid-email") {
        setError("El correo no es valido.");
      } else {
        setError("Error al iniciar sesion. Intenta de nuevo.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="pageWrapper">
      <header className="topBar">
        <Link href="/" className="brandBox no-underline">
          <div className="logoCircle" />
          <div>
            <h1 className="brandTitle">ANSISOCIETY</h1>
            <p className="brandSubtitle">APOYO EMOCIONAL DIGITAL</p>
          </div>
        </Link>

        <Link href="/registro">
          <button className="topButton">Registrate</button>
        </Link>
      </header>

      <section className="centerSection flex items-center justify-center">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <h2 className="font-serif text-center text-3xl tracking-wide mb-8 text-[var(--color-text-primary)]">
              Inicia Sesion
            </h2>

            <form onSubmit={manejarLogin}>
              <div className="mb-6">
                <label className="labelTitle block text-left mb-2">CORREO ELECTRONICO</label>
                <input 
                  className="softInput !mb-0 !mx-0 !max-w-full" 
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="tu@correo.com"
                />
              </div>

              <div className="mb-4">
                <label className="labelTitle block text-left mb-2">CONTRASENA</label>
                <input 
                  className="softInput !mb-0 !mx-0 !max-w-full" 
                  type="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="Tu contrasena"
                />
              </div>

              <p className="text-center text-sm text-[var(--color-text-muted)] mb-6 cursor-pointer hover:text-[var(--color-accent-hover)] transition-colors">
                Olvidaste tu contrasena?
              </p>

              {error && <p className="errorText">{error}</p>}

              <button 
                type="submit" 
                className="primaryButton w-full py-4 text-base"
                disabled={cargando}
              >
                {cargando ? "ACCEDIENDO..." : "ACCEDER"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[var(--color-card)]">
              <h3 className="text-center text-sm font-medium text-[var(--color-text-muted)] mb-5 tracking-wide">
                O INICIA SESION CON
              </h3>

              <div className="authIcons">
                <button className="iconMock hover:bg-gray-50">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button className="microsoftMock hover:bg-gray-50">
                  <div style={{ background: "#f35325" }} />
                  <div style={{ background: "#81bc06" }} />
                  <div style={{ background: "#05a6f0" }} />
                  <div style={{ background: "#ffba08" }} />
                </button>
              </div>
            </div>

            <p className="text-center mt-6 text-sm text-[var(--color-text-muted)]">
              No tienes cuenta?{" "}
              <Link href="/registro" className="text-[var(--color-accent-hover)] font-semibold hover:underline">
                Registrate aqui
              </Link>
            </p>
          </div>
        </div>
      </section>

      <footer className="contactBar">
        <div>CONTACTO:</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}
