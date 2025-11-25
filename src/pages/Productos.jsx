import { useState, useEffect } from "react";
import { PANEL_CATEGORIES } from "../utils/calculos";
import "./styles/Productos.css";

export default function Productos() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="productos-page">
      <section className="productos-section">
        <div className="background-overlay"></div>
        <div className={`productos-content ${isVisible ? "fade-in" : ""}`}>
          <div className="section-badge">Nuestros Productos</div>
          <h1 className="productos-title">Paneles Solares</h1>
          <p className="productos-subtitle">
            Descubrí nuestra gama de paneles solares de alta eficiencia
          </p>

          <div className="productos-grid">
            {PANEL_CATEGORIES.map((panel, index) => (
              <div key={index} className="producto-card">
                <div className="producto-image-container">
                  <img
                    src={panel.imagen || "https://via.placeholder.com/400x300/36A552/FFFFFF?text=Panel+Solar"}
                    alt={`Panel Solar ${panel.nombre}`}
                    className="producto-image"
                  />
                  <div className="producto-badge">{panel.nombre}</div>
                </div>
                
                <div className="producto-info">
                  <h3 className="producto-nombre">Panel Solar {panel.nombre}</h3>
                  
                  <div className="producto-specs">
                    <div className="spec-item">
                      <span className="spec-label">Potencia:</span>
                      <span className="spec-value">{panel.potencia} W</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Eficiencia:</span>
                      <span className="spec-value">{(panel.eficiencia * 100).toFixed(1)}%</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Dimensiones:</span>
                      <span className="spec-value">
                        {panel.ancho}m × {panel.alto}m
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Área:</span>
                      <span className="spec-value">
                        {(panel.ancho * panel.alto).toFixed(2)} m²
                      </span>
                    </div>
                  </div>

                  <div className="producto-precio">
                    <span className="precio-label">Precio:</span>
                    <span className="precio-value">
                      ${panel.precio.toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

