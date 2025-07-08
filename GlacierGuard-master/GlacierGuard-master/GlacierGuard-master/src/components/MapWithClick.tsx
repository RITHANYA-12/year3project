import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapClickHandlerProps {
  setLatLng: (coords: Coordinates) => void;
  localLat: (coords: Coordinates) => void;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ setLatLng, localLat }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLatLng({ lat, lng });
      localLat({ lat, lng });
    },
  });

  return null;
};

interface MapWithClickProps {
  current: Coordinates;
  lat: (coords: Coordinates) => void;
  wid: string;
}

const MapWithClick: React.FC<MapWithClickProps> = (props) => {
  const [latLng, setLatLng] = useState<Coordinates>({ lat: props.current.lat, lng: props.current.lng });
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatLng({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setReady(true);
        },
        (error) => {
          console.error("Error getting location: ", error);
          setReady(true); // Set ready even if there's an error
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setReady(true);
    }
  }, []);

  if (!ready) {
    return <p>Gathering Location info...</p>;
  }

  return (
    <div style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
      <MapContainer 
        center={[latLng.lat, latLng.lng]} 
        zoom={13} 
        style={{ height: props.wid, width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latLng.lat, latLng.lng]} icon={icon}>
          <Popup>
            Current Location<br />
            Latitude: {latLng.lat.toFixed(6)}, Longitude: {latLng.lng.toFixed(6)}
          </Popup>
        </Marker>
        <MapClickHandler localLat={setLatLng} setLatLng={props.lat} />
      </MapContainer>
    </div>
  );
};

export default MapWithClick; 