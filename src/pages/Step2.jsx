import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Step2.css";
import { StepSideBar } from "../components/StepSideBar"; 

function Step2() {
  const [activeTab, setActiveTab] = useState("sabe");
  const [gastoKwh, setGastoKwh] = useState("");
  const [superficie, setSuperficie] = useState("");

  const navigate = useNavigate();

  const handleBack = () => navigate("/simulador");
  const handleNext = () => {
    const data = { activeTab, gastoKwh, superficie, periodo: "mensual" };
    console.log("Datos del Paso 2:", data);

    if (activeTab === "sabe" && (!gastoKwh || !superficie)) {
      alert("Por favor, completa tu gasto y la superficie.");
      return;
    }
    if (activeTab === "no_sabe" && !superficie) {
      alert("Por favor, completa la superficie disponible.");
      return;
    }

    // Guardar datos en localStorage
    localStorage.setItem('step2Data', JSON.stringify(data));
    navigate("/step3", { state: { step2Data: data } });
  };

  return (
    <div className="step2-container">
      {/* --- Barra lateral reusada --- */}
      <StepSideBar
        stepNumber={2}
        totalSteps={4}
        title="Datos de Consumo"
        description="¿Cuánto gastas en electricidad y qué espacio tienes disponible?"
      />

      {/* --- Columna Derecha (Formulario) --- */}
      <div className="step2-right">
        <h3>Ingresa tu consumo de energía y superficie</h3>

        <div className="form-tabs">
          <button
            className={`tab-btn ${activeTab === "sabe" ? "active" : ""}`}
            onClick={() => setActiveTab("sabe")}
          >
            Sé cuánto consumo
          </button>
          <button
            className={`tab-btn ${activeTab === "no_sabe" ? "active" : ""}`}
            onClick={() => setActiveTab("no_sabe")}
          >
            No sé cuánto consumo
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "sabe" ? (
            <div>
              <div className="form-group">
                <label htmlFor="gasto-kwh">Gasto medio</label>
                <div className="input-with-unit">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="gasto-kwh"
                    placeholder="Ej: 350"
                    value={gastoKwh}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Permitir solo números y punto decimal
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        setGastoKwh(value);
                      }
                    }}
                  />
                  <span className="input-unit">kWh</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="superficie">Superficie disponible</label>
                <div className="input-with-unit">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="superficie"
                    placeholder="Ej: 100"
                    value={superficie}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Permitir solo números y punto decimal
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        setSuperficie(value);
                      }
                    }}
                  />
                  <span className="input-unit">m²</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>
                No te preocupes. Haremos una estimación basada en la superficie
                disponible que indiques.
              </p>
              <br />
              <div className="form-group">
                <label htmlFor="superficie-no-sabe">Superficie disponible</label>
                <div className="input-with-unit">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="superficie-no-sabe"
                    placeholder="Ej: 100"
                    value={superficie}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Permitir solo números y punto decimal
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        setSuperficie(value);
                      }
                    }}
                  />
                  <span className="input-unit">m²</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="nav-buttons">
          <button className="btn-secondary" onClick={handleBack}>
            VOLVER
          </button>
          <button className="intro-btn" onClick={handleNext}>
            SIGUIENTE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step2;
