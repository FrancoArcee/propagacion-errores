// Footer.jsx
import { NavLink } from "react-router-dom";
import "./styles/Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToNosotros = () => {
    const section = document.getElementById("nosotros");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToFAQ = () => {
    const section = document.getElementById("faq");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección Logo y Descripción */}
        <div className="footer-section footer-brand">
          <div className="footer-logo-section">
            <img src="./LuzVerdeLogo.png" alt="Logo" className="footer-logo" />
            <h3 className="footer-brand-name">SolarMetrics</h3>
          </div>
          <p className="footer-description">
            Energía solar limpia y sustentable con precisión científica.
          </p>
        </div>

        {/* Sección Legal */}
        <div className="footer-section">
          <h4 className="footer-title">Legal</h4>
          <nav className="footer-nav">
            <a href="#privacidad">Política de Privacidad</a>
            <a href="#terminos">Términos y Condiciones</a>
            <a href="#cookies">Política de Cookies</a>
          </nav>
        </div>

        {/* Sección Contacto */}
        <div className="footer-section">
          <h4 className="footer-title">Contacto</h4>
          <div className="footer-contact">
            <p>📧 info@solarmetrics.com</p>
            <p>📞 +54 11 1234-5678</p>
            <p>📍 Buenos Aires, Argentina</p>
          </div>
        </div>
      </div>

      {/* Línea divisoria y copyright */}
      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <p className="footer-copyright">
          © 2025 SolarMetrics. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}