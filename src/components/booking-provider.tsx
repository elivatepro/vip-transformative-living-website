'use client';

import React, { createContext, useContext, useState } from 'react';
import { BookingModal } from '@/components/booking-modal';

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

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking, isBookingOpen: isOpen }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}
