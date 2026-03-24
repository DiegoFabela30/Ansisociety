import Link from "next/link";

export default function NotasPage() {
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

        <Link href="/">
          <button className="topButton">MENU</button>
        </Link>
      </header>

      <section style={{ padding: 0 }}>
        <h2 className="mediumTitle" style={{ marginTop: 10, marginBottom: 12 }}>
          BLOC DE NOTAS
        </h2>

        <div className="twoCols">
          <aside className="sidebarPanel">
            <h3 className="sidebarTitle">NOTAS GUARDADAS</h3>
            <button className="sideButton">NOTA 1</button>
            <button className="sideButton">NOTA 2</button>
            <button className="sideButton">NOTA 3</button>
          </aside>

          <div className="mainPanel">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                className="labelTitle"
                style={{ textAlign: "left", marginBottom: 0 }}
              >
                TITULO
              </h3>

              <button className="primaryButton">GUARDAR</button>
            </div>

            <textarea
              className="noteArea"
              placeholder="Escribe aquí tu nota..."
            />

            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <button className="primaryButton">ANALIZAR</button>
            </div>
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