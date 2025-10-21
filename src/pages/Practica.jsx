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

  // --- EJERCICIO 1c ---
  const steps_1c = [
    {
      title: "Definición de parámetros y ecuación genérica",
      explanation:
        "Se tienen x₀ = 1 y y₀ = 1, con un paso h = 0.1. El objetivo es hallar y(1.3). Esto requiere 3 iteraciones.",
      math: `
        $$x_0 = 1, \\; y_0 = 1, \\; h = 0.1, \\; x_f = 1.3$$
        $$y_{n+1} = y_n + h y'_n + \\frac{h^2}{2!} y''_n$$
        $$y'_n = 2x_n y_n$$
        $$y''_n = 2y_n + 4x_n^2 y_n$$
        $$y_{n+1} = y_n + h(2x_n y_n) + \\frac{h^2}{2!}(2y_n + 4x_n^2 y_n)$$
      `,
    },
    {
      title: "Iteración 1 (n = 0): Cálculo de y(1.1)",
      explanation:
        "Sustituyendo los valores iniciales x₀ = 1 y y₀ = 1, se obtiene el primer valor aproximado.",
      math: `
        $$y_1 = 1 + 0.1(2 \\cdot 1 \\cdot 1) + \\frac{(0.1)^2}{2}(2 \\cdot 1 + 4 \\cdot 1^2 \\cdot 1)$$
        $$y_1 = 1 + 0.2 + 0.03 = 1.23$$
        $$\\boxed{y(1.1) \\approx 1.23}$$
      `,
    },
    {
      title: "Iteración 2 (n = 1): Cálculo de y(1.2)",
      explanation:
        "Usando x₁ = 1.1 y y₁ = 1.23 para calcular la siguiente aproximación.",
      math: `
        $$y_2 = 1.23 + 0.1(2 \\cdot 1.1 \\cdot 1.23) + \\frac{(0.1)^2}{2}(2 \\cdot 1.23 + 4 \\cdot 1.1^2 \\cdot 1.23)$$
        $$y_2 \\approx 1.23 + 0.2706 + 0.0375 = 1.5426$$
        $$\\boxed{y(1.2) \\approx 1.5426}$$
      `,
    },
    {
      title: "Iteración 3 (n = 2): Cálculo de y(1.3)",
      explanation:
        "Usando x₂ = 1.2 y y₂ = 1.5426, obtenemos el valor final aproximado.",
      math: `
        $$y_3 = 1.5426 + 0.1(2 \\cdot 1.2 \\cdot 1.5426) + \\frac{(0.1)^2}{2}(2 \\cdot 1.5426 + 4 \\cdot 1.2^2 \\cdot 1.5426)$$
        $$y_3 \\approx 1.5426 + 0.3702 + 0.0502 = 1.9727$$
        $$\\boxed{y(1.3) \\approx 1.9727}$$
      `,
    },
  ];

  // --- EJERCICIO 1d ---
  const steps_1d = [
    {
      title: "Parámetros y número de iteraciones",
      explanation:
        "La EDO es y' = (1/x)(y² + y), con x₀ = 1, y₀ = -2, paso h = 0.5 y 1 ≤ x ≤ 3.",
      math: `
        $$x_0 = 1, \\; y_0 = -2, \\; h = 0.5$$
        $$N = \\frac{3 - 1}{0.5} = 4$$
        $$\\text{Puntos: } x_0 = 1, x_1 = 1.5, x_2 = 2.0, x_3 = 2.5, x_4 = 3.0$$
      `,
    },
    {
      title: "Ecuación general del método de Taylor de 2° orden",
      explanation:
        "Aplicamos la fórmula de Taylor de grado 2 para f(x,y) = (1/x)(y² + y).",
      math: `
        $$y_{n+1} = y_n + h y'_n + \\frac{h^2}{2!} y''_n$$
        $$y'_n = \\frac{1}{x_n}(y_n^2 + y_n)$$
        $$y''_n = -\\frac{1}{x_n^2}(y_n^2 + y_n) + \\frac{1}{x_n^2}(2y_n + 1)(y_n^2 + y_n)$$
      `,
    },
    {
      title: "Iteración 1 (n = 0): Cálculo de y(1.5)",
      explanation: "Sustituyendo x₀ = 1 y y₀ = -2.",
      math: `
        $$y'_0 = \\frac{1}{1}((-2)^2 + (-2)) = 2$$
        $$y''_0 = -\\frac{2}{1^2} + (2(-2)+1)(2) = -8$$
        $$y_1 = -2 + 0.5(2) + 0.125(-8) = -2$$
        $$\\boxed{y(1.5) \\approx -2}$$
      `,
    },
    {
      title: "Iteración final (n = 3): Cálculo de y(3.0)",
      explanation:
        "Usando x₃ = 2.5 y y₃ ≈ -1.5858, se obtiene la aproximación final.",
      math: `
        $$y'_3 \\approx 0.3716, \\quad y''_3 \\approx -0.4722$$
        $$y_4 = -1.5858 + 0.5(0.3716) + 0.125(-0.4722)$$
        $$y_4 = -1.459$$
        $$\\boxed{y(3.0) \\approx -1.459}$$
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
          "ejercicio1c",
          "Ejercicio 1c",
          "y' = 2xy",
          "y(1) = 1",
          "0.1",
          "Hallar y(1.3)",
          steps_1c
        )}

        {renderCard(
          "ejercicio1d",
          "Ejercicio 1d",
          "y' = \\frac{1}{t}(y^2 + y)",
          "y(t_0) = -2, 1 ≤ x ≤ 3",
          "0.5",
          "Hallar y(3) y determinar el número de iteraciones.",
          steps_1d
        )}
      </div>
    </MathJaxContext>
  );
};

export default Practica;
