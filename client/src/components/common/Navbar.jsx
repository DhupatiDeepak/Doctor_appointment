import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X, User, LogOut, LayoutDashboard, Calendar, Home, Info, Activity, Phone, Stethoscope } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Services', path: '/services', icon: Activity },
    { name: 'Our Doctors', path: '/doctors', icon: Stethoscope },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <nav className="bg-[#0F172A]/95 backdrop-blur-md shadow-lg sticky top-0 z-50 font-['Outfit',sans-serif] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-black text-white">
                TANUJA<span className="text-blue-500"> NURSING HOME</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-slate-400 hover:text-white px-3 py-2 text-[10px] lg:text-[12px] font-black uppercase tracking-widest transition-colors flex items-center group"
              >
                <link.icon className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform" />
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4 lg:space-x-6 pl-4 lg:pl-6 border-l border-white/10">
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center text-blue-400 hover:text-white font-black text-[10px] lg:text-xs uppercase tracking-widest transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" /> Admin
                  </Link>
                )}
                <Link to="/profile" className="text-gray-700 hover:text-[#2563EB] flex items-center space-x-2">
                   <div className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <User className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-400" />
                   </div>
                   <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-slate-300 group-hover:text-white">{user.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/doctors"
                  className="bg-blue-600 text-white px-4 lg:px-8 py-2.5 lg:py-3.5 rounded-xl text-[10px] lg:text-xs font-black uppercase tracking-widest hover:bg-blue-700 hover:scale-105 transition-all"
                >
                  Book Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0F172A]/98 backdrop-blur-xl border-t border-white/5 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 pt-6 pb-20 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center px-6 py-5 text-sm font-black uppercase tracking-[0.2em] text-slate-300 hover:text-white hover:bg-white/5 rounded-2xl group transition-all"
                onClick={() => setIsOpen(false)}
              >
                <link.icon className="w-5 h-5 mr-4 text-blue-500/50 group-hover:text-blue-400" />
                {link.name}
              </Link>
            ))}
            
            <div className="pt-8 mt-8 border-t border-white/5 space-y-4">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-6 py-5 text-sm font-black uppercase tracking-[0.2em] text-slate-300 hover:text-white hover:bg-white/5 rounded-2xl group transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5 mr-4 text-blue-500/50 group-hover:text-blue-400" />
                    My Profile
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center px-6 py-5 text-sm font-black uppercase tracking-[0.2em] text-blue-400 hover:text-white hover:bg-white/5 rounded-2xl group transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5 mr-4" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="w-full flex items-center px-6 py-5 text-sm font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-500 hover:bg-red-500/5 rounded-2xl group transition-all"
                  >
                    <LogOut className="w-5 h-5 mr-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/doctors"
                  className="w-full flex items-center justify-center py-5 bg-blue-600 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
                  onClick={() => setIsOpen(false)}
                >
                  Book Appointment
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
