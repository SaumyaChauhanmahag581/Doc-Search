import React, { useState, useEffect } from 'react';
import { View, Patient, Doctor } from './types';
import { useDoctors } from './hooks/useDoctors';
import { useAppointments } from './hooks/useAppointments';

// Layout & UI
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FeedbackToast, { FeedbackData } from './components/ui/FeedbackToast';
import BookingModal from './components/ui/BookingModal';

// Views
import LandingView from './views/LandingView';
import RegistrationView from './views/RegistrationView';
import SignInView from './views/SignInView';
import HomeView from './views/HomeView';
import ListingView from './views/ListingView';
import ProfileView from './views/ProfileView';
import AppointmentsView from './views/AppointmentsView';

function App() {
  const [activeView, setActiveView] = useState<View>('landing');
  const [patient, setPatient] = useState<Patient | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);

  const docs = useDoctors(activeView);
  const apts = useAppointments();

  // Check existing session
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      setPatient(JSON.parse(saved));
      setActiveView('home');
    }
  }, []);

  // Fetch appointments for logged-in user if on relevant views
  useEffect(() => {
    if (patient && (activeView === 'home' || activeView === 'appointments')) {
      apts.fetchAppointments();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient, activeView]);

  const showFeedback = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      if (res.ok) {
        const data = await res.json();
        const user = data.user;
        setPatient(user);
        localStorage.setItem('user', JSON.stringify(user));
        showFeedback('User Registered Successfully!');
        setActiveView('home');
      } else {
        showFeedback('Registration failed. Please try again.', 'error');
      }
    } catch (err) {
      showFeedback('An error occurred during registration.', 'error');
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      if (res.ok) {
        const data = await res.json();
        const user = data.user;
        setPatient(user);
        localStorage.setItem('user', JSON.stringify(user));
        showFeedback(`Welcome back, ${user.name}!`);
        setActiveView('home');
      } else {
        showFeedback('Invalid credentials', 'error');
      }
    } catch (err) {
      showFeedback('Login failed', 'error');
    }
  };

  const handleLogout = () => {
    setPatient(null);
    localStorage.removeItem('user');
    setActiveView('landing');
    docs.resetFilters();
    showFeedback('Logged out successfully');
  };

  const searchProps = {
    searchQuery: docs.searchQuery, setSearchQuery: docs.setSearchQuery,
    specialization: docs.specialization, setSpecialization: docs.setSpecialization,
    location: docs.location, setLocation: docs.setLocation,
    isSpecOpen: docs.isSpecOpen, setIsSpecOpen: docs.setIsSpecOpen,
    isLocationOpen: docs.isLocationOpen, setIsLocationOpen: docs.setIsLocationOpen,
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 flex flex-col">
      <Navbar view={activeView} patient={patient} onNavigate={setActiveView} onLogout={handleLogout} />
      <FeedbackToast feedback={feedback} />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {activeView === 'landing' && <LandingView onNavigate={setActiveView} searchProps={searchProps} />}
        {activeView === 'registration' && <RegistrationView onNavigate={setActiveView} onSubmit={handleRegister} />}
        {activeView === 'signin' && <SignInView onNavigate={setActiveView} onSubmit={handleSignIn} />}
        
        {patient && activeView === 'home' && (
          <HomeView onNavigate={setActiveView} patient={patient} doctors={docs.doctors} appointments={apts.appointments} searchProps={searchProps} />
        )}
        
        {(activeView === 'listing' || (patient && activeView === 'home')) && activeView === 'listing' && (
          <ListingView onNavigate={setActiveView} doctors={docs.doctors} loading={docs.loading} setSelectedDoctor={setSelectedDoctor} searchProps={searchProps} />
        )}

        {activeView === 'profile' && selectedDoctor && (
          <ProfileView 
            onNavigate={setActiveView} 
            doctor={selectedDoctor} 
            onBookAppointment={() => {
              if (!patient) {
                showFeedback('Please register or sign in to book an appointment', 'error');
                setActiveView('registration');
              } else {
                apts.setShowBookingModal(true);
              }
            }} 
          />
        )}

        {patient && activeView === 'appointments' && (
          <AppointmentsView onNavigate={setActiveView} appointments={apts.appointments} loading={false} onDelete={apts.handleDeleteAppointment} />
        )}
      </main>

      <Footer onNavigate={setActiveView} />

      <BookingModal
        show={apts.showBookingModal}
        onClose={() => apts.setShowBookingModal(false)}
        bookingSuccess={apts.bookingSuccess}
        bookingData={apts.bookingData}
        setBookingData={apts.setBookingData}
        onSubmit={apts.handleBooking}
        doctor={selectedDoctor}
        patient={patient}
      />
    </div>
  );
}

export default App;
