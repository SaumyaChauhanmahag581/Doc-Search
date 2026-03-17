import React, { useState } from 'react';
import { Appointment, Doctor, Patient } from '../types';

export interface BookingData {
  patientName: string;
  date: string;
  time: string;
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({ patientName: '', date: '', time: '' });

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const handleBooking = async (
    e: React.FormEvent,
    doctor: Doctor,
    patient: Patient,
  ) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: doctor.id,
          doctorName: doctor.name,
          patientName: bookingData.patientName || patient.name,
          date: bookingData.date,
          time: bookingData.time,
        }),
      });
      if (res.ok) {
        setBookingSuccess(true);
        setTimeout(() => {
          setBookingSuccess(false);
          setShowBookingModal(false);
        }, 2000);
      }
    } catch (err) {
      console.error('Error booking appointment:', err);
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAppointments(prev => prev.filter(apt => apt.id !== id));
      }
    } catch (err) {
      console.error('Error deleting appointment:', err);
    }
  };

  return {
    appointments,
    fetchAppointments,
    showBookingModal, setShowBookingModal,
    bookingSuccess,
    bookingData, setBookingData,
    handleBooking,
    handleDeleteAppointment,
  };
}
