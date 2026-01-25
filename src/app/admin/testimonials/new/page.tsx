'use client';

import { useActionState, useState } from 'react';
import { createTestimonial } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function SubmitButton() {
  return (
    <Button type="submit" className="w-full sm:w-auto">Save Testimonial</Button>
  );
}

export default function NewTestimonialPage() {
  const [state, formAction] = useActionState(createTestimonial, null);
  const [videoUrl, setVideoUrl] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Social proof</p>
        <h1 className="text-3xl font-serif font-bold">Add Testimonial</h1>
        <p className="text-muted-foreground">Capture a short quote or link to a video testimonial.</p>
      </div>

      <form action={formAction} className="space-y-6 bg-surface p-8 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-sm font-medium">Client name</label>
          <Input name="client_name" placeholder="e.g., Jonathan M." required />
          {state?.errors?.client_name && <p className="text-red-500 text-xs">{state.errors.client_name}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title / Role</label>
            <Input name="title" placeholder="Actor, Fire Chief, Founder..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Display order</label>
            <Input name="display_order" type="number" min={0} defaultValue={0} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Quote (optional)</label>
          <textarea
            name="quote"
            rows={4}
            className="flex w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            placeholder="Their story in 1-2 sentences"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Video URL (Supabase / Vimeo / YouTube)</label>
            <Input name="video_url" placeholder="https://..." value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Photo URL (optional)</label>
            <Input name="photo_url" placeholder="https://..." value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>
        </div>

        {(photoUrl || videoUrl) && (
          <div className="grid md:grid-cols-2 gap-4 bg-surface-elevated/40 border border-border rounded-lg p-4">
            {photoUrl && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Photo preview</p>
                <div className="aspect-[4/3] overflow-hidden rounded-md border border-border bg-black/40 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoUrl} alt="Photo preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
            {videoUrl && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Video preview</p>
                <div className="aspect-video overflow-hidden rounded-md border border-border bg-black/60 flex items-center justify-center">
                  <video src={videoUrl} controls className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" name="is_featured" className="rounded border-input bg-surface text-gold focus:ring-gold" />
            Feature this testimonial
          </label>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input defaultChecked type="checkbox" name="is_published" className="rounded border-input bg-surface text-gold focus:ring-gold" />
            Published
          </label>
        </div>

        {state?.success === false && state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )}

        <div className="pt-2">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
