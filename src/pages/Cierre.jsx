import "./styles/Cierre.css";

const Cierre = () => {
  return (
    <div className="cierre-container">
      <div className="content-wrapper">
        
        {/* Título Principal */}
        <div className="header-section">
          <h1 className="main-title">Tecnologías Utilizadas en la Resolución</h1>
          <p className="subtitle">Librerías, Lenguajes e Inteligencia Artificial</p>
        </div>

        {/* Lenguajes y Frameworks */}
        <section className="examples-section">
          <h2 className="section-title">
            Lenguajes y Frameworks
          </h2>
          
          <div className="examples-grid-cierre">
            <div className="example-card google">
              <div className="card-icon">💻</div>
              <h3>JavaScript (JS)</h3>
              <p>Utilizado para implementar la lógica del algoritmo de mínimos cuadrados.</p>
            </div>

            <div className="example-card social">
              <div className="card-icon">⚛️</div>
              <h3>React</h3>
              <p>Empleado para construir la interfaz de usuario, gestionar el estado de los datos y la interactividad de la aplicación.</p>
            </div>

            <div className="example-card engineering">
              <div className="card-icon">🎨</div>
              <h3>CSS / HTML</h3>
              <p>Utilizados para estructurar la página y aplicar estilos visuales.</p>
            </div>
          </div>
        </section>

        {/* Librerías y Herramientas Específicas */}
        <div className="analysis-grid">
          
          {/* Librerías */}
          <section className="advantages-section">
            <h2 className="section-title">
              Librerías
            </h2>
            
            <div className="advantages-list">
              <div className="advantage-item">
                <h3>XLSX</h3>
                <p>Librería utilizada para la lectura y el procesamiento del archivo de datos adjunto (formato Excel/CSV), permitiendo la importación al entorno JS.</p>
              </div>
              
              <div className="advantage-item">
                <h3>Plotly.js</h3>
                <p>Librería de visualización de datos para generar el gráfico de dispersión y trazar las diferentes curvas de regresión (polinómica, lineal, etc.).</p>
              </div>
              
              <div className="advantage-item">
                <h3>React-Bootstrap</h3>
                <p>Componentes utilizados para un diseño web responsivo y limpio (botones, contenedores, etc.).</p>
              </div>
            </div>
          </section>

          {/* Inteligencia Artificial */}
          <section className="limitations-section">
            <h2 className="section-title">
              Inteligencia Artificial
            </h2>
            
            <div className="limitations-list">
              <div className="limitation-item">
                <h3>ChatGPT (OpenAI)</h3>
                <p>Utilizada para realizar el código</p>
                <h3>Excel con Copilot</h3>
                <p>Verificación de los gráficos obtenidos</p>
              </div>
            </div>
          </section>
        </div>

        {/* Conclusión */}
        <section className="conclusion-section">
          <h2 className="section-title">Conclusión</h2>
          <p>
            Tiene sentido que el ajuste obtenido se asemeje a una función lineal, ya que la fórmula de la potencia fotovoltaica es <br/><strong>P = I × <span style={{fontStyle: "italic"}}>&eta;</span> × A</strong>, donde:
          </p>
          <ul className="text-start">
            <li><strong>P</strong>: Potencia generada por el panel fotovoltaico.</li>
            <li><strong>I</strong>: Irradiancia solar incidente sobre el panel.</li>
            <li><strong><span style={{fontStyle: "italic"}}>&eta;</span></strong>: Rendimiento del panel.</li>
            <li><strong>A</strong>: Área del panel fotovoltaico.</li>
          </ul>
          <p>
            Como todos los factores (rendimiento y área) suelen ser constantes para un mismo panel, la relación entre la potencia y la irradiancia es directamente proporcional, lo que justifica el comportamiento lineal observado en el ajuste.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Cierre;