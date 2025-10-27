import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import "./styles/Practica.css";

export const Practica = () => {
  const [openResolution, setOpenResolution] = useState(null);

  const toggleResolution = (id) => {
    setOpenResolution(openResolution === id ? null : id);
  };

  const config = {
    loader: { load: ["input/tex", "output/chtml"] },
    tex: {
      inlineMath: [["\\(", "\\)"]],
      displayMath: [["$$", "$$"]],
    },
  };

  // --- EJERCICIO 1a ---
  const steps_1a = [
    {
      title: "Definición de parámetros y ecuación genérica",
      explanation:
        "Se tiene y' = -3x²y con y(0) = 3 y paso h = 0.1. El objetivo es hallar y(0.5). Se aplica el método de Taylor de segundo orden.",
      math: `
        $$y' = f(x,y) = -3x^2 y$$
        $$y'' = -6xy - 3x^2y' = -6xy + 9x^4y$$
        $$y_{n+1} = y_n + h y'_n + \\frac{h^2}{2!} y''_n$$
        $$x_0 = 0, \\; y_0 = 3, \\; h = 0.1, \\; N = 5$$
      `,
    },
    {
      title: "Iteración 1 (n = 0): Cálculo de y(0.1)",
      explanation: "Sustituyendo x₀ = 0, y₀ = 3 en la ecuación de Taylor.",
      math: `
        $$y'_0 = -3(0)^2(3) = 0$$
        $$y''_0 = -6(0)(3) + 9(0)^4(3) = 0$$
        $$y_1 = 3 + 0.1(0) + 0.005(0) = 3$$
        $$\\boxed{y(0.1) = 3}$$
      `,
    },
    {
      title: "Iteración 2 (n = 1): Cálculo de y(0.2)",
      explanation: "Usando x₁ = 0.1, y₁ = 3.",
      math: `
        $$y'_1 = -3(0.1)^2(3) = -0.09$$
        $$y''_1 = -6(0.1)(3) + 9(0.1)^4(3) = -1.8 + 0.0027 = -1.7973$$
        $$y_2 = 3 + 0.1(-0.09) + 0.005(-1.7973) = 2.9895$$
        $$\\boxed{y(0.2) \\approx 2.9895}$$
      `,
    },
    {
      title: "Iteración 3 (n = 2): Cálculo de y(0.3)",
      explanation: "Usando x₂ = 0.2, y₂ = 2.9895.",
      math: `
        $$y'_2 = -3(0.2)^2(2.9895) = -0.3587$$
        $$y''_2 = -6(0.2)(2.9895) + 9(0.2)^4(2.9895) = -3.5874 + 0.043 = -3.544$$
        $$y_3 = 2.9895 + 0.1(-0.3587) + 0.005(-3.544) = 2.9490$$
        $$\\boxed{y(0.3) \\approx 2.9490}$$
      `,
    },
    {
      title: "Iteración 4 (n = 3): Cálculo de y(0.4)",
      explanation: "Usando x₃ = 0.3, y₃ = 2.9490.",
      math: `
        $$y'_3 = -3(0.3)^2(2.9490) = -0.7959$$
        $$y''_3 = -6(0.3)(2.9490) + 9(0.3)^4(2.9490) = -5.308 + 0.215 = -5.093$$
        $$y_4 = 2.9490 + 0.1(-0.7959) + 0.005(-5.093) = 2.8685$$
        $$\\boxed{y(0.4) \\approx 2.8685}$$
      `,
    },
    {
      title: "Iteración 5 (n = 4): Cálculo de y(0.5)",
      explanation: "Usando x₄ = 0.4, y₄ = 2.8685 para hallar el valor final.",
      math: `
        $$y'_4 = -3(0.4)^2(2.8685) = -1.377$$
        $$y''_4 = -6(0.4)(2.8685) + 9(0.4)^4(2.8685) = -6.883 + 0.663 = -6.220$$
        $$y_5 = 2.8685 + 0.1(-1.377) + 0.005(-6.220) = 2.7217$$
        $$\\boxed{y(0.5) \\approx 2.7217}$$
      `,
    },
  ];

  // --- EJERCICIO 1d (corregido) ---
  const steps_1d = [
    {
      title: "Definición y parámetros",
      explanation:
        "La EDO es y' = (1/x)(y² + y), con y(1) = -2, paso h = 0.5 y rango 1 ≤ x ≤ 3.",
      math: `
        $$y' = \\frac{1}{x}(y^2 + y)$$
        $$y'' = -\\frac{1}{x^2}(y^2 + y) + \\frac{1}{x^2}(2y + 1)(y^2 + y)$$
        $$x_0 = 1, \\; y_0 = -2, \\; h = 0.5, \\; N = 4$$
        $$\\text{Puntos: } x_0 = 1, x_1 = 1.5, x_2 = 2.0, x_3 = 2.5, x_4 = 3.0$$
      `,
    },
    {
      title: "Iteración 1 (n = 0): Cálculo de y(1.5)",
      explanation: "Usando x₀ = 1, y₀ = -2.",
      math: `
        $$y'_0 = \\frac{1}{1}((-2)^2 + (-2)) = 2$$
        $$y''_0 = -\\frac{1}{1^2}(2) + \\frac{1}{1^2}(2(-2)+1)(2) = -2 + (-3)(2) = -8$$
        $$y_1 = -2 + 0.5(2) + 0.125(-8) = -2$$
        $$\\boxed{y(1.5) = -2}$$
      `,
    },
    {
      title: "Iteración 2 (n = 1): Cálculo de y(2.0)",
      explanation: "Usando x₁ = 1.5, y₁ = -2.",
      math: `
        $$y'_1 = \\frac{1}{1.5}((-2)^2 + (-2)) = \\frac{2}{1.5} = 1.3333$$
        $$y''_1 = -\\frac{1}{1.5^2}(2) + \\frac{1}{1.5^2}(2(-2)+1)(2) = -0.8889 - 2.6667 = -3.5556$$
        $$y_2 = -2 + 0.5(1.3333) + 0.125(-3.5556) = -1.7777$$
        $$\\boxed{y(2.0) \\approx -1.778}$$
      `,
    },
    {
      title: "Iteración 3 (n = 2): Cálculo de y(2.5)",
      explanation: "Usando x₂ = 2.0, y₂ = -1.778.",
      math: `
        $$y'_2 = \\frac{1}{2.0}((-1.778)^2 + (-1.778)) = 0.890$$
        $$y''_2 = -\\frac{1}{4}(0.890) + \\frac{1}{4}(2(-1.778)+1)(0.890) = -0.223 - 0.713 = -0.936$$
        $$y_3 = -1.778 + 0.5(0.890) + 0.125(-0.936) = -1.388$$
        $$\\boxed{y(2.5) \\approx -1.388}$$
      `,
    },
    {
      title: "Iteración 4 (n = 3): Cálculo de y(3.0)",
      explanation: "Usando x₃ = 2.5, y₃ = -1.388.",
      math: `
        $$y'_3 = \\frac{1}{2.5}((-1.388)^2 + (-1.388)) = 0.303$$
        $$y''_3 = -\\frac{1}{2.5^2}(0.303) + \\frac{1}{2.5^2}(2(-1.388)+1)(0.303) = -0.048 - 0.320 = -0.368$$
        $$y_4 = -1.388 + 0.5(0.303) + 0.125(-0.368) = -1.259$$
        $$\\boxed{y(3.0) \\approx -1.259}$$
      `,
    },
  ];

  const renderCard = (id, title, edo, condition, step, goal, steps) => (
    <div className="card">
      <h2>{title}</h2>
      <MathJax>
        <p><b>EDO:</b> {`\\(${edo}\\)`}</p>
        <p><b>Condición inicial:</b> {`\\(${condition}\\)`}</p>
        <p><b>Paso:</b> {`\\(h=${step}\\)`}</p>
        <p><b>Objetivo:</b> {goal}</p>
      </MathJax>

      <button
        className={`toggle-button ${openResolution === id ? "open" : "closed"}`}
        onClick={() => toggleResolution(id)}
      >
        {openResolution === id ? "Cerrar resolución" : "Ver resolución"}
      </button>

      {openResolution === id && (
        <div className="resolution-container">
          <h3>Resolución paso a paso</h3>
          {steps.map((s, i) => (
            <div key={i} className="step">
              <p><b>Paso {i + 1}: {s.title}</b></p>
              <p className="explicacion">{s.explanation}</p>
              <MathJax>{s.math}</MathJax>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <MathJaxContext version={3} config={config}>
      <div className="practica-container">
        <h1>Práctica de Ecuaciones Diferenciales Ordinarias (EDOs)</h1>
        <p>Ejercicios resueltos utilizando el <b>Método de Taylor de Grado 2</b>.</p>

        {renderCard(
          "ejercicio1a",
          "Ejercicio 1a",
          "y' = -3x^2 y",
          "y(0) = 3",
          "0.1",
          "Hallar y(0.5)",
          steps_1a
        )}

        {renderCard(
          "ejercicio1d",
          "Ejercicio 1d",
          "y' = \\frac{1}{x}(y^2 + y)",
          "y(1) = -2, 1 ≤ x ≤ 3",
          "0.5",
          "Hallar y(3) y mostrar todas las iteraciones.",
          steps_1d
        )}
      </div>
    </MathJaxContext>
  );
};

export default Practica;
