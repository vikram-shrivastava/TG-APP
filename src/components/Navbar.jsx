import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
function Navbar() {
    const navigate=useNavigate();
      const [isMenuOpen, setIsMenuOpen] = useState(false);
    
      const { isAuthenticated, setIsAuthenticated } = useAuth();
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const handleSignout = () => {
    // Remove from localStorage if you're storing auth status
    localStorage.removeItem('isAuthenticated');
    
    // Update context
    setIsAuthenticated(false);
    // Redirect to home or login
    navigate("/");
  };
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link to="/">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-500">TG</span>
              <span className="text-xl font-bold text-gray-800">Teacher Guardian</span>
            </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6">
              <a href="/dashboard" className="text-gray-600 hover:text-blue-500 font-medium transition-colors">Dashboard</a>
              <a href="/#features" className="text-gray-600 hover:text-blue-500 font-medium transition-colors">Features</a>
              <a href="/#contact" className="text-gray-600 hover:text-blue-500 font-medium transition-colors">Contact</a>
            </div>
            {!isAuthenticated &&
            <div className="hidden md:flex gap-4">
              <button className="px-4 py-2 border border-blue-500 text-blue-500 font-medium rounded hover:bg-blue-500 hover:text-white transition-colors" onClick={handleLogin}>Login</button>
              <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors" onClick={handleSignup}>Sign Up</button>
            </div>
            }
            {isAuthenticated &&
            <div className="hidden md:flex gap-4">
              <button className="px-4 py-2 border border-blue-500 text-blue-500 font-medium rounded hover:bg-blue-500 hover:text-white transition-colors" onClick={handleSignout}>Signout</button>
            </div>

            }
            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t mt-4">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-600 hover:text-blue-500 font-medium">Features</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-500 font-medium">How It Works</a>
                <a href="#testimonials" className="text-gray-600 hover:text-blue-500 font-medium">Testimonials</a>
                <a href="#contact" className="text-gray-600 hover:text-blue-500 font-medium">Contact</a>
                <div className="flex gap-4 mt-2">
                  <button className="px-4 py-2 border border-blue-500 text-blue-500 font-medium rounded hover:bg-blue-500 hover:text-white transition-colors">Login</button>
                  <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors">Sign Up</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
  )
}

export default Navbar
