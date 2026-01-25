import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { NewsletterGrid } from "@/components/newsletter-grid";
import { CompactNewsletterForm } from "@/components/compact-newsletter-form";

export const metadata = {
  title: "The Weekly Wisdom | VIP Transformative Living",
  description: "Insights for men who refuse to settle. Delivered weekly.",
};

// Decorative Divider Component
function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <div className="w-2 h-2 bg-[#D4AF37] rotate-45" />
      <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    </div>
  );
}

export default async function NewsletterPage() {
  const supabase = await createClient();
  const { data: newslettersResult } = await supabase
    .from('newsletter_articles')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  const newsletters = newslettersResult || [];
  const latestArticle = newsletters.length > 0 ? newsletters[0] : null;
  const gridArticles = newsletters.length > 0 ? newsletters.slice(1).map(article => ({
    ...article,
    formattedDate: new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })) : [];

  const categories = [
    "All", 
    "Career & Purpose", 
    "Relationships & Legacy", 
    "Identity & Confidence", 
    "Mindset & Growth"
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-20">
      
      {/* 1. PAGE HERO */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Subtle noise texture overlay if needed, handled by global CSS or utility */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="font-sans text-sm font-semibold tracking-[0.3em] uppercase text-[#D4AF37] mb-2">
                The Weekly Wisdom
            </h2>
            
            <Divider />

            <h1 className="font-serif text-[24px] italic text-[#F5F5F5] mb-2 font-normal">
                Insights for men who refuse to settle.
            </h1>
            <p className="font-sans text-[15px] text-[#9CA3AF] mb-8">
                Delivered weekly. Read by 10,000+ men worldwide.
            </p>

            <CompactNewsletterForm source="newsletter_hero" className="mt-8" />

            <p className="text-[13px] text-[#6B7280] mt-3">
                Join free. Unsubscribe anytime.
            </p>
        </div>
      </section>

      {/* 2. FEATURED LATEST ARTICLE */}
      {latestArticle && (
        <section className="bg-[#141414] py-20 px-4 md:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-6">
                    Latest
                </div>

                <Link href={`/newsletter/${latestArticle.slug}`} className="block group">
                    <div className="grid md:grid-cols-[1.2fr_1fr] bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl overflow-hidden transition-all duration-400 hover:border-[#3A3A3A] hover:shadow-2xl hover:shadow-black/40">
                        {/* Image Side */}
                        <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto">
                            {latestArticle.image_url ? (
                                <img 
                                    src={latestArticle.image_url} 
                                    alt={latestArticle.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
                                    <span className="text-4xl text-[#333] font-serif">VIP</span>
                                </div>
                            )}
                            {/* Gradient Fade to content */}
                            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#0A0A0A] hidden md:block" />
                        </div>

                        {/* Content Side */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <span className="inline-block font-sans text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1.5 rounded mb-5 w-fit">
                                {latestArticle.category}
                            </span>
                            
                            <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F5] leading-tight mb-5 group-hover:text-white transition-colors">
                                {latestArticle.title}
                            </h2>

                            <div className="w-10 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent mb-5" />

                            <p className="font-sans text-[16px] text-[#9CA3AF] leading-relaxed mb-6 line-clamp-3">
                                {latestArticle.excerpt}
                            </p>

                            <div className="flex items-center gap-4 font-sans text-sm text-[#6B7280] mb-6">
                                <span>{latestArticle.reading_time || "5 min read"}</span>
                                <span className="w-1 h-1 bg-[#4B5563] rounded-full" />
                                <span>{new Date(latestArticle.published_at!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>

                            <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#D4AF37] group-hover:gap-3 transition-all">
                                Read Article <span className="text-lg">→</span>
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
      )}

      {/* 3. CATEGORY FILTER & 4. ARTICLE GRID */}
      {/* We pass the gridArticles (remaining) to the grid component */}
      <NewsletterGrid initialArticles={gridArticles} categories={categories} />

      {/* 5. MID-PAGE NEWSLETTER CTA */}
      <section className="bg-[#141414] py-20 px-4 md:px-16 text-center relative overflow-hidden">
        {/* Gold Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl text-[#F5F5F5] mb-4">Don't Miss an Issue</h2>
            <p className="font-sans text-[16px] text-[#9CA3AF] mb-8">
                Get The Weekly Wisdom delivered straight to your inbox.<br />
                Join 10,000+ men on the journey.
            </p>

            <CompactNewsletterForm source="newsletter_midpage" className="mt-8" />
        </div>
      </section>

    </div>
  );
}
