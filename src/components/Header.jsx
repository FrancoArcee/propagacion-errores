// Header.jsx
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./styles/Header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- Función para desplazarse hasta "Nosotros" ---
  const handleScrollToNosotros = () => {
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

  return (
    <header className="header">
      <div className="logo-section">
        <img src="./LuzVerdeLogo.png" alt="Logo" className="logo" />
        <span className="group-name">SolarMetrics</span>
      </div>

      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-btn">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <nav className="nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Inicio
        </NavLink>

        <NavLink
          to="/calculadora"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Simulador
        </NavLink>

        <NavLink
          to="/aplicacion"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Contacto
        </NavLink>

        <button className="nav-link btn-nosotros" onClick={handleScrollToNosotros}>
          Nosotros
        </button>

        <button className="nav-link btn-faq" onClick={handleScrollToFAQ}>
          FAQ
        </button>
      </nav>
    </header>
  );
}