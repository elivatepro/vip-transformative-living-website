'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface BookingContextType {
  openBooking: () => void;
  closeBooking: () => void;
  isBookingOpen: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBooking = () => setIsOpen(true);
  const closeBooking = () => setIsOpen(false);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBooking();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking, isBookingOpen: isOpen }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={closeBooking}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl h-[85vh] bg-white border border-gold/30 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Header / Close Button */}
            <div className="absolute top-2 right-2 z-10">
              <button 
                onClick={closeBooking}
                className="p-2 bg-gray-100 hover:bg-gold hover:text-white text-gray-500 rounded-full transition-colors z-50"
                aria-label="Close booking modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Iframe Container */}
            <div className="w-full h-full bg-white relative"> 
              <iframe 
                src="https://link.tkportalsghl.com/widget/booking/7z1EkKlNVDNIOj2j0WS4" 
                style={{ width: '100%', height: '100%', border: 'none' }} 
                scrolling="auto"
                id="7z1EkKlNVDNIOj2j0WS4_1769100369111"
                title="Book a Discovery Call"
              />
            </div>
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}
