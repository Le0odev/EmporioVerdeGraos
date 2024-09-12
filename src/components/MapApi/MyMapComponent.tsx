import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

// Define o estilo do contêiner do mapa
export const mapContainerStyle = {
  height: '180px',
  width: '100%',
  borderRadius: '10px',
};

// Configura opções do mapa para ocultar informações extras
const mapOptions = {
  disableDefaultUI: true, // Desativa todos os controles padrão do mapa
  zoomControl: false,     // Desativa o controle de zoom
  streetViewControl: false, // Desativa o controle de Street View
  mapTypeControl: false,   // Desativa o controle de tipo de mapa
  fullscreenControl: false, // Desativa o controle de tela cheia
};

const MyMapComponent: React.FC<{ coordinates: { lat: number; lng: number } }> = ({ coordinates }) => (
  <GoogleMap
    mapContainerStyle={mapContainerStyle}
    center={coordinates}
    zoom={15}
    options={mapOptions} // Aplica as opções configuradas
  >
    <Marker position={coordinates} />
  </GoogleMap>
);

export default MyMapComponent;
