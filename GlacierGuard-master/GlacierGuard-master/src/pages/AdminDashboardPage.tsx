import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import IndiaMap from '../components/map/IndiaMap';
import ImageAnalyzer from '../components/admin/ImageAnalyzer';
import OutburstEventList from '../components/dashboard/OutburstEventList';
import Card, { CardHeader } from '../components/ui/Card';
import { AlertTriangle, Activity, MapPin } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
  const handleLocationSelect = (location: { latitude: number; longitude: number }) => {
    setSelectedLocation(location);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header isAdmin />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          {/* Dashboard Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Control Center</h1>
                <p className="text-gray-600 mt-1">
                  Manage and monitor glacier outburst events across India
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-600">System online</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Selected Location</h3>
                  <p className="text-xs text-blue-600 mt-1">
                    {selectedLocation ? (
                      `${selectedLocation.latitude.toFixed(4)}, ${selectedLocation.longitude.toFixed(4)}`
                    ) : (
                      'No location selected'
                    )}
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 flex items-center">
                <div className="bg-yellow-100 rounded-full p-2 mr-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Detection Status</h3>
                  <p className="text-xs text-yellow-600 mt-1">
                    CNN model active and analyzing data
                  </p>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-100 rounded-md p-4 flex items-center">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <Activity className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-purple-800">System Status</h3>
                  <p className="text-xs text-purple-600 mt-1">
                    All systems operational
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map and Image Analyzer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader 
                  title="Glacier Monitoring Map" 
                  description="Click on the map to select a location for analysis"
                />
                <div className="h-[500px]">
                  <IndiaMap 
                    isAdminView 
                    onLocationSelect={handleLocationSelect} 
                  />
                </div>
              </Card>
            </div>
            
            <div>
              <ImageAnalyzer location={selectedLocation} />
            </div>
          </div>
          
          {/* Recent Events */}
          <Card>
            <CardHeader 
              title="Active Outburst Events" 
              description="Current outburst events being monitored"
            />
            <OutburstEventList />
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;