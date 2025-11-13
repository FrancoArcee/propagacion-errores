import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Step1.css';
import { StepSideBar } from '../components/StepSideBar';

function Step1() {
  const navigate = useNavigate();

  const handleBack = () => navigate('/simulador');
  const handleConfirm = () => navigate('/step2');

  return (
    <div className="step1-container">
      <StepSideBar
              stepNumber={1}
              totalSteps={4}
              title="Selecciona tu ubicación"
              description="Buscá una dirección o seleccioná un punto para continuar."
            />

      <div className="step1-right">
        <div className="placeholder-info">
          <h3>Paso 1</h3>
          <p>En esta sección podrás agregar el contenido que desees en lugar del mapa.</p>
        </div>

        <div className="map-buttons">
          <button className="btn-secondary" onClick={handleBack}>
            VOLVER
          </button>
          <button className="intro-btn" onClick={handleConfirm}>
            CONFIRMAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step1;
