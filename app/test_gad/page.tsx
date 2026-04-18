"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const questions = [
  "Sentirse nervioso, ansioso o muy alterado",
  "No poder detener o controlar la preocupación",
  "Preocuparse demasiado por cosas diferentes",
  "Dificultad para relajarse",
  "Estar tan inquieto que es difícil quedarse quieto",
  "Molestarse o irritarse con facilidad",
  "Sentir miedo, como si algo horrible pudiera suceder",
];

const options = [
  { label: "De nada", value: 0 },
  { label: "Varios días", value: 1 },
  { label: "Más de la mitad de los días", value: 2 },
  { label: "Casi todos los días", value: 3 },
];

const functionalOptions = [
  { label: "No es nada difícil", value: 0 },
  { label: "Algo difícil", value: 1 },
  { label: "Muy difícil", value: 2 },
  { label: "Extremadamente difícil", value: 3 },
];

export default function TestGDAPage() {
  const [answers, setAnswers] = useState<number[]>(Array(7).fill(-1));
  const [difficulty, setDifficulty] = useState<number>(-1);
  const [symptomStart, setSymptomStart] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totalScore = useMemo(() => {
    return answers.reduce((acc, val) => (val >= 0 ? acc + val : acc), 0);
  }, [answers]);

  const completed = answers.every((a) => a >= 0);

  const interpretation = useMemo(() => {
    if (!completed) return "";
    if (totalScore <= 4)  return "Mínima ansiedad";
    if (totalScore <= 9)  return "Ansiedad leve";
    if (totalScore <= 14) return "Ansiedad moderada";
    return "Ansiedad severa";
  }, [totalScore, completed]);

  const recommendation = useMemo(() => {
    if (!completed) return "";
    if (totalScore <= 4)
      return "Tus respuestas muestran señales mínimas de ansiedad en este momento.";
    if (totalScore <= 9)
      return "Tus respuestas sugieren síntomas leves de ansiedad. Puede ayudarte mantener seguimiento emocional y técnicas de respiración.";
    if (totalScore <= 14)
      return "Tus respuestas sugieren ansiedad moderada. Sería recomendable buscar acompañamiento psicológico o apoyo profesional.";
    return "Tus respuestas sugieren ansiedad severa. Es importante buscar orientación profesional lo antes posible.";
  }, [totalScore, completed]);

  const handleAnswer = (questionIndex: number, value: number) => {
    // Bloquear cambios una vez enviado
    if (submitted) return;
    const updated = [...answers];
    updated[questionIndex] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    if (!completed) {
      alert("Por favor responde todas las preguntas del test.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Reiniciar todo el test
  const handleReset = () => {
    setAnswers(Array(7).fill(-1));
    setDifficulty(-1);
    setSymptomStart("");
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="gdaPage">
      <div className="bgBlob bgBlob1" />
      <div className="bgBlob bgBlob2" />
      <div className="bgBlob bgBlob3" />

      {/* Header */}
      <header className="glassBar">
        <div className="brandBox">
          <div className="logoCircle" />
          <div>
            <h1 className="brandTitle">ANSISOCIETY</h1>
            <p className="brandSubtitle">APOYO EMOCIONAL DIGITAL</p>
          </div>
        </div>
        <Link href="/">
          <button className="btnOutline">Menú</button>
        </Link>
      </header>

      <section className="gdaContainer">
        <div className="gdaIntro">
          <span className="gdaBadge">✦ Test de evaluación emocional</span>
          <h2 className="gdaTitle">TEST GAD-7</h2>
          <p className="gdaSubtitle">
            Responde con honestidad cómo te has sentido durante las últimas 2 semanas.
            Este resultado es orientativo y no sustituye una evaluación profesional.
          </p>
        </div>

        {/* Tarjeta del cuestionario — opacidad reducida al enviarse */}
        <div className={`gdaCard${submitted ? " gdaCardBlocked" : ""}`}>
          <div className="gdaCardHead">
            
            {/* Indicador visual de bloqueado */}
            {submitted && (
              <span className="gdaLockedBadge">✓ Respuestas enviadas</span>
            )}
          </div>

         

          <div className="gdaQuestions">
            {questions.map((question, index) => (
              <div
                key={index}
                className={`gdaQuestionCard${submitted ? " gdaQuestionLocked" : ""}`}
              >
                <div className="gdaQuestionTop">
                  <span className="gdaQuestionNumber">{index + 1}</span>
                  <p className="gdaQuestionText">{question}</p>
                </div>
                <div className="gdaRadioGrid">
                  {options.map((opt) => (
                    <label
                      key={opt.value}
                      className={`gdaRadioOption${submitted ? " gdaRadioLocked" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        checked={answers[index] === opt.value}
                        onChange={() => handleAnswer(index, opt.value)}
                        disabled={submitted}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>


          {/*
          <div className="gdaExtraSection">
            <div className="gdaExtraBlock">
              <label className="fieldLabel">¿Cuándo comenzaron los síntomas?</label>
              <input
                type="text"
                className="regInput"
                placeholder="Ej. Hace 3 semanas / Desde enero / No estoy seguro"
                value={symptomStart}
                onChange={(e) => !submitted && setSymptomStart(e.target.value)}
                disabled={submitted}
                style={submitted ? { opacity: 0.6, cursor: "not-allowed" } : {}}
              />
            </div>

            <div className="gdaExtraBlock">
              <label className="fieldLabel">
                Si marcaste algún problema, ¿qué tan difícil te han hecho estos síntomas tu vida diaria?
              </label>
              <div className="gdaDifficultyGrid">
                {functionalOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`gdaDifficultyOption${submitted ? " gdaRadioLocked" : ""}`}
                  >
                    <input
                      type="radio"
                      name="difficulty"
                      checked={difficulty === opt.value}
                      onChange={() => !submitted && setDifficulty(opt.value)}
                      disabled={submitted}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          /*}

          {/* Botón calcular — oculto una vez enviado */}
          {!submitted && (
            <div className="gdaActions">
              <button className="modernPrimaryButton" onClick={handleSubmit}>
                Calcular resultado
              </button>
            </div>
          )}
        </div>

        {/* ── RESULTADO ── */}
        {submitted && completed && (
          <div id="resultado" className="gdaResultCard">
            <span className="resultBadge">Resultado del test</span>
            <h3 className="gdaResultTitle">{interpretation}</h3>

            <div className="gdaResultScore">
              <span className="gdaResultNumber">{totalScore}</span>
              <span className="gdaResultOver">/ 21</span>
            </div>

            <p className="gdaResultText">{recommendation}</p>

            {/* Escala: fila activa en negrita */}
            <div className="gdaScaleBox">
              <div style={{ fontWeight: totalScore <= 4 ? 700 : 400 }}>
                <strong>0–4:</strong> Mínima ansiedad
              </div>
              <div style={{ fontWeight: totalScore >= 5 && totalScore <= 9 ? 700 : 400 }}>
                <strong>5–9:</strong> Ansiedad leve
              </div>
              <div style={{ fontWeight: totalScore >= 10 && totalScore <= 14 ? 700 : 400 }}>
                <strong>10–14:</strong> Ansiedad moderada
              </div>
              <div style={{ fontWeight: totalScore >= 15 ? 700 : 400 }}>
                <strong>15–21:</strong> Ansiedad severa
              </div>
            </div>

            {difficulty >= 0 && (
              <p className="gdaHelperText">
                <strong>Impacto en tu vida diaria:</strong>{" "}
                {functionalOptions.find((opt) => opt.value === difficulty)?.label}
              </p>
            )}

            {symptomStart.trim() && (
              <p className="gdaHelperText">
                <strong>Inicio de síntomas:</strong> {symptomStart}
              </p>
            )}

            {/* MÍNIMA → recursos multimedia */}
            {totalScore <= 4 && (
              <div className="gdaActionBox gdaActionMinima">
                <span className="gdaActionIcon">🎵</span>
                <div className="gdaActionContent">
                  <p className="gdaActionTitle">¡Vas muy bien!</p>
                  <p className="gdaActionDesc">
                    Tus niveles de ansiedad son mínimos. Para mantener ese
                    bienestar, te recomendamos explorar nuestros recursos
                    multimedia: música relajante, ejercicios de respiración
                    y meditación guiada.
                  </p>
                  <div className="gdaActionBtnWrap">
                    <Link href="/recursos">
                      <button className="gdaActionBtn gdaActionBtnTeal">
                        Ver recursos multimedia →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* LEVE → crear cuenta */}
            {totalScore >= 5 && totalScore <= 9 && (
              <div className="gdaActionBox gdaActionLeve">
                <span className="gdaActionIcon">🌱</span>
                <div className="gdaActionContent">
                  <p className="gdaActionTitle">Da el primer paso</p>
                  <p className="gdaActionDesc">
                    Presentas síntomas leves de ansiedad. Crear una cuenta en
                    ANSISOCIETY te permitirá llevar seguimiento de tus emociones,
                    acceder al diario emocional, al foro comunitario y a recursos
                    de apoyo personalizados.
                  </p>
                  <div className="gdaActionBtnWrap">
                    <Link href="/registro">
                      <button className="gdaActionBtn gdaActionBtnPrimary">
                        Crear cuenta gratis →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* MODERADA → crear cuenta */}
            {totalScore >= 10 && totalScore <= 14 && (
              <div className="gdaActionBox gdaActionModerada">
                <span className="gdaActionIcon">🤝</span>
                <div className="gdaActionContent">
                  <p className="gdaActionTitle">No tienes que enfrentarlo solo</p>
                  <p className="gdaActionDesc">
                    Tus síntomas indican ansiedad moderada. Te recomendamos
                    crear una cuenta para acceder a todas las herramientas de
                    apoyo emocional de ANSISOCIETY: foro, diario, recursos y
                    seguimiento de tus resultados a lo largo del tiempo.
                  </p>
                  <div className="gdaActionBtnWrap">
                    <Link href="/registro">
                      <button className="gdaActionBtn gdaActionBtnPrimary">
                        Crear cuenta gratis →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* SEVERA → crear cuenta + buscar profesional */}
            {totalScore >= 15 && (
              <>
                <div className="gdaActionBox gdaActionSevera">
                  <span className="gdaActionIcon">❤️</span>
                  <div className="gdaActionContent">
                    <p className="gdaActionTitle">Tu bienestar es lo primero</p>
                    <p className="gdaActionDesc">
                      Tus síntomas indican un nivel severo de ansiedad. Mientras
                      buscas apoyo profesional, crear una cuenta en ANSISOCIETY
                      te dará acceso a recursos de apoyo y una comunidad que
                      te acompañará en este proceso.
                    </p>
                    <div className="gdaActionBtnWrap">
                      <Link href="/registro">
                        <button className="gdaActionBtn gdaActionBtnPrimary">
                          Crear cuenta gratis →
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="gdaActionBox gdaActionProfesional">
                  <span className="gdaActionIcon">🏥</span>
                  <div className="gdaActionContent">
                    <p className="gdaActionTitle">Busca ayuda profesional</p>
                    <p className="gdaActionDesc">
                      Un psicólogo puede ayudarte a manejar lo que estás viviendo.
                      No estás solo/a — dar este paso es una muestra de fortaleza.
                    </p>
                    <div className="gdaActionBtnWrap">
                      <button
                        className="gdaActionBtn gdaActionBtnProfesionalBtn"
                        onClick={() =>
                          window.open(
                            "https://www.google.com/search?q=psic%C3%B3logos+cerca+de+mi",
                            "_blank"
                          )
                        }
                      >
                        Buscar psicólogos cerca de mí →
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="gdaWarningBox">
              Este test es una herramienta de orientación. Si tus síntomas
              afectan tu vida diaria o te sientes sobrepasado/a, busca apoyo
              profesional.
            </div>

            {/* Botón reiniciar test */}
            <div className="gdaResetWrap">
              <button className="gdaResetBtn" onClick={handleReset}>
                ↺ Realizar el test nuevamente
              </button>
            </div>
          </div>
        )}
      </section>

      <footer className="glassFooter">
        <div>CONTACTO</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}