'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function seedDatabase() {
  const supabase = await createClient();
  const logs: string[] = [];

  try {
    // 1. Seed Newsletter Articles
    const articles = [
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

    for (const item of articles) {
      const { data: existing } = await supabase.from('newsletter_articles').select('id').eq('slug', item.slug).single();
      if (!existing) {
        const { error } = await supabase.from('newsletter_articles').insert(item);
        if (error) {
            console.error(`Error inserting article ${item.slug}:`, error);
            logs.push(`Error inserting article ${item.title}: ${error.message}`);
        } else {
            logs.push(`Created article: ${item.title}`);
        }
      } else {
        logs.push(`Skipped article (exists): ${item.title}`);
      }
    }

    // 2. Seed Testimonials
    const testimonials = [
      {
        client_name: "JAMES K.",
        client_title: "Business Owner",
        client_location: "Chicago",
        quote: "Wayne didn't let me hide behind my stories. Six months later, I'm a different man. Not because he told me who to be, but because he helped me remember who I already was.",
        is_featured: true,
        is_published: true,
        display_order: 1,
        has_video: true,
        category: 'general'
      },
      {
        client_name: "MARCUS T.",
        client_title: "Former VP of Operations",
        quote: "Wayne helped me see that I wasn't stuck—I was misaligned. My values had evolved but my life hadn't. Once I got clear, the path became obvious.",
        is_featured: false,
        is_published: true,
        display_order: 2,
        category: 'career'
      },
      {
        client_name: "DAVID R.",
        client_title: "Entrepreneur",
        quote: "Wayne doesn't tell you what to do—he helps you figure out who you are. The identity work we did gave me clarity I've never had before.",
        is_featured: false,
        is_published: true,
        display_order: 3,
        category: 'identity'
      },
      {
        client_name: "MICHAEL D.",
        client_title: "Financial Advisor",
        quote: "Even before I signed up, Wayne gave me more insight in 30 minutes than I'd gotten from months of trying to figure things out alone.",
        is_featured: false,
        is_published: true,
        display_order: 4,
        category: 'general'
      },
      {
        client_name: "Sarah M.",
        client_title: "Chief People Officer",
        quote: "Wayne's keynote was the highlight of our leadership retreat. Three months later, our executives are still referencing the VIP Framework.",
        is_featured: false,
        is_published: true,
        display_order: 5,
        category: 'speaking'
      },
      {
        client_name: "Robert T.",
        client_title: "Conference Director",
        quote: "We've hired dozens of speakers over the years. Wayne is the first one whose talk led to actual behavior change in our organization.",
        is_featured: false,
        is_published: true,
        display_order: 6,
        category: 'speaking'
      }
    ];

    for (const item of testimonials) {
      const { data: existing } = await supabase.from('testimonials')
        .select('id')
        .eq('client_name', item.client_name)
        .limit(1)
        .single();
        
      if (!existing) {
        const { error } = await supabase.from('testimonials').insert(item);
        if (error) {
             console.error(`Error inserting testimonial ${item.client_name}:`, error);
             logs.push(`Error inserting testimonial ${item.client_name}: ${error.message}`);
        } else {
             logs.push(`Created testimonial: ${item.client_name}`);
        }
      } else {
        logs.push(`Skipped testimonial (exists): ${item.client_name}`);
      }
    }

    // 3. Seed FAQs
    const faqs = [
        { 
          question: "How is this different from therapy?", 
          answer: "Therapy typically focuses on healing past trauma and addressing mental health conditions. Coaching focuses on moving forward—creating clarity, setting goals, and building the life you want. If you're dealing with clinical depression or trauma, I'd encourage therapy (and I can help you find a great one).",
          category: "coaching",
          display_order: 1
        },
        { 
          question: "I've tried coaching before and it didn't work. Why is this different?", 
          answer: "Most coaching is just 'expensive friendship' with no framework or accountability. I use the proven VIP Framework and I'm direct—I'll challenge your stories and excuses with compassion. If you're ready for deep work, this will be fundamentally different.",
          category: "coaching",
          display_order: 2
        },
        { 
          question: "How do sessions work?", 
          answer: "Sessions are 60 minutes via Zoom or phone. We follow a clear structure: check-in, core transformation work (VIP), and integration/action items. You also have email access between sessions for support.",
          category: "process",
          display_order: 3
        },
        { 
          question: "Why does coaching cost this much?", 
          answer: "The cost of staying stuck is far greater. What's it costing you right now to feel unfulfilled or misaligned? Most clients find that the career moves or relationship shifts they achieve within 90 days far exceed their investment.",
          category: "investment",
          display_order: 4
        },
        { 
          question: "What if I'm not 'stuck enough' to need coaching?", 
          answer: "You don't need to be in crisis. Some of my best work is with high-performers who want to go from 'good' to 'great.' If you have a sense that there's more for you, that's reason enough to talk.",
          category: "general",
          display_order: 5
        }
    ];

    for (const item of faqs) {
        const { data: existing } = await supabase.from('faqs').select('id').eq('question', item.question).single();
        if (!existing) {
            const { error } = await supabase.from('faqs').insert(item);
            if (error) {
                console.error(`Error inserting FAQ:`, error);
                logs.push(`Error inserting FAQ: ${error.message}`);
            } else {
                logs.push(`Created FAQ: ${item.question.substring(0, 20)}...`);
            }
        } else {
            logs.push(`Skipped FAQ (exists)`);
        }
    }

    // 4. Seed Coaching Packages
    const packages = [
        {
            name: "Silver Tier",
            slug: "silver",
            tagline: "Rapid Relief",
            description: "For men facing an immediate challenge who need fast, focused support to navigate through using the S.C.O.R.E. method.",
            price_per_session: 200,
            total_price: 800, // Assuming 4 sessions
            session_count: 4,
            duration_weeks: 4,
            features: JSON.stringify(["Up to 4 sessions (60 min)", "S.C.O.R.E. Rapid Assessment", "Immediate Action Plan", "Email support", "Bonus: 'Breaking Free' E-book"]),
            fast_action_price: 150,
            is_featured: false,
            badge_text: "Silver Tier",
            display_order: 1
        },
        {
            name: "Gold Tier",
            slug: "gold",
            tagline: "Career Breakthrough",
            description: "8-week intensive designed to help you find your Zone of Genius and make moves that align with your evolved values.",
            total_price: 2400,
            session_count: 8,
            duration_weeks: 8,
            features: JSON.stringify(["8 Weekly Sessions (60 min)", "VIP Career Assessment", "Zone of Genius ID", "Impact Statement Creation", "Priority Email Support", "Bonus: 'Five Years to Freedom'"]),
            fast_action_price: 2200,
            is_featured: true,
            badge_text: "Most Popular",
            display_order: 2
        },
        {
            name: "Platinum Tier",
            slug: "platinum",
            tagline: "Complete Transformation",
            description: "12-week comprehensive journey that addresses career, relationships, identity, and purpose. Permanent change.",
            total_price: 3600,
            session_count: 12,
            duration_weeks: 12,
            features: JSON.stringify(["12 Weekly Sessions (60 min)", "Full VIP Transformation Process", "Identity Reconstruction", "Limiting Belief Removal", "Priority Email Access", "Bonus: 3 E-books + Training"]),
            fast_action_price: 3300,
            is_featured: false,
            badge_text: "Platinum Tier",
            display_order: 3
        }
    ];

    for (const item of packages) {
        const { data: existing } = await supabase.from('coaching_packages').select('id').eq('slug', item.slug).single();
        if (!existing) {
            const { error } = await supabase.from('coaching_packages').insert(item);
            if (error) {
                console.error(`Error inserting package ${item.name}:`, error);
                logs.push(`Error inserting package ${item.name}: ${error.message}`);
            } else {
                logs.push(`Created package: ${item.name}`);
            }
        } else {
            logs.push(`Skipped package (exists): ${item.name}`);
        }
    }

    // 5. Seed Speaking Topics
    const topics = [
        {
            title: "Leadership by VIP",
            slug: "leadership-by-vip",
            description: "The best leaders don't just manage — they lead from alignment. This keynote introduces the VIP Framework as a leadership philosophy, helping executives lead from authenticity rather than just authority.",
            audience_type: "Corporate & Leadership",
            display_order: 1
        },
        {
            title: "Dear Father, From MVP to VIP",
            slug: "dear-father",
            description: "A powerful message about the cost of performance-based identity. Wayne invites men on a journey from being the \"Most Valuable Player\" to becoming a \"Very Important Person\" to those who matter most.",
            audience_type: "Community & Men",
            display_order: 2
        }
    ];

    for (const item of topics) {
        const { data: existing } = await supabase.from('speaking_topics').select('id').eq('slug', item.slug).single();
        if (!existing) {
            const { error } = await supabase.from('speaking_topics').insert(item);
            if (error) {
                console.error(`Error inserting topic ${item.title}:`, error);
                logs.push(`Error inserting topic ${item.title}: ${error.message}`);
            } else {
                logs.push(`Created topic: ${item.title}`);
            }
        } else {
            logs.push(`Skipped topic (exists): ${item.title}`);
        }
    }

    revalidatePath('/coaching');
    revalidatePath('/speaking');
    revalidatePath('/resources');
    revalidatePath('/newsletter');

    return { success: true, message: logs.join('\n') };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
