import { Suspense } from 'react';
import ThankYouContent from '@/components/booking/ThankYouContent';

export const metadata = {
  title: 'Booking Confirmed | VIP Transformative Living',
  description: 'Your VIP Discovery Call has been scheduled.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-foreground">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
