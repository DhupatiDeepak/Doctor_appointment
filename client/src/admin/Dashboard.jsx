import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, MessageSquare, Plus, Edit, Trash2, 
  Settings, LayoutDashboard, Stethoscope, HeartPulse,
  LogOut, Bell, Search, Filter, ArrowUpRight, CheckCircle2,
  Home, Info, Activity, Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/axiosInstance';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [data, setData] = useState({ appointments: [], doctors: [], services: [], messages: [] });
  const [loading, setLoading] = useState(true);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [appts, docs, servs, msgs] = await Promise.all([
          API.get('/appointments'),
          API.get('/doctors'),
          API.get('/services'),
          API.get('/contact')
        ]);
        setData({ 
          appointments: appts.data, 
          doctors: docs.data, 
          services: servs.data, 
          messages: msgs.data 
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#0B1120]"><Loader /></div>;

  const statusColors = {
    pending: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
    confirmed: 'bg-green-500/10 text-green-500 border border-green-500/20',
    cancelled: 'bg-red-500/10 text-red-500 border border-red-500/20'
  };

  const navItems = [
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'doctors', label: 'Manage Doctors', icon: Stethoscope },
    { id: 'services', label: 'Our Services', icon: HeartPulse },
    { id: 'messages', label: 'Patient Queries', icon: MessageSquare },
  ];
  
  const publicNavItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'About Us', path: '/about', icon: Info },
    { label: 'Services', path: '/services', icon: Activity },
    { label: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <div className="flex min-h-screen bg-[#0B1120] text-slate-300 font-['Outfit',sans-serif]">
      {/* Sidebar */}
      <aside className="w-80 bg-[#0F172A] text-white p-10 hidden lg:flex flex-col border-r border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full -ml-32 -mt-32 blur-3xl"></div>
        
        <div className="mb-16 relative z-10 flex items-center group">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-blue-600/20 group-hover:rotate-[15deg] transition-all">
             <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight">Admin<span className="text-blue-500">Panel</span></span>
        </div>

        <nav className="space-y-4 flex-grow relative z-10">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)} 
              className={`w-full flex items-center p-5 rounded-[22px] transition-all duration-300 group ${activeTab === item.id ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon className={`w-5 h-5 mr-4 transition-transform ${activeTab === item.id ? '' : 'group-hover:scale-110'}`} />
              <span className="font-black text-[12px] uppercase tracking-[0.2em]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-12 mb-6 px-5 relative z-10">
           <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Main Website</p>
        </div>

        <nav className="space-y-4 relative z-10">
          {publicNavItems.map((item) => (
            <Link 
              key={item.label}
              to={item.path}
              className="w-full flex items-center p-5 rounded-[22px] text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 group"
            >
              <item.icon className="w-5 h-5 mr-4 transition-transform group-hover:scale-110" />
              <span className="font-black text-[12px] uppercase tracking-[0.2em]">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-10 mt-auto border-t border-white/5 relative z-10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center p-5 rounded-[22px] text-red-400 hover:text-white hover:bg-red-500/10 transition-all font-black text-xs uppercase tracking-[0.2em]"
          >
            <LogOut className="w-5 h-5 mr-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 lg:p-14 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14 gap-8">
          <div>
             <h2 className="text-4xl font-black text-white capitalize mb-2 tracking-tight">{activeTab}</h2>
             <p className="text-slate-500 font-bold text-[11px] uppercase tracking-[0.3em]">Nursing Home Management System Dashboard</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-[#1E293B] px-6 py-3.5 rounded-2xl shadow-sm border border-white/5 group focus-within:ring-4 focus-within:ring-blue-600/10 transition-all">
               <Search className="w-4 h-4 text-slate-500 mr-4" />
               <input type="text" placeholder="Search..." className="bg-transparent outline-none text-[13px] font-medium w-48 text-white placeholder:text-slate-600" />
            </div>
            
            <button className="w-12 h-12 bg-[#1E293B] rounded-2xl flex items-center justify-center text-white shadow-sm border border-white/5 hover:border-blue-600 transition-colors relative">
               <Bell className="w-5 h-5" />
               <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1E293B]"></div>
            </button>

            <div className="bg-[#1E293B] p-2.5 rounded-2xl shadow-sm border border-white/5 flex items-center">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-600/20">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="ml-4 pr-4 hidden sm:block">
                  <span className="block text-[12px] font-black text-white uppercase tracking-widest">{user?.name || 'Super Admin'}</span>
                  <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mt-1">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
              {[
                { label: 'Appointments', val: data.appointments.length, icon: Calendar, color: 'blue' },
                { label: 'Specialists', val: data.doctors.length, icon: Stethoscope, color: 'teal' },
                { label: 'Total Services', val: data.services.length, icon: HeartPulse, color: 'red' },
                { label: 'Pending Queries', val: data.messages.length, icon: MessageSquare, color: 'orange' }
              ].map((stat, i) => (
                <div key={i} className="bg-[#131C31] p-8 rounded-[35px] shadow-sm border border-white/5 group hover:-translate-y-2 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-all bg-${stat.color}-600/10 text-${stat.color}-500 group-hover:bg-${stat.color}-600 group-hover:text-white shadow-lg shadow-${stat.color}-600/5`}>
                     <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <h4 className="text-3xl font-black text-white tracking-tight">{stat.val}</h4>
                </div>
              ))}
            </div>

            {/* Content Card */}
            <div className="bg-[#131C31] rounded-[50px] shadow-2xl shadow-blue-900/10 border border-white/5 overflow-hidden">
              <div className="p-10 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/[0.02]">
                 <div className="flex items-center space-x-6">
                    <h3 className="text-xl font-black text-white uppercase tracking-widest flex items-center">
                       <div className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-4"></div> {activeTab} Records
                    </h3>
                    <span className="px-5 py-2 bg-blue-600/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                       {data[activeTab].length} Found
                    </span>
                 </div>
                 
                 <div className="flex space-x-4">
                   {(activeTab === 'doctors' || activeTab === 'services') && (
                     <button className="px-8 py-3.5 bg-[#2563EB] text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center shadow-xl shadow-blue-200 hover:bg-[#0F172A] transition-all transform hover:-translate-y-0.5">
                       <Plus className="w-4 h-4 mr-3" /> Add {activeTab.slice(0, -1)}
                     </button>
                   )}
                   <button className="p-3.5 bg-[#1E293B] rounded-xl text-white shadow-sm border border-white/5 hover:border-blue-600 transition-all">
                      <Filter className="w-4 h-4" />
                   </button>
                 </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5">
                    {activeTab === 'appointments' && (
                      <tr>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Patient Details</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Assigned Doctor</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Scheduled On</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Current Status</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
                      </tr>
                    )}
                    {activeTab === 'doctors' && (
                      <tr>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Doctor Information</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Specialization</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Experience</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
                      </tr>
                    )}
                    {activeTab === 'messages' && (
                      <tr>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sender</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Subject</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Message Preview</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
                      </tr>
                    )}
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {activeTab === 'appointments' && data.appointments.map(appt => (
                      <tr key={appt._id} className="hover:bg-blue-600/[0.05] transition-colors group">
                        <td className="px-10 py-7">
                          <div className="font-black text-white text-sm mb-1">{appt.patientName}</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{appt.patientPhone}</div>
                        </td>
                        <td className="px-10 py-7">
                           <span className="px-4 py-1.5 bg-blue-600/5 text-[#2563EB] rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-600/10">
                              {appt.doctor?.name || 'Dr. Specialist'}
                           </span>
                        </td>
                        <td className="px-10 py-7">
                          <div className="text-xs font-black text-white mb-1">{appt.date}</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{appt.time}</div>
                        </td>
                        <td className="px-10 py-7">
                          <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] ${statusColors[appt.status] || statusColors.pending}`}>
                            {appt.status}
                          </span>
                        </td>
                        <td className="px-10 py-7 text-right">
                           <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-3 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm"><Edit className="w-4 h-4" /></button>
                              <button className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                    {activeTab === 'doctors' && data.doctors.map(doc => (
                      <tr key={doc._id} className="hover:bg-blue-600/[0.05] transition-colors group">
                        <td className="px-10 py-7 flex items-center">
                          <div className="w-14 h-14 rounded-2xl mr-6 overflow-hidden shadow-lg border-2 border-white/10 ring-4 ring-blue-600/5">
                            <img src={doc.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-black text-white text-sm uppercase tracking-widest">{doc.name}</span>
                        </td>
                        <td className="px-10 py-7">
                           <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em]">{doc.specialization}</span>
                        </td>
                        <td className="px-10 py-7">
                           <span className="px-4 py-1.5 bg-teal-500/10 text-teal-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-teal-500/20">
                              {doc.experience} Experience
                           </span>
                        </td>
                        <td className="px-10 py-7 text-right">
                           <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-3 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"><Edit className="w-4 h-4" /></button>
                              <button className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                    {activeTab === 'messages' && data.messages.map(msg => (
                      <tr key={msg._id} className="hover:bg-blue-600/[0.05] transition-colors group">
                        <td className="px-10 py-7">
                          <div className="font-black text-white text-sm mb-1">{msg.name}</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{msg.email}</div>
                        </td>
                        <td className="px-10 py-7">
                           <span className="text-xs font-bold text-gray-500">{msg.subject}</span>
                        </td>
                        <td className="px-10 py-7 max-w-xs">
                           <p className="text-[11px] font-medium text-slate-500 truncate">{msg.message}</p>
                        </td>
                        <td className="px-10 py-7 text-right">
                           <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-3 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"><ArrowUpRight className="w-4 h-4" /></button>
                              <button className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data[activeTab].length === 0 && (
                  <div className="py-32 text-center">
                     <div className="w-24 h-24 bg-white/5 rounded-[40px] flex items-center justify-center mx-auto mb-8 border border-white/5">
                        <Search className="w-10 h-10 text-slate-700" />
                     </div>
                     <p className="text-slate-600 font-black text-xs uppercase tracking-[0.3em]">No records found in {activeTab}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
