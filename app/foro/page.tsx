import Link from "next/link";

export default function ForoPage() {
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
          FORO INTERACTIVO
        </h2>

        <div className="twoCols">
          <aside className="sidebarPanel">
            <h3 className="sidebarTitle">TEMAS RECIENTES</h3>
            <button className="sideButton">Ansiedad en clases</button>
            <button className="sideButton">Respiración</button>
            <button className="sideButton">Cómo me siento hoy</button>
          </aside>

          <div className="mainPanel">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h3
                className="labelTitle"
                style={{ textAlign: "left", marginBottom: 0 }}
              >
                NUEVA PUBLICACION
              </h3>

              <button className="primaryButton">PUBLICAR</button>
            </div>

            <textarea
              className="forumTextarea"
              placeholder="Escribe aquí tu mensaje para la comunidad..."
            />

            <div style={{ marginTop: 18 }}>
              <div className="forumPost">
                <div className="forumAuthor">Usuario 1</div>
                <p>
                  Hoy me ayudó mucho escribir lo que sentía antes de contestar el
                  test.
                </p>
              </div>

              <div className="forumPost">
                <div className="forumAuthor">Usuario 2</div>
                <p>
                  Los ejercicios de respiración me ayudaron a bajar la tensión
                  antes de dormir.
                </p>
              </div>

              <div className="forumPost">
                <div className="forumAuthor">Usuario 3</div>
                <p>
                  Compartir aquí me hace sentir menos solo con lo que estoy
                  pasando.
                </p>
              </div>
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