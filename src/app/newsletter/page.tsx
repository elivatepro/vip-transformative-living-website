import { Section } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getNewsletters } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

// Mock data if DB is empty - mirroring what's in Resources for consistency
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
  },
  {
    id: '3',
    title: 'The Identity Trap Successful Men Fall Into',
    excerpt: 'You are not your job title. You are not your bank account. Rediscovering who you are when the uniform comes off.',
    slug: 'identity-trap',
    category: 'Identity',
    published_at: '2025-11-05T10:00:00Z',
  },
  {
    id: '4',
    title: 'Redefining Success After 40',
    excerpt: 'The first half of life is about accumulation. The second half is about distribution. Shifting from success to significance.',
    slug: 'redefining-success',
    category: 'Career',
    published_at: '2025-10-28T10:00:00Z',
  }
];

export const metadata = {
  title: "Weekly Wisdom Newsletter | VIP Transformative Living",
  description: "Insights for men in transition. Practical wisdom on career, relationships, health, and purpose published weekly.",
};

export default async function NewsletterPage() {
  let newsletters = await getNewsletters();
  if (!newsletters || newsletters.length === 0) {
    newsletters = MOCK_NEWSLETTERS as any;
  }

  const categories = ["All", "Career", "Relationships", "Health & Wellness", "Purpose", "Mindset"];

  return (
    <div className="pt-20 font-sans">
      
      {/* 1. HERO */}
      <Section className="text-center space-y-6 relative overflow-hidden py-32">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: "url('/images/grassland-mountains.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background/90" />
        </div>

        <div className="relative z-10">
          <span className="text-gold uppercase tracking-[0.2em] text-sm font-bold">Newsletter</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground">
            Insights for Men in Transition
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practical wisdom on career, relationships, health, and purpose. <br className="hidden md:block"/>
            Published every Thursday.
          </p>
        </div>
      </Section>

      {/* 3. FILTERS */}
      <Section className="py-8 bg-surface-elevated bg-noise border-b border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 ">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat, i) => (
              <button 
                key={cat}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${i === 0 ? 'bg-gold text-black font-bold' : 'bg-surface hover:bg-surface-elevated text-muted-foreground hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-surface border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      </Section>

      {/* 4. ARTICLE GRID */}
      <Section className="bg-gradient-to-b from-background to-surface-elevated bg-noise pt-12 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsletters.map((newsletter) => (
            <Link key={newsletter.id} href={`/newsletter/${newsletter.slug}`} className="group h-full">
              <Card className="h-full border-border bg-surface hover:border-gold transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video bg-surface-elevated rounded-t-lg mb-4 flex items-center justify-center text-muted-foreground border-b border-border relative overflow-hidden">
                  {/* Placeholder for actual image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  <span className="text-sm uppercase tracking-widest opacity-30 font-bold">Article Image</span>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-gold uppercase tracking-wider">
                      {newsletter.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(newsletter.published_at!).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-gold transition-colors text-xl leading-tight mb-2">
                    {newsletter.title}
                  </CardTitle>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <span>5 min read</span>
                    <span>→</span>
                  </div>
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

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="px-8">Load More Articles</Button>
        </div>
      </Section>

      {/* 5. SUBSCRIBE BOX */}
      <Section variant="alternate">
        <div className="max-w-4xl mx-auto bg-surface-elevated border border-gold/30 rounded-2xl p-8 md:p-12 text-center space-y-8 shadow-xl">
          <div className="space-y-4">
            <h3 className="text-3xl font-serif font-bold">Get the newsletter every Thursday.</h3>
            <p className="text-muted-foreground">Join 2,000+ men who start their week with clarity.</p>
          </div>
          
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="flex-1 bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-gold"
              required 
            />
            <Button size="lg" type="submit" variant="primary">Subscribe →</Button>
          </form>
          <p className="text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
        </div>
      </Section>

    </div>
  );
}
