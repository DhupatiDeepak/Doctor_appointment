import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Calendar, Phone, Activity, Heart, Shield, 
  Stethoscope, Microscope, Globe,
  Briefcase, Syringe, Ambulance, UserCheck
} from 'lucide-react';
import API from '../api/axiosInstance';
import ServiceCard from '../components/services/ServiceCard';
import Loader from '../components/common/Loader';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await API.get('/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const additionalFacilities = [
    { icon: <Ambulance className="w-8 h-8" />, title: 'ER/Emergency', desc: 'Fast & Reliable emergency medical services around.' },
    { icon: <Briefcase className="w-8 h-8" />, title: 'NICU Services', desc: 'Dedicated intensive unit for specialized medical care.' },
    { icon: <Heart className="w-8 h-8" />, title: 'NICU & PICU', desc: 'Advanced neonatal and cardiac care center.' },
    { icon: <Syringe className="w-8 h-8" />, title: 'Vaccination Center', desc: 'Comprehensive health services for younger babies.' },
    { icon: <Activity className="w-8 h-8" />, title: 'Operation Theatre', desc: 'Modern 24/7 specialized operation equipment.' },
    { icon: <Microscope className="w-8 h-8" />, title: 'Radiology Services', desc: 'Modernized imaging and diagnostic facilities.' },
    { icon: <Shield className="w-8 h-8" />, title: 'Health Packages', desc: 'Comprehensive health check-up packages.' },
    { icon: <UserCheck className="w-8 h-8" />, title: 'Patient Support', desc: 'Dedicated support lines for patients.' }
  ];

  return (
    <div className="bg-light font-['Outfit',sans-serif] transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-[#0F172A] to-[#2563EB] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 animate-fade-in">Our Medical Services</h1>
          <p className="text-lg md:text-xl font-medium text-white/80 mb-8 md:mb-10 max-w-2xl mx-auto">Comprehensive healthcare services across multiple specialities</p>
          <div className="flex items-center justify-center space-x-2 text-[10px] md:text-sm font-bold uppercase tracking-widest text-white/60">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Services</span>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 md:mb-24">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/10 rounded-full text-blue-600 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-6 border border-blue-600/20">
             <Activity className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" /> Medical Facilities
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-[#0F172A] mb-6 md:mb-8">Healthcare Services</h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed text-sm md:text-base">
            Leading multi-speciality hospital providing complete family healthcare with expert specialists and modern facilities.
          </p>
          <div className="w-20 md:w-24 h-1 md:h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-40">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
              {services.map(service => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Facilities Section */}
      <section className="py-16 md:py-24 bg-[#D0E7FF] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 md:mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/10 rounded-full text-blue-600 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-6 border border-blue-600/20">
             <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" /> Premium Services
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-6 md:mb-8">Additional Facilities</h2>
          <p className="text-gray-500 font-medium max-w-xl mx-auto text-sm md:text-base">Providing extra support services for your every healthcare need.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {additionalFacilities.map((facility, i) => (
            <div key={i} className="bg-white p-8 md:p-10 rounded-[30px] border border-blue-100 shadow-xl shadow-blue-200/20 hover:shadow-2xl hover:-translate-y-2 transition-all group text-center border-b-[4px] border-blue-600/50">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-[15deg] transition-all shadow-lg shadow-blue-600/10">
                {facility.icon}
              </div>
              <h4 className="text-lg md:text-xl font-black text-[#0F172A] mb-3 md:mb-4">{facility.title}</h4>
              <p className="text-gray-400 text-[10px] md:text-xs font-bold leading-relaxed">{facility.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-[#D0E7FF] flex justify-center transition-colors duration-500">
        <div className="max-w-5xl w-full px-6 text-center bg-gradient-to-r from-[#0F172A] to-[#2563EB] p-10 md:p-24 rounded-[40px] md:rounded-[60px] shadow-2xl relative overflow-hidden text-white drop-shadow-2xl">
          <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-white/5 rounded-full -mr-10 md:-mr-16 -mt-10 md:-mt-16"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 leading-tight">Need Medical Assistance?</h2>
            <p className="text-white/80 text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Book your appointment today and get expert medical consultation from our specialists.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 w-full sm:w-auto">
              <Link to="/appointment" className="inline-flex items-center justify-center px-10 md:px-12 py-4 md:py-5 bg-white text-blue-600 font-black uppercase tracking-widest text-[10px] md:text-sm rounded-xl shadow-2xl hover:bg-white/90 transition-all transform hover:-translate-y-1">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-3" /> Book Appointment
              </Link>
              <a href="tel:5551234567" className="inline-flex items-center justify-center px-10 md:px-12 py-4 md:py-5 bg-transparent border-2 border-white text-white font-black uppercase tracking-widest text-[10px] md:text-sm rounded-xl hover:bg-white hover:text-blue-600 transition-all transform hover:-translate-y-1 shadow-xl">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-3" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
