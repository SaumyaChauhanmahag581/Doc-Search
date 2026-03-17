import { Stethoscope, User, ChevronLeft } from 'lucide-react';
import { View, Patient } from '../../types';

interface NavbarProps {
  view: View;
  patient: Patient | null;
  onNavigate: (v: View) => void;
  onLogout: () => void;
}

export default function Navbar({ view, patient, onNavigate, onLogout }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate(patient ? 'home' : 'landing')}
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Stethoscope size={24} />
            </div>
            <span className="ml-3 text-xl font-bold tracking-tight text-slate-900">DocSearch</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            {patient ? (
              <>
                <button onClick={() => onNavigate('home')} className={`hover:text-emerald-600 transition-colors ${view === 'home' ? 'text-emerald-600' : ''}`}>Home</button>
                <button onClick={() => onNavigate('listing')} className={`hover:text-emerald-600 transition-colors ${view === 'listing' ? 'text-emerald-600' : ''}`}>Doctors</button>
                <button onClick={() => onNavigate('appointments')} className={`hover:text-emerald-600 transition-colors ${view === 'appointments' ? 'text-emerald-600' : ''}`}>Appointments</button>
              </>
            ) : (
              <>
                <button onClick={() => onNavigate('landing')} className={`hover:text-emerald-600 transition-colors ${view === 'landing' ? 'text-emerald-600' : ''}`}>Home</button>
                <button onClick={() => onNavigate('landing')} className="hover:text-emerald-600 transition-colors">Doctors</button>
                <button onClick={() => onNavigate('landing')} className="hover:text-emerald-600 transition-colors">About</button>
                <button onClick={() => onNavigate('landing')} className="hover:text-emerald-600 transition-colors">Contact</button>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {patient ? (
              <>
                <div className="hidden sm:flex items-center text-slate-700 font-medium bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                  <User size={18} className="mr-2 text-emerald-600" />
                  <span id="username" className="max-w-[100px] truncate">{patient.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="bg-slate-900 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('signin')}
                  className="text-slate-600 hover:text-emerald-600 font-bold text-sm transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate('registration')}
                  className="bg-emerald-600 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-bold hover:bg-emerald-700 transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                  Register
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
