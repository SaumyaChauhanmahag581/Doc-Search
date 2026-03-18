import { motion } from 'motion/react';
import { User } from 'lucide-react';
import React from 'react';
import { View } from '../types';

interface RegistrationViewProps {
  onNavigate: (v: View) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function RegistrationView({ onNavigate, onSubmit }: RegistrationViewProps) {
  return (
    <motion.div
      key="registration"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center py-12"
    >
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 mx-auto mb-6">
            <User size={40} />
          </div>
          <h2 className="text-4xl font-bold text-slate-900">Patient Registration</h2>
          <p className="text-slate-500 mt-3 text-lg">Please fill in all details to create your account.</p>
        </div>

        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input
                name="name" type="text" placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Age</label>
              <input
                name="age" type="number" required placeholder="Enter your age"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Contact Number</label>
            <input
              name="contact" type="tel" required placeholder="Enter your contact number"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-4">Gender</label>
            <div className="flex flex-wrap gap-6">
              {['Male', 'Female', 'Other', 'Prefer not to say'].map((g) => (
                <label key={g} className="flex items-center cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="radio" name="gender" value={g} className="peer sr-only" />
                    <div className="w-6 h-6 border-2 border-slate-300 rounded-full peer-checked:border-emerald-600 transition-all group-hover:border-emerald-400"></div>
                    <div className="absolute w-3 h-3 bg-emerald-600 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                  <span className="ml-3 text-slate-700 font-medium group-hover:text-emerald-600 transition-colors">{g}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 transform hover:-translate-y-1 active:translate-y-0"
          >
            Complete Registration
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500">
            Already have an account? <button type="button" onClick={() => onNavigate('signin')} className="text-emerald-600 font-bold hover:text-emerald-700">Login</button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
