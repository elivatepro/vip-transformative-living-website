'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase-server';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string().optional() // Honeypot
});

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional().default('website'),
});

import { cookies } from 'next/headers';

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    source: formData.get('source') || 'website',
  };

  const result = subscribeSchema.safeParse(data);

  if (!result.success) {
    const errorMsg = result.error.flatten().fieldErrors.email?.[0] || 'Invalid input';
    return { success: false, message: errorMsg };
  }

  try {
    const supabase = await createClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('subscribers')
      .select('id, is_active')
      .eq('email', result.data.email)
      .single();

    if (existing) {
      if (existing.is_active) {
        // Set cookie even if already subscribed, to update client state
        (await cookies()).set('vip_newsletter_subscribed', 'true', { 
            maxAge: 60 * 60 * 24 * 365, // 1 year
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
        return { success: true, message: 'You are already subscribed!' };
      } else {
        // Reactivate
        const { error } = await supabase
          .from('subscribers')
          .update({ is_active: true, unsubscribed_at: null })
          .eq('id', existing.id);
        
        if (error) {
          console.error('Subscription reactivation error:', error);
          return { success: false, message: 'Could not reactivate subscription.' };
        }
        (await cookies()).set('vip_newsletter_subscribed', 'true', { 
            maxAge: 60 * 60 * 24 * 365, // 1 year
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
        return { success: true, message: 'Welcome back! You have been resubscribed.' };
      }
    }

    const { error } = await supabase
      .from('subscribers')
      .insert({
        email: result.data.email,
        source: result.data.source,
        is_active: true,
      });

    if (error) {
      console.error('Subscription error:', error);
      // Handle unique constraint violation if race condition occurred
      if (error.code === '23505') { // unique_violation
        (await cookies()).set('vip_newsletter_subscribed', 'true', { 
            maxAge: 60 * 60 * 24 * 365, // 1 year
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
        return { success: true, message: 'You are already subscribed!' };
      }
      return { success: false, message: 'Something went wrong. Please try again.' };
    }

    (await cookies()).set('vip_newsletter_subscribed', 'true', { 
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });

    return { success: true, message: 'Thank you for subscribing!' };
  } catch (error) {
    console.error('Subscription unexpected error:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}

export async function submitContactForm(prevState: any, formData: FormData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
    website: formData.get('website'),
  };

  // Honeypot check
  if (data.website) {
    return { success: true, message: 'Message sent!' };
  }

  const result = schema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    // Split name for CRM compatibility
    const fullName = result.data.name;
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Send to GHL Webhook
    if (process.env.GHL_WEBHOOK_URL) {
      await fetch(process.env.GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: result.data.email,
          phone: result.data.phone,
          message: result.data.message,
          source: 'website_contact_form',
          tags: ['website_lead']
        })
      });
    } else {
      console.warn('GHL_WEBHOOK_URL not defined, skipping webhook send');
    }

    return { success: true, message: 'Thank you! Your message has been received.' };
  } catch (error) {
    console.error('Contact form error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}
