// HomePage.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./styles/HomePage.css";

export default function HomePage() {
  const [openCards, setOpenCards] = useState([]);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: "¿Qué es un sistema fotovoltaico (FV)?",
      answer:
        "Convierte la energía solar en electricidad mediante paneles solares. La energía generada puede usarse directamente, almacenarse o inyectarse a la red.",
      icon: "☀️",
    },
    {
      question: "¿Cómo funciona el simulador de SolarMetrics?",
      answer:
        "Estima la generación mensual en base a irradiancia, temperatura e inclinación promedio. Usa modelos ajustados por mínimos cuadrados.",
      icon: "📊",
    },
    {
      question: "¿Qué datos necesito para usar el simulador?",
      answer:
        "Solo ingresá la irradiación solar mensual promedio, tipo de panel y potencia deseada. Calculamos generación, cantidad de paneles y costo.",
      icon: "📝",
    },
    {
      question: "¿Los resultados del simulador son exactos?",
      answer:
        "Son estimaciones basadas en datos reales. Factores como clima u orientación pueden modificar los resultados reales.",
      icon: "🎯",
    },
    {
      question: "¿Puedo usar SolarMetrics para proyectos comerciales?",
      answer:
        "Sí. El modelo se adapta a diferentes escalas: industrial, comercial o residencial.",
      icon: "🏢",
    },
    {
      question: "¿El simulador es gratuito?",
      answer:
        "Sí, podés utilizarlo sin costo desde nuestra web. Solo necesitás tus datos de irradiancia mensual.",
      icon: "💰",
    },
  ];

  const toggleFAQ = (index) => {
    const newOpenCards = [...openCards];
    newOpenCards[index] = !newOpenCards[index];
    setOpenCards(newOpenCards);
  };

  return (
    <>
      {/* -------- Sección INICIO -------- */}
      <section className="section intro-panel" id="intro">
        <div className="background-overlay"></div>
        <div className="animated-gradient"></div>
        <img
          className="section-bg"
          src="./carrusel-image.jpeg"
          alt="Paneles solares"
        />
        <div className={`section-content intro-content ${isVisible.intro ? "fade-in" : ""}`}>
          <h1 className="intro-title">
            Solar<span className="highlight">Metrics</span>
          </h1>
          <p className="intro-subtitle">
            Modelá tu energía solar con <span className="text-accent">precisión científica</span>
          </p>
          <p className="intro-description">
            Simulá tu sistema fotovoltaico y estimá tu generación mensual con nuestro modelo de datos reales
          </p>
          <NavLink to="/simulador" className="intro-btn">
            <span>PROBAR EL SIMULADOR</span>
            <span className="btn-icon">→</span>
          </NavLink>
        </div>
      </section>

      {/* -------- Sección NOSOTROS -------- */}
      <section className="section nosotros-section" id="nosotros">
        <div className="background-overlay"></div>
        <img className="section-bg" src="./HousePanels.jpg" alt="Paneles solares en casa" />
        <div className={`section-content nosotros-content ${isVisible.nosotros ? "slide-in" : ""}`}>
          <div className="section-badge">Quiénes Somos</div>
          <h2 className="nosotros-title">Sobre Nosotros</h2>
          <div className="nosotros-grid">
            <div className="nosotros-card">
              <div className="card-icon">🔆</div>
              <h3>Energía Limpia</h3>
              <p className="nosotros-text">
                En <strong>SolarMetrics</strong> creemos que el futuro de la energía es limpio, 
                accesible y sustentable.
              </p>
            </div>
            <div className="nosotros-card">
              <div className="card-icon">🏠</div>
              <h3>Soluciones Adaptadas</h3>
              <p className="nosotros-text">
                Desarrollamos soluciones fotovoltaicas inteligentes adaptadas a las necesidades 
                de hogares, empresas e instituciones.
              </p>
            </div>
            <div className="nosotros-card">
              <div className="card-icon">📈</div>
              <h3>Simulador Preciso</h3>
              <p className="nosotros-text">
                Nuestra plataforma incluye un simulador de dimensionamiento FV que estima 
                la generación eléctrica con datos reales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------- Sección FAQ -------- */}
      <section className="section faq-section" id="faq">
        <div className="background-overlay"></div>
        <img className="section-bg" src="./Worker.jpg" alt="Técnico trabajando en panel solar" />
        <div className={`section-content faq-content ${isVisible.faq ? "fade-in" : ""}`}>
          <div className="section-badge">FAQ</div>
          <h2 className="faq-title">Preguntas Frecuentes</h2>
          <p className="faq-subtitle">Todo lo que necesitás saber sobre SolarMetrics</p>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openCards[index] ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <div className="faq-question-content">
                    <span className="faq-emoji">{faq.icon}</span>
                    <h3>{faq.question}</h3>
                  </div>
                  <span className="faq-icon">{openCards[index] ? "−" : "+"}</span>
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