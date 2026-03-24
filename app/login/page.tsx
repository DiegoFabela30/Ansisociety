import Link from "next/link";

export default function LoginPage() {
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

        <Link href="/registro">
          <button className="topButton">Registrate</button>
        </Link>
      </header>

      <section className="centerSection">
        <h2 className="bigTitle">INICIA SESION CON TU CUENTA</h2>

        <div>
          <p className="labelTitle">CORREO ELECTRONICO</p>
          <input className="softInput" type="email" />
        </div>

        <div>
          <p className="labelTitle">CONTRASEÑA</p>
          <input className="softInput" type="password" />
        </div>

        <p className="authText">¿OLVIDASTE TU CONTRASEÑA?</p>
        <p className="authText">CLICK AQUI</p>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button className="primaryButton">ACCEDER</button>
        </div>

        <h3
          style={{
            textAlign: "center",
            marginTop: 34,
            marginBottom: 12,
            fontFamily: "Times New Roman, serif",
            fontSize: "2rem",
            letterSpacing: "3px",
          }}
        >
          INICIA SESION CON:
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