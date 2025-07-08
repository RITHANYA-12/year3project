import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { Droplet, Shield, Bell, MapPin } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2129796/pexels-photo-2129796.png')] bg-cover bg-center opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block bg-blue-600 rounded-full p-3 mb-6">
                <Droplet className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Real-time Glacier Outburst Monitoring & Alert System
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Protecting communities across India with advanced early detection of glacier lake outburst floods.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-800 hover:bg-blue-50"
                  onClick={() => navigate('/signup')}
                >
                  Create Account
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/40 hover:bg-white/10" 
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How GlacierGuard Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Leveraging cutting-edge technology to monitor and protect communities from glacier outburst floods
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:translate-y-[-5px]">
                <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Detection</h3>
                <p className="text-gray-600">
                  Our CNN model continuously analyzes satellite imagery to detect early signs of potential outbursts.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:translate-y-[-5px]">
                <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Mapping</h3>
                <p className="text-gray-600">
                  Interactive maps show your location relative to potential outburst zones across India.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:translate-y-[-5px]">
                <div className="bg-red-100 text-red-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Alerts</h3>
                <p className="text-gray-600">
                  Receive immediate email notifications when outbursts are detected near your location.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-sky-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join the GlacierGuard Network</h2>
            <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
              Be part of our early warning system and help protect communities from glacier lake outburst floods.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50"
              onClick={() => navigate('/signup')}
            >
              Sign Up Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;