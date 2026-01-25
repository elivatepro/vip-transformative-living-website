'use server';

import { createClient } from '@/lib/supabase-server';

export async function seedDatabase() {
  const supabase = await createClient();
  const logs: string[] = [];

  try {
    // 1. Seed Newsletters
    const newsletters = [
      {
        title: 'The Midlife Myth: Why You Aren’t Done Yet',
        excerpt: 'Society tells us midlife is a crisis. I call it a chrysalis. Here is why your best years are actually ahead of you.',
        slug: 'midlife-myth',
        category: 'Purpose',
        content: 'Society tells us midlife is a crisis. I call it a chrysalis. Here is why your best years are actually ahead of you. (Full content to be added)',
        is_published: true,
        published_at: '2025-12-15T10:00:00Z',
      },
      {
        title: 'Silent Struggles: Men and Vulnerability',
        excerpt: 'Why opening up doesn’t make you weak, and how to find safe spaces to process the weight you carry.',
        slug: 'silent-struggles',
        category: 'Health',
        content: 'Why opening up doesn’t make you weak, and how to find safe spaces to process the weight you carry. (Full content to be added)',
        is_published: true,
        published_at: '2025-11-20T10:00:00Z',
      }
    ];

    for (const item of newsletters) {
      const { data: existing } = await supabase.from('newsletters').select('id').eq('slug', item.slug).single();
      if (!existing) {
        const { error } = await supabase.from('newsletters').insert(item);
        if (error) throw new Error(`Error inserting newsletter ${item.slug}: ${error.message}`);
        logs.push(`Created newsletter: ${item.title}`);
      } else {
        logs.push(`Skipped newsletter (exists): ${item.title}`);
      }
    }

    // 2. Seed Testimonials
    const testimonials = [
      {
        client_name: "JAMES K.",
        title: "Business Owner, Chicago",
        quote: "Wayne didn't let me hide behind my stories. Six months later, I'm a different man. Not because he told me who to be, but because he helped me remember who I already was.",
        is_featured: true,
        is_visible: true,
        display_order: 1
      },
      {
        client_name: "MARCUS T.",
        title: "Former VP of Operations",
        quote: "Wayne helped me see that I wasn't stuck—I was misaligned. My values had evolved but my life hadn't. Once I got clear, the path became obvious.",
        is_featured: false,
        is_visible: true,
        display_order: 2
      },
      {
        client_name: "DAVID R.",
        title: "Entrepreneur",
        quote: "Wayne doesn't tell you what to do—he helps you figure out who you are. The identity work we did gave me clarity I've never had before.",
        is_featured: false,
        is_visible: true,
        display_order: 3
      },
      {
        client_name: "MICHAEL D.",
        title: "Financial Advisor",
        quote: "Even before I signed up, Wayne gave me more insight in 30 minutes than I'd gotten from months of trying to figure things out alone.",
        is_featured: false,
        is_visible: true,
        display_order: 4
      },
      {
        client_name: "Sarah M.",
        title: "Chief People Officer",
        quote: "Wayne's keynote was the highlight of our leadership retreat. Three months later, our executives are still referencing the VIP Framework.",
        is_featured: false,
        is_visible: true,
        display_order: 5
      },
      {
        client_name: "Robert T.",
        title: "Conference Director",
        quote: "We've hired dozens of speakers over the years. Wayne is the first one whose talk led to actual behavior change in our organization.",
        is_featured: false,
        is_visible: true,
        display_order: 6
      }
    ];

    for (const item of testimonials) {
      // Check duplicate by client_name + quote
      const { data: existing } = await supabase.from('testimonials')
        .select('id')
        .eq('client_name', item.client_name)
        .limit(1)
        .single();
        
      if (!existing) {
        const { error } = await supabase.from('testimonials').insert(item);
        if (error) throw new Error(`Error inserting testimonial ${item.client_name}: ${error.message}`);
        logs.push(`Created testimonial: ${item.client_name}`);
      } else {
        logs.push(`Skipped testimonial (exists): ${item.client_name}`);
      }
    }

    return { success: true, message: logs.join('\n') };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
