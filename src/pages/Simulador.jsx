import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Simulador.css'; // Asegúrate de que este archivo CSS esté en la misma carpeta

function Simulador() {
  const navigate = useNavigate();
  const handleConfirm = () => navigate("/step1");
  return (
    <div className="simulador-container">
      
      <div className="simulador-left">
        <div className="simulador-left-content">
          <h1>Inicia la simulación de tu nuevo sistema fotovoltaico.</h1>
          <p>
            Descubre cuánto puede ahorrar tu empresa en términos de costos
            energéticos y emisiones de CO₂ gracias a tu nuevo sistema
            fotovoltaico.
          </p>
        </div>
      </div>

      <div className="simulador-right">
        <div className="simulador-right-content">
          <p className="simulador-intro-text">
            La simulación solo tomará 5 minutos y requiere 4 entradas simples.
          </p>
          <ul className="simulador-list">
            <li>La dirección de instalación</li>
            <li>La superficie disponible para la instalación</li>
            <li>Sus costos de energía actuales</li>
            <li>Su consumo energético actual</li>
          </ul>
          <p className="simulador-disclaimer">
            ¡No te preocupes si la información insertada no es completamente
            exacta! Aún podrás obtener un resultado inicial y una estimación
            del ahorro.
          </p>
          
          <button className="intro-btn simulador-button" onClick={handleConfirm}>
            INICIO
          </button>
        </div>
      </div>

    </div>
  );
}

export default Simulador;