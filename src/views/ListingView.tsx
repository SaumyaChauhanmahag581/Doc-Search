import { motion } from 'motion/react';
import { Star, MapPin, Search } from 'lucide-react';
import { View, Doctor } from '../types';
import SearchBar from '../components/ui/SearchBar';

interface ListingViewProps {
  onNavigate: (v: View) => void;
  doctors: Doctor[];
  loading: boolean;
  setSelectedDoctor: (d: Doctor) => void;
  searchProps: any; // Passed directly to SearchBar
}

export default function ListingView({ onNavigate, doctors, loading, setSelectedDoctor, searchProps }: ListingViewProps) {
  return (
    <motion.div
      key="listing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col pt-8 pb-20"
    >
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Find Your Doctor</h2>
        <SearchBar {...searchProps} onSearch={() => {}} buttonText="Apply Filters" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm animate-pulse">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-slate-200 rounded-2xl"></div>
                <div className="flex-1">
                  <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all cursor-pointer group flex flex-col h-full"
              onClick={() => { setSelectedDoctor(doctor); onNavigate('profile'); }}
            >
              <div className="flex items-start space-x-5 mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-emerald-50 shadow-inner">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                    <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                      <Star size={12} className="mr-1 fill-emerald-500" />
                      {doctor.rating}
                    </div>
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1 group-hover:text-emerald-600 transition-colors">{doctor.name}</h3>
                  <p className="text-emerald-600 font-medium text-sm mb-2">{doctor.specialization}</p>
                  <div className="flex items-center text-slate-500 text-sm">
                    <MapPin size={14} className="mr-1 text-slate-400" />
                    <span className="truncate">{doctor.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-slate-500">Experience:</span>
                  <span className="font-semibold text-slate-900 ml-1">{doctor.experience}</span>
                </div>
                <div className="text-sm font-bold text-emerald-600 flex items-center">
                  View Profile &rarr;
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={40} className="text-slate-300" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">No Doctors Found</h3>
          <p className="text-slate-500">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </motion.div>
  );
}
