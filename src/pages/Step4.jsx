import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Step4.css'; // Importamos el CSS separado

// --- Iconos SVG ---
const IconPanels = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);
const IconMoney = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);
const IconEnergy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
const IconRecovery = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6"></path>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 4"></path>
  </svg>
);

// --- Datos y helpers ---
const calculos = {
  numPaneles: 52,
  energiaProducida: 42150, // kWh/año
  ahorroAnual: 1850000, // ARS
  periodoRecuperacion: 4.5, // años
  valorInstalacion: 8300000, // ARS
};
const formatARS = (value) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(value);
const formatNumber = (value) => new Intl.NumberFormat('es-AR').format(value);

// --- Componente Step4 ---
function Step4() {
  const navigate = useNavigate();
  const minAnos = 0;
  const maxAnos = 8;
  const recoveryPercent = (calculos.periodoRecuperacion / maxAnos) * 100;

  return (
    <div className="step4-container">
      {/* Left Info */}
      <div className="step4-left">
        <h2>Tu solución a medida</h2>
        <p>
          Empieza a ahorrar y comienza a tener un impacto positivo 
          en el medio ambiente. Obtén un presupuesto gratuito.
        </p>
        <Link to="/simulador" className="step4-change-link">
          CAMBIAR TU SIMULACIÓN &gt;
        </Link>
      </div>

      {/* Right Card */}
      <div className="step4-right">
        <div className="system-card">
          <h3>Detalles de tu sistema fotovoltaico</h3>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-icon"><IconPanels /></div>
              <div className="stat-card-content">
                <div className="stat-card-value">{formatNumber(calculos.numPaneles)}</div>
                <div className="stat-card-label">Paneles Solares</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-icon"><IconMoney /></div>
              <div className="stat-card-content">
                <div className="stat-card-value">{formatARS(calculos.ahorroAnual)}</div>
                <div className="stat-card-label">Ahorro / año</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-icon"><IconEnergy /></div>
              <div className="stat-card-content">
                <div className="stat-card-value">{formatNumber(calculos.energiaProducida)}</div>
                <div className="stat-card-label">Energía producida / año (kWh)</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-icon"><IconRecovery /></div>
              <div className="stat-card-content">
                <div className="stat-card-value">{calculos.periodoRecuperacion.toFixed(1)} años</div>
                <div className="stat-card-label">Período de recuperación</div>
              </div>
            </div>
          </div>

          <h4>Período de recuperación</h4>
          <div className="timeline-container">
            <div className="timeline-bar">
              <div className="timeline-marker" style={{ left: `${recoveryPercent}%` }}></div>
            </div>
            <div className="timeline-labels">
              <span>{minAnos} años</span>
              <span>{maxAnos / 2} años</span>
              <span>{maxAnos} años</span>
            </div>
          </div>

          <div className="total-cost-container">
            <div className="total-cost-label">Valor de la instalación (aprox.)</div>
            <div className="total-cost-value">{formatARS(calculos.valorInstalacion)}</div>
          </div>

          <div className="nav-buttons">
            <button className="btn-secondary" onClick={() => navigate('/step3')}>VOLVER</button>
            <button className="intro-btn" onClick={() => console.log('Solicitar Presupuesto')}>SOLICITAR PRESUPUESTO</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step4;
