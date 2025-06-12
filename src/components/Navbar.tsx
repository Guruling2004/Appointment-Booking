import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-teal-100 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-2 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">MediCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-teal-600 relative ${
                isActive("/") ? "text-teal-600" : "text-gray-700"
              }`}
            >
              Home
              {isActive("/") && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>}
            </Link>
            <Link
              to="/doctors"
              className={`text-sm font-medium transition-colors hover:text-teal-600 relative ${
                isActive("/doctors") ? "text-teal-600" : "text-gray-700"
              }`}
            >
              Find Doctors
              {isActive("/doctors") && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>}
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-teal-600 relative ${
                isActive("/about") ? "text-teal-600" : "text-gray-700"
              }`}
            >
              About
              {isActive("/about") && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>}
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-teal-600 relative ${
                isActive("/contact") ? "text-teal-600" : "text-gray-700"
              }`}
            >
              Contact
              {isActive("/contact") && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>}
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <Link to="/my-appointments">
                <Button variant="ghost" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
                  My Appointments
                </Button>
              </Link>
            )}
            {user ? (
              <div className="flex items-center space-x-2">
                <UserIcon className="h-6 w-6 text-teal-600" />
                <span className="text-gray-700 font-medium">{user.fullName}</span>
                <button onClick={logout} className="ml-2 text-gray-500 hover:text-red-600" title="Logout">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-teal-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-teal-100 py-4 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-teal-600 px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/doctors"
                className="text-gray-700 hover:text-teal-600 px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Doctors
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-teal-600 px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-teal-600 px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 px-4">
                {user && (
                  <Link to="/my-appointments" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start hover:bg-teal-50">
                      My Appointments
                    </Button>
                  </Link>
                )}
                {user ? (
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-6 w-6 text-teal-600" />
                    <span className="text-gray-700 font-medium">{user.fullName}</span>
                    <button onClick={logout} className="ml-2 text-gray-500 hover:text-red-600" title="Logout">
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start hover:bg-teal-50">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
