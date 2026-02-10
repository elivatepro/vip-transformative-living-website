'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Home, User, Zap, Mic, Library, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookCallButton } from "@/components/book-call-button";
import { getSiteImageUrl } from "@/lib/site-images";

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Coaching', href: '/coaching', icon: Zap },
  { name: 'Speaking', href: '/speaking', icon: Mic },
  { name: 'Resources', href: '/resources', icon: Library },
  { name: 'Newsletter', href: '/newsletter', icon: Mail },
  { name: 'Contact', href: '/contact', icon: Phone },
];

export function Navbar({ onNavigate }: { onNavigate?: () => void }) {
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

  const handleLinkClick = (href: string) => {
    if (href !== pathname && onNavigate) {
      onNavigate();
    }
    // Mobile menu closing is handled by the useEffect on pathname change
  };

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6',
        isMobileMenuOpen && 'bg-background' // Ensure header background is solid when menu is open
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="z-50 relative flex items-center"
          onClick={() => handleLinkClick('/')}
        >
          <Image 
            src={getSiteImageUrl("/images/Gold Texture Logo.png")} 
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
                onClick={() => handleLinkClick(link.href)}
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
          className="md:hidden z-50 relative text-foreground hover:text-gold transition-colors p-2"
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6 md:hidden bg-background h-screen overflow-y-auto"
          >
            {/* Background pattern or subtle effect can go here if needed, keeping it clean for now */}
            
            <nav className="flex flex-col gap-2 w-full max-w-sm mx-auto">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group',
                        isActive 
                          ? 'bg-surface-elevated border border-gold/20' 
                          : 'hover:bg-surface-elevated/50 border border-transparent hover:border-white/5'
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-lg transition-colors",
                        isActive ? "bg-gold/10 text-gold" : "bg-surface text-muted-foreground group-hover:text-gold group-hover:bg-gold/10"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={cn(
                        "text-lg font-medium tracking-wide",
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )}>
                        {link.name}
                      </span>
                      
                      {/* Active Indicator Arrow */}
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(197,160,89,0.5)]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 mb-8"
              >
                <BookCallButton 
                  variant="primary" 
                  size="lg" 
                  className="w-full shadow-lg shadow-gold/10"
                >
                  Book Discovery Call
                </BookCallButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
