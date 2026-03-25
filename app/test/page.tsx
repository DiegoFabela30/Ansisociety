"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: 1,
    question: "En las ultimas dos semanas, con que frecuencia te has sentido nervioso/a o con los nervios de punta?",
  },
  {
    id: 2,
    question: "Con que frecuencia no has podido dejar de preocuparte o controlar la preocupacion?",
  },
  {
    id: 3,
    question: "Con que frecuencia te has preocupado demasiado por diferentes cosas?",
  },
  {
    id: 4,
    question: "Con que frecuencia has tenido dificultad para relajarte?",
  },
  {
    id: 5,
    question: "Con que frecuencia te has sentido tan inquieto/a que era dificil quedarte quieto/a?",
  },
  {
    id: 6,
    question: "Con que frecuencia te has irritado o molestado facilmente?",
  },
  {
    id: 7,
    question: "Con que frecuencia has sentido miedo de que algo terrible pudiera pasar?",
  },
];

const options = [
  { value: 0, label: "Nunca", description: "0 dias" },
  { value: 1, label: "Varios dias", description: "1-6 dias" },
  { value: 2, label: "Mas de la mitad", description: "7-11 dias" },
  { value: 3, label: "Casi todos los dias", description: "12-14 dias" },
];

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);

  const getResult = () => {
    if (totalScore <= 4) return { level: "Minima", color: "text-green-600", bg: "bg-green-100" };
    if (totalScore <= 9) return { level: "Leve", color: "text-yellow-600", bg: "bg-yellow-100" };
    if (totalScore <= 14) return { level: "Moderada", color: "text-orange-600", bg: "bg-orange-100" };
    return { level: "Severa", color: "text-red-600", bg: "bg-red-100" };
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <main className="pageWrapper">
      <header className="topBar">
        <Link href="/" className="brandBox no-underline">
          <div className="logoCircle" />
          <div>
            <h1 className="brandTitle">ANSISOCIETY</h1>
            <p className="brandSubtitle">APOYO EMOCIONAL DIGITAL</p>
          </div>
        </Link>

        <Link href="/dashboard">
          <button className="topButton">MENU</button>
        </Link>
      </header>

      <section className="centerSection flex items-center justify-center">
        <div className="w-full max-w-2xl">
          {!showResults ? (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl md:text-3xl tracking-wide mb-2 text-[var(--color-text-primary)]">
                  Test de Ansiedad GAD-7
                </h2>
                <p className="text-[var(--color-text-muted)]">
                  Responde basandote en las ultimas 2 semanas
                </p>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm text-[var(--color-text-muted)] mb-2">
                  <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-[var(--color-card)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[#4ea6ff] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-fade-in-up">
                <p className="text-lg text-[var(--color-text-primary)] mb-8 text-center leading-relaxed">
                  {questions[currentQuestion].question}
                </p>

                <div className="space-y-3">
                  {options.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 rounded-xl border-2 border-transparent bg-gradient-to-r from-[var(--color-card)] to-[var(--color-cyan-light)] hover:border-[var(--color-accent)] hover:shadow-md transition-all duration-300 text-left group animate-fade-in-up ${
                        answers[currentQuestion] === option.value ? "!border-[var(--color-accent)] shadow-md" : ""
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-[var(--color-text-primary)]">{option.label}</p>
                          <p className="text-sm text-[var(--color-text-muted)]">{option.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 border-[var(--color-text-muted)] group-hover:border-[var(--color-accent)] transition-colors flex items-center justify-center ${
                          answers[currentQuestion] === option.value ? "!border-[var(--color-accent)] bg-[var(--color-accent)]" : ""
                        }`}>
                          {answers[currentQuestion] === option.value && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {currentQuestion > 0 && (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    className="mt-6 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1 mx-auto"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Pregunta anterior
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${getResult().bg} flex items-center justify-center`}>
                  <span className={`text-3xl font-bold ${getResult().color}`}>{totalScore}</span>
                </div>

                <h2 className="font-serif text-2xl md:text-3xl tracking-wide mb-2 text-[var(--color-text-primary)]">
                  Resultado del Test
                </h2>
                
                <p className={`text-xl font-semibold mb-4 ${getResult().color}`}>
                  Ansiedad {getResult().level}
                </p>

                <div className="bg-[var(--color-card)]/30 rounded-xl p-4 mb-6 text-left">
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {totalScore <= 4 && "Tus respuestas indican niveles minimos de ansiedad. Sigue cuidando tu bienestar emocional."}
                    {totalScore > 4 && totalScore <= 9 && "Tus respuestas sugieren ansiedad leve. Te recomendamos usar nuestros recursos de relajacion."}
                    {totalScore > 9 && totalScore <= 14 && "Tus respuestas indican ansiedad moderada. Considera hablar con un profesional de salud mental."}
                    {totalScore > 14 && "Tus respuestas sugieren ansiedad severa. Te recomendamos buscar ayuda profesional lo antes posible."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button onClick={resetTest} className="primaryButton">
                    Repetir Test
                  </button>
                  <Link href="/recursos">
                    <button className="primaryButton !bg-gradient-to-r from-[var(--color-accent)] to-[#4ea6ff] !text-white">
                      Ver Recursos
                    </button>
                  </Link>
                </div>

                <p className="mt-6 text-xs text-[var(--color-text-muted)]">
                  Este test es orientativo y no reemplaza una evaluacion profesional.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="contactBar">
        <div>CONTACTO:</div>
        <div>soporteansisociety@helper.com</div>
      </footer>
    </main>
  );
}
