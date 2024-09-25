import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importa os estilos do leaflet

// Define o estilo do contêiner do mapa
export const mapContainerStyle = {
  height: '120px',
  width: '100%',
  borderRadius: '10px',
};

// Define o ícone personalizado com a URL diretamente
const customIcon = L.icon({
  iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
  iconSize: [30, 40], // Tamanho do ícone
  iconAnchor: [12, 40], // Ponto do ícone que ficará na posição do marcador
  popupAnchor: [1, -33], // Ponto a partir do qual o popup deve abrir relativo ao ícone
});

const MyMapComponent: React.FC<{ coordinates: { lat: number; lng: number } }> = ({ coordinates }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Inicializa o mapa com um zoom maior
      const map = L.map(mapRef.current).setView([coordinates.lat, coordinates.lng], 16);

      // Adiciona uma camada de tile do OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 22,
        attribution: 'Map data © OpenStreetMap contributors',
      }).addTo(map);

      // Adiciona um marcador com o ícone personalizado nas coordenadas fornecidas
      L.marker([coordinates.lat, coordinates.lng], { icon: customIcon }).addTo(map);

      // Cleanup quando o componente for desmontado
      return () => {
        map.remove();
      };
    }
  }, [coordinates]);

  return <div style={mapContainerStyle} ref={mapRef}></div>;
};

export default MyMapComponent;
