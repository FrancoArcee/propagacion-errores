import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './styles/Calculadora.css';

function Calculadora() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('La respuesta aparecerá aquí.');
  const [isLoading, setIsLoading] = useState(false);

  // Prompt mejorado para que el modelo use delimitadores LaTeX
  const systemPrompt = `
Eres un profesor de matemáticas experto.
Explica paso a paso de forma clara y ordenada.

IMPORTANTE: Para las fórmulas matemáticas, usa estos delimitadores:
- Para fórmulas en línea: \\( tu_formula \\)
- Para fórmulas centradas: \\[ tu_formula \\]

Ejemplo:
La solución de la ecuación \\( ax^2 + bx + c = 0 \\) es:
\\[ x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\]

Estructura tu respuesta con:
1. **Problema:** Reformula el problema
2. **Solución paso a paso:** Numera cada paso
3. **Respuesta final:** Presenta el resultado claramente
`;

  // Función para parsear y renderizar el texto con fórmulas matemáticas
  const renderMathContent = (text) => {
    const parts = [];
    let lastIndex = 0;
    
    // Regex para capturar bloques \[ ... \] y inline \( ... \)
    const mathRegex = /\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g;
    let match;

    while ((match = mathRegex.exec(text)) !== null) {
      // Agregar texto antes de la fórmula
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }

      // Agregar la fórmula (bloque o inline)
      if (match[1]) {
        // Bloque \[ ... \]
        parts.push(
          <div key={`block-${match.index}`} style={{ margin: '10px 0' }}>
            <BlockMath math={match[1].trim()} />
          </div>
        );
      } else if (match[2]) {
        // Inline \( ... \)
        parts.push(
          <InlineMath key={`inline-${match.index}`} math={match[2].trim()} />
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Agregar el texto restante
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
          placeholder="Ejemplo: Resuelve la integral de x^2 * e^x"
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
    </div>
  );
}

export default Calculadora;