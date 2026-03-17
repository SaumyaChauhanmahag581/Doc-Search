import { motion } from 'motion/react';
import { Search, Calendar, Star, ArrowRight } from 'lucide-react';
import { View } from '../types';
import SearchBar from '../components/ui/SearchBar';

interface LandingViewProps {
  onNavigate: (v: View) => void;
  searchProps: any; // Passed directly to SearchBar
}

export default function LandingView({ onNavigate, searchProps }: LandingViewProps) {
  return (
    <motion.div
      key="landing"
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
          Book appointments with the best doctors in your area.
          Get expert medical advice and personalized care today.
        </motion.p>

        <SearchBar {...searchProps} onSearch={() => onNavigate('registration')} buttonText="Search" />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <button
            onClick={() => onNavigate('registration')}
            className="group flex items-center mx-auto text-emerald-600 font-bold text-lg hover:text-emerald-700 transition-colors"
          >
            Register as Patient
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
        {[
          { icon: <Search className="text-emerald-600" />, title: "Easy Search", desc: "Find doctors by name, specialty, or location with ease." },
          { icon: <Calendar className="text-emerald-600" />, title: "Instant Booking", desc: "Book your appointments instantly without any hassle." },
          { icon: <Star className="text-emerald-600" />, title: "Top Rated", desc: "Connect with the most highly-rated medical professionals." }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
