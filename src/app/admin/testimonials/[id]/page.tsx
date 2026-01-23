'use client';

import { useActionState, useEffect, useState } from 'react';
import { updateTestimonial } from '@/app/admin/actions';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

async function fetchTestimonial(id: string) {
  const supabase = createClient();
  const { data } = await supabase.from('testimonials').select('*').eq('id', id).single();
  return data;
}

export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [initial, setInitial] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const action = updateTestimonial.bind(null, params.id);
  const [state, formAction] = useActionState(action, null);

  useEffect(() => {
    let mounted = true;
    fetchTestimonial(params.id).then((data) => {
      if (mounted) {
        setInitial(data);
        setVideoUrl(data?.video_url ?? '');
        setPhotoUrl(data?.photo_url ?? '');
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [params.id]);

  if (loading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  if (!initial) {
    router.push('/admin/testimonials');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Social proof</p>
        <h1 className="text-3xl font-serif font-bold">Edit Testimonial</h1>
        <p className="text-muted-foreground">Update quote, media links, and visibility.</p>
      </div>

      <form action={formAction} className="space-y-6 bg-surface p-8 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-sm font-medium">Client name</label>
          <Input name="client_name" defaultValue={initial.client_name} required />
          {state?.errors?.client_name && <p className="text-red-500 text-xs">{state.errors.client_name}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title / Role</label>
            <Input name="title" defaultValue={initial.title ?? ''} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Display order</label>
            <Input name="display_order" type="number" min={0} defaultValue={initial.display_order ?? 0} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Quote (optional)</label>
          <textarea
            name="quote"
            rows={4}
            defaultValue={initial.quote ?? ''}
            className="flex w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            placeholder="Their story in 1-2 sentences"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Video URL</label>
            <Input name="video_url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Photo URL</label>
            <Input name="photo_url" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://..." />
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
            <input type="checkbox" name="is_featured" defaultChecked={initial.is_featured} className="rounded border-input bg-surface text-gold focus:ring-gold" />
            Feature this testimonial
          </label>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" name="is_visible" defaultChecked={initial.is_visible} className="rounded border-input bg-surface text-gold focus:ring-gold" />
            Visible on site
          </label>
        </div>

        {state?.success === false && state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )}

        <div className="pt-2">
          <Button type="submit" className="w-full sm:w-auto">Save changes</Button>
        </div>
      </form>
    </div>
  );
}
