import { motion } from 'motion/react';
import { Calendar, Trash2, ChevronLeft } from 'lucide-react';
import { View, Appointment } from '../types';

interface AppointmentsViewProps {
  onNavigate: (v: View) => void;
  appointments: Appointment[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function AppointmentsView({ onNavigate, appointments, loading, onDelete }: AppointmentsViewProps) {
  return (
    <motion.div
      key="appointments"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto py-8 lg:py-12"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-slate-500 hover:text-emerald-600 font-medium mb-4 transition-colors group"
          >
            <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h2 className="text-3xl font-bold text-slate-900">Your Appointments</h2>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
           {[1, 2, 3].map(i => (
             <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-pulse flex items-center justify-between">
               <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                 <div>
                   <div className="h-5 bg-slate-200 rounded w-48 mb-2"></div>
                   <div className="h-4 bg-slate-200 rounded w-32"></div>
                 </div>
               </div>
               <div className="h-10 w-10 bg-slate-200 rounded-xl"></div>
             </div>
           ))}
        </div>
      ) : appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((apt, index) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Dr. {apt.doctorName}</h3>
                  <div className="text-sm text-slate-500 flex items-center mt-1">
                    <span className="font-medium text-emerald-600">{apt.date}</span>
                    <span className="mx-2 text-slate-300">•</span>
                    <span>{apt.time}</span>
                    <span className="mx-2 text-slate-300">•</span>
                    <span className="capitalize bg-slate-100 px-2 py-0.5 rounded-md">{apt.status}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Patient: {apt.patientName}</div>
                </div>
              </div>
              
              <button
                onClick={() => onDelete(apt.id)}
                className="self-start md:self-auto p-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors md:opacity-0 group-hover:opacity-100"
                title="Cancel Appointment"
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar size={40} className="text-emerald-300" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">No Appointments Yet</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">You haven't booked any medical appointments yet. Search for doctors and book your first visit!</p>
          <button
            onClick={() => onNavigate('listing')}
            className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-md"
          >
            Find Doctors
          </button>
        </div>
      )}
    </motion.div>
  );
}
