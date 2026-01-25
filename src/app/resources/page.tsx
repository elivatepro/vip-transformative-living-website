import { Section } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, FileText, MonitorPlay } from "lucide-react";
import { createClient } from "@/lib/supabase-server";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata = {
  title: "Resources & Newsletter | VIP Transformative Living",
  description: "Free resources, e-books, and weekly insights for men navigating life transitions.",
};

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data: newslettersResult } = await supabase
    .from('newsletter_articles')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  const newsletters = newslettersResult || [];

  return (
    <div className="pt-20 font-sans overflow-x-hidden">
      
      {/* 1. HERO */}
      <Section className="text-center space-y-6 relative overflow-hidden py-24 md:py-32">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: "url('/images/beautiful-sunrise-tatry.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background/90" />
        </div>

        <div className="relative z-10 px-4">
          <span className="text-gold uppercase tracking-[0.2em] text-xs md:text-sm font-bold">Free Resources</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mt-4 md:mt-6 mb-6 md:mb-8 leading-tight">
            Start Your Transformation Today
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tools, insights, and frameworks to begin your journey — completely free.
          </p>
        </div>
      </Section>

      {/* 2. FEATURED: SELF-ASSESSMENT */}
      <Section variant="alternate" className="px-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-surface border border-gold/20 md:border-2 md:border-gold/30 rounded-xl md:rounded-2xl p-6 md:p-12 shadow-[0_0_40px_rgba(212,175,55,0.05)] md:shadow-[0_0_40px_rgba(212,175,55,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gold text-black text-[10px] md:text-xs font-bold px-3 py-1 rounded-bl-lg z-20">MOST POPULAR</div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
            <div className="space-y-4 md:space-y-6 order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">The VIP Alignment Assessment</h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Where do you stand with your Values, Identity, and Purpose? 
                This free 5-minute assessment gives you immediate clarity on your current alignment score 
                and personalized recommendations for your next step.
              </p>
              <ul className="space-y-2 md:space-y-3">
                <li className="flex gap-3 text-sm md:text-base"><Check className="w-5 h-5 text-gold shrink-0" /> Discover your strengths and blind spots</li>
                <li className="flex gap-3 text-sm md:text-base"><Check className="w-5 h-5 text-gold shrink-0" /> Get personalized insights</li>
                <li className="flex gap-3 text-sm md:text-base"><Check className="w-5 h-5 text-gold shrink-0" /> No email required to see results</li>
              </ul>
              <Button size="lg" variant="primary" asChild className="w-full md:w-auto">
                <a href="https://viptl-self-assessment-website.vercel.app/" target="_blank" rel="noopener noreferrer">Take the Assessment →</a>
              </Button>
            </div>
            <div className="flex items-center justify-center order-1 md:order-2">
              <div className="w-48 h-48 md:w-full md:max-w-sm md:aspect-square bg-gradient-to-br from-gold/20 to-transparent rounded-full flex items-center justify-center border border-gold/20">
                <div className="text-center p-4 md:p-8">
                  <div className="text-4xl md:text-6xl font-bold text-gold mb-1 md:mb-2">VIP</div>
                  <div className="text-[10px] md:text-sm uppercase tracking-widest text-muted-foreground">Alignment Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. FREE E-BOOK */}
      <Section className="px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center max-w-6xl mx-auto">
          <div className="flex-1 relative aspect-[3/4] w-2/3 md:w-full max-w-sm md:max-w-lg bg-transparent flex items-center justify-center">
            <Image
              src="/images/Breaking Free Ebook Cover.png"
              alt="Breaking Free E-Book Cover"
              fill
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 66vw, 50vw"
            />
          </div>
          <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
            <span className="text-gold font-bold text-xs md:text-sm uppercase tracking-widest">Free Download</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Breaking Free: E-Book</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              The crossroads of midlife isn't a crisis — it's an invitation. 
              This comprehensive guide explores why you feel stuck and the three questions every man must answer to move forward.
            </p>
            <ul className="space-y-2 text-muted-foreground text-left mx-auto md:mx-0 max-w-sm md:max-w-none">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> Why midlife feels disorienting</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> Distinguishing success vs. fulfillment</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-gold shrink-0" /> First steps to alignment</li>
            </ul>
            <div className="pt-4 max-w-md mx-auto md:mx-0">
              <p className="text-sm text-muted-foreground mb-3">Enter your email for instant access:</p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input type="email" placeholder="Your email address" className="flex-1 bg-surface border border-border rounded-md px-4 py-3 sm:py-2 text-sm md:text-base focus:border-gold focus:outline-none transition-colors" />
                <Button className="w-full sm:w-auto">Download</Button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. VIDEO COURSE */}
      <Section variant="alternate" className="px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-4 md:space-y-6 order-2 md:order-1">
            <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border border-gold/20">Video Training</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Breaking Free! Course</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              10 modules. Real transformation. Your pace.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Go deeper than the book. Coach Wayne walks you through the complete VIP Framework with video lessons, 
              practical exercises, and a downloadable workbook.
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-4">
              <div className="bg-surface p-3 md:p-4 rounded-lg border border-border text-center md:text-left">
                <div className="text-xl md:text-2xl font-bold text-white mb-1">10</div>
                <div className="text-[10px] md:text-xs text-muted-foreground uppercase">Video Modules</div>
              </div>
              <div className="bg-surface p-3 md:p-4 rounded-lg border border-border text-center md:text-left">
                <div className="text-xl md:text-2xl font-bold text-white mb-1">$47</div>
                <div className="text-[10px] md:text-xs text-muted-foreground uppercase">Lifetime Access</div>
              </div>
            </div>
            <div className="pt-4 md:pt-6">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-gold text-gold hover:bg-gold hover:text-black">Get Instant Access →</Button>
            </div>
          </div>
          
          <div className="relative aspect-video bg-black rounded-xl border border-gold/20 overflow-hidden group cursor-pointer shadow-2xl order-1 md:order-2">
            {/* Placeholder Image for Course Thumbnail */}
            <Image 
              src="/images/Mountain Hill Silhouette.jpg" 
              alt="Course Thumbnail" 
              fill
              className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 p-4 rounded-full border border-gold/30 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <MonitorPlay className="w-10 h-10 md:w-16 md:h-16 text-gold" />
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <div className="text-white font-bold text-base md:text-lg">Module 1: The Awakening</div>
              <div className="text-white/70 text-xs md:text-sm">12:45 • Intro to VIP Framework</div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. NEWSLETTER */}
      <Section className="px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 md:mb-4">The Weekly Wisdom Newsletter</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Every Thursday, one insight to help you navigate career, relationships, and purpose. 
            Join 2,000+ men starting their week with clarity.
          </p>
        </div>

        <div className="flex justify-center mb-10 md:mb-16">
          <div className="w-full max-w-md bg-surface p-5 md:p-6 rounded-xl border border-border">
            <NewsletterForm 
                source="resources_page" 
                layout="column" 
                buttonLabel="Subscribe Free" 
                buttonVariant="default"
                className="gap-3 md:gap-4"
            />
            <p className="text-xs text-center text-muted-foreground mt-3 md:mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 md:mb-8 border-b border-border pb-4 gap-4 sm:gap-0">
          <h3 className="text-2xl font-serif font-bold">Latest Articles</h3>
          <Link href="/newsletter" className="text-gold text-sm hover:underline flex items-center gap-1">
            Browse Archive <FileText className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {newsletters.map((newsletter) => (
            <Link key={newsletter.id} href={`/newsletter/${newsletter.slug}`} className="group h-full">
              <Card className="h-full hover:border-gold transition-colors bg-surface flex flex-col">
                <div className="aspect-video bg-surface-elevated rounded-t-lg mb-4 flex items-center justify-center text-muted-foreground border-b border-border relative overflow-hidden group-hover:bg-surface-elevated/80 transition-colors">
                  <FileText className="w-12 h-12 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300" />
                </div>
                <CardHeader>
                  <div className="text-[10px] font-bold text-gold uppercase tracking-wider mb-2">
                    {newsletter.category}
                  </div>
                  <CardTitle className="group-hover:text-gold transition-colors text-lg md:text-xl line-clamp-2">
                    {newsletter.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {new Date(newsletter.published_at!).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
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
