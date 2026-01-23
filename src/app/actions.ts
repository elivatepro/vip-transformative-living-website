'use server';

import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string().optional() // Honeypot
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const data = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
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
    // Send to GHL Webhook
    if (process.env.GHL_WEBHOOK_URL) {
      await fetch(process.env.GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...result.data,
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
