import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Target, Heart, Eye, Shield, Award, 
  Settings, Users, Activity, Phone, Calendar, ArrowRight,
  Microscope, Globe
} from 'lucide-react';

const About = () => {
  return (
    <div className="bg-light font-['Outfit',sans-serif] transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-[#0F172A] to-[#2563EB] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 animate-fade-in">About Us</h1>
          <p className="text-lg md:text-xl font-medium text-white/80 mb-8 md:mb-10 max-w-2xl mx-auto">Learn more about Supra Multi-Speciality Hospital</p>
          <div className="flex items-center justify-center space-x-2 text-[10px] md:text-sm font-bold uppercase tracking-widest text-white/60">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 md:py-32 bg-[#D0E7FF] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            <div className="lg:w-1/2 w-full">
               <div className="relative group">
                  <div className="absolute -inset-4 bg-blue-600/5 rounded-[30px] md:rounded-[40px] blur-2xl group-hover:bg-blue-600/10 transition-colors"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80" 
                    alt="Hospital Building" 
                    className="relative z-10 rounded-[20px] md:rounded-[30px] shadow-2xl w-full h-auto object-cover"
                  />
                  <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-light p-5 md:p-8 rounded-xl md:rounded-3xl shadow-xl z-20 border border-blue-100 hidden sm:block transform group-hover:-translate-y-2 transition-transform">
                     <div className="text-blue-600 font-black text-2xl md:text-4xl mb-0.5 md:mb-1">2025</div>
                     <div className="text-gray-500 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Est. Since</div>
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-6 md:mb-8 leading-tight">
                Welcome to Supra Multi-Speciality <span className="text-blue-600">Hospital</span>
              </h2>
              <p className="text-blue-500 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-6 md:mb-8 block">Your Health Is Our Priority</p>
              
              <div className="w-16 md:w-20 h-1 md:h-1.5 bg-blue-600 rounded-full mb-8 md:mb-10"></div>
              
              <div className="space-y-4 md:space-y-6 text-gray-500 font-medium leading-relaxed mb-10 md:mb-12 text-sm md:text-base">
                <p>
                  Supra Multi-Speciality Hospital is a premier healthcare institution dedicated to providing world-class medical services with a commitment to excellence. 
                </p>
                <p>
                  Established with a vision to deliver comprehensive healthcare solutions, we combine cutting-edge medical technology with the expertise of highly qualified specialists. Our state-of-the-art facility is equipped with modern diagnostic and treatment equipment to ensure accurate diagnoses and effective treatment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                {[
                  { icon: <Settings className="w-4 h-4 md:w-5 md:h-5" />, title: 'Modern Facilities', desc: 'State-of-the-art infrastructure' },
                  { icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, title: 'Expert Doctors', desc: '25+ Certified specialists' },
                  { icon: <Calendar className="w-4 h-4 md:w-5 md:h-5" />, title: '24/7 Emergency', desc: 'Round the clock care' },
                  { icon: <Heart className="w-4 h-4 md:w-5 md:h-5" />, title: 'Patient Care', desc: 'Compassionate service' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start group">
                    <div className="p-2.5 md:p-3 bg-blue-600/10 rounded-lg md:rounded-xl text-blue-600 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-[#0F172A] text-sm md:text-lg mb-0.5 md:mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-[10px] md:text-xs font-bold transition-colors group-hover:text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-24 bg-[#BEE3FF] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
            {/* Our Mission */}
            <div className="bg-light p-10 md:p-16 rounded-[30px] md:rounded-[40px] shadow-xl relative overflow-hidden group border-b-[6px] border-blue-600">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
               <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 md:mb-10 text-blue-600">
                  <Target className="w-7 h-7 md:w-8 md:h-8" />
               </div>
               <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] mb-6 md:mb-8">Our Mission</h3>
               <p className="text-gray-500 font-medium mb-8 md:mb-10 leading-relaxed text-xs md:text-sm">
                 To provide accessible, affordable, and high-quality healthcare to people of our region. We are committed to improving the health and well-being of our community through compassionate care, clinical excellence, and continuous improvement in medical practices.
               </p>
               <ul className="space-y-3 md:space-y-4">
                 {[
                   'Highest quality medical services',
                   'Maintain high standards of ethical practice',
                   'Provide affordable healthcare for all',
                   'Focus on patient satisfaction and improvement'
                 ].map((item, i) => (
                   <li key={i} className="flex items-center text-xs md:text-sm font-bold text-gray-700">
                     <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 mr-3 flex-shrink-0" /> {item}
                   </li>
                 ))}
               </ul>
            </div>
            
            {/* Our Vision */}
            <div className="bg-light p-10 md:p-16 rounded-[30px] md:rounded-[40px] shadow-xl relative overflow-hidden group border-b-[6px] border-[#0D9488]">
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
               <div className="w-14 h-14 md:w-16 md:h-16 bg-teal-600/10 rounded-2xl flex items-center justify-center mb-8 md:mb-10 text-teal-600">
                  <Eye className="w-7 h-7 md:w-8 md:h-8" />
               </div>
               <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] mb-6 md:mb-8">Our Vision</h3>
               <p className="text-gray-500 font-medium mb-8 md:mb-10 leading-relaxed text-xs md:text-sm">
                 To become the most trusted and preferred multi-speciality hospital in the region, recognized for our commitment to excellence in healthcare, medical research, and education. We aim to lead with innovation and patient-centric services.
               </p>
               <ul className="space-y-3 md:space-y-4">
                 {[
                   'Become a leading healthcare provider',
                   'Integrate advanced medical technologies',
                   'Expand specialized medical services',
                   'Deliver state-of-the-art medical care'
                 ].map((item, i) => (
                   <li key={i} className="flex items-center text-xs md:text-sm font-bold text-gray-700">
                     <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-teal-600 mr-3 flex-shrink-0" /> {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-32 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 leading-tight">Our Core Values</h2>
          <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">The principles that guide us every day</p>
          <div className="w-16 md:w-24 h-1 md:h-1.5 bg-blue-600 mx-auto mt-6 md:mt-8 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {[
            { icon: <Award className="w-8 h-8 md:w-10 md:h-10" />, title: 'Excellence', desc: 'Striving for the highest standards in medical care and service delivery.' },
            { icon: <Shield className="w-8 h-8 md:w-10 md:h-10" />, title: 'Integrity', desc: 'Maintaining ethical, transparent, and honest practices in all our actions.' },
            { icon: <Heart className="w-8 h-8 md:w-10 md:h-10" />, title: 'Compassion', desc: 'Treating every patient with empathy, dignity, and respect.' },
            { icon: <Globe className="w-8 h-8 md:w-10 md:h-10" />, title: 'Innovation', desc: 'Embracing new technologies and methods to improve patient outcomes.' }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 transition-all group-hover:bg-blue-600 group-hover:scale-110">
                <div className="text-blue-400 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
              </div>
              <h4 className="text-lg md:text-xl font-black mb-3 md:mb-4">{item.title}</h4>
              <p className="text-white/50 text-[11px] md:text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
