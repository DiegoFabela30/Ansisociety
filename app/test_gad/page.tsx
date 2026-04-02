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

    if (totalScore <= 4) return "Mínima ansiedad";
    if (totalScore <= 9) return "Ansiedad leve";
    if (totalScore <= 14) return "Ansiedad moderada";
    return "Ansiedad severa";
  }, [totalScore, completed]);

  const recommendation = useMemo(() => {
    if (!completed) return "";

    if (totalScore <= 4) {
      return "Tus respuestas muestran señales mínimas de ansiedad en este momento.";
    }
    if (totalScore <= 9) {
      return "Tus respuestas sugieren síntomas leves de ansiedad. Puede ayudarte mantener seguimiento emocional y técnicas de respiración.";
    }
    if (totalScore <= 14) {
      return "Tus respuestas sugieren ansiedad moderada. Sería recomendable buscar acompañamiento psicológico o apoyo profesional.";
    }
    return "Tus respuestas sugieren ansiedad severa. Es importante buscar orientación profesional lo antes posible.";
  }, [totalScore, completed]);

  const handleAnswer = (questionIndex: number, value: number) => {
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
  };

  return (
    <main className="gdaPage">
      {/* Fondo decorativo */}
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

      {/* Content */}
      <section className="gdaContainer">
        <div className="gdaIntro">
          <span className="gdaBadge">✦ Test de evaluación emocional</span>
          <h2 className="gdaTitle">TEST GAD-7</h2>
          <p className="gdaSubtitle">
            Responde con honestidad cómo te has sentido durante las últimas 2 semanas.
            Este resultado es orientativo y no sustituye una evaluación profesional.
          </p>
        </div>

        <div className="gdaCard">
          <div className="gdaCardHead">
            <h3 className="gdaSectionTitle">Cuestionario</h3>
            <div className="gdaScorePreview">
              Puntaje actual: <strong>{totalScore}</strong>/21
            </div>
          </div>

          <div className="gdaOptionsLegend">
            {options.map((opt) => (
              <span key={opt.value} className="legendPill">
                {opt.label} ({opt.value})
              </span>
            ))}
          </div>

          <div className="gdaQuestions">
            {questions.map((question, index) => (
              <div key={index} className="gdaQuestionCard">
                <div className="gdaQuestionTop">
                  <span className="gdaQuestionNumber">{index + 1}</span>
                  <p className="gdaQuestionText">{question}</p>
                </div>

                <div className="gdaRadioGrid">
                  {options.map((opt) => (
                    <label key={opt.value} className="gdaRadioOption">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        checked={answers[index] === opt.value}
                        onChange={() => handleAnswer(index, opt.value)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="gdaExtraSection">
            <div className="gdaExtraBlock">
              <label className="fieldLabel">
                ¿Cuándo comenzaron los síntomas?
              </label>
              <input
                type="text"
                className="regInput"
                placeholder="Ej. Hace 3 semanas / Desde enero / No estoy seguro"
                value={symptomStart}
                onChange={(e) => setSymptomStart(e.target.value)}
              />
            </div>

            <div className="gdaExtraBlock">
              <label className="fieldLabel">
                Si marcaste algún problema, ¿qué tan difícil te han hecho estos síntomas tu vida diaria?
              </label>
              <div className="gdaDifficultyGrid">
                {functionalOptions.map((opt) => (
                  <label key={opt.value} className="gdaDifficultyOption">
                    <input
                      type="radio"
                      name="difficulty"
                      checked={difficulty === opt.value}
                      onChange={() => setDifficulty(opt.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="gdaActions">
            <button className="modernPrimaryButton" onClick={handleSubmit}>
              Calcular resultado
            </button>
          </div>
        </div>

        {submitted && completed && (
          <div className="gdaResultCard">
            <span className="resultBadge">Resultado del test</span>
            <h3 className="gdaResultTitle">{interpretation}</h3>

            <div className="gdaResultScore">
              <span className="gdaResultNumber">{totalScore}</span>
              <span className="gdaResultOver">/ 21</span>
            </div>

            <p className="gdaResultText">{recommendation}</p>

            <div className="gdaScaleBox">
              <div><strong>0–4:</strong> Mínima ansiedad</div>
              <div><strong>5–9:</strong> Ansiedad leve</div>
              <div><strong>10–14:</strong> Ansiedad moderada</div>
              <div><strong>15–21:</strong> Ansiedad severa</div>
            </div>

            {difficulty >= 0 && (
              <p className="gdaHelperText">
                <strong>Impacto funcional reportado:</strong>{" "}
                {functionalOptions.find((opt) => opt.value === difficulty)?.label}
              </p>
            )}

            {symptomStart.trim() && (
              <p className="gdaHelperText">
                <strong>Inicio de síntomas:</strong> {symptomStart}
              </p>
            )}

            <div className="gdaWarningBox">
              Este test es una herramienta de orientación. Si tus síntomas afectan tu vida diaria
              o te sientes sobrepasado/a, busca apoyo profesional.
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="glassFooter">
        <div>CONTACTO</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}