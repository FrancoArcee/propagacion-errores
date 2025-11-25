import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Step4.css'; // Importamos el CSS separado
import { calcularFinal } from '../utils/calculos';
import { obtenerDatosSolares } from '../utils/solarData';

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

// --- Helpers ---
const formatARS = (value) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(value);
const formatNumber = (value) => new Intl.NumberFormat('es-AR').format(value);

// Función helper para obtener datos solares desde localStorage o calcularlos
async function obtenerDatosSolaresParaCalculo(lat, lng) {
  // Primero intentar obtener desde localStorage (ya calculados en Simulador)
  const locationData = JSON.parse(localStorage.getItem('selectedLocation')) || {};
  
  if (locationData.solarData) {
    return locationData.solarData;
  }
  
  // Si no están en localStorage, obtenerlos ahora
  if (lat && lng) {
    return await obtenerDatosSolares(lat, lng);
  }
  
  // Valores por defecto si no hay coordenadas
  return {
    irradiancia: 800,
    hspAnual: 1800
  };
}

// --- Componente Step4 ---
function Step4() {
  const navigate = useNavigate();
  const [calculos, setCalculos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const calcular = async () => {
      try {
      // Leer datos de localStorage
      const appCache = JSON.parse(localStorage.getItem('appCache')) || {};
      const step2Data = JSON.parse(localStorage.getItem('step2Data')) || {};
      const step3Data = appCache.step3 || {};
      const locationData = JSON.parse(localStorage.getItem('selectedLocation')) || {};

      // Obtener datos del paso 2 (siempre mensual)
      const consumoMensual = parseFloat(step2Data.gastoKwh) || 0;
      const superficie = parseFloat(step2Data.superficie) || 0;
      
      // Obtener datos del paso 3 (siempre mensual)
      let costoMensual = parseFloat(step3Data.gastoArs) || 0;
      const incluyeIva = step3Data.incluyeIva !== false; // default true

      // Ajustar IVA si no está incluido (agregar 21%)
      if (!incluyeIva) {
        costoMensual = costoMensual * 1.21;
      }

      // Obtener irradiancia y HSP basado en ubicación
      const { lat, lng } = locationData.coordinates || {};
      const datosSolares = await obtenerDatosSolaresParaCalculo(lat || -34.6037, lng || -58.3816);
      const { irradiancia, hspAnual } = datosSolares;

      // Validar que tengamos los datos necesarios
      if (!consumoMensual || !superficie || !costoMensual) {
        setError('Faltan datos necesarios para el cálculo. Por favor, completa todos los pasos.');
        setLoading(false);
        return;
      }

      // Realizar cálculo
      const resultado = calcularFinal({
        irradiancia,
        hspAnual,
        superficieDisponible: superficie,
        costoEnergeticoMensual: costoMensual,
        consumoEnergeticoMensual: consumoMensual
      });

      if (!resultado) {
        setError('No se pudo calcular una solución. La superficie disponible podría ser insuficiente.');
        setLoading(false);
        return;
      }

      // Convertir tiempo de recuperación de meses a años para mostrar
      const periodoRecuperacionAnos = resultado.tiempoRecuperacionMeses / 12;

      setCalculos({
        numPaneles: resultado.numeroPaneles,
        energiaProducida: Math.round(resultado.energiaProducidaAnual),
        ahorroAnual: Math.round(resultado.ahorroAnual),
        periodoRecuperacion: periodoRecuperacionAnos,
        valorInstalacion: resultado.costoTotal,
        categoria: resultado.categoria
      });

      setLoading(false);
      } catch (err) {
        console.error('Error en cálculo:', err);
        setError('Ocurrió un error al calcular los resultados.');
        setLoading(false);
      }
    };
    
    calcular();
  }, []);

  const minAnos = 0;
  // Calcular maxAnos dinámicamente basado en el período de recuperación
  // Si es mayor que 8, usar ese valor redondeado hacia arriba a múltiplos de 2, con un mínimo de 8
  const maxAnos = calculos && calculos.periodoRecuperacion > 8
    ? Math.ceil(calculos.periodoRecuperacion / 2) * 2  // Redondear al siguiente múltiplo par
    : 8;
  
  // Asegurar que el porcentaje no exceda 100% (limitar la posición del marcador)
  const recoveryPercent = calculos 
    ? Math.min((calculos.periodoRecuperacion / maxAnos) * 100, 100) 
    : 0;

  if (loading) {
    return (
      <div className="step4-container">
        <div className="step4-left">
          <h2>Calculando tu solución...</h2>
          <p>Por favor espera mientras procesamos tus datos.</p>
        </div>
        <div className="step4-right">
          <div className="system-card">
            <p>Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="step4-container">
        <div className="step4-left">
          <h2>Error en el cálculo</h2>
          <p>{error}</p>
          <Link to="/simulador" className="step4-change-link">
            VOLVER AL INICIO &gt;
          </Link>
        </div>
        <div className="step4-right">
          <div className="system-card">
            <p style={{ color: 'red' }}>{error}</p>
            <div className="nav-buttons">
              <button className="btn-secondary" onClick={() => navigate('/step3')}>VOLVER</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!calculos) {
    return (
      <div className="step4-container">
        <div className="step4-left">
          <h2>No hay datos</h2>
          <p>No se encontraron datos para calcular.</p>
        </div>
        <div className="step4-right">
          <div className="system-card">
            <p>Por favor, completa todos los pasos del simulador.</p>
            <div className="nav-buttons">
              <button className="btn-secondary" onClick={() => navigate('/simulador')}>VOLVER AL INICIO</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="step4-container">
      {/* Left Info */}
      <div className="step4-left">
        <h2>Tu solución a medida</h2>
        <p>
          Empieza a ahorrar y comienza a tener un impacto positivo 
          en el medio ambiente. Obtén un presupuesto gratuito.
        </p>
        {calculos.categoria && (
          <div className="step4-panel-category">
            <h4>Categoría de panel seleccionada:</h4>
            <div className="step4-panel-content">
              {calculos.categoria.imagen && (
                <div className="step4-panel-image-container">
                  <img
                    src={calculos.categoria.imagen}
                    alt={`Panel Solar ${calculos.categoria.nombre}`}
                    className="step4-panel-image"
                  />
                </div>
              )}
              <div className="step4-category-details">
                <div className="category-detail-item">
                  <span className="category-label">Potencia:</span>
                  <span className="category-value">{calculos.categoria.potencia}W</span>
                </div>
                <div className="category-detail-item">
                  <span className="category-label">Tamaño:</span>
                  <span className="category-value">{calculos.categoria.tamaño}</span>
                </div>
                <div className="category-detail-item">
                  <span className="category-label">Eficiencia:</span>
                  <span className="category-value">{(calculos.categoria.eficiencia * 100).toFixed(1)}%</span>
                </div>
                <div className="category-detail-item">
                  <span className="category-label">Precio unitario:</span>
                  <span className="category-value">{formatARS(calculos.categoria.precio)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
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
