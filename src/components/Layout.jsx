// Layout.jsx
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import "./styles/Layout.css"

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  // --- Función para desplazarse hasta "Nosotros" ---
  const handleScrollToNosotros = () => {
    if (location.pathname !== "/") {
      // Si estás en otra ruta, primero navega al Home
      navigate("/");
      // Espera a que se monte el Home y luego hace scroll
      setTimeout(() => {
        const section = document.getElementById("nosotros");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 600);
    } else {
      // Si ya estás en el Home, simplemente hace scroll
      const section = document.getElementById("nosotros");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- Función para desplazarse hasta "FAQ" ---
  const handleScrollToFAQ = () => {
    if (location.pathname !== "/") {
      // Si estás en otra ruta, primero navega al Home
      navigate("/");
      // Espera a que se monte el Home y luego hace scroll
      setTimeout(() => {
        const section = document.getElementById("faq");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 600);
    } else {
      // Si ya estás en el Home, simplemente hace scroll
      const section = document.getElementById("faq");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="layout">
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
          <NavLink to="/practica" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Calculadora
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

      <main className="content">{children}</main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 SolarMetrics. Todos los derechos reservados.</p>
          <p className="footer-links">
            <a href="#">Política de privacidad</a> | <a href="#">Términos y condiciones</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
