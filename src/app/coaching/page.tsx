'use client';

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookCallButton } from "@/components/book-call-button";

export default function CoachingPage() {
  return (
    <div className="pt-20 font-sans">
      
      {/* 1. HERO */}
      <Section className="text-center space-y-6 relative overflow-hidden py-32">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: "url('/images/river-timelapse.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background/90" />
        </div>

        <div className="relative z-10">
          <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">Coaching Programs</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground">
            Real Change Requires Real Partnership
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            One-on-one coaching that meets you where you are and takes you where you need to go.
          </p>
        </div>
      </Section>

      {/* 2. THE COACHING DIFFERENCE */}
      <Section variant="alternate">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">
            This Isn't Advice. It's Transformation.
          </h2>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-6 text-left">
            <p className="text-center">
              You can find advice anywhere — books, podcasts, well-meaning friends, the internet.
            </p>
            <div className="bg-surface border border-border p-8 rounded-xl shadow-lg">
              <p className="font-bold text-white mb-6 text-xl">What you can't find is a partner who:</p>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start"><CheckCircle2 className="w-6 h-6 text-gold shrink-0" /> Sees your potential even when you can't</li>
                <li className="flex gap-3 items-start"><CheckCircle2 className="w-6 h-6 text-gold shrink-0" /> Holds you accountable when it's uncomfortable</li>
                <li className="flex gap-3 items-start"><CheckCircle2 className="w-6 h-6 text-gold shrink-0" /> Challenges your limiting beliefs with compassion</li>
                <li className="flex gap-3 items-start"><CheckCircle2 className="w-6 h-6 text-gold shrink-0" /> Guides you through proven frameworks, not generic tips</li>
                <li className="flex gap-3 items-start"><CheckCircle2 className="w-6 h-6 text-gold shrink-0" /> Walks the path WITH you, not just points the direction</li>
              </ul>
            </div>
            <p className="text-center font-serif text-2xl text-gold pt-4">
              Not motivation that fades. Transformation that lasts.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. HOW IT WORKS */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">The Journey</h2>
          <p className="text-muted-foreground">Your path to transformation.</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="relative text-center space-y-4">
            <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center text-xl font-bold mx-auto border border-gold/30">1</div>
            <h3 className="font-bold text-lg">Assessment</h3>
            <p className="text-sm text-muted-foreground">We start with clarity. The VIP Assessment establishes your baseline before we even begin.</p>
          </div>
          <div className="relative text-center space-y-4">
            <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center text-xl font-bold mx-auto border border-gold/30">2</div>
            <h3 className="font-bold text-lg">Discovery Call</h3>
            <p className="text-sm text-muted-foreground">A free, honest conversation to explore if we're the right fit for each other.</p>
          </div>
          <div className="relative text-center space-y-4">
            <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center text-xl font-bold mx-auto border border-gold/30">3</div>
            <h3 className="font-bold text-lg">Coaching</h3>
            <p className="text-sm text-muted-foreground">Weekly 1-hour sessions using the VIP Framework to create lasting change.</p>
          </div>
          <div className="relative text-center space-y-4">
            <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center text-xl font-bold mx-auto border border-gold/30">4</div>
            <h3 className="font-bold text-lg">Integration</h3>
            <p className="text-sm text-muted-foreground">You'll leave with tools, frameworks, and clarity that serve you for life.</p>
          </div>
        </div>
      </Section>

      {/* 4. PACKAGES */}
      <Section id="packages" className="bg-surface-elevated/30">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">Choose Your Path</h2>
          <p className="text-muted-foreground">Three pathways designed for different needs and timeframes.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
          
          {/* SILVER */}
          <div className="bg-surface border border-border rounded-xl p-8 hover:border-gold/30 transition-all">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground border border-border px-2 py-1 rounded">Silver</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">The 5-Step Breakthrough Blueprint</h3>
            <p className="text-sm font-bold text-gold mb-6">When you need clarity NOW.</p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">$200</span><span className="text-muted-foreground"> / session</span>
              <p className="text-xs text-muted-foreground mt-2">Limited to 4 sessions</p>
            </div>

            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              For men facing an immediate challenge — job loss, relationship crisis, or decision that can't wait. 
              Rapid support to navigate through.
            </p>

            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> Signature 5-Step Crisis Relief</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> Rapid S.C.O.R.E. Assessment</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> Immediate Action Plan</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> Bonus: "Breaking Free" E-book</li>
            </ul>

            <BookCallButton className="w-full" variant="outline">Book Discovery Call</BookCallButton>
          </div>

          {/* GOLD - POPULAR */}
          <div className="bg-surface-elevated border-2 border-gold rounded-xl p-8 transform lg:-translate-y-4 shadow-2xl relative">
            <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">MOST POPULAR</div>
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold border border-gold px-2 py-1 rounded">Gold</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">The Career Transition Efficiency Blueprint</h3>
            <p className="text-sm font-bold text-gold mb-6">Find work that fits who you've become.</p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">$2,400</span><span className="text-muted-foreground"> total</span>
              <p className="text-xs text-muted-foreground mt-2">Payment Plan: $1,250 x 2</p>
            </div>

            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              8-week intensive for men ready to make strategic career moves — whether climbing higher, 
              pivoting completely, or finding your zone of genius.
            </p>

            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> 8 Weekly Sessions</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> VIP Career Assessment</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> Zone of Genius ID</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> Resume & LinkedIn Expert Access</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> Bonus: "Five Years to Freedom" E-book</li>
            </ul>

            <BookCallButton className="w-full" variant="primary">Book Discovery Call</BookCallButton>
          </div>

          {/* PLATINUM */}
          <div className="bg-surface border border-border rounded-xl p-8 hover:border-gold/30 transition-all">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-white border border-white/30 px-2 py-1 rounded">Platinum</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">Power, Prosperity & Purpose Blueprint</h3>
            <p className="text-sm font-bold text-gold mb-6">The complete transformation.</p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">$3,600</span><span className="text-muted-foreground"> total</span>
              <p className="text-xs text-muted-foreground mt-2">Payment Plan: $1,300 x 3</p>
            </div>

            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              12-week comprehensive journey for men ready to transform not just one area, 
              but their entire relationship with themselves. Deep work.
            </p>

            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> 12 Weekly Sessions</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> Full VIP Transformation Process</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> Identity Reconstruction</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> Limiting Belief Removal</li>
              <li className="flex gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> Bonus: "Warrior Brain" E-book</li>
            </ul>

            <BookCallButton className="w-full" variant="outline">Book Discovery Call</BookCallButton>
          </div>

        </div>
      </Section>

      {/* 5. COMPARISON TABLE */}
      <Section className="hidden md:block">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Compare Packages</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-6 font-bold text-muted-foreground">Feature</th>
                  <th className="py-4 px-6 font-bold text-center">Silver</th>
                  <th className="py-4 px-6 font-bold text-center text-gold">Gold</th>
                  <th className="py-4 px-6 font-bold text-center">Platinum</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-border/50 hover:bg-surface/50">
                  <td className="py-4 px-6 font-medium">Sessions</td>
                  <td className="py-4 px-6 text-center">Up to 4</td>
                  <td className="py-4 px-6 text-center">8</td>
                  <td className="py-4 px-6 text-center">12</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-surface/50">
                  <td className="py-4 px-6 font-medium">Duration</td>
                  <td className="py-4 px-6 text-center">4 Weeks</td>
                  <td className="py-4 px-6 text-center">8 Weeks</td>
                  <td className="py-4 px-6 text-center">12 Weeks</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-surface/50">
                  <td className="py-4 px-6 font-medium">Focus</td>
                  <td className="py-4 px-6 text-center">Crisis Resolution</td>
                  <td className="py-4 px-6 text-center">Career Transformation</td>
                  <td className="py-4 px-6 text-center">Complete Life Transformation</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-surface/50">
                  <td className="py-4 px-6 font-medium">VIP Framework</td>
                  <td className="py-4 px-6 text-center">Partial (S.C.O.R.E.)</td>
                  <td className="py-4 px-6 text-center">Career-Focused</td>
                  <td className="py-4 px-6 text-center">Full Implementation</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-surface/50">
                  <td className="py-4 px-6 font-medium">Payment Plan</td>
                  <td className="py-4 px-6 text-center">—</td>
                  <td className="py-4 px-6 text-center">✓</td>
                  <td className="py-4 px-6 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* 6. FAQ */}
      <Section variant="alternate">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-3xl font-serif font-bold text-center">Common Questions</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">How do I know which package is right for me?</h3>
              <p className="text-muted-foreground">
                Start with the free VIP Assessment — it will help clarify where you are. 
                Then book a Discovery Call where we'll discuss your specific situation and I'll give you my honest recommendation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">What if I'm not sure coaching is what I need?</h3>
              <p className="text-muted-foreground">
                That's exactly what the Discovery Call is for. It's free, there's no pressure, 
                and you'll leave with clarity whether you decide to work with me or not.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Can I upgrade later?</h3>
              <p className="text-muted-foreground">
                Absolutely. Many clients start with Silver and realize they want to go deeper. 
                Any investment in Silver can be applied toward a Gold or Platinum package.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. FINAL CTA */}
      <Section className="text-center py-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Your Transformation Starts with a Conversation</h2>
          <p className="text-xl text-muted-foreground">
            Still not sure? That's okay. Book a free Discovery Call. 
            No pressure. No pitch. Just clarity.
          </p>
          <BookCallButton 
            variant="primary" 
            size="lg" 
            className="text-lg px-12 py-8"
          >
            Book Your Free Discovery Call
          </BookCallButton>
        </div>
      </Section>

    </div>
  );
}
