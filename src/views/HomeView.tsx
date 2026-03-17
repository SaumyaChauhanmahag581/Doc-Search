import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { View, Patient, Appointment, Doctor } from '../types';
import SearchBar from '../components/ui/SearchBar';

interface HomeViewProps {
  onNavigate: (v: View) => void;
  patient: Patient;
  doctors: Doctor[];
  appointments: Appointment[];
  searchProps: any; // Passed directly to SearchBar
}

export default function HomeView({ onNavigate, patient, doctors, appointments, searchProps }: HomeViewProps) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col"
    >
      {/* Hero Section */}
      <div className="py-16 md:py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6"
        >
          Find the Right <span className="text-emerald-600">Doctor</span><br />
          for Your Health
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12"
        >
          Welcome back, <span className="font-bold text-slate-900">{patient.name}</span>!
          Search from thousands of certified medical professionals and book your next appointment.
        </motion.p>

        <SearchBar {...searchProps} onSearch={() => onNavigate('listing')} />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <button
            onClick={() => onNavigate('listing')}
            className="group flex items-center mx-auto text-emerald-600 font-bold text-lg hover:text-emerald-700 transition-colors"
          >
            Find Doctors Now
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Quick Stats or Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
          <div className="text-3xl font-bold text-emerald-600 mb-1">{doctors.length}+</div>
          <div className="text-slate-500 font-medium">Certified Doctors</div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
          <div className="text-3xl font-bold text-emerald-600 mb-1">{appointments.length}</div>
          <div className="text-slate-500 font-medium">Your Appointments</div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
          <div className="text-3xl font-bold text-emerald-600 mb-1">24/7</div>
          <div className="text-slate-500 font-medium">Support Available</div>
        </div>
      </div>
    </motion.div>
  );
}
