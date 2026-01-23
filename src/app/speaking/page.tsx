import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Check, Mic2, Users, Lightbulb } from "lucide-react";

export const metadata = {
  title: "Speaking Services | VIP Transformative Living",
  description: "Keynote speaking by Wayne Dawson. Signature talks on Leadership, Fatherhood, and Transformation.",
};

export default function SpeakingPage() {
  return (
    <div className="pt-20 font-sans">
      
      {/* 1. HERO */}
      <Section className="text-center space-y-6 relative overflow-hidden py-32">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: "url('/images/pine-trees-mountain.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background/90" />
        </div>
        
        <div className="relative z-10">
          <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">Keynote Speaking</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground">
            Inspire Your Audience. <br /> Transform Your Event.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful, practical, unforgettable keynotes that challenge 
            audiences to step into their greatness.
          </p>
          <div className="pt-6">
            <Button size="lg" variant="primary" asChild>
              <Link href="/contact">Book Wayne for Your Event</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* 2. THE DIFFERENCE */}
      <Section variant="alternate">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 md:order-1 relative h-[500px] rounded-xl overflow-hidden border border-border">
             <Image 
               src="/images/wayne-speaking.jpg" 
               alt="Coach Wayne Speaking" 
               fill 
               className="object-cover"
               sizes="(max-width: 768px) 100vw, 50vw"
             />
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-3xl font-serif font-bold">More Than Motivation</h2>
            <p className="text-lg text-muted-foreground">
              Most speakers leave audiences feeling good for a day. Then life resumes and nothing changes.
            </p>
            <p className="text-lg text-muted-foreground">
              Coach Wayne's talks are different. Drawing from 25+ years of hands-on coaching experience, 
              he delivers presentations that don't just inspire — they transform.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex gap-4">
                <div className="bg-gold/10 p-3 rounded-full h-fit"><Lightbulb className="w-6 h-6 text-gold" /></div>
                <div>
                  <h4 className="font-bold text-white">Actionable Frameworks</h4>
                  <p className="text-sm text-muted-foreground">Tools they can apply immediately.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-gold/10 p-3 rounded-full h-fit"><Users className="w-6 h-6 text-gold" /></div>
                <div>
                  <h4 className="font-bold text-white">Real Engagement</h4>
                  <p className="text-sm text-muted-foreground">Interactive moments that shift perspectives.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. SIGNATURE TALKS */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">Signature Presentations</h2>
        </div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {/* Talk 1 */}
          <Card className="bg-surface border border-gold/30 overflow-hidden">
            <div className="grid md:grid-cols-3">
              <div className="bg-gold/5 p-8 flex flex-col justify-center border-r border-gold/10">
                <span className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Corporate & Leadership</span>
                <h3 className="text-2xl font-serif font-bold text-white">Leadership by VIP</h3>
              </div>
              <div className="p-8 md:col-span-2 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  The best leaders don't just manage — they lead from alignment. 
                  This keynote introduces the VIP Framework as a leadership philosophy, 
                  helping executives lead from authenticity rather than just authority.
                </p>
                <div className="pt-4 flex flex-wrap gap-4 text-sm text-white/80">
                  <span className="bg-surface-elevated px-3 py-1 rounded-full border border-border">Authentic Leadership</span>
                  <span className="bg-surface-elevated px-3 py-1 rounded-full border border-border">Organizational Culture</span>
                  <span className="bg-surface-elevated px-3 py-1 rounded-full border border-border">Decision Making</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Talk 2 */}
          <Card className="bg-surface border border-gold/30 overflow-hidden">
            <div className="grid md:grid-cols-3">
              <div className="bg-gold/5 p-8 flex flex-col justify-center border-r border-gold/10">
                <span className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Community & Men</span>
                <h3 className="text-2xl font-serif font-bold text-white">Dear Father, From MVP to VIP</h3>
              </div>
              <div className="p-8 md:col-span-2 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  A powerful message about the cost of performance-based identity. 
                  Wayne invites men on a journey from being the "Most Valuable Player" 
                  to becoming a "Very Important Person" to those who matter most.
                </p>
                <div className="pt-4 flex flex-wrap gap-4 text-sm text-white/80">
                  <span className="bg-surface-elevated px-3 py-1 rounded-full border border-border">Fatherhood</span>
                  <span className="bg-surface-elevated px-3 py-1 rounded-full border border-border">Identity Shift</span>
                  <span className="bg-surface-elevated px-3 py-1 rounded-full border border-border">Legacy</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Talk 3 - Custom */}
          <div className="text-center bg-surface-elevated/50 p-8 rounded-xl border border-dashed border-border">
            <h3 className="text-xl font-bold mb-2">Custom Programs</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Have a specific theme? Coach Wayne develops custom presentations tailored 
              to your organization's unique challenges, from "Navigating Career Transitions" 
              to "Building Resilience."
            </p>
            <Link href="/contact" className="text-gold hover:text-white font-bold text-sm uppercase tracking-widest">
              Discuss Your Needs →
            </Link>
          </div>
        </div>
      </Section>

      {/* 4. TESTIMONIALS */}
      <Section variant="alternate">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <blockquote className="bg-surface p-8 rounded-xl border border-border shadow-sm">
            <p className="text-muted-foreground mb-6 italic">
              "Wayne's keynote was the highlight of our leadership retreat. 
              Three months later, our executives are still referencing the VIP Framework."
            </p>
            <footer>
              <cite className="not-italic font-bold text-white block">— Sarah M.</cite>
              <span className="text-sm text-gold">Chief People Officer</span>
            </footer>
          </blockquote>
          <blockquote className="bg-surface p-8 rounded-xl border border-border shadow-sm">
            <p className="text-muted-foreground mb-6 italic">
              "We've hired dozens of speakers over the years. Wayne is the first one 
              whose talk led to actual behavior change in our organization."
            </p>
            <footer>
              <cite className="not-italic font-bold text-white block">— Robert T.</cite>
              <span className="text-sm text-gold">Conference Director</span>
            </footer>
          </blockquote>
        </div>
      </Section>

      {/* 5. BOOKING */}
      <Section>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-serif font-bold">Book Coach Wayne</h2>
          <p className="text-xl text-muted-foreground">
            Available for keynotes, workshops, and executive retreats. <br/>
            Based in Fort Lauderdale, FL. Travels globally.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button size="lg" variant="primary" asChild>
              <Link href="/contact">Inquire About Availability</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="mailto:waynedawson@viptransformativeliving.com">Email Directly</a>
            </Button>
          </div>
        </div>
      </Section>

    </div>
  );
}
