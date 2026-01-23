import { Section } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getNewsletters } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, BookOpen, MonitorPlay, FileText } from "lucide-react";

// Mock data if DB is empty
const MOCK_NEWSLETTERS = [
  {
    id: '1',
    title: 'The Midlife Myth: Why You Aren’t Done Yet',
    excerpt: 'Society tells us midlife is a crisis. I call it a chrysalis. Here is why your best years are actually ahead of you.',
    slug: 'midlife-myth',
    category: 'Purpose',
    published_at: '2025-12-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Silent Struggles: Men and Vulnerability',
    excerpt: 'Why opening up doesn’t make you weak, and how to find safe spaces to process the weight you carry.',
    slug: 'silent-struggles',
    category: 'Health',
    published_at: '2025-11-20T10:00:00Z',
  }
];

export const metadata = {
  title: "Resources & Newsletter | VIP Transformative Living",
  description: "Free resources, e-books, and weekly insights for men navigating life transitions.",
};

export default async function ResourcesPage() {
  let newsletters = await getNewsletters();
  if (!newsletters || newsletters.length === 0) {
    newsletters = MOCK_NEWSLETTERS as any;
  }

  return (
    <div className="pt-20 font-sans">
      
      {/* 1. HERO */}
      <Section className="text-center space-y-6 relative overflow-hidden py-32">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: "url('/images/sunset-mountains.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background/90" />
        </div>

        <div className="relative z-10">
          <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">Free Resources</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground">
            Start Your Transformation Today
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tools, insights, and frameworks to begin your journey — completely free.
          </p>
        </div>
      </Section>

      {/* 2. FEATURED: SELF-ASSESSMENT */}
      <Section variant="alternate">
        <div className="max-w-5xl mx-auto bg-surface border-2 border-gold/30 rounded-2xl p-8 md:p-12 shadow-[0_0_40px_rgba(212,175,55,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-4 py-1 rounded-bl-lg">MOST POPULAR</div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-white">The VIP Alignment Assessment</h2>
              <p className="text-lg text-muted-foreground">
                Where do you stand with your Values, Identity, and Purpose? 
                This free 5-minute assessment gives you immediate clarity on your current alignment score 
                and personalized recommendations for your next step.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3"><Check className="w-5 h-5 text-gold shrink-0" /> Discover your strengths and blind spots</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-gold shrink-0" /> Get personalized insights</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-gold shrink-0" /> No email required to see results</li>
              </ul>
              <Button size="lg" variant="primary" asChild>
                <a href="https://viptl-self-assessment-website.vercel.app/" target="_blank" rel="noopener noreferrer">Take the Assessment →</a>
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-gold/20 to-transparent rounded-full flex items-center justify-center border border-gold/20">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-gold mb-2">VIP</div>
                  <div className="text-sm uppercase tracking-widest text-muted-foreground">Alignment Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. FREE E-BOOK */}
      <Section>
        <div className="flex flex-col md:flex-row gap-16 items-center max-w-6xl mx-auto">
          <div className="flex-1 order-2 md:order-1 relative aspect-[3/4] w-full max-w-md bg-black rounded-lg border border-gold/30 flex items-center justify-center shadow-2xl">
            {/* Book Cover Placeholder */}
            <div className="text-center p-8">
              <BookOpen className="w-16 h-16 text-gold/50 mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-gold mb-2">Breaking Free</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Discover Your Purpose, Power, and Prosperity</p>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2 space-y-6">
            <span className="text-gold font-bold text-sm uppercase tracking-widest">Free Download</span>
            <h2 className="text-4xl font-serif font-bold">Breaking Free: E-Book</h2>
            <p className="text-lg text-muted-foreground">
              The crossroads of midlife isn't a crisis — it's an invitation. 
              This comprehensive guide explores why you feel stuck and the three questions every man must answer to move forward.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-gold" /> Why midlife feels disorienting</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-gold" /> Distinguishing success vs. fulfillment</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-gold" /> First steps to alignment</li>
            </ul>
            <div className="pt-4 max-w-md">
              <p className="text-sm text-muted-foreground mb-3">Enter your email for instant access:</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Your email address" className="flex-1 bg-surface border border-border rounded-md px-4 py-2" />
                <Button>Download</Button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. VIDEO COURSE */}
      <Section variant="alternate">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-gold/20">Video Training</span>
            <h2 className="text-4xl font-serif font-bold">Breaking Free! Course</h2>
            <p className="text-xl text-muted-foreground">
              10 modules. Real transformation. Your pace.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Go deeper than the book. Coach Wayne walks you through the complete VIP Framework with video lessons, 
              practical exercises, and a downloadable workbook.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-surface p-4 rounded-lg border border-border">
                <div className="text-2xl font-bold text-white mb-1">10</div>
                <div className="text-xs text-muted-foreground uppercase">Video Modules</div>
              </div>
              <div className="bg-surface p-4 rounded-lg border border-border">
                <div className="text-2xl font-bold text-white mb-1">$47</div>
                <div className="text-xs text-muted-foreground uppercase">Lifetime Access</div>
              </div>
            </div>
            <div className="pt-6">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">Get Instant Access →</Button>
            </div>
          </div>
          <div className="relative aspect-video bg-black rounded-xl border border-gold/20 overflow-hidden group cursor-pointer shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/40 transition-colors">
              <MonitorPlay className="w-20 h-20 text-gold opacity-80 group-hover:scale-110 transition-transform" />
            </div>
            {/* Image placeholder */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-white font-bold text-lg">Module 1: The Awakening</div>
              <div className="text-white/70 text-sm">12:45 • Intro to VIP Framework</div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. NEWSLETTER */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4">The Weekly Wisdom Newsletter</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every Thursday, one insight to help you navigate career, relationships, and purpose. 
            Join 2,000+ men starting their week with clarity.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="w-full max-w-md bg-surface p-6 rounded-xl border border-border">
            <form className="flex flex-col gap-4">
              <input type="email" placeholder="Your email address" className="w-full bg-background border border-border rounded-md px-4 py-3" />
              <Button className="w-full">Subscribe Free</Button>
            </form>
            <p className="text-xs text-center text-muted-foreground mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="flex justify-between items-end mb-8 border-b border-border pb-4">
          <h3 className="text-2xl font-serif font-bold">Latest Articles</h3>
          <Link href="/newsletter" className="text-gold text-sm hover:underline flex items-center gap-1">
            Browse Archive <FileText className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsletters.map((newsletter) => (
            <Link key={newsletter.id} href={`/newsletter/${newsletter.slug}`} className="group h-full">
              <Card className="h-full hover:border-gold transition-colors bg-surface">
                <div className="aspect-video bg-surface-elevated rounded-t-lg mb-4 flex items-center justify-center text-muted-foreground border-b border-border">
                  <FileText className="w-12 h-12 opacity-20" />
                </div>
                <CardHeader>
                  <div className="text-xs font-bold text-gold uppercase tracking-wider mb-2">
                    {newsletter.category}
                  </div>
                  <CardTitle className="group-hover:text-gold transition-colors text-xl">
                    {newsletter.title}
                  </CardTitle>
                  <CardDescription>
                    {new Date(newsletter.published_at!).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                    {newsletter.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
