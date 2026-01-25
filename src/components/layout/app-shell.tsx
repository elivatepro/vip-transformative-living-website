'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BookingProvider } from '@/components/booking-provider';
import { PageLoader } from '@/components/ui/page-loader';

function AppShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAdmin = pathname?.startsWith('/admin');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <BookingProvider>
      <AnimatePresence>
        {isLoading && <PageLoader />}
      </AnimatePresence>
      <Navbar onNavigate={() => setIsLoading(true)} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </BookingProvider>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AppShellContent>{children}</AppShellContent>
    </Suspense>
  );
}
