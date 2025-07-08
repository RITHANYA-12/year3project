import React from 'react';
import { Droplet, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <Droplet className="h-6 w-6 mr-2 text-sky-400" />
              <h2 className="text-lg font-bold">GlacierGuard</h2>
            </div>
            <p className="mt-2 text-gray-400 text-sm max-w-md">
              A real-time monitoring system for glacier lake outburst floods (GLOFs) in India,
              providing early detection and alerts to nearby communities.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-sm font-semibold uppercase mb-3 text-gray-300">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-sky-400 text-sm transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sky-400 text-sm transition-colors">
                    Research Papers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sky-400 text-sm transition-colors">
                    GLOF Educational Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sky-400 text-sm transition-colors">
                    Emergency Response
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase mb-3 text-gray-300">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-sky-400 text-sm transition-colors flex items-center">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-sky-400 text-sm transition-colors flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} GlacierGuard. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;