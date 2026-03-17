import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';
import { BookingData } from '../../hooks/useAppointments';
import { Doctor, Patient } from '../../types';

interface BookingModalProps {
  show: boolean;
  onClose: () => void;
  bookingSuccess: boolean;
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
  onSubmit: (e: React.FormEvent, doctor: Doctor, patient: Patient) => void;
  doctor: Doctor | null;
  patient: Patient | null;
}

export default function BookingModal({
  show, onClose, bookingSuccess, bookingData, setBookingData, onSubmit, doctor, patient
}: BookingModalProps) {
  if (!doctor || !patient) return null;

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
          >
            {bookingSuccess ? (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check size={40} />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
                <p className="text-slate-500">Your appointment has been successfully scheduled.</p>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Schedule Visit</h3>
                  <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={(e) => onSubmit(e, doctor, patient)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Patient Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      placeholder="Full Name"
                      value={bookingData.patientName}
                      onChange={(e) => setBookingData({ ...bookingData, patientName: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        value={bookingData.date}
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Time</label>
                      <select
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        value={bookingData.time}
                        onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                      >
                        <option value="">Select Time</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 mt-4"
                  >
                    Confirm Booking
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
