import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { NewsletterGrid } from "@/components/newsletter-grid";
import { CompactNewsletterForm } from "@/components/compact-newsletter-form";
import { cookies } from "next/headers";
import { formatCategoryList } from "@/lib/article-categories";
import { getSiteImageUrl } from "@/lib/site-images";

export const metadata = {
  title: "The Weekly Wisdom | VIP Transformative Living",
  description: "Insights for men who refuse to settle. Delivered weekly.",
};

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
    .from("newsletter_articles")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  const newsletters = newslettersResult || [];
  const latestArticle = newsletters.length > 0 ? newsletters[0] : null;
  const gridArticles =
    newsletters.length > 0
      ? newsletters.slice(1).map((article) => ({
          ...article,
          formattedDate: new Date(article.published_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        }))
      : [];

  const categories = [
    "All",
    "Career & Purpose",
    "Relationships & Legacy",
    "Identity & Confidence",
    "Mindset & Growth",
  ];

  const cookieStore = await cookies();
  const isSubscribed = cookieStore.get("vip_newsletter_subscribed")?.value === "true";

  const latestCoverImage = latestArticle?.featured_image_url
    ? getSiteImageUrl(latestArticle.featured_image_url)
    : null;

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-20">
      <section className="py-20 px-4 md:px-10 border-b border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-sans text-sm font-semibold tracking-[0.3em] uppercase text-[#D4AF37] mb-2">
              The Weekly Wisdom
            </h2>

            <Divider />

            <h1 className="font-serif text-2xl md:text-4xl text-[#F5F5F5] mb-3">
              Fresh perspective for men who refuse to settle.
            </h1>
            <p className="font-sans text-[15px] md:text-[17px] text-[#9CA3AF] mb-10">
              Every issue is practical, direct, and designed to move you forward.
            </p>
          </div>

          {latestArticle ? (
            <Link href={`/newsletter/${latestArticle.slug}`} className="block group">
              <div className="grid lg:grid-cols-[1.15fr_1fr] bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden transition-all duration-400 hover:border-[#3A3A3A] hover:shadow-2xl hover:shadow-black/40">
                <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto min-h-[260px] bg-[#1A1A1A]">
                  {latestCoverImage ? (
                    <img
                      src={latestCoverImage}
                      alt={latestArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
                      <span className="text-[#2A2A2A] font-serif text-5xl opacity-25">VIP</span>
                    </div>
                  )}
                </div>

                <div className="p-7 md:p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-5 text-xs uppercase tracking-[0.18em]">
                    <span className="inline-block bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] px-3 py-1 rounded-full font-semibold">
                      Latest Issue
                    </span>
                    <span className="text-[#6B7280]">
                      {new Date(latestArticle.published_at!).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-[#4B5563]">•</span>
                    <span className="text-[#6B7280]">{latestArticle.reading_time || "5 min read"}</span>
                  </div>

                  <div className="text-[11px] font-bold tracking-widest uppercase text-[#D4AF37] mb-4">
                    {formatCategoryList(latestArticle.category) || "Uncategorized"}
                  </div>

                  <h2 className="font-serif text-3xl md:text-[42px] text-[#F5F5F5] leading-tight mb-5 group-hover:text-white transition-colors">
                    {latestArticle.title}
                  </h2>

                  <p className="font-sans text-[16px] text-[#9CA3AF] leading-relaxed mb-7 line-clamp-3">
                    {latestArticle.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#D4AF37] group-hover:gap-3 transition-all">
                    Read this issue <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="text-center py-16 border border-[#2A2A2A] rounded-2xl bg-[#141414]">
              <h3 className="font-serif text-2xl text-[#F5F5F5] mb-3">No published newsletters yet</h3>
              <p className="text-[#9CA3AF]">The first issue is coming soon.</p>
            </div>
          )}

          {!isSubscribed ? (
            <div className="max-w-2xl mx-auto mt-12 text-center">
              <h3 className="font-serif text-3xl text-[#F5F5F5] mb-4">Get Weekly Wisdom by Email</h3>
              <p className="font-sans text-[16px] text-[#9CA3AF] mb-8">
                One practical insight every week. No spam. Unsubscribe anytime.
              </p>
              <CompactNewsletterForm source="newsletter_hero" className="mt-0" />
            </div>
          ) : (
            <p className="text-center mt-10 text-[#9CA3AF] font-sans">
              You&apos;re subscribed. New issues hit your inbox every Thursday.
            </p>
          )}
        </div>
      </section>

      <NewsletterGrid initialArticles={gridArticles} categories={categories} />

      {!isSubscribed && (
        <section className="bg-[#141414] py-20 px-4 md:px-16 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl text-[#F5F5F5] mb-4">Don&apos;t Miss an Issue</h2>
            <p className="font-sans text-[16px] text-[#9CA3AF] mb-8">
              Get The Weekly Wisdom delivered straight to your inbox.
              <br />
              Join 10,000+ men on the journey.
            </p>

            <CompactNewsletterForm source="newsletter_midpage" className="mt-8" />
          </div>
        </section>
      )}
    </div>
  );
}
