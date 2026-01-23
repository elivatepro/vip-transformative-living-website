'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// --- Newsletters ---

const newsletterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  category: z.enum(['Purpose', 'Identity', 'Values', 'Career', 'Relationships', 'Health', 'Finance']),
  is_published: z.boolean().optional(),
});

const optionalString = z.preprocess((value) => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string' && value.trim() === '') return null;
  return value;
}, z.string().trim().nullable().optional());

const testimonialSchema = z.object({
  client_name: z.string().min(1, 'Client name is required'),
  title: optionalString,
  quote: optionalString,
  video_url: optionalString,
  photo_url: optionalString,
  is_featured: z.boolean().optional(),
  is_visible: z.boolean().optional(),
  display_order: z.preprocess((val) => {
    if (val === null || val === undefined || val === '') return 0;
    const num = Number(val);
    return Number.isNaN(num) ? 0 : num;
  }, z.number().int().nonnegative()),
});

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: optionalString,
  event_date: z.string().min(1, 'Event date is required'),
  event_time: optionalString,
  location: optionalString,
  registration_url: optionalString,
  is_active: z.boolean().optional(),
});

export async function createNewsletter(prevState: any, formData: FormData) {
  const supabase = await createClient();
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Unauthorized' };
  }

  const rawData = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    content: formData.get('content'),
    excerpt: formData.get('excerpt'),
    category: formData.get('category'),
    is_published: formData.get('is_published') === 'on',
  };

  const result = newsletterSchema.safeParse(rawData);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const payload = {
    ...result.data,
    published_at: result.data.is_published ? new Date().toISOString() : null,
  };

  const { error } = await supabase
    .from('newsletters')
    .insert(payload);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath('/resources');
  revalidatePath('/admin/newsletters');
  redirect('/admin/newsletters');
}

export async function deleteNewsletter(id: string) {
  const supabase = await createClient();
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const { error } = await supabase
    .from('newsletters')
    .delete()
    .eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/resources');
  revalidatePath('/admin/newsletters');
  return { success: true };
}

export async function updateNewsletter(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Unauthorized' };
  }

  const rawData = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    content: formData.get('content'),
    excerpt: formData.get('excerpt'),
    category: formData.get('category'),
    is_published: formData.get('is_published') === 'on',
  };

  const result = newsletterSchema.safeParse(rawData);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const previousPublishedAt = formData.get('published_at');

  const payload = {
    ...result.data,
    published_at: result.data.is_published
      ? (typeof previousPublishedAt === 'string' && previousPublishedAt.length > 0
        ? previousPublishedAt
        : new Date().toISOString())
      : null,
  };

  const { error } = await supabase
    .from('newsletters')
    .update(payload)
    .eq('id', id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath('/resources');
  revalidatePath('/admin/newsletters');
  redirect('/admin/newsletters');
}

// --- Testimonials ---

export async function createTestimonial(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Unauthorized' };
  }

  const rawData = {
    client_name: formData.get('client_name'),
    title: formData.get('title'),
    quote: formData.get('quote'),
    video_url: formData.get('video_url'),
    photo_url: formData.get('photo_url'),
    is_featured: formData.get('is_featured') === 'on',
    is_visible: formData.get('is_visible') !== null ? formData.get('is_visible') === 'on' : true,
    display_order: formData.get('display_order'),
  };

  const result = testimonialSchema.safeParse(rawData);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const { error } = await supabase
    .from('testimonials')
    .insert({
      ...result.data,
      // Normalize nullable fields for Supabase
      title: result.data.title ?? null,
      quote: result.data.quote ?? null,
      video_url: result.data.video_url ?? null,
      photo_url: result.data.photo_url ?? null,
    });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/admin/testimonials');
  redirect('/admin/testimonials');
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/admin/testimonials');
  return { success: true };
}

export async function updateTestimonial(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData = {
    client_name: formData.get('client_name'),
    title: formData.get('title'),
    quote: formData.get('quote'),
    video_url: formData.get('video_url'),
    photo_url: formData.get('photo_url'),
    is_featured: formData.get('is_featured') === 'on',
    is_visible: formData.get('is_visible') !== null ? formData.get('is_visible') === 'on' : true,
    display_order: formData.get('display_order'),
  };

  const result = testimonialSchema.safeParse(rawData);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const { error } = await supabase
    .from('testimonials')
    .update({
      ...result.data,
      title: result.data.title ?? null,
      quote: result.data.quote ?? null,
      video_url: result.data.video_url ?? null,
      photo_url: result.data.photo_url ?? null,
    })
    .eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/admin/testimonials');
  redirect('/admin/testimonials');
}

// --- Events ---

export async function createEvent(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Unauthorized' };
  }

  const rawData = {
    title: formData.get('title'),
    description: formData.get('description'),
    event_date: formData.get('event_date'),
    event_time: formData.get('event_time'),
    location: formData.get('location'),
    registration_url: formData.get('registration_url'),
    is_active: formData.get('is_active') === 'on',
  };

  const result = eventSchema.safeParse(rawData);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const { error } = await supabase
    .from('events')
    .insert({
      ...result.data,
      description: result.data.description ?? null,
      event_time: result.data.event_time ?? null,
      location: result.data.location ?? null,
      registration_url: result.data.registration_url ?? null,
    });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath('/events');
  revalidatePath('/admin/events');
  redirect('/admin/events');
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/events');
  revalidatePath('/admin/events');
  return { success: true };
}

export async function updateEvent(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData = {
    title: formData.get('title'),
    description: formData.get('description'),
    event_date: formData.get('event_date'),
    event_time: formData.get('event_time'),
    location: formData.get('location'),
    registration_url: formData.get('registration_url'),
    is_active: formData.get('is_active') === 'on',
  };

  const result = eventSchema.safeParse(rawData);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const { error } = await supabase
    .from('events')
    .update({
      ...result.data,
      description: result.data.description ?? null,
      event_time: result.data.event_time ?? null,
      location: result.data.location ?? null,
      registration_url: result.data.registration_url ?? null,
    })
    .eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/events');
  revalidatePath('/admin/events');
  redirect('/admin/events');
}
