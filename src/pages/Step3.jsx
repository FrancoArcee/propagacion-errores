import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Step3.css';
import { StepSideBar } from '../components/StepSideBar';

function Step3() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sabe'); 
  const [gastoArs, setGastoArs] = useState('');
  const [incluyeIva, setIncluyeIva] = useState(true);

  // Guardar en localStorage solo cuando se hace clic en CALCULAR
  // No guardar en cada cambio para evitar interferencias con los inputs

  const handleBack = () => {
    navigate('/step2');
  };

  const handleNext = () => {
    if (activeTab === 'sabe' && !gastoArs) {
      alert("Por favor, completa tu gasto.");
      return;
    }
    
    // Guardar datos en localStorage antes de navegar
    try {
      const existingData = JSON.parse(localStorage.getItem('appCache')) || {};
      const step3Data = {
        activeTab,
        gastoArs,
        periodo: 'mensual',
        incluyeIva
      };
      
      const newData = {
        ...existingData,
        step3: step3Data
      };
      
      localStorage.setItem('appCache', JSON.stringify(newData));
      console.log("Datos del Paso 3 guardados en localStorage:", step3Data);
    } catch (error) {
      console.error('Error guardando en localStorage', error);
    }
    
    // Navegar a Step4 para mostrar los resultados
    navigate('/step4');
  };

  return (
    <div className="step3-container">
      <StepSideBar
        stepNumber={3}
        totalSteps={4}
        title="Costos de la energía"
        description="¿Cuánto gastas en electricidad?"
      />

      <div className="step3-right">
        <h3>Ingresa tu gasto de energía</h3>

        {/* Tabs */}
        <div className="step3-tabs">
          <button
            className={`step3-tab-btn ${activeTab === 'sabe' ? 'active' : ''}`}
            onClick={() => setActiveTab('sabe')}
          >
            Sé cuánto gasto
          </button>
          <button
            className={`step3-tab-btn ${activeTab === 'no_sabe' ? 'active' : ''}`}
            onClick={() => setActiveTab('no_sabe')}
          >
            No sé cuánto gasto
          </button>
        </div>

        {/* Tab Content */}
        <div className="step3-tab-content">
          {activeTab === 'sabe' ? (
            <>
              <div className="step3-form-group">
                <label htmlFor="gasto-ars">Gasto medio</label>
                <div className="step3-input-with-unit">
                  <input
                    type="number"
                    id="gasto-ars"
                    placeholder="Ej: 15000"
                    value={gastoArs}
                    onChange={(e) => setGastoArs(e.target.value)}
                  />
                  <span className="step3-input-unit">ARS</span>
                </div>
              </div>

              <div className="step3-form-group">
                <label>La cantidad indicada</label>
                <div className="step3-radio-options">
                  <div className="step3-form-check">
                    <input
                      className="step3-form-check-input"
                      type="radio"
                      name="iva"
                      id="ivaIncluye"
                      checked={incluyeIva === true}
                      onChange={() => setIncluyeIva(true)}
                    />
                    <label className="step3-form-check-label" htmlFor="ivaIncluye">
                      Incluye IVA
                    </label>
                  </div>

                  <div className="step3-form-check">
                    <input
                      className="step3-form-check-input"
                      type="radio"
                      name="iva"
                      id="ivaNoIncluye"
                      checked={incluyeIva === false}
                      onChange={() => setIncluyeIva(false)}
                    />
                    <label className="step3-form-check-label" htmlFor="ivaNoIncluye">
                      No incluye IVA
                    </label>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <p>
                No te preocupes. Haremos una estimación basada en tu consumo en kWh y
                la superficie que indicaste en el paso anterior.
              </p>
              <p>Simplemente haz clic en "CALCULAR".</p>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="step3-nav-buttons">
          <button className="step3-btn-secondary" onClick={handleBack}>
            VOLVER
          </button>
          <button className="step3-intro-btn" onClick={handleNext}>
            CALCULAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step3;
