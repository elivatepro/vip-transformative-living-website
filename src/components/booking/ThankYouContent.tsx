'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import ConfirmationHero from './ConfirmationHero';
import WhatsNext from './WhatsNext';
import HowToPrepare from './HowToPrepare';
import CoachWayneNote from './CoachWayneNote';
import WhileYouWait from './WhileYouWait';
import StayConnected from './StayConnected';

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  
  // Get booking details from URL params
  // Calendly params: invitee_first_name, invitee_full_name, event_start_time
  const firstName = searchParams.get('invitee_first_name');
  const fullName = searchParams.get('invitee_full_name');
  const name = firstName || fullName || searchParams.get('name') || 'there';
  
  const eventStartTime = searchParams.get('event_start_time');
  const manualDate = searchParams.get('date');
  const manualTime = searchParams.get('time');

  let displayDate = manualDate;
  let displayTime = manualTime;
  let displayTimezone = searchParams.get('timezone') || '';

  if (eventStartTime) {
    try {
      const dateObj = new Date(eventStartTime);
      
      // Format Date: "Wednesday, January 29, 2026"
      displayDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Format Time: "3:00 PM"
      displayTime = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      // Attempt to get timezone code (e.g. EST, PDT)
      // Note: This depends on the browser's ability to infer it from the ISO string or system
      // Since Calendly sends it in invitee timezone, showing the resolved time is usually correct.
      // We can append the local timezone code if needed.
       const timeZoneName = dateObj.toLocaleTimeString('en-us', {timeZoneName:'short'}).split(' ')[2] || '';
       if (timeZoneName) displayTimezone = timeZoneName;
       
    } catch (e) {
      console.error('Error parsing event_start_time', e);
    }
  }

  // Fallback if no timezone detected but we have a time
  if (displayTime && !displayTimezone && !eventStartTime) {
     displayTimezone = 'Eastern Time'; 
  }
  
  useEffect(() => {
    // Fire confetti on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F5F5F5', '#B8860B'],
    });

    // Tracking (Safe check)
    if (typeof window !== 'undefined') {
        // Google Analytics
        if ((window as any).gtag) {
            (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-XXXXX/XXXXX',
            'event_category': 'booking',
            'event_label': 'discovery_call',
            });
        }
        
        // Facebook Pixel
        if ((window as any).fbq) {
            (window as any).fbq('track', 'Schedule');
        }
    }
  }, []);
  
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ConfirmationHero
        name={name}
        date={displayDate}
        time={displayTime}
        timezone={displayTimezone}
      />
      <WhatsNext />
      <HowToPrepare />
      <CoachWayneNote />
      <WhileYouWait />
      <StayConnected />
    </main>
  );
}
