import { create } from 'zustand';
import { MapState, OutburstEvent } from '../types';

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

export const useMapStore = create<MapState>((set, get) => ({
  outburstEvents: STATIC_OUTBURST_EVENTS,
  isLoading: false,
  error: null,

  fetchOutburstEvents: async () => {
    set({ outburstEvents: STATIC_OUTBURST_EVENTS, isLoading: false });
  },

  addOutburstEvent: async (eventData) => {
    const newEvent: OutburstEvent = {
      id: String(get().outburstEvents.length + 1),
      ...eventData
    };
    
    const { outburstEvents } = get();
    set({ 
      outburstEvents: [...outburstEvents, newEvent], 
      isLoading: false 
    });
  }
}));