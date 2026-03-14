import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Activity, UserCheck, Shield, Target, ArrowRight, 
  CheckCircle2, Phone, Mail, MapPin, Search, Stethoscope,
  ChevronLeft, ChevronRight, Play, HeartPulse
} from 'lucide-react';
import API from '../api/axiosInstance';
import DoctorCard from '../components/doctors/DoctorCard';
import ServiceCard from '../components/services/ServiceCard';
import Loader from '../components/common/Loader';

const Home = () => {
  const [data, setData] = useState({ doctors: [], services: [] });
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
      title: "Modern Healthcare",
      subtitle: "24/7 Expert Support",
      description: "World-class specialists and cutting-edge medical technology for better patient outcomes.",
      highlight: "Healthcare"
    },
   
    {
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
      title: "Advanced Facilities",
      subtitle: "State-of-the-Art",
      description: "Equipped with the latest diagnostic and surgical technology for precise and effective medical solutions.",
      highlight: "Facilities"
    },
    {
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80",
      title: "Emergency Care",
      subtitle: "24/7 Rapid Response",
      description: "Our emergency department is equipped with advanced life-saving technology for immediate critical care.",
      highlight: "Response"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docs, servs ] = await Promise.all([
          API.get('/doctors'),
          API.get('/services')
        ]);
        setData({ doctors: docs.data, services: servs.data });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (loading) return <div className="h-screen flex items-center justify-center bg-light transition-colors duration-500"><Loader /></div>;

  return (
    <div className="bg-light font-['Outfit',sans-serif] transition-colors duration-500">


      {/* Hero Slideshow Section */}
      <section className="relative h-[85vh] md:h-[92vh] overflow-hidden group">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#0F172A] via-[#0F172A]/70 md:via-[#0F172A]/60 to-transparent z-10"></div>
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center relative z-20">
              <div className={`max-w-3xl text-white transition-all duration-1000 delay-300 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <div className="inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 bg-blue-600/20 backdrop-blur-md rounded-full text-blue-400 font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em] mb-6 md:mb-10 border border-blue-600/30">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full mr-2 md:mr-3 animate-pulse"></span>
                    {slide.subtitle}
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-[100px] font-black leading-[1] md:leading-[0.9] mb-6 md:mb-10 tracking-tight">
                  {slide.title.split(' ')[0]} <br className="hidden sm:block" />
                  <span className="text-[#38BDF8]">{slide.highlight}</span>
                </h1>
                <p className="text-sm md:text-xl text-white/70 font-bold mb-8 md:mb-14 leading-relaxed max-w-xl uppercase tracking-wider">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
                  <Link to="/doctors" className="btn-primary btn px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-xs shadow-2xl w-full sm:w-auto">
                    Get Started <ArrowRight className="w-4 h-4 ml-4" />
                  </Link>
                  <Link to="/contact" className="px-6 md:px-10 py-4 md:py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-black uppercase tracking-widest text-[8px] md:text-[10px] rounded-2xl hover:bg-white hover:text-dark transition-all transform hover:-translate-y-1 flex items-center justify-center min-w-[160px] md:min-w-[200px] shadow-xl w-full sm:w-auto">
                    View Schedule
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slideshow Controls */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-4 md:space-x-6">
           {slides.map((_, i) => (
             <button 
               key={i}
               onClick={() => setCurrentSlide(i)}
               className={`h-1 md:h-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-10 md:w-16 bg-blue-500' : 'w-2 md:w-4 bg-white/20 hover:bg-white/40'}`}
             ></button>
           ))}
        </div>

        <button onClick={prevSlide} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex w-16 h-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-blue-600 hover:border-blue-600 transition-all transform hover:-translate-x-2">
           <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex w-16 h-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-blue-600 hover:border-blue-600 transition-all transform hover:translate-x-2">
           <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* Stats Quick Bar */}
      <section className="relative z-40 -mt-10 md:mt-20 px-6 mb-20 md:mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: "Emergency Care", desc: "Immediate 24/7 Response", icon: HeartPulse, color: "blue", stat: "24/7" },
            { title: "Expert Doctors", desc: "Top Specialized Surgeons", icon: UserCheck, color: "teal", stat: "150+" },
            { title: "Smart Laboratory", desc: "AI-Powered Diagnostics", icon: Activity, color: "sky", stat: "Global" }
          ].map((item, i) => (
            <div key={i} className="glass group p-8 md:p-10 rounded-[32px] md:rounded-[40px] transform hover:-translate-y-2 transition-all duration-700 cursor-pointer">
              <div className={`w-12 h-12 md:w-16 md:h-16 bg-blue-600/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-all duration-500`}>
                 <item.icon className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <div className="flex justify-between items-start mb-3 md:mb-4">
                 <h4 className="text-lg md:text-xl font-black text-[#0F172A] uppercase tracking-wider">{item.title}</h4>
                 <span className="text-[8px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-2 md:px-3 py-1 rounded-full">{item.stat}</span>
              </div>
              <p className="text-gray-400 text-[10px] md:text-xs font-bold leading-relaxed uppercase tracking-widest">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section - Refined */}
      <section className="py-20 md:py-48 overflow-hidden bg-[#F0F7FF] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            <div className="lg:w-1/2 relative w-full">
              <div className="relative z-10 rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.15)] group">
                <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80" alt="About Hospital" className="w-full h-auto transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <div className="absolute -top-10 md:-top-20 -right-10 md:-right-20 w-40 md:w-80 h-40 md:h-80 bg-blue-600/10 rounded-full blur-[60px] md:blur-[120px]"></div>
              
              <div className="absolute -bottom-6 md:-bottom-10 -right-4 md:-right-10 glass p-6 md:p-10 rounded-[30px] md:rounded-[40px] z-20 border-white/40 hidden sm:block shadow-2xl transform hover:scale-105 transition-transform duration-500">
                 <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-2xl md:rounded-3xl text-white flex items-center justify-center shadow-2xl shadow-blue-600/30">
                       <Shield className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                        <div className="font-black text-[#0F172A] text-xl md:text-2xl tracking-tighter leading-none">ISO 9001</div>
                        <div className="text-gray-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest mt-1 md:mt-2">Certified Excellence</div>
                    </div>
                 </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[8px] md:text-[10px] mb-6 md:mb-8 py-2 px-4 md:px-6 bg-blue-50 rounded-full inline-block">Welcome to Supra Excellence</span>
              <h2 className="text-4xl md:text-[64px] font-black text-[#0F172A] mb-8 md:mb-10 leading-[1] md:leading-[0.95] tracking-tight">
                Empowering Your <br className="hidden md:block" />
                <span className="text-blue-600">Recovery Journey.</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-lg mb-10 md:mb-14 leading-relaxed font-bold uppercase tracking-wide opacity-80 max-w-lg">
                We bridge the gap between advanced medical science and compassionate human care. Our mission is your sanctuary.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8 mb-12 md:mb-16 w-full max-w-lg">
                {['24/7 Support', 'Smart Labs', 'Top Specialists', 'Global Standards'].map((item, i) => (
                  <div key={i} className="flex items-center justify-center lg:justify-start text-[#0F172A] font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] group cursor-default">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600/10 rounded-lg md:rounded-xl flex items-center justify-center mr-4 md:mr-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary btn px-10 md:px-14 py-4 md:py-6 text-[10px] md:text-xs group w-full sm:w-auto">
                Discover More <ArrowRight className="w-4 h-4 ml-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Glass Cards */}
      <section className="py-20 md:py-48 bg-[#D0E7FF] relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/[0.02] -skew-x-12"></div>
        <div className="max-w-7xl mx-auto px-6 text-center mb-20 md:mb-32 relative z-10">
          <div className="inline-block px-6 md:px-8 py-2 md:py-2.5 bg-blue-600/10 text-blue-600 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-8 md:mb-10">Our Medical Services</div>
          <h2 className="text-4xl md:text-7xl font-black text-[#0F172A] tracking-tighter mb-6 md:mb-8 leading-tight md:leading-none">Pioneering Future of Health</h2>
          <div className="w-20 md:w-32 h-1.5 md:h-2 bg-blue-600 mx-auto rounded-full shadow-lg shadow-blue-600/20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {loading ? <Loader /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
              {data.services.slice(0, 6).map(service => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Specialist Section - Animated Grid */}
      <section className="py-20 md:py-48 bg-[#F8FAFF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 md:mb-24">
          <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[8px] md:text-[10px] mb-6 md:mb-8 bg-blue-50 px-6 md:px-8 py-2 md:py-2.5 rounded-full inline-block">Specialized Team</span>
          <h2 className="text-4xl md:text-[80px] font-black text-[#0F172A] tracking-tighter mb-8 md:mb-12 leading-tight md:leading-none">Legendary Doctors</h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          {loading ? <div className="h-64 flex items-center justify-center"><Loader /></div> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
              {data.doctors.slice(0, 4).map(doctor => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
          
          <div className="mt-20 md:mt-32 p-10 md:p-24 bg-[#0F172A] rounded-[40px] md:rounded-[50px] flex flex-col md:flex-row items-center justify-between text-white shadow-[0_50px_100px_-20px_rgba(15,23,42,0.4)] relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
             <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-600/5 rounded-full -mr-16 md:-mr-32 -mt-16 md:-mt-32 blur-[60px] md:blur-[100px]"></div>
             <div className="text-center md:text-left mb-10 md:mb-0 relative z-10">
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 md:mb-6">Join Our Medical Elite</h3>
                <p className="text-white/40 font-black tracking-[0.3em] uppercase text-[8px] md:text-[10px] max-w-md">Access 150+ world-class specialists with a single click.</p>
             </div>
             <Link to="/doctors" className="btn bg-white text-dark hover:bg-blue-500 hover:text-white px-10 md:px-16 py-4 md:py-6 text-[10px] md:text-xs relative z-10 shadow-2xl w-full md:w-auto">
                Enter Registry <ArrowRight className="w-4 h-4 ml-4" />
             </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Section - Premium Dark */}
      <section className="py-20 md:py-32 bg-[#0F172A] relative overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 text-center text-white relative z-10">
          {[
            { val: "7", label: "Centers", desc: "Global Recognition" },
            { val: "50k+", label: "Recoveries", desc: "Lives Transformed" },
            { val: "100%", label: "Success", desc: "Expert Precision" },
            { val: "15yrs", label: "Legacy", desc: "Trusted Care" }
          ].map((stat, i) => (
            <div key={i} className="group cursor-default">
              <h3 className="text-4xl sm:text-6xl md:text-8xl font-black text-white group-hover:text-blue-500 transition-colors duration-500 tracking-tighter mb-2 md:mb-4">{stat.val}</h3>
              <p className="text-white font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px] mb-2">{stat.label}</p>
              <div className="w-6 md:w-8 h-0.5 md:h-1 bg-blue-600 mx-auto rounded-full mb-3 md:mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-12 md:group-hover:w-16"></div>
              <p className="text-white/20 font-black uppercase tracking-[0.2em] text-[7px] md:text-[8px]">{stat.desc}</p>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0,transparent_70%)]"></div>
        </div>
      </section>

      {/* CTA Section - Ultra Modern */}
      <section className="py-24 md:py-56 bg-light relative overflow-hidden transition-colors duration-500">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-600/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <span className="inline-block px-8 md:px-10 py-2.5 md:py-3 bg-red-600/10 text-red-600 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] mb-10 md:mb-12 animate-pulse">Emergency Direct</span>
            <h2 className="text-4xl md:text-[100px] font-black text-[#0F172A] mb-10 md:mb-16 leading-[1] md:leading-[0.85] tracking-tighter px-4">Your Health, <br /> Our Command.</h2>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 md:gap-10 max-w-lg mx-auto md:max-w-none">
              <Link to="/doctors" className="btn-primary btn px-12 md:px-20 py-5 md:py-7 text-xs md:text-sm shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)] w-full sm:w-auto">
                Secure Booking 
              </Link>
              <a href="tel:5551234567" className="btn bg-dark text-white hover:bg-red-600 px-12 md:px-20 py-5 md:py-7 text-xs md:text-sm shadow-2xl w-full sm:w-auto">
                Rapid Help
              </a>
            </div>
            <p className="mt-12 md:mt-16 text-gray-400 font-bold uppercase tracking-[0.4em] text-[8px] md:text-[9px]">Advanced Medical Intelligence System Online</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
