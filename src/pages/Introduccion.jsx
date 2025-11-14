import './styles/Introduccion.css';

function Introduccion() {
  const handleNavigate = () => {
    window.location.href = '/resolucion';
  };

  return (
    <div className="intro-container">
      <div className="intro-header">
        <h1 className="intro-title">Introducción al Análisis</h1>
      </div>

      <h2 className="concepts-title">Contexto</h2>

      <div className="concepts-grid">
        <div className="concept-card card-fotovoltaica">
          <div className="card-icon">🔆</div>
          <h3 className="card-title">Energía Fotovoltaica</h3>
        </div>

        <div className="concept-card card-irradiancia">
          <div className="card-icon">☀️</div>
          <h3 className="card-title">Irradiancia</h3>
          <div className="card-detail">
            <span className="detail-label">Unidad de medida:</span>
            <span className="detail-value">W/m² (Watts por metro cuadrado)</span>
          </div>
        </div>

        <div className="concept-card card-insolacion">
          <div className="card-icon">⚡</div>
          <h3 className="card-title">Potencia Fotovoltaica</h3>
          <div className="card-detail">
            <span className="detail-label">Unidad de medida:</span>
            <span className="detail-value">kW</span>
          </div>
        </div>
      </div>

      <section className="intro-section importance-section">
        <div className="importance-box">
          <h3 className="importance-title">Importancia del Análisis</h3>
          <p className="intro-text">
            Entender la relación entre la irradiancia recibida y la potencia eléctrica generada es 
            crucial para diseñar, dimensionar y optimizar instalaciones fotovoltaicas.
          </p>
        </div>
      </section>

      <section className="intro-section objective-section">
        <h3 className="section-title">Objetivo del Análisis</h3>
        <div className="objective-box">
          <p className="intro-text">
            Determinar qué modelo de regresión proporciona la mejor bondad de ajuste para describir la relación entre la irradiancia incidente y la potencia eléctrica producida.
          </p>
        </div>
      </section>

      <div className="navigation-buttons">
        <button 
          className="btn-next"
          onClick={handleNavigate}
        >
          Ir a la Resolución →
        </button>
      </div>
    </div>
  );
}

export default Introduccion;