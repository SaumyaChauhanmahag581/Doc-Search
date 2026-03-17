import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Doctor } from '../types';

export const SPECIALIZATIONS = [
  'All', 'Cardiologist', 'Dermatologist', 'Orthopedic', 'Neurologist',
  'Pediatrician', 'General Physician', 'ENT Specialist', 'Dentist',
  'Ophthalmologist', 'Gynecologist', 'Pulmonologist', 'Urologist',
  'Gastroenterologist', 'Oncologist', 'Nephrologist', 'Endocrinologist',
];

export const LOCATIONS = [
  'All', 'Delhi', 'Mumbai', 'Ahmedabad', 'Pune', 'Hyderabad', 'Lucknow',
  'Jaipur', 'Bhopal', 'Surat', 'Kochi', 'Indore', 'Nagpur', 'Chennai',
  'Kolkata', 'Bengaluru',
];

export function useDoctors(activeView: string) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [specialization, setSpecialization] = useState('All');
  const [location, setLocation] = useState('All');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSpecOpen, setIsSpecOpen] = useState(false);

  // Refs to prevent infinite avatar-update loop
  const isUpdatingAvatarsRef = useRef(false);
  const hasAttemptedAvatarUpdateRef = useRef(false);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('name', searchQuery);
      if (specialization !== 'All') params.append('specialization', specialization);
      if (location !== 'All') params.append('location', location);
      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();
      setDoctors(data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors whenever the active view or filters change
  useEffect(() => {
    if (activeView === 'listing' || activeView === 'home' || activeView === 'registration') {
      fetchDoctors();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView, specialization, location, searchQuery]);

  // Generate AI avatars once (only when Gemini API key is configured)
  useEffect(() => {
    const updateAvatars = async () => {
      if (doctors.length === 0) return;
      if (hasAttemptedAvatarUpdateRef.current || isUpdatingAvatarsRef.current) return;

      const needsUpdate = doctors.some(d => d.image.includes('dicebear.com'));
      if (!needsUpdate) return;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.log('Gemini API key not configured – using DiceBear avatars.');
        hasAttemptedAvatarUpdateRef.current = true;
        return;
      }

      isUpdatingAvatarsRef.current = true;
      hasAttemptedAvatarUpdateRef.current = true;
      try {
        const ai = new GoogleGenAI({ apiKey });
        const malePrompt = 'Modern flat avatar of a male doctor, soft gradient background, minimal face features, white coat with stethoscope, clean UI style, circular frame, subtle shadow, pastel colors, professional healthcare theme';
        const femalePrompt = 'Modern flat avatar of a female doctor, soft gradient background, minimal face features, white coat with stethoscope, clean UI style, circular frame, subtle shadow, pastel colors, professional healthcare theme';

        const [maleRes, femaleRes] = await Promise.all([
          ai.models.generateContent({ model: 'gemini-2.5-flash-image', contents: { parts: [{ text: malePrompt }] } }),
          ai.models.generateContent({ model: 'gemini-2.5-flash-image', contents: { parts: [{ text: femalePrompt }] } }),
        ]);

        let maleImage = '';
        let femaleImage = '';
        for (const part of maleRes.candidates[0].content.parts) {
          if (part.inlineData) { maleImage = `data:image/png;base64,${part.inlineData.data}`; break; }
        }
        for (const part of femaleRes.candidates[0].content.parts) {
          if (part.inlineData) { femaleImage = `data:image/png;base64,${part.inlineData.data}`; break; }
        }

        if (maleImage && femaleImage) {
          const res = await fetch('/api/update-doctor-images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ maleImage, femaleImage }),
          });
          if (res.ok) {
            const refreshed = await fetch('/api/doctors');
            setDoctors(await refreshed.json());
          }
        }
      } catch (err) {
        console.error('Error updating doctor avatars:', err);
      } finally {
        isUpdatingAvatarsRef.current = false;
      }
    };

    updateAvatars();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors.length > 0]);

  const resetFilters = () => {
    setSearchQuery('');
    setSpecialization('All');
    setLocation('All');
  };

  return {
    doctors,
    loading,
    searchQuery, setSearchQuery,
    specialization, setSpecialization,
    location, setLocation,
    isLocationOpen, setIsLocationOpen,
    isSpecOpen, setIsSpecOpen,
    fetchDoctors,
    resetFilters,
  };
}
