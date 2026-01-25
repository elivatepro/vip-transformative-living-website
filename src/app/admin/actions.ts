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
  category: z.enum(['Purpose', 'Identity', 'Values', 'Career', 'Relationships', 'Health', 'Finance', 'Mindset']),
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
  is_published: z.boolean().optional(),
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

const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  category: optionalString,
  display_order: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? 0 : num;
  }, z.number().int().nonnegative()),
  is_published: z.boolean().optional(),
});

const announcementSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  link_text: optionalString,
  link_url: optionalString,
  type: z.string().default('info'),
  is_active: z.boolean().optional(),
});

const speakingTopicSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  audience_type: optionalString,
  format: optionalString,
  display_order: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? 0 : num;
  }, z.number().int().nonnegative()),
  is_published: z.boolean().optional(),
});

const coachingPackageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  total_price: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? 0 : num;
  }, z.number().nonnegative().optional()),
  display_order: z.preprocess((val) => {
    const num = Number(val);
    return Number.isNaN(num) ? 0 : num;
  }, z.number().int().nonnegative()),
  is_published: z.boolean().optional(),
});

// --- Newsletters Actions ---

export async function createNewsletter(prevState: any, formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

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

  const { error } = await supabase.from('newsletter_articles').insert(payload);

  if (error) return { success: false, message: error.message };

  revalidatePath('/resources');
  revalidatePath('/admin/articles');
  redirect('/admin/articles');
}

export async function updateNewsletter(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

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

  const { error } = await supabase.from('newsletter_articles').update(payload).eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/resources');
  revalidatePath('/admin/articles');
  redirect('/admin/articles');
}

export async function deleteNewsletter(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const { error } = await supabase.from('newsletter_articles').delete().eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/resources');
  revalidatePath('/admin/articles');
  return { success: true };
}

// --- Testimonials Actions ---

export async function createTestimonial(prevState: any, formData: FormData) {
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

  const { error } = await supabase.from('testimonials').insert({
    ...result.data,
    title: result.data.title ?? null,
    quote: result.data.quote ?? null,
    video_url: result.data.video_url ?? null,
    photo_url: result.data.photo_url ?? null,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/admin/testimonials');
  redirect('/admin/testimonials');
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

  const { error } = await supabase.from('testimonials').update({
    ...result.data,
    title: result.data.title ?? null,
    quote: result.data.quote ?? null,
    video_url: result.data.video_url ?? null,
    photo_url: result.data.photo_url ?? null,
  }).eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/admin/testimonials');
  redirect('/admin/testimonials');
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const { error } = await supabase.from('testimonials').delete().eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/admin/testimonials');
  return { success: true };
}

// --- Events Actions ---

export async function createEvent(prevState: any, formData: FormData) {
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
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };

  const { error } = await supabase.from('events').insert({
    ...result.data,
    description: result.data.description ?? null,
    event_time: result.data.event_time ?? null,
    location: result.data.location ?? null,
    registration_url: result.data.registration_url ?? null,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath('/');
  revalidatePath('/admin/events');
  redirect('/admin/events');
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
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };

  const { error } = await supabase.from('events').update({
    ...result.data,
    description: result.data.description ?? null,
    event_time: result.data.event_time ?? null,
    location: result.data.location ?? null,
    registration_url: result.data.registration_url ?? null,
  }).eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/');
  revalidatePath('/admin/events');
  redirect('/admin/events');
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) return { success: false, message: error.message };
  revalidatePath('/');
  revalidatePath('/admin/events');
  return { success: true };
}

// --- FAQs Actions ---

export async function createFaq(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData = {
    question: formData.get('question'),
    answer: formData.get('answer'),
    category: formData.get('category'),
    display_order: formData.get('display_order'),
    is_published: formData.get('is_published') === 'on',
  };

  const result = faqSchema.safeParse(rawData);
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };

  const { error } = await supabase.from('faqs').insert({
    ...result.data,
    category: result.data.category ?? 'general',
  });

  if (error) return { success: false, message: error.message };

  revalidatePath('/coaching');
  revalidatePath('/admin/faqs');
  redirect('/admin/faqs');
}

export async function updateFaq(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData = {
    question: formData.get('question'),
    answer: formData.get('answer'),
    category: formData.get('category'),
    display_order: formData.get('display_order'),
    is_published: formData.get('is_published') === 'on',
  };

  const result = faqSchema.safeParse(rawData);
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };

  const { error } = await supabase.from('faqs').update({
    ...result.data,
    category: result.data.category ?? 'general',
  }).eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/coaching');
  revalidatePath('/admin/faqs');
  redirect('/admin/faqs');
}

export async function deleteFaq(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('faqs').delete().eq('id', id);
  if (error) return { success: false, message: error.message };
  revalidatePath('/coaching');
  revalidatePath('/admin/faqs');
  return { success: true };
}

// --- Announcements Actions ---

export async function createAnnouncement(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData = {
    message: formData.get('message'),
    link_text: formData.get('link_text'),
    link_url: formData.get('link_url'),
    type: formData.get('type'),
    is_active: formData.get('is_active') === 'on',
  };

  const result = announcementSchema.safeParse(rawData);
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };

  const { error } = await supabase.from('announcements').insert({
    ...result.data,
    link_text: result.data.link_text ?? null,
    link_url: result.data.link_url ?? null,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath('/');
  revalidatePath('/admin/announcements');
  redirect('/admin/announcements');
}

export async function updateAnnouncement(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData = {
    message: formData.get('message'),
    link_text: formData.get('link_text'),
    link_url: formData.get('link_url'),
    type: formData.get('type'),
    is_active: formData.get('is_active') === 'on',
  };

  const result = announcementSchema.safeParse(rawData);
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };

  const { error } = await supabase.from('announcements').update({
    ...result.data,
    link_text: result.data.link_text ?? null,
    link_url: result.data.link_url ?? null,
  }).eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/');
  revalidatePath('/admin/announcements');
  redirect('/admin/announcements');
}

export async function deleteAnnouncement(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('announcements').delete().eq('id', id);
  if (error) return { success: false, message: error.message };
  revalidatePath('/');
  revalidatePath('/admin/announcements');
  return { success: true };
}

// --- Speaking Topics Actions ---

export async function createSpeakingTopic(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    audience_type: formData.get('audience_type'),
    format: formData.get('format'),
    display_order: formData.get('display_order'),
    is_published: formData.get('is_published') === 'on',
  };

  const result = speakingTopicSchema.safeParse(rawData);
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };

  const { error } = await supabase.from('speaking_topics').insert({
    ...result.data,
    audience_type: result.data.audience_type ?? null,
    format: result.data.format ?? null,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath('/speaking');
  revalidatePath('/admin/speaking');
  redirect('/admin/speaking');
}

export async function updateSpeakingTopic(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    audience_type: formData.get('audience_type'),
    format: formData.get('format'),
    display_order: formData.get('display_order'),
    is_published: formData.get('is_published') === 'on',
  };

  const result = speakingTopicSchema.safeParse(rawData);
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };

  const { error } = await supabase.from('speaking_topics').update({
    ...result.data,
    audience_type: result.data.audience_type ?? null,
    format: result.data.format ?? null,
  }).eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/speaking');
  revalidatePath('/admin/speaking');
  redirect('/admin/speaking');
}

export async function deleteSpeakingTopic(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('speaking_topics').delete().eq('id', id);
  if (error) return { success: false, message: error.message };
  revalidatePath('/speaking');
  revalidatePath('/admin/speaking');
  return { success: true };
}

// --- Coaching Packages Actions ---

export async function createCoachingPackage(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    total_price: formData.get('total_price'),
    display_order: formData.get('display_order'),
    is_published: formData.get('is_published') === 'on',
  };

  const result = coachingPackageSchema.safeParse(rawData);
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };

  const { error } = await supabase.from('coaching_packages').insert({
    ...result.data,
    total_price: result.data.total_price ?? null,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath('/coaching');
  revalidatePath('/admin/packages');
  redirect('/admin/packages');
}

export async function updateCoachingPackage(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    total_price: formData.get('total_price'),
    display_order: formData.get('display_order'),
    is_published: formData.get('is_published') === 'on',
  };

  const result = coachingPackageSchema.safeParse(rawData);
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };

  const { error } = await supabase.from('coaching_packages').update({
    ...result.data,
    total_price: result.data.total_price ?? null,
  }).eq('id', id);

  if (error) return { success: false, message: error.message };

  revalidatePath('/coaching');
  revalidatePath('/admin/packages');
  redirect('/admin/packages');
}

export async function deleteCoachingPackage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('coaching_packages').delete().eq('id', id);
  if (error) return { success: false, message: error.message };
  revalidatePath('/coaching');
  revalidatePath('/admin/packages');
  return { success: true };
}
