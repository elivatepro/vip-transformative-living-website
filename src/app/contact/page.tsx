'use client';

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormStatus } from 'react-dom';
import { submitContactForm } from "@/app/actions";
import { useActionState } from "react";
import { Mail, MapPin, Phone, Calendar, MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookCallButton } from "@/components/book-call-button";
import { getResponsiveSiteBackgroundStyle } from "@/lib/site-images";

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useActionState(submitContactForm, null);

  return (
    <div className="pt-20 font-sans">
      {/* 1. HERO */}
      <Section className="text-center relative overflow-hidden py-32">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 responsive-site-bg"
          style={{ 
            ...getResponsiveSiteBackgroundStyle("/images/hero-bg-mountain.jpg"),
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background/90" />
        </div>

        <div className="relative z-10">
          <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold block mb-6">Contact</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-8">
            Let's Start a Conversation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Questions? Ideas? Ready to begin? Reach out.
          </p>
        </div>
      </Section>

      {/* 2. CONTACT OPTIONS (3 COLUMNS) */}
      <Section variant="alternate">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Column 1: Book Call */}
          <div className="bg-surface border border-gold/30 p-8 rounded-xl flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
              <Calendar className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4">Schedule a Discovery Call</h3>
            <p className="text-muted-foreground mb-8 flex-grow">
              The best way to explore working together. 30 minutes. Free. No pressure. 
              We'll discuss where you are and where you want to be.
            </p>
            <BookCallButton className="w-full" variant="primary">Book Your Call →</BookCallButton>
          </div>

          {/* Column 2: Send Message */}
          <div className="bg-surface border border-border p-8 rounded-xl flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-surface-elevated flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold">Send a Message</h3>
            </div>
            
            {state?.success ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-12 flex-grow">
                <div className="w-16 h-16 rounded-full bg-green-900/20 text-green-500 flex items-center justify-center">
                  <CheckIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                <Button variant="outline" onClick={() => window.location.reload()}>Send Another</Button>
              </div>
            ) : (
              <form action={formAction} className="space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <Input name="name" placeholder="Full Name" required className="bg-background w-full" />
                  <Input name="email" type="email" placeholder="Email Address" required className="bg-background w-full" />
                  <Input name="phone" type="tel" placeholder="Phone Number" className="bg-background w-full" />
                  
                  <textarea 
                    name="message" 
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold resize-none"
                    placeholder="How can we help?"
                    required
                  />
                  {/* Honeypot */}
                  <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
                </div>
                <SubmitButton />
              </form>
            )}
          </div>

          {/* Column 3: Direct Contact */}
          <div className="bg-surface border border-border p-8 rounded-xl flex flex-col h-full">
            <h3 className="text-2xl font-serif font-bold mb-8">Reach Out Directly</h3>
            
            <div className="space-y-8 flex-grow">
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-gold shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white">Phone</p>
                  <a href="tel:+19547999860" className="text-muted-foreground hover:text-gold transition-colors">(954) 799-9860</a>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-gold shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white">Email</p>
                  <a href="mailto:waynedawson@viptransformativeliving.com" className="text-muted-foreground hover:text-gold transition-colors break-all">waynedawson@viptransformativeliving.com</a>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-gold shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white">Hours</p>
                  <p className="text-muted-foreground">Mon-Fri 9:00am - 5:00pm ET</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-gold shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white">Location</p>
                  <p className="text-muted-foreground">
                    1451 W. Cypress Creek Road<br />
                    Suite 300<br />
                    Fort Lauderdale, FL 33309
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">(Coaching conducted virtually)</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Section>

      {/* 3. FAQ */}
      <Section>
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-8">Quick Answers</h2>
          
          <div className="space-y-6">
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-bold mb-2">How quickly will I hear back?</h3>
              <p className="text-muted-foreground">We respond to all inquiries within 1 business day.</p>
            </div>
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-bold mb-2">Do you offer in-person coaching?</h3>
              <p className="text-muted-foreground">
                All coaching is conducted via video call (Zoom), allowing us to work together regardless of location. 
                In-person sessions in Fort Lauderdale may be arranged upon request.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Are you available for podcast interviews?</h3>
              <p className="text-muted-foreground">
                Yes! Coach Wayne regularly appears on podcasts discussing transformation, purpose, and leadership. 
                Please select "Speaking Request" in the form above.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
