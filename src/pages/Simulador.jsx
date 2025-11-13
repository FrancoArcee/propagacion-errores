import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/Step1.css';
import { StepSideBar } from '../components/StepSideBar';

// Fix para el icono del marcador en Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para manejar clicks en el mapa
function LocationMarker({ position, setPosition, setSearchInput }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      
      // Geocodificación inversa usando Nominatim (OpenStreetMap)
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(res => res.json())
        .then(data => {
          if (data.display_name) {
            setSearchInput(data.display_name);
          }
        })
        .catch(err => console.error('Error en geocodificación:', err));
    },
  });

  return position ? <Marker position={position} /> : null;
}

function Step1() {
  // Centro por defecto (Buenos Aires, Argentina)
  const defaultCenter = [-34.6037, -58.3816];
  const [position, setPosition] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [mapType, setMapType] = useState('roadmap');
  const mapRef = useRef(null);
  
  const navigate = useNavigate();

  // Buscar dirección usando Nominatim
  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newPosition = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPosition);
        
        // Centrar el mapa en la nueva posición
        if (mapRef.current) {
          mapRef.current.flyTo(newPosition, 18);
        }
      }
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  const handleBack = () => navigate('/simulador');
  
  const handleConfirm = () => {
    if (searchInput && position) {
      // Guardar la ubicación
      localStorage.setItem('selectedLocation', JSON.stringify({
        address: searchInput,
        coordinates: { lat: position[0], lng: position[1] }
      }));
      navigate('/step2');
    }
  };

  // URLs de diferentes tipos de mapa
  const tileUrls = {
    roadmap: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  };

  return (
    <div className="step1-container">
      <StepSideBar
        stepNumber={1}
        totalSteps={4}
        title="Ingresa tu dirección"
        description="¿Dónde te gustaría instalar el Sistema Fotovoltaico?"
      />

      <div className="step1-right">
        <h3>Selecciona tu ubicación</h3>

        {/* Barra de búsqueda */}
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Inserte la dirección (ej: Av. Corrientes 1234, Buenos Aires)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="search-input"
            />
            <button className="search-icon-btn" onClick={handleSearch}>
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Botones de tipo de mapa */}
          <div className="map-type-buttons">
            <button
              className={`map-type-btn ${mapType === 'satellite' ? 'active' : ''}`}
              onClick={() => setMapType('satellite')}
            >
              Satélite
            </button>
            <button
              className={`map-type-btn ${mapType === 'roadmap' ? 'active' : ''}`}
              onClick={() => setMapType('roadmap')}
            >
              Mapa
            </button>
          </div>
        </div>

        {/* Mapa de OpenStreetMap */}
        <div className="map-container">
          <MapContainer
            center={position || defaultCenter}
            zoom={position ? 18 : 12}
            style={{ height: '100%', width: '100%', borderRadius: '12px' }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={tileUrls[mapType]}
            />
            <LocationMarker 
              position={position} 
              setPosition={setPosition}
              setSearchInput={setSearchInput}
            />
          </MapContainer>
        </div>


        {/* Mostrar coordenadas seleccionadas */}
        {position && (
          <div className="selected-info">
            <p><strong>Ubicación seleccionada:</strong></p>
            <p>Latitud: {position[0].toFixed(6)}, Longitud: {position[1].toFixed(6)}</p>
          </div>
        )}

        {/* Botones de navegación */}
        <div className="nav-buttons">
          <button className="btn-secondary" onClick={handleBack}>
            ATRÁS
          </button>
          <button 
            className="intro-btn" 
            onClick={handleConfirm}
            disabled={!searchInput || !position}
          >
            SIGUIENTE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step1;