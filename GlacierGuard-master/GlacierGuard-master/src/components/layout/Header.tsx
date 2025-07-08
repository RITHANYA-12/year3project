import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Droplet, Menu, User, LogOut, Map, Shield } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  isAdmin?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAdmin = false }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Droplet className="h-8 w-8 mr-2" />
            <div>
              <h1 className="text-xl font-bold">GlacierGuard</h1>
              <p className="text-xs text-sky-100">
                {isAdmin ? 'Admin Dashboard' : 'GLOF Monitoring System'}
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <a 
                  href={isAdmin ? '/admin/dashboard' : '/dashboard'} 
                  className="text-sky-100 hover:text-white transition-colors flex items-center"
                >
                  <Map className="h-4 w-4 mr-1" />
                  Dashboard
                </a>
                {isAdmin && (
                  <a 
                    href="/admin/analytics" 
                    className="text-sky-100 hover:text-white transition-colors flex items-center"
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    Analytics
                  </a>
                )}
              </>
            )}
          </nav>
          
          {/* User Profile / Auth Buttons */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-1 mr-2">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-sm">{user.username}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-white/30 hover:bg-white/10 text-white"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white/30 hover:bg-white/10 text-white"
                  onClick={() => navigate('/login')}
                >
                  Sign in
                </Button>
                <Button 
                  size="sm"
                  className="bg-white text-blue-700 hover:bg-blue-50"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden rounded-full p-2 hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <nav className="flex flex-col space-y-3">
              {user && (
                <>
                  <a 
                    href={isAdmin ? '/admin/dashboard' : '/dashboard'} 
                    className="text-white py-2 px-3 rounded-md hover:bg-white/10 transition-colors flex items-center"
                  >
                    <Map className="h-4 w-4 mr-2" />
                    Dashboard
                  </a>
                  {isAdmin && (
                    <a 
                      href="/admin/analytics" 
                      className="text-white py-2 px-3 rounded-md hover:bg-white/10 transition-colors flex items-center"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Analytics
                    </a>
                  )}
                </>
              )}
              
              {user ? (
                <>
                  <div className="py-2 px-3 flex items-center">
                    <div className="bg-white/20 rounded-full p-1 mr-2">
                      <User className="h-5 w-5" />
                    </div>
                    <span>{user.username}</span>
                  </div>
                  <button 
                    className="text-white py-2 px-3 rounded-md hover:bg-white/10 transition-colors flex items-center"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Button 
                    variant="outline" 
                    className="border-white/30 hover:bg-white/10 text-white"
                    onClick={() => navigate('/login')}
                  >
                    Sign in
                  </Button>
                  <Button 
                    className="bg-white text-blue-700 hover:bg-blue-50"
                    onClick={() => navigate('/signup')}
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;