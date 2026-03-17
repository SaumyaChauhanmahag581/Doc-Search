import { Stethoscope } from 'lucide-react';
import { View } from '../../types';

interface FooterProps {
  onNavigate: (v: View) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                <Stethoscope size={18} />
              </div>
              <span className="ml-2 text-xl font-bold tracking-tight text-slate-900">DocSearch</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Making healthcare accessible and easy for everyone. Find and book the best doctors in your area with just a few clicks.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-500">
              <li><button onClick={() => onNavigate('home')} className="hover:text-emerald-600 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('listing')} className="hover:text-emerald-600 transition-colors">Find Doctors</button></li>
              <li><button className="hover:text-emerald-600 transition-colors">About Us</button></li>
              <li><button className="hover:text-emerald-600 transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-500">
              <li><button className="hover:text-emerald-600 transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-emerald-600 transition-colors">Terms of Service</button></li>
              <li><button className="hover:text-emerald-600 transition-colors">Cookie Policy</button></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-100 mt-12 pt-8 text-center text-slate-400 text-sm">
          © 2026 DocSearch. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
