import { create } from 'zustand';
import { MapState, OutburstEvent } from '../types';

// Helper function to calculate distance between two points in kilometers
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const STATIC_OUTBURST_EVENTS: OutburstEvent[] = [
  {
    id: '1',
    location: { 
      latitude: 34.1526, 
      longitude: 77.5771 
    },
    severity: 'high',
    detectedAt: new Date().toISOString(),
    description: 'Major outburst detected in Ladakh region',
    imageUrl: 'https://images.pexels.com/photos/15013802/pexels-photo-15013802.jpeg'
  },
  {
    id: '2',
    location: { 
      latitude: 32.2432, 
      longitude: 77.1892 
    },
    severity: 'medium',
    detectedAt: new Date(Date.now() - 86400000).toISOString(),
    description: 'Moderate glacier melt in Himachal Pradesh',
    imageUrl: 'https://images.pexels.com/photos/2086621/pexels-photo-2086621.jpeg'
  },
  {
    id: '3',
    location: { 
      latitude: 30.0869, 
      longitude: 79.3199 
    },
    severity: 'low',
    detectedAt: new Date(Date.now() - 172800000).toISOString(),
    description: 'Minor outburst activity detected in Uttarakhand',
    imageUrl: 'https://images.pexels.com/photos/3380448/pexels-photo-3380448.jpeg'
  }
];

// Load initial data from localStorage or use static data
const loadInitialData = (): OutburstEvent[] => {
  const savedEvents = localStorage.getItem('outburstEvents');
  return savedEvents ? JSON.parse(savedEvents) : STATIC_OUTBURST_EVENTS;
};

export const useMapStore = create<MapState>((set, get) => ({
  outburstEvents: loadInitialData(),
  isLoading: false,
  error: null,

  fetchOutburstEvents: async () => {
    const savedEvents = localStorage.getItem('outburstEvents');
    set({ 
      outburstEvents: savedEvents ? JSON.parse(savedEvents) : STATIC_OUTBURST_EVENTS, 
      isLoading: false 
    });
  },

  addOutburstEvent: async (eventData) => {
    const newEvent: OutburstEvent = {
      id: String(get().outburstEvents.length + 1),
      ...eventData
    };
    
    const { outburstEvents } = get();
    const updatedEvents = [...outburstEvents, newEvent];
    
    // Save to localStorage
    localStorage.setItem('outburstEvents', JSON.stringify(updatedEvents));
    
    // Log nearby events within 20km
    const nearbyEvents = outburstEvents.filter(event => {
      const distance = calculateDistance(
        eventData.location.latitude,
        eventData.location.longitude,
        event.location.latitude,
        event.location.longitude
      );
      return distance <= 20; // 20 kilometers
    });

    if (nearbyEvents.length > 0) {
      console.log('Nearby outburst events within 20km of new event:');
      console.log('New event location:', {
        lat: eventData.location.latitude,
        lng: eventData.location.longitude
      });
      console.log('Nearby events:', nearbyEvents.map(event => ({
        id: event.id,
        description: event.description,
        location: event.location,
        distance: calculateDistance(
          eventData.location.latitude,
          eventData.location.longitude,
          event.location.latitude,
          event.location.longitude
        ).toFixed(2) + ' km'
      })));
    } else {
      console.log('No nearby outburst events within 20km of new event at:', {
        lat: eventData.location.latitude,
        lng: eventData.location.longitude
      });
    }
    
    set({ 
      outburstEvents: updatedEvents, 
      isLoading: false 
    });
  }
}));