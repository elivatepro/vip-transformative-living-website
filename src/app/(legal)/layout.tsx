import Link from 'next/link';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {children}
      
      {/* Footer Navigation */}
      <footer className="border-t border-[#2A2A2A] py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm text-[#6B7280]">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors">
            ← Back to Home
          </Link>
          <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </footer>
    </div>
  );
}
