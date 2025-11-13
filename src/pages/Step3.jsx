import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Step3.css';
import { StepSideBar } from '../components/StepSideBar';

function Step3() {
  const [activeTab, setActiveTab] = useState('sabe'); 
  const [gastoArs, setGastoArs] = useState('');
  const [periodo, setPeriodo] = useState('mensual');
  const [incluyeIva, setIncluyeIva] = useState(true);
  
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/step2');
  };

  const handleNext = () => {
    const data = { activeTab, gastoArs, periodo, incluyeIva };
    console.log("Datos del Paso 3:", data);

    if (activeTab === 'sabe' && !gastoArs) {
      console.warn("Por favor, completa tu gasto.");
      return;
    }
    
    navigate('/step4', { state: { step3Data: data } });
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

        <div className="form-tabs">
          <button
            className={`tab-btn ${activeTab === 'sabe' ? 'active' : ''}`}
            onClick={() => setActiveTab('sabe')}
          >
            Sé cuánto gasto
          </button>
          <button
            className={`tab-btn ${activeTab === 'no_sabe' ? 'active' : ''}`}
            onClick={() => setActiveTab('no_sabe')}
          >
            No sé cuánto gasto
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'sabe' ? (
            <div>
              <div className="form-group">
                <label htmlFor="gasto-ars">Gasto medio</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    id="gasto-ars"
                    placeholder="Ej: 15000"
                    value={gastoArs}
                    onChange={(e) => setGastoArs(e.target.value)}
                  />
                  <span className="input-unit">ARS</span>
                </div>
              </div>
              
              <div className="form-group-columns">
                <div className="form-group radio-group">
                  <label>Período de referencia</label>
                  <div className="radio-options vertical">
                    <label>
                      <input
                        type="radio"
                        name="periodo"
                        value="anual"
                        checked={periodo === 'anual'}
                        onChange={(e) => setPeriodo(e.target.value)}
                      />
                      Anual
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="periodo"
                        value="bi-mesual"
                        checked={periodo === 'bi-mesual'}
                        onChange={(e) => setPeriodo(e.target.value)}
                      />
                      Bi-mesual
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="periodo"
                        value="mensual"
                        checked={periodo === 'mensual'}
                        onChange={(e) => setPeriodo(e.target.value)}
                      />
                      Mensual
                    </label>
                  </div>
                </div>

                <div className="form-group radio-group">
                  <label>La cantidad indicada</label>
                  <div className="radio-options vertical">
                    <label>
                      <input
                        type="radio"
                        name="iva"
                        checked={incluyeIva === true}
                        onChange={() => setIncluyeIva(true)}
                      />
                      Incluye IVA
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="iva"
                        checked={incluyeIva === false}
                        onChange={() => setIncluyeIva(false)}
                      />
                      No incluye IVA
                    </label>
                  </div>
                </div>
              </div>
            </div>
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

        <div className="nav-buttons">
          <button className="btn-secondary" onClick={handleBack}>
            VOLVER
          </button>
          <button className="intro-btn" onClick={handleNext}>
            CALCULAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step3;
