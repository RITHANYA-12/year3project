import React from 'react';
import { useMapStore } from '../../store/mapStore';
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, MapPin } from 'lucide-react';

const OutburstEventList: React.FC = () => {
  const { outburstEvents, isLoading } = useMapStore();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin h-6 w-6 border-2 border-sky-500 border-t-transparent rounded-full mx-auto mb-2"></div>
        <p className="text-gray-500">Loading events...</p>
      </div>
    );
  }

  if (outburstEvents.length === 0) {
    return (
      <div className="p-6 text-center border border-dashed border-gray-300 rounded-lg">
        <AlertTriangle className="h-10 w-10 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">No outburst events detected</p>
        <p className="text-sm text-gray-500 mt-1">
          When events are detected, they will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
      {outburstEvents.map((event) => (
        <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${
                event.severity === 'high' 
                  ? 'bg-red-100' 
                  : event.severity === 'medium'
                    ? 'bg-orange-100'
                    : 'bg-yellow-100'
              }`}>
                <AlertTriangle className={`h-5 w-5 ${
                  event.severity === 'high' 
                    ? 'text-red-600' 
                    : event.severity === 'medium'
                      ? 'text-orange-600'
                      : 'text-yellow-600'
                }`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{event.description}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>
                    {event.location.latitude.toFixed(4)}, {event.location.longitude.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full border ${getSeverityColor(event.severity)}`}>
              {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
            </span>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs text-gray-500">
              Detected {formatDistanceToNow(new Date(event.detectedAt))} ago
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OutburstEventList;