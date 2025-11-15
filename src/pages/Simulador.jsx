import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/Step1.css';
import { StepSideBar } from '../components/StepSideBar';
import { obtenerDatosSolares } from '../utils/solarData';

// Fix para el icono del marcador en Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para manejar clicks en el mapa
function LocationMarker({ position, setPosition, setSearchInput, onLocationSelect }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      
      // Geocodificación inversa usando Nominatim
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(res => res.json())
        .then(data => {
          if (data.display_name) {
            setSearchInput(data.display_name);
          }
        })
        .catch(err => console.error('Error en geocodificación:', err));
      
      // Llamar a la función callback para obtener datos solares
      if (onLocationSelect) {
        onLocationSelect(lat, lng);
      }
    },
  });

  return position ? <Marker position={position} /> : null;
}

function Simulador() {
  const defaultCenter = [-34.6037, -58.3816];
  const [position, setPosition] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [mapType, setMapType] = useState('roadmap');
  const [loadingSolarData, setLoadingSolarData] = useState(false);
  const [solarData, setSolarData] = useState(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  // Función para obtener y guardar datos solares cuando se selecciona una ubicación
  const obtenerYGuardarDatosSolares = async (lat, lng) => {
    setLoadingSolarData(true);
    try {
      const datosSolares = await obtenerDatosSolares(lat, lng);
      setSolarData(datosSolares);
      return datosSolares;
    } catch (error) {
      console.error('Error al obtener datos solares:', error);
      // Retornar valores por defecto si hay error
      const defaultData = {
        irradiancia: 800,
        hspAnual: 1800
      };
      setSolarData(defaultData);
      return defaultData;
    } finally {
      setLoadingSolarData(false);
    }
  };

  // Cachear ubicación con useMemo
  const cachedLocation = useMemo(() => {
    if (position && searchInput) {
      const locationData = {
        address: searchInput,
        coordinates: { lat: position[0], lng: position[1] },
        solarData: solarData
      };
      // Guardar automáticamente en localStorage
      localStorage.setItem('selectedLocation', JSON.stringify(locationData));
      return locationData;
    }
    return null;
  }, [position, searchInput, solarData]);

  // Buscar dirección
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
        
        if (mapRef.current) {
          mapRef.current.flyTo(newPosition, 18);
        }
        
        // Obtener datos solares para esta ubicación
        const datosSolares = await obtenerYGuardarDatosSolares(parseFloat(lat), parseFloat(lon));
        
        // Guardar datos solares en localStorage
        const locationData = {
          address: searchInput,
          coordinates: { lat: parseFloat(lat), lng: parseFloat(lon) },
          solarData: datosSolares
        };
        localStorage.setItem('selectedLocation', JSON.stringify(locationData));
      }
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  const handleBack = () => navigate('/simulador');

  const handleLocationClick = async (lat, lng) => {
    // Obtener datos solares cuando se hace click en el mapa
    const datosSolares = await obtenerYGuardarDatosSolares(lat, lng);
    
    // Actualizar localStorage con los datos solares
    const locationData = JSON.parse(localStorage.getItem('selectedLocation')) || {};
    locationData.solarData = datosSolares;
    localStorage.setItem('selectedLocation', JSON.stringify(locationData));
  };

  const handleConfirm = async () => {
    if (cachedLocation) {
      const { lat, lng } = cachedLocation.coordinates;
      
      // Asegurarse de que tenemos datos solares antes de continuar
      if (!cachedLocation.solarData) {
        setLoadingSolarData(true);
        const datosSolares = await obtenerYGuardarDatosSolares(lat, lng);
        const locationData = {
          ...cachedLocation,
          solarData: datosSolares
        };
        localStorage.setItem('selectedLocation', JSON.stringify(locationData));
        setLoadingSolarData(false);
      }
      
      navigate('/step1');
    }
  };

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

        {/* Mapa */}
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
              onLocationSelect={handleLocationClick}
            />
          </MapContainer>
        </div>

        {/* Mostrar coordenadas seleccionadas */}
        {position && (
          <div className="selected-info">
            <p><strong>Ubicación seleccionada:</strong></p>
            <p>Latitud: {position[0].toFixed(6)}, Longitud: {position[1].toFixed(6)}</p>
            {loadingSolarData && (
              <p style={{ color: '#36A552', marginTop: '0.5rem' }}>
                Obteniendo datos solares...
              </p>
            )}
            {cachedLocation?.solarData && !loadingSolarData && (
              <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#f0f9ff', borderRadius: '6px' }}>
                <p style={{ fontSize: '0.85rem', margin: '0.2rem 0' }}>
                  <strong>Irradiancia:</strong> {cachedLocation.solarData.irradiancia} W/m²
                </p>
                <p style={{ fontSize: '0.85rem', margin: '0.2rem 0' }}>
                  <strong>HSP anual:</strong> {cachedLocation.solarData.hspAnual} horas
                </p>
              </div>
            )}
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

export default Simulador;
