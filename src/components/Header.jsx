// Header.jsx
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles/Header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // --- Función para desplazarse hasta "Nosotros" ---
  const handleScrollToNosotros = () => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("nosotros");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 600);
    } else {
      const section = document.getElementById("nosotros");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- Función para desplazarse hasta "FAQ" ---
  const handleScrollToFAQ = () => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("faq");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 600);
    } else {
      const section = document.getElementById("faq");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <NavLink to="/" className="logo-section">
        <img src="./LuzVerdeLogo.png" alt="Logo" className="logo" />
        <span className="group-name">SolarMetrics</span>
      </NavLink>

      <input 
        type="checkbox" 
        id="menu-toggle" 
        className="menu-toggle"
        checked={menuOpen}
        onChange={(e) => setMenuOpen(e.target.checked)}
      />
      <label htmlFor="menu-toggle" className="menu-btn">
        <span></span>
        <span></span>
        <span></span>
      </label>

      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          onClick={handleNavClick}
        >
          Inicio
        </NavLink>

        <NavLink
          to="/simulador"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          onClick={handleNavClick}
        >
          Simulador
        </NavLink>

        <NavLink
          to="/productos"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          onClick={handleNavClick}
        >
          Productos
        </NavLink>

        <button className="nav-link btn-nosotros" onClick={handleScrollToNosotros}>
          Nosotros
        </button>

        <button className="nav-link btn-faq" onClick={handleScrollToFAQ}>
          FAQ
        </button>

        <NavLink
          to="/contacto"
          className={({ isActive }) => (isActive ? "nav-link nav-link-contact active" : "nav-link nav-link-contact")}
          onClick={handleNavClick}
        >
          Contactanos
        </NavLink>
      </nav>
    </header>
  );
}