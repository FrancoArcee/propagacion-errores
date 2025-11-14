// Contacto.jsx
import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Zap, 
  Send, 
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
  CheckCircle,
  XCircle,
  Users,
  ArrowRight
} from "lucide-react";
import "./styles/Contacto.css";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: ""
  });

  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setFormStatus("error");
      setTimeout(() => setFormStatus(""), 3000);
      return;
    }

    // Crear enlace mailto
    const mailtoLink = `mailto:info@solarmetrics.com?subject=${encodeURIComponent(formData.asunto || 'Consulta desde web')}&body=${encodeURIComponent(
      `Nombre: ${formData.nombre}\nEmail: ${formData.email}\n\nMensaje:\n${formData.mensaje}`
    )}`;
    
    window.location.href = mailtoLink;
    
    setFormStatus("success");
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
    setTimeout(() => setFormStatus(""), 3000);
  };

  const handleWhatsApp = () => {
    const mensaje = encodeURIComponent("Hola! Me gustaría obtener más información sobre SolarMetrics.");
    const numero = "5491112345678"; // Reemplazar con el número real
    window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank");
  };

  const redesSociales = [
    {
      nombre: "WhatsApp",
      icon: MessageCircle,
      link: "https://wa.me/5491112345678",
      color: "#25D366",
      descripcion: "Chateá con nosotros"
    },
    {
      nombre: "Instagram",
      icon: Instagram,
      link: "https://instagram.com/solarmetrics",
      color: "#E4405F",
      descripcion: "@solarmetrics"
    },
    {
      nombre: "Facebook",
      icon: Facebook,
      link: "https://facebook.com/solarmetrics",
      color: "#1877F2",
      descripcion: "/solarmetrics"
    },
    {
      nombre: "LinkedIn",
      icon: Linkedin,
      link: "https://linkedin.com/company/solarmetrics",
      color: "#0A66C2",
      descripcion: "SolarMetrics"
    },
    {
      nombre: "Email",
      icon: Mail,
      link: "mailto:info@solarmetrics.com",
      color: "#36A552",
      descripcion: "info@solarmetrics.com"
    },
    {
      nombre: "Teléfono",
      icon: Phone,
      link: "tel:+5491112345678",
      color: "#fbbf24",
      descripcion: "+54 11 1234-5678"
    }
  ];

  return (
    <div className="contacto-page">
      {/* Sección Hero */}
      <section className="contacto-hero">
        <div className="hero-overlay"></div>
        <img 
          className="hero-bg" 
          src="./instalación.png" 
          alt="Contacto" 
        />
        <div className="hero-content">
          <div className="hero-badge">Estamos aquí para ayudarte</div>
          <h1 className="hero-title">Contactanos</h1>
          <p className="hero-subtitle">
            ¿Tenés dudas sobre energía solar? Nuestro equipo está listo para asesorarte
          </p>
        </div>
      </section>

      {/* Contenedor principal */}
      <div className="contacto-container">
        
        {/* Sección Formulario y WhatsApp */}
        <div className="contacto-grid">
          
          {/* Formulario de Contacto */}
          <div className="contacto-card form-card">
            <div className="card-header">
              <h2 className="card-title">Envianos un mensaje</h2>
              <p className="card-subtitle">Completá el formulario y te responderemos a la brevedad</p>
            </div>
            
            <form className="contacto-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="juan@ejemplo.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="asunto">Asunto</label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  placeholder="Consulta sobre el simulador"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">Mensaje *</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Escribí tu consulta aquí..."
                  rows="5"
                  required
                ></textarea>
              </div>

              {formStatus === "success" && (
                <div className="form-message success">
                  <CheckCircle size={18} />
                  <span>Se abrirá tu cliente de correo para enviar el mensaje</span>
                </div>
              )}

              {formStatus === "error" && (
                <div className="form-message error">
                  <XCircle size={18} />
                  <span>Por favor completá todos los campos obligatorios</span>
                </div>
              )}

              <button type="submit" className="submit-btn">
                <span>Enviar Mensaje</span>
                <Send size={20} className="btn-icon" />
              </button>
            </form>
          </div>

          {/* Tarjeta WhatsApp */}
          <div className="contacto-card whatsapp-card">
            <div className="whatsapp-content">
              <div className="whatsapp-icon-large">
                <MessageCircle size={64} strokeWidth={1.5} />
              </div>
              <h2 className="card-title">¿Preferís WhatsApp?</h2>
              <p className="card-subtitle">
                Chateá directamente con nuestro equipo y obtené respuestas inmediatas
              </p>
              
              <div className="whatsapp-features">
                <div className="feature-item">
                  <Zap size={20} className="feature-icon" />
                  <span>Respuesta rápida</span>
                </div>
                <div className="feature-item">
                  <Users size={20} className="feature-icon" />
                  <span>Atención personalizada</span>
                </div>
                <div className="feature-item">
                  <Clock size={20} className="feature-icon" />
                  <span>Disponible 24/7</span>
                </div>
              </div>

              <button className="whatsapp-btn" onClick={handleWhatsApp}>
                <span>Abrir WhatsApp</span>
                <ArrowRight size={20} className="btn-icon" />
              </button>

              <p className="whatsapp-number">+54 11 1234-5678</p>
            </div>
          </div>
        </div>

        {/* Sección Redes Sociales */}
        <section className="redes-section">
          <div className="section-header">
            <div className="section-badge">Conectá con nosotros</div>
            <h2 className="section-title">Nuestras Redes Sociales</h2>
            <p className="section-subtitle">
              Seguinos en nuestras plataformas para estar al día con novedades y consejos sobre energía solar
            </p>
          </div>

          <div className="redes-grid">
            {redesSociales.map((red, index) => {
              const IconComponent = red.icon;
              return (
                <a
                  key={index}
                  href={red.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="red-card"
                  style={{ "--card-color": red.color }}
                >
                  <div className="red-icon">
                    <IconComponent size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="red-nombre">{red.nombre}</h3>
                  <p className="red-descripcion">{red.descripcion}</p>
                  <div className="red-arrow">
                    <ArrowRight size={24} />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Información Adicional */}
        <section className="info-section">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <MapPin size={40} strokeWidth={1.5} />
              </div>
              <h3>Ubicación</h3>
              <p>Buenos Aires, Argentina</p>
              <p className="info-detail">Zona de cobertura: Todo el país</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Clock size={40} strokeWidth={1.5} />
              </div>
              <h3>Horarios</h3>
              <p>Lunes a Viernes: 9:00 - 18:00</p>
              <p className="info-detail">Sábados: 9:00 - 13:00</p>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Zap size={40} strokeWidth={1.5} />
              </div>
              <h3>Respuesta</h3>
              <p>Tiempo promedio: 24hs</p>
              <p className="info-detail">WhatsApp: Respuesta inmediata</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}