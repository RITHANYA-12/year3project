// components/map/india.tsx
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface IndiaMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  isAdminView?: boolean;
  onLocationSelect?: (location: { latitude: number; longitude: number }) => void;
}

const MapClickHandler: React.FC<{ onLocationSelect: (location: { latitude: number; longitude: number }) => void }> = ({ onLocationSelect }) => {
  const map = useMapEvents({
    click(e) {
      onLocationSelect({ latitude: e.latlng.lat, longitude: e.latlng.lng });
    },
  });
  return null;
};

const IndiaMap = ({ lat = 20.5937, lng = 78.9629, zoom = 5, isAdminView = false, onLocationSelect }: IndiaMapProps) => {
  return (
    <MapContainer center={[lat, lng]} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          Your Location <br /> ({lat}, {lng})
        </Popup>
      </Marker>
      {isAdminView && onLocationSelect && <MapClickHandler onLocationSelect={onLocationSelect} />}
    </MapContainer>
  );
};

export default IndiaMap;
