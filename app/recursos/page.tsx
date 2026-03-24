import Link from "next/link";

export default function RecursosPage() {
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

        <Link href="/perfil">
          <button className="topButton">PERFIL</button>
        </Link>
      </header>

      <section className="centerSection">
        <h2
          className="mediumTitle"
          style={{ letterSpacing: "2px" }}
        >
          Recursos multimedia
        </h2>

        <div className="cardsGrid2">
          <div className="resourceCard">
            <h3>Musica relajante</h3>

            <div className="audioItem">
              <div>
                <strong>Pista de audio 1</strong>
                <p>Descripcion de la pista</p>
              </div>
              <span style={{ fontSize: "1.8rem" }}>▶</span>
            </div>

            <div className="audioItem">
              <div>
                <strong>Pista de audio 2</strong>
                <p>Descripcion de la pista</p>
              </div>
              <span style={{ fontSize: "1.8rem" }}>▶</span>
            </div>
          </div>

          <div className="resourceCard">
            <h3>Ejercicio de respiración</h3>
            <div className="videoMock" />
          </div>

          <div className="resourceCard">
            <h3>Meditación guiada</h3>
            <div
              style={{
                width: "85%",
                height: "48px",
                background: "#efefef",
                margin: "26px auto 0 auto",
              }}
            />
          </div>

          <div className="resourceCard">
            <h3>Videos relajantes</h3>
            <div className="videoMock" />
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