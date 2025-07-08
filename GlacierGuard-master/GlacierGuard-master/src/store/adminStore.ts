import { create } from 'zustand';
import { AdminState } from '../types';

export const useAdminStore = create<AdminState>((set) => ({
  isAnalyzing: false,

  analyzeImage: async (imageFile) => {
    set({ isAnalyzing: true });
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    set({ isAnalyzing: false });
    
    // Return mock analysis result
    return {
      isOutburst: Math.random() > 0.5,
      confidence: Math.random() * 0.5 + 0.5, // Random confidence between 0.5 and 1.0
      location: {
        latitude: 30.0869 + (Math.random() - 0.5) * 2,
        longitude: 79.3199 + (Math.random() - 0.5) * 2
      }
    };
  }
}));