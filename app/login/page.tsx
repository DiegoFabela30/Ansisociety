import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="pageWrapper authPage">
      <div className="bgBlob bgBlob1"></div>
      <div className="bgBlob bgBlob2"></div>
      <div className="bgBlob bgBlob3"></div>

      <header className="topBar glassBar">
        <div className="brandBox">
          <div className="logoCircle" />
          <div>
            <h1 className="brandTitle">ANSISOCIETY</h1>
            <p className="brandSubtitle">APOYO EMOCIONAL DIGITAL</p>
          </div>
        </div>

        <Link href="/registro" className="topButtonLink">
          <button className="topButton">Regístrate</button>
        </Link>
      </header>

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
            <div className="fullInputWrap">
              <label className="labelTitle">CORREO ELECTRÓNICO</label>
              <input
                className="softInput modernInput"
                type="email"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div className="fullInputWrap">
              <label className="labelTitle">CONTRASEÑA</label>
              <input
                className="softInput modernInput"
                type="password"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <div className="forgotPasswordBox">
              <p className="authText modernAuthText">¿Olvidaste tu contraseña?</p>
              <button className="forgotLink">Recuperar acceso</button>
            </div>

            <div className="authActions">
              <button className="primaryButton modernPrimaryButton loginButton">
                ACCEDER
              </button>
            </div>

            <div className="dividerLine">
              <span>o continúa con</span>
            </div>

            <div className="authIcons modernAuthIcons">
              <button className="socialButton googleButton">
                <span className="iconMock modernIconMock">G</span>
                <span>Google</span>
              </button>

              <button className="socialButton microsoftButton">
                <div className="microsoftMock modernMicrosoftMock">
                  <div style={{ background: "#f35325" }} />
                  <div style={{ background: "#81bc06" }} />
                  <div style={{ background: "#05a6f0" }} />
                  <div style={{ background: "#ffba08" }} />
                </div>
                <span>Microsoft</span>
              </button>
            </div>

            <p className="bottomHelperText">
              ¿Aún no tienes cuenta?{" "}
              <Link href="/registro" className="inlineAuthLink">
                Crear una ahora
              </Link>
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