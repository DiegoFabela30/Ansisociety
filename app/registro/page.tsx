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

  const manejarRegistro = async () => {
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

    if (contrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
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

      router.push("/");
    } catch (err: unknown) {
      const errorCode =
        err && typeof err === "object" && "code" in err
          ? String(err.code)
          : "";

      if (errorCode === "auth/email-already-in-use") {
        setError("Ese correo ya está registrado.");
      } else if (errorCode === "auth/invalid-email") {
        setError("El correo no es válido.");
      } else if (errorCode === "auth/weak-password") {
        setError("La contraseña es demasiado débil.");
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
        <div className="brandBox">
          <div className="logoCircle" />
          <div>
            <h1 className="brandTitle">ANSISOCIETY</h1>
            <p className="brandSubtitle">APOYO EMOCIONAL DIGITAL</p>
          </div>
        </div>

        <Link href="/login" className="topButtonLink">
          <button className="topButton">Iniciar Sesión</button>
        </Link>
      </header>

      <section className="centerSection">
        <h2 className="mediumTitle">REGÍSTRATE</h2>

        <div className="formTwoCols">
          <div>
            <p className="labelTitle">NOMBRE</p>
            <input
              className="smallInput"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div>
            <p className="labelTitle">APELLIDOS</p>
            <input
              className="smallInput"
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </div>

          <div>
            <p className="labelTitle">GÉNERO</p>
            <input
              className="smallInput"
              type="text"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
          </div>

          <div>
            <p className="labelTitle">FECHA DE NACIMIENTO</p>
            <input
              className="smallInput"
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>
        </div>

        <div className="fullInputWrap">
          <p className="labelTitle">CORREO ELECTRÓNICO</p>
          <input
            className="smallInput"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="fullInputWrap">
          <p className="labelTitle">CONTRASEÑA</p>
          <input
            className="smallInput"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>

        <p className="authText">¿OLVIDASTE TU CONTRASEÑA?</p>
        <p className="authText">CLICK AQUÍ</p>

        {error && <p className="errorText">{error}</p>}

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button
            className="primaryButton"
            onClick={manejarRegistro}
            disabled={cargando}
          >
            {cargando ? "CREANDO..." : "CREAR CUENTA"}
          </button>
        </div>

        <h3
          style={{
            textAlign: "center",
            marginTop: 24,
            marginBottom: 12,
            fontFamily: "Times New Roman, serif",
            fontSize: "2rem",
            letterSpacing: "3px",
          }}
        >
          REGÍSTRATE CON:
        </h3>

        <div className="authIcons">
          <div className="iconMock">G</div>
          <div className="microsoftMock">
            <div style={{ background: "#f35325" }} />
            <div style={{ background: "#81bc06" }} />
            <div style={{ background: "#05a6f0" }} />
            <div style={{ background: "#ffba08" }} />
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