"use client";

import { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

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

  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !nombre ||
      !apellidos ||
      !genero ||
      !fechaNacimiento ||
      !correo ||
      !contrasena
    ) {
      setError("Completa todos los campos.");
      return;
    }

    try {
      setCargando(true);

      const usuarioCreado = await createUserWithEmailAndPassword(
        auth,
        correo,
        contrasena
      );

      const uid = usuarioCreado.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        uid,
        nombre,
        apellidos,
        genero,
        fechaNacimiento,
        correo,
        rol: "usuario",
        createdAt: new Date().toISOString(),
      });

      alert("Cuenta creada correctamente");
      router.push("/login");
    } catch (err: unknown) {
      console.error("ERROR FIREBASE:", err);

      const errorCode =
        err && typeof err === "object" && "code" in err
          ? String(err.code)
          : "";

      if (errorCode === "auth/email-already-in-use") {
        setError("Ese correo ya esta registrado.");
      } else if (errorCode === "auth/invalid-email") {
        setError("El correo no es valido.");
      } else if (errorCode === "auth/weak-password") {
        setError("La contrasena es demasiado debil.");
      } else {
        setError("No se pudo crear la cuenta.");
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

        <Link href="/login">
          <button className="topButton">Iniciar Sesion</button>
        </Link>
      </header>

      <section className="centerSection flex items-center justify-center py-8">
        <div className="w-full max-w-2xl animate-fade-in-up">
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <h2 className="font-serif text-center text-3xl tracking-wide mb-2 text-[var(--color-text-primary)]">
              Crea tu cuenta
            </h2>
            <p className="text-center text-[var(--color-text-muted)] mb-8">
              Unete a nuestra comunidad de apoyo emocional
            </p>

            <form onSubmit={manejarRegistro}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="labelTitle block text-left mb-2">NOMBRE</label>
                  <input
                    className="smallInput !mt-0"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="labelTitle block text-left mb-2">APELLIDOS</label>
                  <input
                    className="smallInput !mt-0"
                    type="text"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    placeholder="Tus apellidos"
                  />
                </div>

                <div>
                  <label className="labelTitle block text-left mb-2">GENERO</label>
                  <select
                    className="smallInput !mt-0"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                  >
                    <option value="">Selecciona una opcion</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                  </select>
                </div>

                <div>
                  <label className="labelTitle block text-left mb-2">FECHA DE NACIMIENTO</label>
                  <input
                    className="smallInput !mt-0"
                    type="date"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="labelTitle block text-left mb-2">CORREO ELECTRONICO</label>
                <input
                  className="smallInput !mt-0"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="tu@correo.com"
                />
              </div>

              <div className="mb-6">
                <label className="labelTitle block text-left mb-2">CONTRASENA</label>
                <input
                  className="smallInput !mt-0"
                  type="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="Minimo 6 caracteres"
                />
              </div>

              {error && <p className="errorText">{error}</p>}

              <button
                type="submit"
                className="primaryButton w-full py-4 text-base"
                disabled={cargando}
              >
                {cargando ? "CREANDO CUENTA..." : "CREAR CUENTA"}
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-[var(--color-text-muted)]">
              Ya tienes cuenta?{" "}
              <Link href="/login" className="text-[var(--color-accent-hover)] font-semibold hover:underline">
                Inicia sesion
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
