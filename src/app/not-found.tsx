import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | VIP Transformative Living',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      {/* 404 Number */}
      <span className="font-serif text-[120px] md:text-[180px] font-normal text-transparent [-webkit-text-stroke:1px_#D4AF37] leading-none mb-6 opacity-60 select-none">
        404
      </span>
      
      {/* Headline */}
      <h1 className="font-serif text-[28px] md:text-[36px] text-[#F5F5F5] mb-4 max-w-[500px] relative z-10">
        Looks Like You've Wandered Off the Path
      </h1>
      
      {/* Subtext */}
      <p className="text-[#9CA3AF] text-base leading-relaxed max-w-[400px] mb-10 relative z-10">
        The page you're looking for doesn't exist, but your transformation journey can still begin here.
      </p>
      
      {/* Primary Actions */}
      <div className="flex gap-4 mb-12 flex-wrap justify-center relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[#0A0A0A] text-sm font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(212,175,55,0.3)] transition-all"
        >
          Go Home
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        
        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-[#D4AF37] text-sm font-semibold border border-[#D4AF37] rounded-lg hover:bg-[rgba(212,175,55,0.1)] transition-all"
        >
          Book a Call
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
      
      {/* Secondary Links */}
      <div className="border-t border-[#2A2A2A] pt-8 relative z-10">
        <p className="text-sm text-[#6B7280] mb-4">Or explore these:</p>
        <div className="flex gap-8 flex-wrap justify-center">
          <Link href="/about" className="text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition-colors">
            About Coach Wayne
          </Link>
          <Link href="/coaching" className="text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition-colors">
            Coaching Programs
          </Link>
          <Link href="/resources" className="text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition-colors">
            Free Resources
          </Link>
        </div>
      </div>
    </main>
  );
}
