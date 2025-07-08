// components/map/india.tsx
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapStore } from '../../store/mapStore';
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

// Custom red icon for outburst events
const outburstIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

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
  const { outburstEvents } = useMapStore();

  return (
    <MapContainer center={[lat, lng]} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={[lat, lng]} icon={icon}>
        <Popup>
          Your Location <br /> ({lat}, {lng})
        </Popup>
      </Marker>
      
      {/* Display outburst events */}
      {outburstEvents.map((event) => (
        <Marker 
          key={event.id}
          position={[event.location.latitude, event.location.longitude]}
          icon={outburstIcon}
        >
          <Popup>
            <div>
              <h3 className="font-medium">{event.description}</h3>
              <p className="text-sm text-gray-600">Severity: {event.severity}</p>
              <p className="text-sm text-gray-600">
                Detected: {new Date(event.detectedAt).toLocaleDateString()}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {isAdminView && onLocationSelect && <MapClickHandler onLocationSelect={onLocationSelect} />}
    </MapContainer>
  );
};

export default IndiaMap;
