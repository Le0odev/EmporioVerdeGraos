import React, { useState } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import { Loader } from './Loader'

const MapLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  const handleMapError = () => {
    setIsMapLoaded(true); // Hide loader even if there's an error
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDsOFyfLUkr6YfHgSC96aneAaGxhjQ6_Zk"
      onLoad={handleMapLoad}
      onError={handleMapError}
    >
      {!isMapLoaded && <Loader />}
      {isMapLoaded && children}
    </LoadScript>
  );
};

export default MapLoader;
