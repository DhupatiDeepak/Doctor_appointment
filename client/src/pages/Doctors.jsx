import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Calendar, Phone, Activity, UserCheck, 
  ArrowUpRight, Filter, ChevronRight
} from 'lucide-react';
import API from '../api/axiosInstance';
import DoctorCard from '../components/doctors/DoctorCard';
import Loader from '../components/common/Loader';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await API.get('/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const categories = [
    'All', 'Anesthesiology', 'Internal Medicine', 'Neurologist', 
    'Gynecologist and Obstetrician', 'Orthopedician', 'Pediatrics', 'Surgery', 'Urologist'
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doctor.specialization === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-light font-['Outfit',sans-serif] transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-[#0F172A] to-[#2563EB] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 animate-fade-in">Our Doctors</h1>
          <p className="text-lg md:text-xl font-medium text-white/80 mb-8 md:mb-10 max-w-2xl mx-auto">Meet our team of highly qualified medical specialists</p>
          <div className="flex items-center justify-center space-x-2 text-[10px] md:text-sm font-bold uppercase tracking-widest text-white/60">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Our Doctors</span>
          </div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="py-12 md:py-20 bg-[#D0E7FF] border-b border-blue-100 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto mb-10 md:mb-16 relative">
             <div className="absolute inset-y-0 left-5 md:left-6 flex items-center pointer-events-none">
                <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
             </div>
             <input 
                type="text" 
                placeholder="Search specialists..." 
                className="w-full pl-12 md:pl-16 pr-6 md:pr-8 py-4 md:py-5 rounded-xl md:rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm md:text-base text-gray-700 font-medium shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>

          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-3 overflow-x-auto pb-4 md:pb-0 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
             {categories.map((cat, i) => (
               <button 
                  key={i}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest border-2 transition-all flex items-center flex-shrink-0 ${selectedCategory === cat ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-105' : 'bg-light border-blue-50 text-gray-400 hover:text-blue-600 hover:border-blue-600'}`}
               >
                  <Activity className={`w-3 h-3 md:w-3.5 md:h-3.5 mr-2 ${selectedCategory === cat ? 'text-white' : 'text-gray-300'}`} />
                  {cat}
               </button>
             ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid Section */}
      <section className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-40">
              <Loader />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                {filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
              </div>
              
              <div className="mt-16 md:mt-20 text-center">
                 <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                    Showing <span className="text-[#0F172A]">{filteredDoctors.length}</span> specialist doctors
                 </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#D0E7FF] flex justify-center pb-32 md:pb-40 transition-colors duration-500">
        <div className="max-w-5xl w-full px-6 text-center bg-gradient-to-r from-[#0F172A] to-[#2563EB] p-10 md:p-24 rounded-[40px] md:rounded-[60px] shadow-2xl relative overflow-hidden text-white group">
          <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-white/5 rounded-full -mr-10 md:-mr-16 -mt-10 md:-mt-16 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 leading-tight">Consult Our Expert Doctors</h2>
            <p className="text-white/60 text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Book an appointment with our specialists for personalized medical care and treatment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 w-full sm:w-auto">
              <Link to="/appointment" className="inline-flex items-center justify-center px-10 md:px-12 py-4 md:py-5 bg-white text-blue-600 font-black uppercase tracking-widest text-[10px] md:text-sm rounded-xl shadow-xl hover:bg-white/90 transition-all transform hover:-translate-y-1">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-3" /> Book Appointment
              </Link>
              <a href="tel:5551234567" className="inline-flex items-center justify-center px-10 md:px-12 py-4 md:py-5 bg-transparent border-2 border-white text-white font-black uppercase tracking-widest text-[10px] md:text-sm rounded-xl hover:bg-white hover:text-blue-600 transition-all transform hover:-translate-y-1">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-3" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Back to top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-10 right-10 w-12 h-12 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
      >
         <ArrowUpRight className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default Doctors;
