import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookCallButton } from "@/components/book-call-button";

export const metadata = {
  title: "About Coach Wayne | VIP Transformative Living",
  description: "Meet Wayne Dawson, the founder of VIP Transformative Living. Learn about his journey from external success to internal fulfillment.",
};

export default function AboutPage() {
  return (
    <div className="pt-20 font-sans">
      {/* 1. HERO - ABOUT COACH WAYNE */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: "url('/images/sunrise-mountains.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background/90" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-gold/20 shadow-2xl">
              <Image
                src="/images/coach-wayne-new.jpg"
                alt="Coach Wayne Dawson"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl z-[-1]" />
          </div>

          {/* Text */}
          <div className="space-y-6 order-1 lg:order-2">
            <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">Meet Your Guide</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              Coach Wayne Dawson
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light border-l-2 border-gold pl-6">
              Transformational Coach | Speaker | Author <br/>
              <span className="text-white text-lg mt-2 block">25+ Years Guiding Men Through Life's Pivotal Moments</span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE STORY */}
      <Section variant="alternate" className="py-24">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              "I Know These Crossroads. <br/> I've Stood at Them Myself."
            </h2>
          </div>

          <div className="prose prose-invert prose-lg mx-auto leading-relaxed text-muted-foreground">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-gold first-letter:mr-3 first-letter:float-left">
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
            <p className="text-white font-medium border-l-4 border-gold pl-6 my-8 italic">
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
            <p className="text-xl text-white font-serif text-center py-8">
              There has to be more than this. <br/>
              <span className="text-gold">There is. And I can help you find it.</span>
            </p>
          </div>
        </div>
      </Section>

      {/* 3. CREDENTIALS & EXPERTISE */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-8">Background & Expertise</h2>
            <p className="text-muted-foreground mb-8">
              My approach blends deep psychological insight with practical, action-oriented strategies. 
              This isn't just about feeling better — it's about building a life that fits who you truly are.
            </p>
            
            <div className="space-y-8">
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

          <div className="bg-surface-elevated p-8 rounded-xl border border-border">
            <h3 className="text-2xl font-serif font-bold mb-6 text-gold">Speaking & Leadership</h3>
            <p className="text-muted-foreground mb-6">
              Beyond 1-on-1 coaching, I work with organizations to bring the power of alignment to their leadership teams.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <span className="text-gold">✓</span>
                <span className="text-sm">Keynote speaker for corporations & nonprofits</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold">✓</span>
                <span className="text-sm">Signature talk: "Leadership by VIP"</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gold">✓</span>
                <span className="text-sm">Signature talk: "Dear Father, From MVP to VIP"</span>
              </li>
            </ul>
            <Link href="/speaking" className="text-gold hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
              View Speaking Services →
            </Link>
          </div>
        </div>
      </Section>

      {/* 4. PERSONAL / BEYOND THE WORK */}
      <Section variant="alternate" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grassland-mountains.jpg')] bg-cover bg-center opacity-10 fixed-attachment" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 skew-x-12 transform translate-x-20" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">The Man Behind The Coach</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 mt-4">Beyond the Work</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Based in Fort Lauderdale, Florida, I believe transformation happens best in partnership — not isolation. 
            When I'm not coaching, I'm deeply involved in my community and committed to my own ongoing growth.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I bring my full self to this work because I expect the same from my clients. 
            Authentic transformation requires authentic connection.
          </p>
        </div>
      </Section>

      {/* 5. FINAL CTA */}
      <Section className="py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Let's Talk</h2>
          <p className="text-xl text-muted-foreground">
            If you're reading this, something brought you here. A question. A frustration. A hope.
            I'd love to hear your story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <BookCallButton 
              variant="primary" 
              size="lg" 
              className="text-lg px-12 py-8"
            >
              Book a Discovery Call
            </BookCallButton>
            <Button variant="secondary" size="lg" className="text-lg px-12 py-8" asChild>
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
