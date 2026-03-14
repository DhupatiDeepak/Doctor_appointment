import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Clock, Ambulance, Calendar, 
  ChevronDown, Send, Bus, Car, Info, ArrowUpRight
} from 'lucide-react';
import API from '../api/axiosInstance';

const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="border border-gray-100 rounded-2xl mb-4 overflow-hidden shadow-sm transition-all duration-300">
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-6 text-left transition-colors ${isOpen ? 'bg-[#2563EB]/5' : 'bg-light hover:bg-blue-50'}`}
    >
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 transition-colors ${isOpen ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-400'}`}>
          <Info className="w-4 h-4" />
        </div>
        <span className={`font-black text-sm uppercase tracking-wide ${isOpen ? 'text-[#0F172A]' : 'text-gray-500'}`}>{title}</span>
      </div>
      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
      <div className="p-6 pt-0 text-gray-500 text-sm font-medium leading-relaxed bg-light border-t border-blue-50">
        {content}
      </div>
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/contact', formData);
      setSuccess(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      alert('Message failed to send.');
    }
  };

  const contactCards = [
    { icon: <Phone className="w-8 h-8" />, title: 'Call Us', content: 'Reach out to us and we will find immediate assistance.', details: ['+91 9089224497', '+91 70856 60087'], color: 'blue' },
    { icon: <Mail className="w-8 h-8" />, title: 'Email Us', content: 'Sent us your queries and we will respond promptly.', details: ['masupra25@gmail.com'], color: 'purple' },
    { icon: <MapPin className="w-8 h-8" />, title: 'Visit Us', content: 'Come visit our hospital for in-person consultation.', details: ['Old Motor Stand, Agartala'], color: 'red' },
    { icon: <Clock className="w-8 h-8" />, title: 'Working Hours', content: '...', details: ['Mon - Sat: 9:00 AM - 8:00 PM', 'Sunday: Emergency Only'], color: 'indigo' },
    { icon: <Ambulance className="w-8 h-8" />, title: 'Emergency', content: '24/7 emergency medical care is available.', buttonText: 'Call Emergency', buttonLink: 'tel:919089224497', color: 'teal' },
    { icon: <Calendar className="w-8 h-8" />, title: 'Book Appointment', content: 'Schedule your visit with our specialists.', buttonText: 'Book now', buttonLink: '/appointment', color: 'pink' }
  ];

  const faqs = [
    { title: 'What are your OPD Hours?', content: 'Our OPD hours are Monday to Saturday from 9:00 AM to 8:00 PM. Emergency services are available 24/7, including Sundays and holidays.' },
    { title: 'How can I book an appointment?', content: 'You can book an appointment through our website by clicking on "Book Appointment" button or by calling our helpdesk numbers.' },
    { title: 'Do you accept health insurance?', content: 'Yes, we accept most major health insurance providers. Please contact our billing department for specific inquiries.' },
    { title: 'Is parking available at the hospital?', content: 'Yes, we have a large dedicated parking area for patients and visitors within the hospital premises.' },
    { title: 'Do you provide ambulance services?', content: 'Yes, we provide 24/7 cardiac and emergency ambulance services with life support systems.' }
  ];

  return (
    <div className="bg-light font-['Outfit',sans-serif] transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-[#0F172A] to-[#2563EB] text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 animate-fade-in uppercase tracking-tight">Contact Us</h1>
          <p className="text-lg md:text-xl font-medium text-white/80 mb-8 md:mb-10 max-w-2xl mx-auto">Get in touch with us for any queries or appointments</p>
          <div className="flex items-center justify-center space-x-2 text-[10px] md:text-sm font-bold uppercase tracking-widest text-white/60">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>-</span>
            <span className="text-white">Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {contactCards.map((card, i) => (
            <div key={i} className="bg-white p-8 md:p-10 rounded-[30px] md:rounded-[40px] shadow-xl shadow-blue-200/20 border border-blue-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 md:mb-8 text-gray-700 group-hover:bg-[#2563EB] group-hover:text-white transition-all transform group-hover:rotate-[12deg] shadow-lg shadow-gray-100">
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                   {/* Handle Lucide icons better for consistency */}
                   {React.cloneElement(card.icon, { className: "w-full h-full" })}
                </div>
              </div>
              <h4 className="text-lg md:text-xl font-black text-[#0F172A] mb-3 md:mb-4 uppercase tracking-wide">{card.title}</h4>
              <p className="text-gray-400 text-[10px] md:text-xs font-bold leading-relaxed mb-4 md:mb-6 px-2">
                {card.content}
              </p>
              {card.details && card.details.map((detail, idx) => (
                <p key={idx} className="text-[#0F172A] font-bold text-xs md:text-sm mb-1">{detail}</p>
              ))}
              {card.buttonText && (
                <a 
                  href={card.buttonLink} 
                  className={`mt-4 px-6 md:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg ${card.title === 'Emergency' ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-[#2563EB] hover:bg-[#0F172A] shadow-blue-200'}`}
                >
                  {card.buttonText}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="py-16 md:py-24 bg-[#D0E7FF] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-24">
            {/* Form */}
            <div className="lg:w-1/2 w-full order-2 lg:order-1">
               <div className="bg-light p-8 md:p-14 rounded-[40px] md:rounded-[50px] shadow-2xl shadow-blue-900/10 border border-blue-50">
                  <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-4">Send Us a Message</h2>
                  <p className="text-gray-400 font-bold text-xs md:text-sm mb-8 leading-relaxed">Fill out the form below and we'll get back to you soon</p>
                  <div className="w-16 md:w-20 h-1 md:h-1.5 bg-[#2563EB] rounded-full mb-10 md:mb-12"></div>

                  {success && (
                    <div className="mb-8 md:mb-10 p-4 md:p-5 bg-green-50 text-green-700 rounded-2xl md:rounded-3xl border border-green-100 flex items-center font-bold text-xs md:text-sm">
                       <Plus className="w-5 h-5 mr-3 rotate-45" /> Your message has been sent successfully!
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Name *</label>
                        <input 
                          type="text" name="name" placeholder="Your Name" required
                          className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all outline-none text-xs md:text-sm font-medium"
                          value={formData.name} onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Phone Number *</label>
                        <input 
                          type="tel" name="phone" placeholder="10-digit number" required
                          className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all outline-none text-xs md:text-sm font-medium"
                          value={formData.phone} onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address *</label>
                      <input 
                        type="email" name="email" placeholder="Your@email.com" required
                        className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all outline-none text-xs md:text-sm font-medium"
                        value={formData.email} onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Subject *</label>
                      <input 
                        type="text" name="subject" placeholder="What is this regarding?" required
                        className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all outline-none text-xs md:text-sm font-medium"
                        value={formData.subject} onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Message *</label>
                      <textarea 
                        name="message" placeholder="Write your message here..." rows="4" required
                        className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] transition-all outline-none text-xs md:text-sm font-medium resize-none"
                        value={formData.message} onChange={handleChange}
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full lg:w-auto px-10 md:px-12 py-4 md:py-5 bg-[#2563EB] text-white font-black uppercase tracking-widest text-[10px] md:text-xs rounded-xl shadow-2xl shadow-blue-200 hover:bg-[#0F172A] transition-all flex items-center justify-center">
                      <Send className="w-4 h-4 mr-3" /> Send Message
                    </button>
                  </form>
               </div>
            </div>

            {/* Map & Reach Us */}
            <div className="lg:w-1/2 w-full order-1 lg:order-2">
               <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-4">Find Us</h2>
               <p className="text-gray-400 font-bold text-xs md:text-sm mb-8 leading-relaxed">Locate our hospital for easy navigation</p>
               <div className="w-16 md:w-20 h-1 md:h-1.5 bg-[#2563EB] rounded-full mb-10 md:mb-12"></div>

               <div className="w-full h-[300px] md:h-[400px] bg-gray-100 rounded-[30px] md:rounded-[40px] mb-8 md:mb-12 relative overflow-hidden shadow-inner border border-gray-100">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                     <MapPin className="w-10 h-10 md:w-12 md:h-12 mb-4 opacity-20" />
                     Interactive Map Placeholder
                  </div>
               </div>

               <div className="bg-light p-8 md:p-10 rounded-[30px] md:rounded-[40px] border border-blue-100">
                  <h4 className="flex items-center text-base md:text-lg font-black text-[#0F172A] mb-6 md:mb-8 uppercase tracking-wide">
                    <Info className="w-5 h-5 md:w-6 md:h-6 mr-3 text-red-500" /> How to Reach Us
                  </h4>
                  <ul className="space-y-4 md:space-y-6">
                    <li className="flex items-start">
                       <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-4 mt-1 text-[#2563EB] flex-shrink-0" />
                       <p className="text-xs md:text-sm font-bold text-gray-600 leading-relaxed"><span className="text-[#0F172A]">Landmark:</span> Near Old Motor Stand</p>
                    </li>
                    <li className="flex items-start">
                       <Bus className="w-4 h-4 md:w-5 md:h-5 mr-4 mt-1 text-[#2563EB] flex-shrink-0" />
                       <p className="text-xs md:text-sm font-bold text-gray-600 leading-relaxed"><span className="text-[#0F172A]">By Bus:</span> Multiple bus routes available to Old Motor Stand</p>
                    </li>
                    <li className="flex items-start">
                       <Car className="w-4 h-4 md:w-5 md:h-5 mr-4 mt-1 text-[#2563EB] flex-shrink-0" />
                       <p className="text-xs md:text-sm font-bold text-gray-600 leading-relaxed"><span className="text-[#0F172A]">By Car:</span> Parking available within hospital premises</p>
                    </li>
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#BEE3FF] transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-4 md:mb-6">FAQ</h2>
            <p className="text-gray-400 font-bold text-[10px] md:text-xs mb-8 tracking-wide uppercase">Quick answers to common queries</p>
            <div className="w-16 md:w-20 h-1 md:h-1.5 bg-[#2563EB] mx-auto rounded-full"></div>
          </div>

          <div className="bg-light p-6 md:p-12 rounded-[30px] md:rounded-[50px] shadow-xl shadow-blue-900/10">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index}
                title={faq.title}
                content={faq.content}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Specialist Doctors View Button */}
      <section className="py-16 md:py-24 bg-[#D0E7FF] flex justify-center pb-32 md:pb-40 transition-colors duration-500">
        <div className="max-w-5xl w-full px-6 text-center bg-gradient-to-r from-[#0F172A] to-[#2563EB] p-10 md:p-24 rounded-[40px] md:rounded-[60px] shadow-2xl shadow-blue-100 relative overflow-hidden text-white group drop-shadow-2xl">
          <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-white/5 rounded-full -mr-10 md:-mr-16 -mt-10 md:-mt-16 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-7xl font-black mb-10 tracking-tight leading-none flex items-center">
               <Calendar className="w-10 h-10 mr-6 text-white/40" /> Need Medical Assistance?
            </h2>
            <p className="text-white/60 text-sm md:text-lg mb-14 max-w-2xl mx-auto font-medium leading-relaxed italic">
              Book an appointment with our specialists for personalized medical care and treatment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-8 w-full sm:w-auto">
              <Link to="/appointment" className="inline-flex items-center justify-center px-10 md:px-12 py-4 md:py-5 bg-white text-[#2563EB] font-black uppercase tracking-widest text-[10px] md:text-sm rounded-xl shadow-2xl hover:bg-[#0F172A] hover:text-white transition-all transform hover:-translate-y-1">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-3" /> Book Appointment
              </Link>
              <a href="tel:5551234567" className="inline-flex items-center justify-center px-10 md:px-12 py-4 md:py-5 bg-transparent border-2 border-white text-white font-black uppercase tracking-widest text-[10px] md:text-sm rounded-xl hover:bg-white hover:text-[#0F172A] transition-all transform hover:-translate-y-1">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-3" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Back to top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-10 h-10 md:w-12 md:h-12 bg-[#2563EB] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
      >
         <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default Contact;
