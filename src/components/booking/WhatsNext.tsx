'use client';

import { Mail, Bell, Video } from 'lucide-react';

export default function WhatsNext() {
  const steps = [
    {
      number: '1',
      title: 'CHECK YOUR EMAIL',
      description: "You'll receive a confirmation with the Zoom link and calendar invite within a few minutes.",
      icon: Mail,
    },
    {
      number: '2',
      title: 'GET A REMINDER',
      description: "You'll receive an email reminder 24 hours before our call.",
      icon: Bell,
    },
    {
      number: '3',
      title: 'JOIN THE CALL',
      description: "Click the Zoom link at your scheduled time. I'll be waiting for you.",
      icon: Video,
    },
  ];

  return (
    <section className="bg-background bg-noise py-20 px-4 relative">
       {/* Top fade for smooth transition */}
       <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
       
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="font-playfair text-3xl text-center text-foreground mb-16">What Happens Next</h2>
        
        <div className="relative max-w-lg mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-gold to-gold/20" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-8">
                <div className="relative z-10 w-10 h-10 rounded-full bg-background border-2 border-gold flex items-center justify-center shrink-0">
                  <span className="font-inter font-bold text-gold text-sm">{step.number}</span>
                </div>
                <div>
                  <h3 className="font-inter font-bold text-base text-foreground mb-2 uppercase tracking-wider">
                    {step.title}
                  </h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
