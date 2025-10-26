import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">EyeCareAI</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Advanced AI-powered diabetic retinopathy detection system. Early detection for better vision care.
            </p>
            <div className="flex items-center space-x-4 text-gray-300">
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>support@eyecareai.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/model" className="text-gray-300 hover:text-white transition-colors">AI Model</Link></li>
              <li><Link to="/dataset" className="text-gray-300 hover:text-white transition-colors">Dataset</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Retinal Image Analysis</li>
              <li>Early Detection</li>
              <li>Medical Reports</li>
              <li>Health Monitoring</li>
              <li>Professional Screening</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 EyeCareAI. All rights reserved. Making eye care accessible to everyone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;