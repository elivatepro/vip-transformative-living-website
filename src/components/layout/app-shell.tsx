'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BookingProvider } from '@/components/booking-provider';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <BookingProvider>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </BookingProvider>
  );
}
