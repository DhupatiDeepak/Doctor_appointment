import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Facebook, Twitter, Instagram, 
  Linkedin, Heart, CheckCircle2, ChevronRight, ArrowRight
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white pt-32 pb-12 font-['Outfit',sans-serif] relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20 pb-20 border-b border-white/5">
          {/* Logo & About */}
          <div className="space-y-10">
            <Link to="/" className="inline-block transform hover:scale-105 transition-transform">
               <span className="text-3xl font-black">
                 Supra<span className="text-blue-500">Hospital</span>
               </span>
            </Link>
            <p className="text-white/40 text-[13px] font-bold leading-relaxed tracking-wider">
              Supra Multi-Speciality Hospital. We are committed to providing world-class healthcare services with compassion and excellence. Our team of specialists uses advanced technology to ensure better outcomes.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-white hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-black/20">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black mb-10 uppercase tracking-[0.2em] flex items-center">
               <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div> Quick Links
            </h4>
            <ul className="space-y-6">
              {['Home', 'About Us', 'Services', 'Our Doctors', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '')}`} 
                    className="group flex items-center text-white/40 hover:text-white transition-colors text-[13px] font-black uppercase tracking-widest"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform text-blue-500/50" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-lg font-black mb-10 uppercase tracking-[0.2em] flex items-center">
               <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div> Our Services
            </h4>
            <ul className="space-y-6">
              {['Digital X-RAY', 'Diagnostics & Pathology', 'ENT (Ear, Nose & Throat)', 'Neurology', 'Surgical Oncology', 'Gynaecologic Oncology', 'Urology', 'Paediatrics & Neonatology'].map((service) => (
                <li key={service} className="group flex items-center text-white/40 hover:text-white transition-colors text-[11px] font-black uppercase tracking-widest">
                   <div className="w-1.5 h-1.5 bg-teal-500/30 rounded-full mr-3 group-hover:bg-teal-500 transition-colors"></div>
                   {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-black mb-10 uppercase tracking-[0.2em] flex items-center">
               <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div> Contact Info
            </h4>
            <ul className="space-y-10">
              <li className="flex group">
                <div className="w-11 h-11 bg-red-500/10 rounded-xl flex items-center justify-center mr-5 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all shadow-lg shadow-red-500/5">
                   <MapPin className="w-5 h-5" />
                </div>
                <div>
                   <span className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Our Location</span>
                   <p className="text-[13px] font-black text-white/70">Old Motor Stand, Agartala</p>
                </div>
              </li>
              <li className="flex group">
                <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center mr-5 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg shadow-blue-500/5">
                   <Phone className="w-5 h-5" />
                </div>
                <div>
                   <span className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Call Us Anywhere</span>
                   <p className="text-[13px] font-black text-white/70 font-sans">+91 9089224497 <br /> +91 70856 60087</p>
                </div>
              </li>
              <li className="flex group">
                <div className="w-11 h-11 bg-teal-500/10 rounded-xl flex items-center justify-center mr-5 text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all shadow-lg shadow-teal-500/5">
                   <Mail className="w-5 h-5" />
                </div>
                <div>
                   <span className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Email Us</span>
                   <p className="text-[13px] font-black text-white/70">masupra25@gmail.com <br /> -- <br /> --</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
          <p>©{new Date().getFullYear()} Supra Multi-Speciality Hospital. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">Design & Hosted By: <span className="text-blue-500/60 transition-colors hover:text-blue-500 cursor-help">Mera Mitt Private Limited</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
