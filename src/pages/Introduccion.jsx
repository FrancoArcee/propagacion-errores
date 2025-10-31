import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import './styles/Introduccion.css';

export default function Introduccion() {
  const [openCards, setOpenCards] = useState([]);

  const faqs = [
    {
      question: "¿Qué es un sistema fotovoltaico (FV)?",
      answer: "Convierte la energía solar en electricidad mediante paneles solares. La energía generada puede usarse directamente, almacenarse o inyectarse a la red."
    },
    {
      question: "¿Cómo funciona el simulador de SolarMetrics?",
      answer: "Estima la generación mensual en base a irradiancia, temperatura e inclinación promedio. Usa modelos ajustados por mínimos cuadrados."
    },
    {
      question: "¿Qué datos necesito para usar el simulador?",
      answer: "Solo ingresá la irradiación solar mensual promedio, tipo de panel y potencia deseada. Calculamos generación, cantidad de paneles y costo."
    },
    {
      question: "¿Los resultados del simulador son exactos?",
      answer: "Son estimaciones basadas en datos reales. Factores como clima u orientación pueden modificar los resultados reales."
    },
    {
      question: "¿Puedo usar SolarMetrics para proyectos comerciales?",
      answer: "Sí. El modelo se adapta a diferentes escalas: industrial, comercial o residencial."
    },
    {
      question: "¿El simulador es gratuito?",
      answer: "Sí, podés utilizarlo sin costo desde nuestra web. Solo necesitás tus datos de irradiancia mensual."
    }
  ];

  const toggleFAQ = (index) => {
    const newOpenCards = [...openCards];
    newOpenCards[index] = !newOpenCards[index];
    setOpenCards(newOpenCards);
  };

  return (
    <>
      <section className="intro-panel">
        <img
          className="intro-bg"
          src="./carrusel-image.jpeg"
          alt="Paneles solares"
        />
        <div className="intro-content">
          <h1 className="intro-title">SolarMetrics</h1>
          <p className="intro-subtitle">Modelá tu energía solar con precisión científica</p>
          <p className="intro-subtitle">
            Simulá tu sistema fotovoltaico y estimá tu generación mensual con nuestro modelo de datos reales
          </p>
          <NavLink to="/calculadora" className="intro-btn">
            PROBAR EL SIMULADOR
          </NavLink>
        </div>
      </section>

      <section className="intro-info" id="nosotros">
        <div className="intro-info-wrapper">
          <h2 className="intro-info-title">Sobre Nosotros</h2>
          <p className="intro-info-text">
            En <strong>SolarMetrics</strong> creemos que el futuro de la energía es limpio, accesible y
            sustentable. Por eso desarrollamos soluciones fotovoltaicas inteligentes adaptadas a
            las necesidades de hogares, empresas e instituciones.
          </p>

          <p className="intro-info-text">
            Nuestra plataforma incluye un <strong>simulador de dimensionamiento fotovoltaico (FV)</strong>
            que estima la generación eléctrica de un sistema solar a partir de datos reales de
            irradiancia, temperatura e inclinación.
          </p>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-wrapper">
          <h2 className="faq-title">Preguntas Frecuentes</h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openCards[index] ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">{openCards[index] ? '−' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
