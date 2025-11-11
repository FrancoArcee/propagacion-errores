// Layout.jsx
import Header from "./Header";
import "./styles/Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
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