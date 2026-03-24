import Link from "next/link";

export default function HomePage() {
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

        <div style={{ display: "flex", gap: "14px" }}>
          <Link href="/registro">
            <button className="topButton">Registrate</button>
          </Link>

          <Link href="/login">
            <button className="topButton">Iniciar Sesion</button>
          </Link>
        </div>
      </header>

      <section className="centerSection">
        <h2
          style={{
            textAlign: "center",
            fontFamily: "Times New Roman, serif",
            fontSize: "2.9rem",
            letterSpacing: "2px",
            marginTop: "10px",
            marginBottom: "26px",
          }}
        >
          Una sola app para <br /> gestionar la ansiedad
        </h2>

        <p
          style={{
            textAlign: "center",
            fontFamily: "Times New Roman, serif",
            fontSize: "1.3rem",
            marginBottom: "18px",
            letterSpacing: "1px",
          }}
        >
          Tips y consejos
        </p>

        <div
          style={{
            background: "#80cfe0",
            maxWidth: "1040px",
            margin: "0 auto 34px auto",
            borderRadius: "10px",
            padding: "16px 24px",
            textAlign: "center",
            fontStyle: "italic",
            fontFamily: "Times New Roman, serif",
            fontSize: "1.1rem",
          }}
        >
          Escribir cómo te sientes y qué haces en ese momento te ayudará a
          identificarte mejor. Recuerda usar el bloc de notas de ANSISOCIETY
          para llevar un mejor seguimiento.
        </div>

        <h3
          style={{
            textAlign: "center",
            fontFamily: "Times New Roman, serif",
            fontSize: "1.5rem",
            letterSpacing: "1px",
            marginBottom: "26px",
          }}
        >
          Recursos
        </h3>

        <div className="cardsGrid3">
          <Link href="/foro" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="cardBox">
              <h3
                style={{
                  fontFamily: "Times New Roman, serif",
                  fontSize: "1.2rem",
                  letterSpacing: "1px",
                  marginBottom: "14px",
                }}
              >
                FORO
              </h3>
              <p style={{ fontSize: "1rem", lineHeight: 1.4 }}>
                Espacio moderado para compartir y recibir apoyo entre pares.
              </p>
            </div>
          </Link>

          <Link href="/notas" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="cardBox">
              <h3
                style={{
                  fontFamily: "Times New Roman, serif",
                  fontSize: "1.2rem",
                  letterSpacing: "1px",
                  marginBottom: "14px",
                }}
              >
                BLOC DE NOTAS
              </h3>
              <p style={{ fontSize: "1rem", lineHeight: 1.4 }}>
                Registro de pensamientos y emociones mediante escritura.
              </p>
            </div>
          </Link>

          <Link href="/recursos" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="cardBox">
              <h3
                style={{
                  fontFamily: "Times New Roman, serif",
                  fontSize: "1.2rem",
                  letterSpacing: "1px",
                  marginBottom: "14px",
                }}
              >
                RECURSOS MULTIMEDIA
              </h3>
              <p style={{ fontSize: "1rem", lineHeight: 1.4 }}>
                Música, ejercicios de respiración y videos para alivio inmediato.
              </p>
            </div>
          </Link>
        </div>

        <h3
          style={{
            textAlign: "center",
            fontFamily: "Times New Roman, serif",
            fontSize: "1.5rem",
            letterSpacing: "1px",
            marginBottom: "18px",
          }}
        >
          Recursos rápidos
        </h3>

        <Link
          href="/recursos"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "block",
            width: "650px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "#80cfe0",
              borderRadius: "10px",
              padding: "14px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <div>
              <p style={{ fontWeight: 700, marginBottom: 4 }}>RESPIRACIÓN GUIADA</p>
              <p>Guía de respiración de 2 minutos para reducir la ansiedad</p>
            </div>

            <span style={{ fontSize: "2rem" }}>▶</span>
          </div>
        </Link>
      </section>

      <footer className="contactBar">
        <div>CONTACTO:</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}