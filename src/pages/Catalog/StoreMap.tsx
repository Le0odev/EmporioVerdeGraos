// components/StoreMap.tsx
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { mapContainerStyle } from '../../components/MapApi/MyMapComponent';

// Substitua essas coordenadas com as obtidas do Geocoding API
const center = {
  lat:  -7.9055806, // Lat do endereço da loja
  lng: -34.9002584, // Lng do endereço da loja
};

const containerStyle = {
  width: '100%',
  height: '180px',
};

const StoreMap: React.FC = () => {
  const [mapCenter, setMapCenter] = useState(center);

  useEffect(() => {
    // Aqui você pode usar o Geocoding API para obter as coordenadas do endereço
    // e atualizar o estado `mapCenter` com as coordenadas corretas
  }, []);

  return (
    
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={20}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
  );
};

export default StoreMap;
