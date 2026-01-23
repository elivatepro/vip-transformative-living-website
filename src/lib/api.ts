import { createClient } from '@/lib/supabase-server';

export async function getNewsletters() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('newsletters')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching newsletters:', error);
    return [];
  }
  
  return data;
}

export async function getNewsletterBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('newsletters')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) return null;
  return data;
}

export async function getTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_visible', true)
    .order('display_order', { ascending: true });
    
  if (error) return [];
  return data;
}
