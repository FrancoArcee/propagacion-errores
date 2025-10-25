import { NavLink } from "react-router-dom"
import "./styles/Layout.css"

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="logo-section">
          <img src="./logo.png" alt="Logo" className="logo" />
          <span className="group-name">Goodfellas - Método de Taylor para PVI</span>
        </div>
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Teoría
          </NavLink>
          <NavLink to="/practica" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Calculadora
          </NavLink>
          <NavLink to="/aplicacion" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Ejercicio Aplicado
          </NavLink>
          <NavLink to="/calculadora" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Chat Interactivo
          </NavLink>
        </nav>
      </header>
      <main className="content">
        {children}
      </main>
    </div>
  )
}

export default Layout