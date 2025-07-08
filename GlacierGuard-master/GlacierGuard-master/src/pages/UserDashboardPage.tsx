import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useMapStore } from '../store/mapStore';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MapComponent from '../components/map/IndiaMap';

import OutburstEventList from '../components/dashboard/OutburstEventList';
import Card, { CardHeader } from '../components/ui/Card';
import { MapPin, AlertTriangle, Clock } from 'lucide-react';

const UserDashboardPage: React.FC = () => {
  const { user, updateUserLocation } = useAuthStore();
  const { outburstEvents } = useMapStore();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [nearbyOutburst, setNearbyOutburst] = useState<boolean>(false);

  useEffect(() => {
    // Calculate if any event is near user location
    if (user?.location && outburstEvents.length > 0) {
      const isNearby = outburstEvents.some((event) => {
        const distance = Math.sqrt(
          Math.pow(event.location.latitude - user.location.latitude, 2) +
          Math.pow(event.location.longitude - user.location.longitude, 2)
        );
        return distance < 1; // You can adjust this threshold based on real scale
      });
      setNearbyOutburst(isNearby);
    }
  }, [user?.location, outburstEvents]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          {/* Dashboard Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Glacier Outburst Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Welcome back, <span className="font-medium">{user?.username}</span>
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Nearby Outburst Alert Bar */}
            {user?.location && outburstEvents.length > 0 && (
              <div
                className={`mt-4 p-4 border rounded-md text-sm font-medium ${
                  nearbyOutburst
                    ? 'bg-red-100 border-red-300 text-red-800'
                    : 'bg-green-100 border-green-300 text-green-800'
                }`}
              >
                {nearbyOutburst
                  ? '⚠️ Outburst detected near your location!'
                  : '✅ No recent outbursts near your location.'}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Your Location</h3>
                  <p className="text-xs text-blue-600 mt-1">
                    {user?.location
                      ? `${user.location.latitude.toFixed(4)}, ${user.location.longitude.toFixed(4)}`
                      : 'Location not available'}
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 flex items-center">
                <div className="bg-yellow-100 rounded-full p-2 mr-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Active Alerts</h3>
                  <p className="text-xs text-yellow-600 mt-1">
                    {outburstEvents.length} outburst events detected
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-md p-4 flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-green-800">Protection Status</h3>
                  <p className="text-xs text-green-600 mt-1">Alert system active and monitoring</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map and Events */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader
                  title="India Glacier Map"
                  description="Live view of current outburst events across India"
                />
                <div className="h-[500px]">
  <MapComponent
    lat={user?.location?.latitude || 20.5937}
    lng={user?.location?.longitude || 78.9629}
    zoom={6}
  />
</div>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader
                  title="Recent Outburst Events"
                  description="Latest detected glacier outbursts"
                />
                <OutburstEventList />
              </Card>
            </div>
          </div>

          {/* Safety Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Safety Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="font-medium text-gray-800 mb-2">What to do during an outburst alert</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Move to higher ground immediately</li>
                  <li>Follow evacuation routes if provided</li>
                  <li>Stay tuned to emergency broadcast systems</li>
                  <li>Do not attempt to cross flowing water</li>
                  <li>Keep your emergency kit readily accessible</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="font-medium text-gray-800 mb-2">Emergency Contacts</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>National Disaster Response Force: <span className="font-medium">1078</span></li>
                  <li>State Emergency Operation Center: <span className="font-medium">1070</span></li>
                  <li>District Emergency Operation Center: <span className="font-medium">1077</span></li>
                  <li>Police Emergency: <span className="font-medium">100</span></li>
                  <li>Ambulance: <span className="font-medium">108</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboardPage;
