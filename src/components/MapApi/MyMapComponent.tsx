import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importa os estilos do leaflet

// Define o estilo do contêiner do mapa
export const mapContainerStyle = {
  height: '120px',
  width: '100%',
  borderRadius: '10px',
};

const MyMapComponent: React.FC<{ coordinates: { lat: number; lng: number } }> = ({ coordinates }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Inicializa o mapa com um zoom maior
      const map = L.map(mapRef.current).setView([coordinates.lat, coordinates.lng], 16); // Aumente o nível de zoom aqui

      // Adiciona uma camada de tile do OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 22,
        attribution: 'Map data © OpenStreetMap contributors',
      }).addTo(map);

      // Adiciona um marcador nas coordenadas fornecidas
      L.marker([coordinates.lat, coordinates.lng]).addTo(map);

      // Cleanup quando o componente for desmontado
      return () => {
        map.remove();
      };
    }
  }, [coordinates]);

  return <div style={mapContainerStyle} ref={mapRef}></div>;
};

export default MyMapComponent;
