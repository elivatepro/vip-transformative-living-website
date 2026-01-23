import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, PlayCircle } from "lucide-react";
import { BookCallButton, BookCallLink } from "@/components/book-call-button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100dvh] w-full bg-[#0A0A0A] bg-noise overflow-hidden flex items-center justify-center pt-20 md:py-0">
        
        <div className="container mx-auto px-4 relative z-10 w-full">
          {/* THE HERO CARD */}
          <div className="relative w-full bg-[#121212]/80 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-2 min-h-[75vh] md:min-h-[700px]">
            
            {/* CARD BACKGROUND IMAGE (Blurred) */}
            <div 
              className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none z-0"
              style={{
                backgroundImage: "url('/images/sunset-mountains.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(20px) contrast(1.1) brightness(0.7)'
              }}
            />
            
            {/* CARD BACKGROUND EFFECTS */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Desktop Right Glow (Inside Card) */}
              <div className="hidden md:block absolute top-1/2 right-[-10%] -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(197,160,89,0.15)_0%,transparent_70%)] blur-[80px]" />
              {/* Mobile Top Glow (Inside Card) */}
              <div className="block md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(197,160,89,0.2)_0%,transparent_70%)] blur-[60px]" />
            </div>

            {/* MOBILE IMAGE (Stacked Top) */}
            <div className="block md:hidden relative w-full h-[45vh] min-h-[350px]">
              <Image
                src="/images/wayne-transparent.png"
                alt="Coach Wayne"
                fill
                className="object-cover object-top opacity-90 scale-110 translate-y-4"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121212]/20 to-[#121212]" />
            </div>

            {/* DESKTOP IMAGE (Right Side, Full Height of Card) */}
            <div className="hidden md:block relative h-full w-full order-last">
              <Image
                src="/images/wayne-transparent.png"
                alt="Coach Wayne"
                fill
                className="object-cover object-center lg:object-right-top scale-110 translate-y-10"
                priority
                quality={90}
                style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)' }}
              />
            </div>

            {/* CONTENT (Text) */}
            <div className="relative z-10 flex flex-col justify-end md:justify-center p-8 md:p-16 space-y-6 md:space-y-8 -mt-20 md:mt-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent md:bg-none">
               <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white md:text-gold-gradient leading-tight tracking-tight drop-shadow-2xl">
                Your Next Chapter <br className="md:hidden" /> Starts Here.
              </h1>
              <p className="text-sm md:text-xl text-white/90 font-light leading-relaxed drop-shadow-md max-w-xl">
                For driven men navigating life's pivotal crossroads — career shifts, 
                relationship evolution, or rediscovering purpose. Transform confusion 
                into clarity with a proven framework that's guided hundreds of men 
                to breakthrough.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="primary" size="lg" className="text-lg px-8 py-6 w-full sm:w-auto bg-gold-gradient text-black hover:brightness-110 border border-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300" asChild>
                  <a href="https://viptl-self-assessment-website.vercel.app/" target="_blank" rel="noopener noreferrer">
                    Take Free Assessment
                  </a>
                </Button>
                <BookCallButton className="text-lg px-8 py-6 w-full sm:w-auto bg-black/40 text-white border border-gold hover:bg-gold hover:text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">
                  Book Discovery Call
                </BookCallButton>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator (Outside Card) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50 hidden md:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* 2. PROBLEM AGITATION */}
      <Section className="bg-[#0A0A0A] bg-noise relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">Sound Familiar?</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">
              Success without fulfillment isn't success.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Pain Point 1 */}
            <div className="bg-surface/50 border border-border p-8 rounded-xl hover:border-gold/30 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-foreground">You've achieved success — but something's missing.</h3>
              <p className="text-muted-foreground leading-relaxed">
                The title, the income, the accomplishments... they should feel like enough. 
                But there's a quiet voice asking: "Is this it?"
              </p>
            </div>

            {/* Pain Point 2 */}
            <div className="bg-surface/50 border border-border p-8 rounded-xl hover:border-gold/30 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-foreground">You're at a crossroads and the path is unclear.</h3>
              <p className="text-muted-foreground leading-relaxed">
                Career pivot? Relationship repair? A complete reinvention? The options 
                feel overwhelming, and the stakes feel impossibly high.
              </p>
            </div>

            {/* Pain Point 3 */}
            <div className="bg-surface/50 border border-border p-8 rounded-xl hover:border-gold/30 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-foreground">You're going through the motions.</h3>
              <p className="text-muted-foreground leading-relaxed">
                Days blur together. You're performing a role instead of living your truth. 
                The disconnect between who you are and who you're being grows wider.
              </p>
            </div>

            {/* Pain Point 4 */}
            <div className="bg-surface/50 border border-border p-8 rounded-xl hover:border-gold/30 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-foreground">You've tried figuring it out alone.</h3>
              <p className="text-muted-foreground leading-relaxed">
                Books, podcasts, self-reflection... you've done the work. But without 
                the right guidance, you keep circling the same patterns.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl font-serif italic text-gold-gradient">
              "These feelings aren't weakness. They're signals. 
              Signals that you're ready for transformation."
            </p>
          </div>
        </div>
      </Section>

      {/* 3. SOLUTION / VIP FRAMEWORK */}
      <Section className="bg-surface-elevated bg-gold-glow py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">The Solution</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">
              Transformation Happens When <br className="hidden md:block" /> Three Things Align
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
            {/* Visual Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold/30 to-transparent z-0" />

            {/* V - VALUES */}
            <div className="relative z-10 bg-surface border border-gold/20 p-8 rounded-2xl text-center shadow-lg hover:transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/30 text-gold font-serif text-3xl font-bold">V</div>
              <h3 className="text-2xl font-serif font-bold mb-4">Values</h3>
              <p className="text-muted-foreground">
                What truly drives you — not what you've been told should matter, 
                but what actually lights you up and gives your life meaning.
              </p>
            </div>

            {/* I - IDENTITY */}
            <div className="relative z-10 bg-surface border border-gold/20 p-8 rounded-2xl text-center shadow-lg hover:transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/30 text-gold font-serif text-3xl font-bold">I</div>
              <h3 className="text-2xl font-serif font-bold mb-4">Identity</h3>
              <p className="text-muted-foreground">
                Who you are at your core — beyond the titles, roles, and expectations 
                others have placed on you. Your authentic self.
              </p>
            </div>

            {/* P - PURPOSE */}
            <div className="relative z-10 bg-surface border border-gold/20 p-8 rounded-2xl text-center shadow-lg hover:transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/30 text-gold font-serif text-3xl font-bold">P</div>
              <h3 className="text-2xl font-serif font-bold mb-4">Purpose</h3>
              <p className="text-muted-foreground">
                Why you exist — the unique contribution only you can make. 
                The legacy you're meant to leave.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center space-y-8">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              When your Values, Identity, and Purpose are misaligned, you feel stuck. 
              <br/>
              <span className="text-gold font-semibold">When they align? That's when breakthrough happens.</span>
            </p>
            <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold hover:text-black" asChild>
              <a href="https://viptl-self-assessment-website.vercel.app/" target="_blank" rel="noopener noreferrer">
                Discover Your VIP Alignment Score
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* 4. ABOUT TEASER */}
      <Section className="overflow-hidden bg-[#0A0A0A] relative">
        <div className="absolute inset-0 bg-cover bg-left opacity-60" style={{ backgroundImage: "url('/images/river-timelapse.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]" />
        
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto relative z-10">
          {/* Image - Swapped to Night Photo for variety */}
          <div className="relative order-2 md:order-1">
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden border border-border shadow-2xl group">
              <Image 
                src="/images/coach-wayne-night.jpg"
                alt="Coach Wayne Dawson"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold/10 rounded-full blur-2xl z-0" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gold/10 rounded-full blur-3xl z-0" />
          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2 space-y-8">
            <div className="space-y-4">
              <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">Your Guide</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">"I've Been Where You Are."</h2>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                For over 25 years, I've walked alongside men through career upheavals, 
                relationship crossroads, and the quiet crisis of purpose that often 
                hits when you've "made it" but still feel lost.
              </p>
              <p>
                I know these challenges intimately — not just professionally, but personally. 
                My own journey taught me that lasting change doesn't come from motivational speeches.
              </p>
              <p>
                It comes from doing the deep work of aligning <strong className="text-white">who you are</strong> with <strong className="text-white">how you're living</strong>.
              </p>
            </div>
            <Button variant="link" className="text-gold p-0 text-lg group" asChild>
              <Link href="/about">
                Read My Full Story <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* 5. SOCIAL PROOF */}
      <Section className="bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">Real Transformations</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Men Who Made the Leap</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-surface p-8 rounded-xl border border-border shadow-sm">
              <div className="mb-6 text-gold">
                ⭐⭐⭐⭐⭐
              </div>
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "I was a VP making great money but dreading Monday mornings. 
                Wayne helped me see that my values had shifted but my career hadn't. 
                Best decision I ever made."
              </blockquote>
              <div>
                <cite className="not-italic font-bold text-white block">Marcus T.</cite>
                <span className="text-sm text-gold">Former VP of Operations</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-surface p-8 rounded-xl border border-border shadow-sm">
              <div className="mb-6 text-gold">
                ⭐⭐⭐⭐⭐
              </div>
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "At 47, I thought it was too late to reinvent myself. Wayne showed me 
                that my experience wasn't baggage — it was fuel. The identity work 
                gave me permission to pursue what I'd always wanted."
              </blockquote>
              <div>
                <cite className="not-italic font-bold text-white block">David R.</cite>
                <span className="text-sm text-gold">Executive Leadership Coach</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-surface p-8 rounded-xl border border-border shadow-sm">
              <div className="mb-6 text-gold">
                ⭐⭐⭐⭐⭐
              </div>
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "I came to Wayne because my marriage was falling apart. What I discovered 
                was that I had lost myself. Once I reconnected with my own values, 
                everything else started to heal."
              </blockquote>
              <div>
                <cite className="not-italic font-bold text-white block">James K.</cite>
                <span className="text-sm text-gold">Business Owner</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. SERVICES OVERVIEW (TIERS) */}
      <Section className="bg-surface-elevated bg-noise">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">How We Work Together</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold">Choose Your Path to Transformation</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* SILVER - Rapid Relief */}
          <div className="group relative bg-surface border border-border rounded-xl p-8 hover:border-gray-400 transition-all duration-300 flex flex-col">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground border border-border px-2 py-1 rounded">Silver Tier</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">Crisis Breakthrough</h3>
            <p className="text-sm font-bold text-white/70 mb-6">When you need clarity NOW.</p>
            <p className="text-muted-foreground mb-8 flex-grow">
              For men facing an immediate challenge — job loss, relationship crisis, 
              or major decision — who need fast, focused support to navigate through.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Rapid S.C.O.R.E. Assessment</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> 4 Focused Sessions</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Immediate Action Plan</li>
            </ul>
            <Link href="/coaching" className="w-full">
              <Button variant="outline" className="w-full hover:bg-white hover:text-black transition-colors">Learn More</Button>
            </Link>
          </div>

          {/* GOLD - Career */}
          <div className="group relative bg-surface-elevated border-2 border-gold/30 rounded-xl p-8 transform md:-translate-y-4 shadow-2xl flex flex-col">
            <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">MOST POPULAR</div>
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold border border-gold px-2 py-1 rounded">Gold Tier</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2 text-gold-gradient">Career Blueprint</h3>
            <p className="text-sm font-bold text-white/70 mb-6">Find work that fits who you've become.</p>
            <p className="text-muted-foreground mb-8 flex-grow">
              8 weeks of intensive coaching for men ready to make a strategic career move 
              — whether that's climbing higher, pivoting completely, or finding your zone of genius.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> VIP Career Assessment</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Zone of Genius ID</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> 8 Weekly Sessions</li>
            </ul>
            <Link href="/coaching" className="w-full">
              <Button variant="primary" className="w-full">Learn More</Button>
            </Link>
          </div>

          {/* PLATINUM - Transformation */}
          <div className="group relative bg-surface border border-border rounded-xl p-8 hover:border-gray-400 transition-all duration-300 flex flex-col">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-white border border-white/30 px-2 py-1 rounded">Platinum Tier</span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">VIP Transformation</h3>
            <p className="text-sm font-bold text-white/70 mb-6">The full journey.</p>
            <p className="text-muted-foreground mb-8 flex-grow">
              12 weeks of deep work for men ready for comprehensive transformation — 
              values, identity, purpose, all of it. This is where lasting change happens.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Full Identity Work</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Limiting Belief Removal</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> 12 Weekly Sessions</li>
            </ul>
            <Link href="/coaching" className="w-full">
              <Button variant="outline" className="w-full hover:bg-white hover:text-black transition-colors">Learn More</Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Not sure which path is right for you?</p>
          <a href="https://viptl-self-assessment-website.vercel.app/" className="text-gold font-bold hover:underline">
            Take the Assessment to find out →
          </a>
        </div>
      </Section>

      {/* 7. NEWSLETTER SIGNUP */}
      <Section className="bg-[#0A0A0A] relative overflow-hidden">
        {/* Background Skyline Fade */}
        <div className="absolute inset-0 bg-cover bg-right opacity-30" style={{ backgroundImage: "url('/images/sunrise-mountains.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]" />
        
        <div className="max-w-4xl mx-auto bg-surface-elevated/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border flex flex-col md:flex-row gap-8 items-center relative z-10">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-serif font-bold">Weekly Wisdom for Men in Transition</h3>
            <p className="text-muted-foreground">
              Every Thursday, I share one insight that's helped my clients breakthrough. 
              No fluff. No spam. Just practical wisdom for navigating career, relationships, and purpose.
            </p>
            <div className="flex items-center gap-2 text-sm text-gold">
              <span>Join 2,000+ men starting their week with clarity.</span>
            </div>
          </div>
          <div className="flex-1 w-full">
            <form className="flex flex-col gap-3" action="/api/newsletter/subscribe" method="POST">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-border focus:border-gold focus:outline-none transition-colors"
                required 
              />
              <Button type="submit" variant="secondary" className="w-full">
                Get the Newsletter
              </Button>
              <p className="text-xs text-muted-foreground text-center">We respect your privacy. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>
      </Section>

      {/* 8. FINAL CTA */}
      <section className="py-24 relative overflow-hidden">
        {/* Blurred Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/coach-wayne-new.jpg"
            alt="Background"
            fill
            className="object-cover blur-xl opacity-30 scale-110"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/80" />
        </div>
        
        <div className="absolute inset-0 bg-gold-glow opacity-30 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif font-bold">
            Ready to Stop Wondering "What If?"
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            You've spent enough time knowing something needs to change. 
            The next step is simple: find out where you actually stand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="primary" size="lg" className="text-lg px-12 py-8" asChild>
              <a href="https://viptl-self-assessment-website.vercel.app/" target="_blank" rel="noopener noreferrer">
                Take the Free Assessment
              </a>
            </Button>
            <BookCallButton 
              variant="secondary" 
              size="lg" 
              className="text-lg px-12 py-8 bg-surface border-gold/50 hover:bg-surface-elevated"
            >
              Book Discovery Call
            </BookCallButton>
          </div>
        </div>
      </section>

    </div>
  );
}
