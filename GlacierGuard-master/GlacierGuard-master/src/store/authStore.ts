import { create } from 'zustand';
import { AuthState, User } from '../types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    // Static login - accept any credentials
    const mockUser: User = {
      id: '1',
      email: email,
      username: 'testuser',
      phoneNumber: '+919876543210',
      location: {
        latitude: 28.6139,
        longitude: 77.2090
      },
      createdAt: new Date().toISOString()
    };
    
    set({ 
      user: mockUser, 
      isAuthenticated: true, 
      isLoading: false 
    });
    localStorage.setItem('user', JSON.stringify(mockUser));
  },

  signup: async (userData) => {
    set({ isLoading: true, error: null });
    
    const newUser: User = {
      id: '1',
      email: userData.email,
      username: userData.username,
      phoneNumber: userData.phoneNumber,
      location: userData.location,
      createdAt: new Date().toISOString()
    };
    
    set({ 
      user: newUser, 
      isAuthenticated: true, 
      isLoading: false 
    });
    localStorage.setItem('user', JSON.stringify(newUser));
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },

  updateUserLocation: async (location) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const updatedUser = { ...user, location };
    set({ 
      user: updatedUser, 
      isLoading: false 
    });
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }
}));

export const initializeAuth = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      useAuthStore.setState({ 
        user, 
        isAuthenticated: true 
      });
    } catch (error) {
      localStorage.removeItem('user');
    }
  }
};