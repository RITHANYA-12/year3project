import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Mail, Lock, Shield } from 'lucide-react';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC<{ isAdmin?: boolean }> = ({ isAdmin = false }) => {
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
      navigate(isAdmin ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      // Error handling is done in the store
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader 
        title={isAdmin ? "Admin Login" : "Welcome Back"} 
        description={isAdmin 
          ? "Access the glacier monitoring admin panel" 
          : "Sign in to your account to monitor glacier outbursts"
        } 
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
        </CardContent>

        <CardFooter className="flex-col items-stretch sm:flex-row sm:items-center sm:justify-between">
          {!isAdmin && (
            <p className="text-sm text-gray-600 mb-3 sm:mb-0">
              Don't have an account?{' '}
              <Link to="/signup" className="text-sky-600 hover:text-sky-800">
                Sign up
              </Link>
            </p>
          )}
          <Button 
            type="submit" 
            isLoading={isLoading}
            className="w-full sm:w-auto"
          >
            {isAdmin ? (
              <Shield className="w-4 h-4 mr-2" />
            ) : null}
            {isAdmin ? 'Admin Login' : 'Sign In'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;