import { Search, MapPin, ChevronDown, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LOCATIONS, SPECIALIZATIONS } from '../../hooks/useDoctors';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  specialization: string;
  setSpecialization: (val: string) => void;
  location: string;
  setLocation: (val: string) => void;
  isSpecOpen: boolean;
  setIsSpecOpen: (val: boolean) => void;
  isLocationOpen: boolean;
  setIsLocationOpen: (val: boolean) => void;
  onSearch: () => void;
  buttonText?: string;
}

export default function SearchBar({
  searchQuery, setSearchQuery,
  specialization, setSpecialization,
  location, setLocation,
  isSpecOpen, setIsSpecOpen,
  isLocationOpen, setIsLocationOpen,
  onSearch, buttonText = "Search"
}: SearchBarProps) {
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="max-w-4xl mx-auto bg-white p-2 rounded-2xl md:rounded-full shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-2"
    >
      {/* Search Input */}
      <div className="flex-1 w-full flex items-center px-4 py-3 md:py-0">
        <Search className="text-emerald-500 mr-3" size={20} />
        <input
          type="text"
          placeholder="Doctor name or keyword..."
          className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>

      {/* Specialization Dropdown */}
      <div className="flex-1 w-full relative">
        <button
          onClick={() => { setIsSpecOpen(!isSpecOpen); setIsLocationOpen(false); }}
          className="w-full flex items-center justify-between px-4 py-3 md:py-4 text-slate-600 hover:bg-slate-50 transition-colors rounded-xl md:rounded-none"
        >
          <div className="flex items-center">
            <Stethoscope className="text-emerald-500 mr-3" size={20} />
            <span className="truncate">{specialization === 'All' ? 'Specialization' : specialization}</span>
          </div>
          <ChevronDown size={16} className={`transition-transform ${isSpecOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isSpecOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 max-h-60 overflow-y-auto"
            >
              {SPECIALIZATIONS.map(spec => (
                <button
                  key={spec}
                  onClick={() => { setSpecialization(spec); setIsSpecOpen(false); }}
                  className="w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-sm font-medium"
                >
                  {spec}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>

      {/* Location Dropdown */}
      <div className="flex-1 w-full relative">
        <button
          onClick={() => { setIsLocationOpen(!isLocationOpen); setIsSpecOpen(false); }}
          className="w-full flex items-center justify-between px-4 py-3 md:py-4 text-slate-600 hover:bg-slate-50 transition-colors rounded-xl md:rounded-none"
        >
          <div className="flex items-center">
            <MapPin className="text-emerald-500 mr-3" size={20} />
            <span className="truncate">{location === 'All' ? 'Location' : location}</span>
          </div>
          <ChevronDown size={16} className={`transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isLocationOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 max-h-60 overflow-y-auto"
            >
              {LOCATIONS.map(loc => (
                <button
                  key={loc}
                  onClick={() => { setLocation(loc); setIsLocationOpen(false); }}
                  className="w-full text-left px-4 py-3 hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-sm font-medium"
                >
                  {loc}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={onSearch}
        className="w-full md:w-auto bg-emerald-600 text-white px-8 py-4 rounded-xl md:rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95 flex items-center justify-center"
      >
        <Search size={20} className="mr-2" />
        {buttonText}
      </button>
    </motion.div>
  );
}
