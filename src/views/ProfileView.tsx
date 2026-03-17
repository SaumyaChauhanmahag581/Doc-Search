import { motion } from 'motion/react';
import { Star, MapPin, ChevronLeft, Phone, Calendar, Info, Clock, Building, IndianRupee, Mail } from 'lucide-react';
import { View, Doctor } from '../types';

interface ProfileViewProps {
  onNavigate: (v: View) => void;
  doctor: Doctor | null;
  onBookAppointment: () => void;
}

export default function ProfileView({ onNavigate, doctor, onBookAppointment }: ProfileViewProps) {
  if (!doctor) return null;

  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto py-8 lg:py-12"
    >
      <button
        onClick={() => onNavigate('listing')}
        className="flex items-center text-slate-500 hover:text-emerald-600 font-medium mb-8 transition-colors group"
      >
        <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Doctors
      </button>

      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
        {/* Banner */}
        <div className="h-32 md:h-48 bg-gradient-to-r from-emerald-500 to-teal-400"></div>
        
        <div className="px-6 md:px-12 pb-12 relative">
          {/* Avatar & Header Info */}
          <div className="flex flex-col md:flex-row md:items-end -mt-16 md:-mt-20 mb-8 gap-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white flex-shrink-0">
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">{doctor.name}</h2>
                  <p className="text-emerald-600 font-bold text-lg mb-2">{doctor.specialization}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-amber-50 text-amber-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2 border border-amber-100 shadow-sm">
                    <Star size={18} className="fill-amber-500" />
                    {doctor.rating} Rating
                  </div>
                  <div className="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2 border border-slate-200 shadow-sm">
                    <Clock size={18} />
                    {doctor.experience} Exp
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <Info className="mr-2 text-emerald-500" /> About
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">{doctor.about}</p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                    <Building className="mr-2 text-emerald-500" /> Clinic
                  </h3>
                  <p className="font-semibold text-slate-700">{doctor.hospital}</p>
                  <p className="text-slate-500 mt-1 flex items-start">
                    <MapPin size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                    {doctor.location}
                  </p>
                </section>
                <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                    <Calendar className="mr-2 text-emerald-500" /> Availability
                  </h3>
                  <p className="font-semibold text-slate-700">{doctor.availability}</p>
                  <p className="text-slate-500 mt-1 flex items-center">
                    <IndianRupee size={16} className="mr-1" />
                    {doctor.fees} Consultation
                  </p>
                </section>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 border-2 border-emerald-50 shadow-lg sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Info</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <Phone className="text-emerald-500 mr-3" size={20} />
                    <span className="font-medium">{doctor.contact}</span>
                  </li>
                  <li className="flex items-center text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <Mail className="text-emerald-500 mr-3" size={20} />
                    <span className="font-medium truncate">{doctor.name.replace(/[^a-zA-Z]/g, '').toLowerCase()}@docsearch.com</span>
                  </li>
                </ul>
                <button
                  onClick={onBookAppointment}
                  className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center text-lg"
                >
                  <Calendar className="mr-2" size={20} />
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
