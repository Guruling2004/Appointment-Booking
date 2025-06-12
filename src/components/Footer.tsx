
import { Heart, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-2 rounded-lg shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">MediCare</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted healthcare partner. We connect you with the best doctors 
              and provide seamless appointment booking for all your medical needs.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-teal-600/20 p-2 rounded-lg">
                  <Phone className="h-4 w-4 text-teal-400" />
                </div>
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-teal-600/20 p-2 rounded-lg">
                  <Mail className="h-4 w-4 text-teal-400" />
                </div>
                <span className="text-sm">contact@medicare.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-300">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-300">Services</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300 text-sm">Online Consultation</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">Emergency Care</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">Health Checkups</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">Specialist Care</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 MediCare. All rights reserved. | Built for educational purposes.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
