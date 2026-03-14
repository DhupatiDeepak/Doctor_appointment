import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="card-premium h-full flex flex-col group reveal">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={doctor.image} 
          alt={doctor.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>
      
      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow bg-white relative">
        {/* Specialization mini-badge */}
        <div className="flex items-center space-x-2 mb-2">
           <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
           <span className="text-blue-600 text-[8px] font-black uppercase tracking-[0.25em]">{doctor.specialization}</span>
        </div>

        <h3 className="text-xl font-black text-[#0F172A] mb-2 uppercase tracking-tight group-hover:text-blue-600 transition-colors duration-500">
          {doctor.name}
        </h3>
        
        <p className="text-gray-400 text-[9px] font-black mb-4 tracking-[0.15em] uppercase opacity-70">
          Senior Specialist
        </p>
        
        {/* Qualifications with Glass Style */}
        <div className="flex flex-wrap gap-2 mb-6">
          {doctor.education.split(',').map((qual, i) => (
            <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[8px] font-black rounded-lg border border-blue-100/50 hover:bg-blue-600 hover:text-white transition-colors cursor-default">
              {qual.trim()}
            </span>
          ))}
        </div>
        
        {/* Premium Action Button */}
        <Link 
          to={`/appointment?doctor=${encodeURIComponent(doctor.name)}`} 
          className="mt-auto btn btn-primary py-3.5 text-[10px] group-hover:bg-[#0F172A]"
        >
          <Calendar className="w-4 h-4 mr-3" /> Book Appointment
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
