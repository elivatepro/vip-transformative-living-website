import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookCallButton } from "@/components/book-call-button";
import { SquareHeroSlider } from "@/components/square-hero-slider";

export const metadata = {
  title: "About Coach Wayne | VIP Transformative Living",
  description: "Meet Wayne Dawson, the founder of VIP Transformative Living. Learn about his journey from external success to internal fulfillment.",
};

export default function AboutPage() {
  return (
    <div className="pt-20 font-sans overflow-x-hidden">
      {/* 1. HERO - ABOUT COACH WAYNE */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden py-12 md:py-0">
        
        {/* Background - Not black. Using a deep charcoal gradient with noise and glow */}
        <div className="absolute inset-0 bg-[#0F0F0F] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(197,160,89,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(30,58,138,0.05)_0%,transparent_50%)] z-0" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay z-0" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1400px] mx-auto px-0 md:px-4 lg:px-12">
            
            {/* Square Image Slider */}
            <div className="relative order-1 lg:order-1 flex justify-center lg:justify-end mb-8 lg:mb-0">
              <SquareHeroSlider />
            </div>

            {/* Text Content */}
            <div className="order-2 lg:order-2 text-white text-center lg:text-left">
              <div className="inline-block mb-4 md:mb-6">
                <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold py-1 px-3 border border-gold/20 rounded-full bg-gold/5">
                  Meet Your Guide
                </span>
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl md:text-[5rem] font-medium leading-[1.1] md:leading-[1] mb-6 md:mb-8 drop-shadow-sm">
                Coach Wayne <br className="hidden md:block"/> Dawson
              </h1>
              
              <div className="h-[1px] w-[60px] md:w-[100px] bg-gold/50 mb-6 md:mb-8 mx-auto lg:mx-0" />
              
              <div className="space-y-4 mb-8 md:mb-10">
                <p className="text-lg md:text-2xl text-white/90 font-light flex flex-col md:flex-row items-center justify-center lg:justify-start gap-2 md:gap-4">
                  <span>Transformational Coach</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold hidden md:block" />
                  <span>Speaker</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold hidden md:block" />
                  <span>Author</span>
                </p>
                <p className="text-base md:text-lg text-white/60 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Dedicated to guiding high-achieving men through life&apos;s most pivotal transitions for over 25 years.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center lg:justify-start">
                <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 h-12 md:h-14 text-base shadow-xl" asChild>
                  <Link href="#story">Read My Full Story</Link>
                </Button>
                <Link 
                  href="#story" 
                  className="text-gold hover:text-white transition-colors flex items-center gap-2 font-medium tracking-wide group py-2"
                >
                  Learn more about my approach 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE STORY */}
      <Section id="story" variant="alternate" className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-12 px-4 md:px-0">
          <div className="text-center space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              "I Know These Crossroads. <br className="hidden md:block"/> I've Stood at Them Myself."
            </h2>
          </div>

          <div className="prose prose-invert prose-lg mx-auto leading-relaxed text-muted-foreground text-left">
            <p className="first-letter:text-4xl md:first-letter:text-5xl first-letter:font-serif first-letter:text-gold first-letter:mr-2 md:first-letter:mr-3 first-letter:float-left">
              I didn't become a coach because I read about transformation. 
              I became one because I lived it.
            </p>
            <p>
              For years, I was the man I now serve. Accomplished on paper. 
              Admired by others. And quietly wondering why success felt so empty.
            </p>
            <p>
              I had followed the script — education, career advancement, 
              family responsibilities. I checked every box. And yet something 
              fundamental was missing.
            </p>
            <p className="text-white font-medium border-l-4 border-gold pl-4 md:pl-6 my-6 md:my-8 italic">
              The turning point came when I finally admitted the truth: 
              I was living someone else's version of success.
            </p>
            <p>
              My values had evolved, but my life hadn't. 
              My identity had deepened, but my choices didn't reflect it. 
              My sense of purpose was buried under obligations and expectations.
            </p>
            <p>
              The transformation that followed wasn't quick or easy. 
              But it was real. And it changed everything.
            </p>
            <p>
              That journey — from performance to authenticity, 
              from achievement to alignment — became my life's work.
            </p>
            <p>
              For the past 25 years, I've had the privilege of walking 
              alongside hundreds of men through similar crossroads. 
              Executives and entrepreneurs. Fathers and husbands. 
              Men from all backgrounds united by the same realization:
            </p>
            <p className="text-lg md:text-xl text-white font-serif text-center py-6 md:py-8">
              There has to be more than this. <br/>
              <span className="text-gold">There is. And I can help you find it.</span>
            </p>
          </div>
        </div>
      </Section>

      {/* 3. CREDENTIALS & EXPERTISE */}
      <Section className="py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start max-w-6xl mx-auto px-4 md:px-0">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6 md:mb-8">Background & Expertise</h2>
            <p className="text-muted-foreground mb-6 md:mb-8">
              My approach blends deep psychological insight with practical, action-oriented strategies. 
              This isn't just about feeling better — it's about building a life that fits who you truly are.
            </p>
            
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Experience</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 25+ years in transformational coaching</li>
                  <li>• Hundreds of men coached through major life transitions</li>
                  <li>• Specialized focus: midlife transformation, career pivots, relationship restoration</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Approach</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Signature VIP Framework (Values, Identity, Purpose)</li>
                  <li>• Blend of cognitive restructuring and values clarification</li>
                  <li>• Practical strategies combined with deep inner work</li>
                  <li>• Accountability partnership, not advice dispensing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-surface-elevated p-6 md:p-8 rounded-xl border border-border">
            <h3 className="text-2xl font-serif font-bold mb-4 md:mb-6 text-gold">Speaking & Leadership</h3>
            <p className="text-muted-foreground mb-6">
              Beyond 1-on-1 coaching, I work with organizations to bring the power of alignment to their leadership teams.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <span className="text-gold shrink-0">✓</span>
                <span className="text-sm">Keynote speaker for corporations & nonprofits</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold shrink-0">✓</span>
                <span className="text-sm">Signature talk: "Leadership by VIP"</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold shrink-0">✓</span>
                <span className="text-sm">Signature talk: "Dear Father, From MVP to VIP"</span>
              </li>
            </ul>
            <Link href="/speaking" className="text-gold hover:text-white transition-colors text-sm font-bold tracking-widest uppercase inline-flex items-center gap-2 group">
              View Speaking Services <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </Section>

      {/* 4. PERSONAL / BEYOND THE WORK */}
      <Section variant="alternate" className="relative overflow-hidden py-16 md:py-24">
        {/* Mobile-friendly background handling: 'bg-scroll' on mobile, 'md:bg-fixed' on desktop */}
        <div className="absolute inset-0 bg-[url('/images/grassland-mountains.jpg')] bg-cover bg-center opacity-10 bg-scroll md:bg-fixed" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 skew-x-12 transform translate-x-20 hidden md:block" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <span className="text-gold uppercase tracking-[0.2em] text-xs md:text-sm font-bold">The Man Behind The Coach</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 md:mb-8 mt-4">Beyond the Work</h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8">
            Based in Fort Lauderdale, Florida, I believe transformation happens best in partnership — not isolation. 
            When I'm not coaching, I'm deeply involved in my community and committed to my own ongoing growth.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            I bring my full self to this work because I expect the same from my clients. 
            Authentic transformation requires authentic connection.
          </p>
        </div>
      </Section>

      {/* 5. FINAL CTA */}
      <Section className="py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 px-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">Let's Talk</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            If you're reading this, something brought you here. A question. A frustration. A hope.
            I'd love to hear your story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 w-full">
            <BookCallButton 
              variant="primary" 
              size="lg" 
              className="text-base md:text-lg px-8 md:px-12 py-6 md:py-8 w-full sm:w-auto"
            >
              Book a Discovery Call
            </BookCallButton>
            <Button variant="secondary" size="lg" className="text-base md:text-lg px-8 md:px-12 py-6 md:py-8 w-full sm:w-auto" asChild>
              <a href="https://viptl-self-assessment-website.vercel.app/" target="_blank" rel="noopener noreferrer">
                Take the Assessment First
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
