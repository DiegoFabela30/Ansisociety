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
    console.log("BOTON PRESIONADO");

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

      console.log("Usuario creado:", usuarioCreado.user);

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

          {/* SELECT GENERO */}
          <div>
            <p className="labelTitle">GÉNERO</p>
            <select
              className="smallInput"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="">Selecciona una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Prefiero no decirlo">
                Prefiero no decirlo
              </option>
            </select>
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
      </section>

      <footer className="contactBar">
        <div>CONTACTO:</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}