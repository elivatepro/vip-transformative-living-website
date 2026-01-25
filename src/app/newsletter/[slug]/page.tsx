import { getNewsletterBySlug, getNewsletters } from "@/lib/api";
import { CompactNewsletterForm } from "@/components/compact-newsletter-form";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

// Decorative Divider Component
function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <div className="w-2 h-2 bg-[#D4AF37] rotate-45" />
      <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    </div>
  );
}

// Share Button Component
function ShareButton({ icon, label }: { icon: string, label: string }) {
    return (
        <button 
            className="w-12 h-12 rounded-full bg-[#141414] border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300 group"
            aria-label={`Share on ${label}`}
        >
            <span className="font-serif italic">{icon}</span>
        </button>
    )
}

export default async function NewsletterArticlePage({ params }: PageProps) {
  const slug = (await params).slug;
  const newsletter = await getNewsletterBySlug(slug);
  const allNewsletters = await getNewsletters();

  // Handle mock data for development if needed, or just 404
  const isMock = !newsletter && (slug === 'midlife-myth' || slug === 'silent-struggles');
  const displayData = isMock ? {
    id: 'mock-id',
    slug: slug,
    title: slug === 'midlife-myth' ? 'The Midlife Myth: Why You Aren’t Done Yet' : 'Silent Struggles',
    content: `
      <p>This is placeholder content for the newsletter. In a real scenario, this would be rich HTML content stored in the database.</p>
      <h2>Why Midlife is an Opportunity</h2>
      <p>Many men view this stage as a decline. But what if it's actually an elevation?</p>
      <blockquote>The question isn't whether you're stuck. The question is what you're pretending not to know.</blockquote>
      <p>When you stop playing by everyone else's rules, you finally have the freedom to write your own.</p>
      <h3>The Three Pillars of Reinvention</h3>
      <ul>
        <li>Acceptance of where you are</li>
        <li>Vision for where you want to go</li>
        <li>Courage to take the first step</li>
      </ul>
      <p>It's time to stop waiting for permission.</p>
    `,
    published_at: new Date().toISOString(),
    category: 'Purpose',
    reading_time: '5 min',
    image_url: null,
    excerpt: 'This is a mock excerpt.'
  } : newsletter;

  if (!displayData) {
    notFound();
  }

  // Related Articles Logic
  const otherArticles = allNewsletters.filter((n: any) => n.slug !== slug);
  const relatedByCategory = otherArticles.filter((n: any) => n.category === displayData.category);
  const remainingArticles = otherArticles.filter((n: any) => n.category !== displayData.category);
  
  // Combine: Category matches first, then recent others, max 3
  const relatedArticles = [...relatedByCategory, ...remainingArticles].slice(0, 3);

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-20">
      
      {/* 2. ARTICLE HEADER */}
      <header className="bg-[#0A0A0A] px-4 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
            <div className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-6">
                {displayData.category}
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] text-[#F5F5F5] leading-[1.1] mb-8 max-w-3xl mx-auto">
                {displayData.title}
            </h1>

            <Divider />

            <div className="font-sans text-[15px] text-[#6B7280]">
                {new Date(displayData.published_at!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                <span className="mx-3">·</span>
                {displayData.reading_time || "5 min read"}
            </div>
        </div>
      </header>

      {/* Featured Image */}
      {displayData.image_url && (
        <div className="max-w-[1000px] mx-auto px-4 md:px-16 mb-16">
            <div className="aspect-video rounded-2xl overflow-hidden bg-[#141414]">
                <img 
                    src={displayData.image_url} 
                    alt={displayData.title} 
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
      )}

      {/* 3. ARTICLE CONTENT */}
      <article className="px-6 pb-20">
        <div className="max-w-[720px] mx-auto">
            {/* Rich Text Content */}
            <div 
                className="
                    font-sans text-lg text-[#D1D5DB] leading-[1.8]
                    prose-headings:font-serif prose-headings:text-[#F5F5F5] prose-headings:font-normal
                    prose-h2:text-[28px] prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:text-[22px] prose-h3:font-sans prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-5
                    prose-p:mb-7
                    prose-strong:text-white prose-strong:font-semibold
                    prose-a:text-[#D4AF37] prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-[#E5C35A]
                    prose-blockquote:border-l-2 prose-blockquote:border-[#D4AF37] prose-blockquote:pl-8 prose-blockquote:py-2 prose-blockquote:my-10 prose-blockquote:bg-[#141414]/50 prose-blockquote:italic prose-blockquote:font-serif prose-blockquote:text-[20px] prose-blockquote:text-[#E5E7EB]
                    prose-ul:pl-6 prose-ul:mb-7 prose-ul:list-disc prose-li:mb-2 marker:prose-li:text-[#D4AF37]
                    prose-ol:pl-6 prose-ol:mb-7 prose-ol:list-decimal prose-li:mb-2 marker:prose-li:text-[#D4AF37] marker:prose-li:font-semibold
                    prose-hr:border-[#2A2A2A] prose-hr:my-12
                    prose-img:rounded-xl prose-img:my-8
                "
                dangerouslySetInnerHTML={{ __html: displayData.content }} 
            />
        </div>
      </article>

      {/* 4. ARTICLE FOOTER */}
      <footer className="max-w-[720px] mx-auto px-6 pb-20">
        
        {/* Author Card */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-8 flex flex-col sm:flex-row gap-6 items-start mb-12">
            <div className="w-20 h-20 rounded-full bg-[#1A1A1A] overflow-hidden flex-shrink-0 border border-[#2A2A2A]">
                {/* Placeholder for Author Photo */}
                <img src="/images/Mr Wayne Backgroundless.png" alt="Coach Wayne" className="w-full h-full object-cover bg-[#0A0A0A]" />
            </div>
            <div>
                <div className="text-xs font-bold tracking-widest uppercase text-[#6B7280] mb-1">Written by</div>
                <div className="font-serif text-xl text-[#F5F5F5] mb-2">Coach Wayne Dawson</div>
                <p className="text-[15px] text-[#9CA3AF] leading-relaxed mb-3">
                    Transformational coach helping men discover their values, identity, and purpose for 25+ years.
                </p>
                <Link href="/about" className="text-sm font-medium text-[#D4AF37] hover:underline">
                    Learn More About Wayne →
                </Link>
            </div>
        </div>

        {/* Share Section */}
        <div className="border-t border-[#2A2A2A] pt-12 text-center">
            <p className="text-sm text-[#6B7280] mb-6">Share this article</p>
            <div className="flex justify-center gap-4">
                <ShareButton icon="Tw" label="Twitter" />
                <ShareButton icon="Li" label="LinkedIn" />
                <ShareButton icon="Fb" label="Facebook" />
            </div>
        </div>
      </footer>

      {/* 5. NEWSLETTER CTA */}
      <section className="bg-[#141414] py-20 px-4 text-center relative overflow-hidden border-t border-[#1A1A1A]">
         {/* Gold Glow Background */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl text-[#F5F5F5] mb-4">Don't Miss an Issue</h2>
            <p className="font-sans text-[16px] text-[#9CA3AF] mb-8">
                Get The Weekly Wisdom delivered straight to your inbox.<br />
                Join 10,000+ men on the journey.
            </p>
            <CompactNewsletterForm source="article_footer" />
        </div>
      </section>

      {/* 6. RELATED ARTICLES */}
      {relatedArticles.length > 0 && (
        <section className="bg-[#0A0A0A] py-20 px-4 md:px-16 border-t border-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">
                <div className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#F5F5F5] mb-12 text-center">
                    Keep Reading
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {relatedArticles.map((article: any) => (
                         <Link key={article.id} href={`/newsletter/${article.slug}`} className="group block h-full">
                         <div className="h-full bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#3A3A3A] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50">
                           {/* Image Container */}
                           <div className="relative aspect-[16/10] overflow-hidden bg-[#1A1A1A]">
                             {article.image_url ? (
                               <img 
                                 src={article.image_url} 
                                 alt={article.title}
                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                               />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
                                   <span className="text-[#2A2A2A] font-serif text-4xl opacity-20">VIP</span>
                               </div>
                             )}
                           </div>
   
                           {/* Content */}
                           <div className="p-6">
                             <div className="text-[11px] font-bold tracking-widest uppercase text-[#D4AF37] mb-3">
                               {article.category}
                             </div>
                             
                             <h3 className="font-serif text-xl text-[#F5F5F5] leading-snug mb-3 line-clamp-2 group-hover:text-white transition-colors">
                               {article.title}
                             </h3>
                             
                             <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4 line-clamp-2">
                               {article.excerpt}
                             </p>
                             
                             <div className="flex items-center gap-3 text-[13px] text-[#6B7280]">
                               <span>{new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                               <span className="w-1 h-1 rounded-full bg-[#4B5563]" />
                               <span>{article.reading_time || "5 min"}</span>
                             </div>
                           </div>
                         </div>
                       </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/newsletter" className="inline-block px-8 py-4 rounded-lg border border-[#2A2A2A] text-[#9CA3AF] font-semibold text-sm hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300">
                        View All Articles
                    </Link>
                </div>
            </div>
        </section>
      )}

    </div>
  );
}
