import IndiaMap from './map/IndiaMap';

interface User {
  location?: {
    latitude: number;
    longitude: number;
  };
}

const MapView = ({ user }: { user?: User }) => {
  const lat = user?.location?.latitude || 20.5937;
  const lng = user?.location?.longitude || 78.9629;

  return (
    <div className="h-[500px] w-full">
      <IndiaMap lat={lat} lng={lng} />
    </div>
  );
};

export default MapView;
