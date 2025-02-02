import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react';

// Define o estilo do container do mapa
const mapContainerStyle = {
  width: '100%',
  height: '600px'
};

// Componente Map
const Map = ({ center, origin, destination }) => {
  const [directions, setDirections] = useState(null); // Estado para armazenar as direções

  useEffect(() => {
    // Obter a localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Definindo a origem como a localização do usuário
        origin = { lat: position.coords.latitude, lng: position.coords.longitude };
      });
    }
  }, [origin]);

  // Callback para tratar a resposta da DirectionsService
  const handleDirectionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response); // Define as direções se a resposta for OK
      } else {
        console.error('Erro ao calcular a rota:', response); // Log de erro
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCZkxnskIe__YTyFh9hkcnm34s-Z3xqm7w"> {/* Substitua pela chave API */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center} // Centro do mapa
        zoom={14} // Nível de zoom
      >
        {origin && destination && (
          <>
            {/* Direções do serviço */}
            <DirectionsService
              options={{ origin, destination, travelMode: 'DRIVING' }}
              callback={handleDirectionsCallback}
            />
            {/* Renderiza as direções no mapa */}
            <DirectionsRenderer directions={directions} />
            {/* Marcador para o ponto de origem */}
            <Marker position={origin} label="Origem" />
            {/* Marcador para o ponto de destino */}
            <Marker position={destination} label="Destino" />
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
