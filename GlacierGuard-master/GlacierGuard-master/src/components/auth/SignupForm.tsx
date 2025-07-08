import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Mail, User, Phone, MapPin, Lock } from 'lucide-react';

interface SignupFormInputs {
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const { signup, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormInputs>();

  const password = watch('password');

  useEffect(() => {
    // Get user's location automatically
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError(
            'Unable to get your location. Please enable location services.'
          );
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  }, []);

  const onSubmit = async (data: SignupFormInputs) => {
    if (!location) {
      setLocationError('Location is required to register.');
      return;
    }

    try {
      await signup({
        email: data.email,
        username: data.username,
        phoneNumber: data.phoneNumber,
        password: data.password,
        location,
      });
      navigate('/dashboard');
    } catch (err) {
      // Error handling is done in the store
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader 
        title="Create an Account" 
        description="Join our glacier monitoring system to receive alerts and monitor outbursts"
      />

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Mail size={18} className="text-gray-500" />
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <User size={18} className="text-gray-500" />
            <Input
              label="Username"
              placeholder="johndoe"
              error={errors.username?.message}
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
              })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Phone size={18} className="text-gray-500" />
            <Input
              label="Phone Number"
              placeholder="+919876543210"
              error={errors.phoneNumber?.message}
              {...register('phoneNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\+?[0-9]{10,12}$/,
                  message: 'Please enter a valid phone number',
                },
              })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <MapPin size={18} className="text-gray-500" />
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Location
              </label>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200">
                {location ? (
                  <span className="text-sm text-gray-600">
                    {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">Detecting your location...</span>
                )}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  location ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {location ? 'Detected' : 'Pending'}
                </span>
              </div>
              {locationError && (
                <p className="mt-1 text-sm text-red-600">{locationError}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Lock size={18} className="text-gray-500" />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Lock size={18} className="text-gray-500" />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
            />
          </div>
        </CardContent>

        <CardFooter className="flex-col items-stretch sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600 mb-3 sm:mb-0">
            Already have an account?{' '}
            <Link to="/login" className="text-sky-600 hover:text-sky-800">
              Sign in
            </Link>
          </p>
          <Button 
            type="submit" 
            isLoading={isLoading}
            disabled={!location}
            className="w-full sm:w-auto"
          >
            Create Account
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignupForm;