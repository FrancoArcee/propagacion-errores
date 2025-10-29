import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './styles/Calculadora.css';

function Calculadora() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('La respuesta aparecerá aquí.');
  const [isLoading, setIsLoading] = useState(false);

  const systemPrompt = `
Eres un profesor experto en el Método de Taylor y en ecuaciones diferenciales.
Tu tarea es resolver cualquier problema o duda matemática que el usuario escriba,
explicando paso a paso de manera clara, formal y pedagógica.

✅ Reglas de formato:
- Usa texto normal para las explicaciones.
- Usa LaTeX para TODAS las ecuaciones matemáticas.
- Para ecuaciones en bloque, usa doble signo de dólar: $$ ecuacion $$ (todo en una sola línea).
- No uses \\[ ... \\] ni \\( ... \\).
- No insertes saltos de línea dentro de los delimitadores $$.
- Muestra resultados y aproximaciones de forma ordenada, clara y legible.

Ejemplo de formato esperado:
La ecuación diferencial es: $$ y'' - 4y' + 4y = e^{3x} $$
Su solución general es: $$ y(x) = C_1 e^{2x} + C_2 x e^{2x} + \\frac{1}{3} e^{3x} $$
`;

  const renderMathContent = (text) => {
    const parts = [];
    let lastIndex = 0;
    const mathRegex = /\$\$([\s\S]*?)\$\$|\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g;
    let match;

    while ((match = mathRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }

      if (match[1]) {
        parts.push(
          <div key={`block-${match.index}`} style={{ margin: '10px 0' }}>
            <BlockMath math={match[1].trim()} />
          </div>
        );
      } else if (match[2]) {
        parts.push(
          <div key={`bracket-${match.index}`} style={{ margin: '10px 0' }}>
            <BlockMath math={match[2].trim()} />
          </div>
        );
      } else if (match[3]) {
        parts.push(
          <InlineMath key={`inline-${match.index}`} math={match[3].trim()} />
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex)}
        </span>
      );
    }

    return parts.length > 0 ? parts : text;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('Resolviendo...');

    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: inputText }],
          systemPrompt: systemPrompt,
        }),
      });

      const data = await res.json();
      const cleaned = (data.reply || '').trim();
      setResponse(cleaned);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error: No se pudo conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="calculadora-container">
      <h1>🧮 Resuelve tu Problema Matemático</h1>

      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ejemplo: Resolver y' = 2xy con y(1)=1 usando el método de Taylor"
          rows="5"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Calculando...' : 'Resolver Problema'}
        </button>
      </form>

      <div className="resolution-output">
        <h2>📘 Resolución:</h2>
        <div className="response-box">
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
            {renderMathContent(response)}
          </div>
        </div>
      </div>

      {/* 🌐 FOOTER DE TECNOLOGÍAS */}
      <footer className="footer">
        <div className="footer-content">
          <h3>⚙️ Tecnologías utilizadas</h3>
          <p>
            Este proyecto combina herramientas modernas para integrar cálculo
            matemático con inteligencia artificial:
          </p>

          <div className="tech-links">
            <a href="https://react.dev/" target="_blank" rel="noreferrer">
              ⚛️ React
            </a>
            <a href="https://nodejs.org/" target="_blank" rel="noreferrer">
              🟢 Node.js
            </a>
            <a href="https://katex.org/" target="_blank" rel="noreferrer">
              🔢 KaTeX
            </a>
            <a href="https://openrouter.ai/" target="_blank" rel="noreferrer">
              🤖 OpenRouter
            </a>
          </div>

          <div className="footer-info">
            <h4>¿Qué es OpenRouter?</h4>
            <p>
              OpenRouter es una plataforma que conecta diferentes modelos de
              inteligencia artificial (como GPT, Mistral o Claude) a través de
              una única API. Permite usar IA de alta calidad sin depender de una
              sola empresa y con opciones gratuitas o de bajo costo. En este
              proyecto, se utiliza para procesar los problemas y generar las
              explicaciones paso a paso.
            </p>
          </div>

          <p className="footer-credits">
            © {new Date().getFullYear()} Proyecto Método de Taylor — Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Calculadora;
