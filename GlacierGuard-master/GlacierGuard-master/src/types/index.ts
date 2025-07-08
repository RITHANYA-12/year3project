export interface User {
  id: string;
  email: string;
  username: string;
  phoneNumber: string;
  location: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
}

export interface OutburstEvent {
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  severity: 'low' | 'medium' | 'high';
  detectedAt: string;
  description: string;
  imageUrl?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, 'id' | 'createdAt'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUserLocation: (location: { latitude: number; longitude: number }) => Promise<void>;
}

export interface MapState {
  outburstEvents: OutburstEvent[];
  isLoading: boolean;
  error: string | null;
  fetchOutburstEvents: () => Promise<void>;
  addOutburstEvent: (event: Omit<OutburstEvent, 'id'>) => Promise<void>;
}

export interface AdminState {
  isAnalyzing: boolean;
  analyzeImage: (imageFile: File) => Promise<{ isOutburst: boolean; confidence: number; location?: { latitude: number; longitude: number } }>;
}

export type UserRole = 'user' | 'admin';