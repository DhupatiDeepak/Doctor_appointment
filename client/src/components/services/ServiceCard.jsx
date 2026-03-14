import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ServiceCard = ({ service }) => {
  return (
    <div className="card-premium flex flex-col group reveal h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
            src={service.image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"} 
            alt={service.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent"></div>
        {/* Floating Icon/Badge Placeholder if needed */}
      </div>
      
      <div className="p-6 flex flex-col flex-grow bg-white relative">
        <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[7px] mb-4 inline-block py-0.5 px-3 bg-blue-50 rounded-full w-fit">Medical excellence</span>
        
        <h3 className="text-xl font-black text-[#0F172A] mb-3 group-hover:text-blue-600 transition-colors duration-500 tracking-tight">
          {service.title}
        </h3>
        
        <p className="text-gray-400 text-[11px] mb-6 leading-relaxed font-bold uppercase tracking-wide opacity-80">
          {service.description}
        </p>
        
        <ul className="space-y-2 mb-8 flex-grow">
          {service.features?.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-start text-[9px] text-[#0F172A] font-black uppercase tracking-wider">
              <div className="w-4 h-4 bg-blue-600/10 rounded flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <CheckCircle2 className="w-2.5 h-2.5" />
              </div>
              <span className="mt-0.5">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button className="btn btn-primary py-3.5 text-[10px] group-hover:bg-[#0F172A]">
          Learn More <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-2 transition-transform duration-500" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
