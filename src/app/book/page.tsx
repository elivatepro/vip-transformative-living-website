'use client';

import { Section } from "@/components/ui/section";

export default function BookingPage() {
  return (
    <div className="pt-20">
      <Section className="text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8">Book a Discovery Call</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Schedule your free 30-minute consultation with Coach Wayne to explore if VIP Coaching is right for you.
        </p>
      </Section>

      <Section className="max-w-5xl mx-auto">
        <div className="bg-surface rounded-xl overflow-hidden border border-border shadow-2xl min-h-[700px]">
          {/* 
            GHL Calendar Embed
            Note: Replace [CALENDAR_ID] with actual ID provided by client later.
            For now using a placeholder message or generic GHL link structure.
          */}
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/YOUR_CALENDAR_ID"
            style={{ width: '100%', height: '800px', border: 'none' }}
            scrolling="yes"
            title="Booking Calendar"
            className="bg-white" // GHL widgets are usually light mode, setting bg-white avoids flash
          />
        </div>
      </Section>
    </div>
  );
}
