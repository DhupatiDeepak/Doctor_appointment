import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, User, MessageSquare, Phone, MapPin, 
  ChevronRight, Stethoscope, CheckCircle2, ArrowRight
} from 'lucide-react';
import API from '../api/axiosInstance';
import Loader from '../components/common/Loader';

const Appointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    patientName: '',
    patientPhone: '',
    reason: ''
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await API.get('/doctors');
        const docs = response.data;
        setDoctors(docs);
        
        // Auto-fill doctor from URL query parameter
        const params = new URLSearchParams(window.location.search);
        const doctorName = params.get('doctor');
        if (doctorName) {
          const matchedDoc = docs.find(d => d.name === decodeURIComponent(doctorName));
          if (matchedDoc) {
            setFormData(prev => ({ ...prev, doctor: matchedDoc._id }));
          }
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/appointments', formData);
      setSuccess(true);
      setFormData({
        doctor: '',
        date: '',
        time: '',
        patientName: '',
        patientPhone: '',
        reason: ''
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      alert('Booking failed. Please check your data.');
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader /></div>;

  return (
    <div className="bg-[#FBFCFF] font-['Outfit',sans-serif]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-[#0F172A] to-[#2563EB] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 animate-fade-in uppercase tracking-tight">Book Appointment</h1>
          <p className="text-lg md:text-xl font-medium text-white/80 mb-6 md:mb-10 max-w-2xl mx-auto">Get expert medical consultation from our qualified specialists</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Left Side: Info */}
            <div className="lg:w-1/3">
              <h2 className="text-2xl md:text-4xl font-black text-[#0F172A] mb-6 md:mb-8 leading-tight">Patient Information & <span className="text-blue-600">Guidance</span></h2>
              <div className="w-16 md:w-20 h-1 md:h-1.5 bg-blue-600 rounded-full mb-10 md:mb-12"></div>
              
              <div className="space-y-6 md:space-y-10">
                <div className="flex items-start group">
                   <div className="p-3 md:p-4 bg-blue-600/10 rounded-xl md:rounded-2xl text-blue-600 mr-4 md:mr-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg shadow-blue-600/5">
                      <Stethoscope className="w-5 h-5 md:w-6 md:h-6" />
                   </div>
                   <div>
                      <h4 className="font-black text-[#0F172A] text-base md:text-lg mb-1 md:mb-2">Expert Consultation</h4>
                      <p className="text-gray-400 text-[10px] md:text-xs font-bold leading-relaxed">Our specialists are here to provide the best care for you and your family.</p>
                   </div>
                </div>

                <div className="flex items-start group">
                   <div className="p-3 md:p-4 bg-teal-600/10 rounded-xl md:rounded-2xl text-teal-600 mr-4 md:mr-6 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-lg shadow-teal-600/5">
                      <Clock className="w-5 h-5 md:w-6 md:h-6" />
                   </div>
                   <div>
                      <h4 className="font-black text-[#0F172A] text-base md:text-lg mb-1 md:mb-2">Flexible Timing</h4>
                      <p className="text-gray-400 text-[10px] md:text-xs font-bold leading-relaxed">Choose a slot that works best for your schedule from our available timings.</p>
                   </div>
                </div>

                <div className="flex items-start group">
                   <div className="p-3 md:p-4 bg-blue-500/10 rounded-xl md:rounded-2xl text-blue-500 mr-4 md:mr-6 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg shadow-blue-500/5">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                   </div>
                   <div>
                      <h4 className="font-black text-[#0F172A] text-base md:text-lg mb-1 md:mb-2">Secure Booking</h4>
                      <p className="text-gray-400 text-[10px] md:text-xs font-bold leading-relaxed">Your data and health information are handled with maximum security.</p>
                   </div>
                </div>
              </div>

              {/* Call-in box */}
              <div className="mt-12 md:mt-16 p-8 md:p-10 bg-[#0F172A] rounded-[32px] md:rounded-[40px] text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-blue-600/10 rounded-full -mr-12 md:-mr-16 -mt-12 md:-mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                 <h4 className="text-lg md:text-xl font-black mb-3 md:mb-4 relative z-10">Urgent Assistance?</h4>
                 <p className="text-white/50 text-[10px] md:text-xs font-bold mb-6 md:mb-8 relative z-10">Call our emergency line for immediate help from our medical team.</p>
                 <a href="tel:5551234567" className="inline-flex items-center text-blue-400 font-black uppercase tracking-widest text-[10px] md:text-xs hover:text-white transition-colors relative z-10">
                    Call Now <ArrowRight className="w-4 h-4 ml-3" />
                 </a>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:w-2/3">
              <div className="bg-white p-8 md:p-14 rounded-[40px] md:rounded-[50px] shadow-2xl shadow-gray-200/60 border border-gray-100">
                {success && (
                  <div className="mb-8 md:mb-12 p-4 md:p-6 bg-green-50 text-green-700 rounded-[20px] md:rounded-[30px] border border-green-100 flex items-center font-bold text-xs md:text-sm shadow-sm">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 mr-3 md:mr-4" /> Appointment booked successfully! We'll confirm via SMS soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Select Doctor</label>
                      <select
                        name="doctor" required
                        className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-medium text-xs md:text-sm text-gray-700 h-14 md:h-16"
                        value={formData.doctor} onChange={handleChange}
                      >
                        <option value="">Select a Professional</option>
                        {doctors.map(doc => (
                          <option key={doc._id} value={doc._id}>{doc.name} - {doc.specialization}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Patient Name</label>
                      <input
                        type="text" name="patientName" placeholder="Full Name" required
                        className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-medium text-xs md:text-sm"
                        value={formData.patientName} onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Preferred Date</label>
                      <input
                        type="date" name="date" required
                        className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-medium text-xs md:text-sm uppercase"
                        value={formData.date} onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Preferred Time</label>
                      <input
                        type="time" name="time" required
                        className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-medium text-xs md:text-sm"
                        value={formData.time} onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Contact Number</label>
                    <input
                      type="tel" name="patientPhone" placeholder="10-digit mobile number" required
                      className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-medium text-xs md:text-sm"
                      value={formData.patientPhone} onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Reason for Visit</label>
                    <textarea
                      name="reason" placeholder="Briefly describe your health concern..." rows="4" required
                      className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all font-medium text-xs md:text-sm resize-none"
                      value={formData.reason} onChange={handleChange}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 md:py-6 bg-[#2563EB] text-white font-black uppercase tracking-widest text-[10px] md:text-[11px] rounded-xl md:rounded-2xl shadow-2xl shadow-blue-100 hover:bg-[#0F172A] transition-all transform hover:-translate-y-1 flex items-center justify-center"
                  >
                    Confirm Booking <ArrowRight className="w-4 h-4 ml-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;
