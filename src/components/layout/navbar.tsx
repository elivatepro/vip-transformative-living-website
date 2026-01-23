'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookCallButton } from "@/components/book-call-button";

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Coaching', href: '/coaching' },
  { name: 'Speaking', href: '/speaking' },
  { name: 'Resources', href: '/resources' },
  { name: 'Newsletter', href: '/newsletter' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="z-50 relative flex items-center">
          <Image 
            src="/images/Gold Texture Logo.png" 
            alt="VIP Transformative Living" 
            width={180} 
            height={50} 
            className="w-auto h-10 md:h-12 object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-base font-medium transition-colors hover:text-gold relative group drop-shadow-md',
                  isActive ? 'text-gold' : 'text-white hover:text-gold/80'
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[2px] bg-gold transition-all duration-300 ease-out drop-shadow-none",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <BookCallButton 
            variant="primary" 
            size="sm"
          >
            Book Discovery Call
          </BookCallButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 relative text-foreground hover:text-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-4 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center z-[-1]" 
              style={{ backgroundImage: "url('/images/hero-bg-mountain.jpg')" }} 
            />
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-[-1]" />
            <nav className="flex flex-col gap-6 items-center relative z-50">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-2xl font-serif font-medium hover:text-gold transition-colors',
                    pathname === link.href ? 'text-gold' : 'text-foreground'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8">
                <BookCallButton 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                >
                  Book Discovery Call
                </BookCallButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
