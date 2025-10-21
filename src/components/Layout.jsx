import { NavLink } from "react-router-dom"
import "./styles/Layout.css"

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="logo-section">
          <img src="./logo.png" alt="Logo" className="logo" />
          <span className="group-name">Goodfellas - Taylor</span>
        </div>
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Inicio
          </NavLink>
          <NavLink to="/teoria" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Teoría
          </NavLink>
          <NavLink to="/practica" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Práctica
          </NavLink>
          <NavLink to="/calculadora" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Calculadora
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