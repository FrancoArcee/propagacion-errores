import './styles/Introduccion.css';

export default function Introduccion() {
  return (
    <div className="intro-container">
      <div className="intro-wrapper">
        {/* Header */}
        <div className="intro-header">
          <h1 className="intro-main-title">Método de Taylor</h1>
          <p className="intro-subtitle">Para Ecuaciones Diferenciales Ordinarias</p>
        </div>

        {/* PVI Section */}
        <div>
          <h2 className="intro-section-title">Problemas de Valor Inicial (PVI)</h2>
          
          <div className="intro-cards-grid">
            {/* Card 1 */}
            <div className="intro-card intro-card-blue">
              <div className="intro-card-header">
                <div className="intro-card-icon">📖</div>
                <h3 className="intro-card-title">Ecuación Diferencial</h3>
              </div>
              <div className="intro-formula-box">
                <p className="intro-formula">y' = f(x, y)</p>
              </div>
              <p className="intro-card-description">
                Define cómo cambia la función en cada punto
              </p>
            </div>

            {/* Card 2 */}
            <div className="intro-card intro-card-green">
              <div className="intro-card-header">
                <div className="intro-card-icon">🎯</div>
                <h3 className="intro-card-title">Condición Inicial</h3>
              </div>
              <div className="intro-formula-box">
                <p className="intro-formula">y(x₀) = y₀</p>
              </div>
              <p className="intro-card-description">
                Punto de partida conocido
              </p>
            </div>

            {/* Card 3 */}
            <div className="intro-card intro-card-purple">
              <div className="intro-card-header">
                <div className="intro-card-icon">📍</div>
                <h3 className="intro-card-title">Dominio de Trabajo</h3>
              </div>
              <div className="intro-formula-box">
                <p className="intro-formula">x₀ ≤ x ≤ x<sub>f</sub></p>
              </div>
              <p className="intro-card-description">
                Intervalo donde calcularemos la solución
              </p>
            </div>

            {/* Card 4 */}
            <div className="intro-card intro-card-orange">
              <div className="intro-card-header">
                <div className="intro-card-icon">📏</div>
                <h3 className="intro-card-title">Paso h</h3>
              </div>
              <div className="intro-formula-box">
                <p className="intro-formula">h = x<sub>n+1</sub> - x<sub>n</sub></p>
              </div>
              <p className="intro-card-description">
                Distancia entre puntos calculados
              </p>
            </div>
          </div>
        </div>

        {/* Ordenada Genérica */}
        <div className="intro-ordenada-section">
          <h2>Ordenada Genérica</h2>
          <div className="intro-ordenada-content">
            <p>
              La <strong>ordenada genérica</strong> es una fórmula que nos permite calcular el siguiente punto 
              conociendo el punto anterior:
            </p>
            <div className="intro-ordenada-formula">
              <p className="intro-formula">y<sub>n+1</sub> = función(y<sub>n</sub>, x<sub>n</sub>, h)</p>
            </div>
          </div>
          <p className="intro-ordenada-footer">
            Es la <strong>"receta"</strong> que usamos iterativamente para ir saltando de punto en punto 
            desde x₀ hasta x<sub>f</sub>
          </p>
        </div>

        {/* Tipos de Algoritmos */}
        <div>
          <h2 className="intro-section-title">Tipos de Algoritmos</h2>
          
          <div className="intro-algoritmos-grid">
            {/* Paso Simple */}
            <div className="intro-algoritmo-card intro-algoritmo-simple">
              <div className="intro-algoritmo-background"></div>
              <div className="intro-algoritmo-content">
                <div className="intro-algoritmo-emoji">🎯</div>
                <h3 className="intro-algoritmo-title">Paso Simple</h3>
                <p className="intro-algoritmo-description">
                  Solo necesitan información del <strong>punto anterior</strong> para calcular el siguiente.
                </p>
                <div className="intro-algoritmo-box">
                  <p>y<sub>n+1</sub> depende solo de y<sub>n</sub></p>
                </div>
                <div className="intro-algoritmo-footer">
                  <strong>Ejemplos:</strong> Euler, Taylor, Runge-Kutta
                </div>
              </div>
            </div>

            {/* Paso Múltiple */}
            <div className="intro-algoritmo-card intro-algoritmo-multiple">
              <div className="intro-algoritmo-background"></div>
              <div className="intro-algoritmo-content">
                <div className="intro-algoritmo-emoji">📊</div>
                <h3 className="intro-algoritmo-title">Paso Múltiple</h3>
                <p className="intro-algoritmo-description">
                  Necesitan información de <strong>varios puntos anteriores</strong> para calcular el siguiente.
                </p>
                <div className="intro-algoritmo-box">
                  <p>y<sub>n+1</sub> depende de y<sub>n</sub>, y<sub>n-1</sub>, y<sub>n-2</sub>...</p>
                </div>
                <div className="intro-algoritmo-footer">
                  <strong>Ejemplos:</strong> Adams-Bashforth, Adams-Moulton
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}