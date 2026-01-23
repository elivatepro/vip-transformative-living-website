import { getNewsletterBySlug } from "@/lib/api";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export default async function NewsletterPage({ params }: PageProps) {
  const slug = (await params).slug;
  const newsletter = await getNewsletterBySlug(slug);

  // Mock for development if DB is empty
  const isMock = !newsletter && (slug === 'midlife-myth' || slug === 'silent-struggles');
  const displayData = isMock ? {
    title: slug === 'midlife-myth' ? 'The Midlife Myth: Why You Aren’t Done Yet' : 'Silent Struggles',
    content: `
      <p>This is placeholder content for the newsletter. In a real scenario, this would be rich HTML content stored in the database.</p>
      <h3>Why Midlife is an Opportunity</h3>
      <p>Many men view this stage as a decline. But what if it's actually an elevation?</p>
      <p>When you stop playing by everyone else's rules, you finally have the freedom to write your own.</p>
    `,
    published_at: new Date().toISOString(),
    category: 'Purpose'
  } : newsletter;

  if (!displayData) {
    notFound();
  }

  return (
    <div className="pt-24 pb-16">
      <Section containerSize="narrow">
        <Link href="/resources" className="inline-flex items-center text-muted-foreground hover:text-gold mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
        </Link>
        
        <article className="prose prose-invert prose-lg mx-auto">
          <div className="mb-8 border-b border-border pb-8">
            <span className="text-gold font-bold tracking-widest uppercase text-sm">
              {displayData.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl mt-4 mb-4 leading-tight">
              {displayData.title}
            </h1>
            <time className="text-muted-foreground block">
              {new Date(displayData.published_at!).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </time>
          </div>
          
          <div dangerouslySetInnerHTML={{ __html: displayData.content }} />
          
        </article>
        
        <div className="mt-16 pt-8 border-t border-border text-center">
          <h3 className="font-serif text-2xl mb-4">Enjoyed this article?</h3>
          <p className="text-muted-foreground mb-6">Join the VIP Newsletter to get weekly insights delivered to your inbox.</p>
          <Button>Subscribe Now</Button>
        </div>
      </Section>
    </div>
  );
}
