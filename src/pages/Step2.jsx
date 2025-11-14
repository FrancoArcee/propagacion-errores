import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Step2.css";
import { StepSideBar } from "../components/StepSideBar"; 

function Step2() {
  const [activeTab, setActiveTab] = useState("sabe");
  const [gastoKwh, setGastoKwh] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [periodo, setPeriodo] = useState("mensual");

  const navigate = useNavigate();

  const handleBack = () => navigate("/step1");
  const handleNext = () => {
    const data = { activeTab, gastoKwh, superficie, periodo };
    console.log("Datos del Paso 2:", data);

    if (activeTab === "sabe" && (!gastoKwh || !superficie)) {
      alert("Por favor, completa tu gasto y la superficie.");
      return;
    }
    if (activeTab === "no_sabe" && !superficie) {
      alert("Por favor, completa la superficie disponible.");
      return;
    }

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
                    type="number"
                    id="gasto-kwh"
                    placeholder="Ej: 350"
                    value={gastoKwh}
                    onChange={(e) => setGastoKwh(e.target.value)}
                  />
                  <span className="input-unit">kWh</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="superficie">Superficie disponible</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    id="superficie"
                    placeholder="Ej: 100"
                    value={superficie}
                    onChange={(e) => setSuperficie(e.target.value)}
                  />
                  <span className="input-unit">m²</span>
                </div>
              </div>

              <div className="form-group radio-group">
                <label>Período de referencia del gasto</label>
                <div className="radio-options">
                  <input
                    type="radio"
                    id="mensual"
                    name="periodo"
                    value="mensual"
                    checked={periodo === "mensual"}
                    onChange={(e) => setPeriodo(e.target.value)}
                  />
                  <label htmlFor="mensual">Mensual</label>

                  <input
                    type="radio"
                    id="bi-mensual"
                    name="periodo"
                    value="bi-mensual"
                    checked={periodo === "bi-mensual"}
                    onChange={(e) => setPeriodo(e.target.value)}
                  />
                  <label htmlFor="bi-mesual">Bi-mensual</label>

                  <input
                    type="radio"
                    id="anual"
                    name="periodo"
                    value="anual"
                    checked={periodo === "anual"}
                    onChange={(e) => setPeriodo(e.target.value)}
                  />
                  <label htmlFor="anual">Anual</label>
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
                    type="number"
                    id="superficie-no-sabe"
                    placeholder="Ej: 100"
                    value={superficie}
                    onChange={(e) => setSuperficie(e.target.value)}
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
