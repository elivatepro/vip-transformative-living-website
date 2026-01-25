'use client';

import { useActionState, useEffect, useState } from 'react';
import { updateAnnouncement } from '@/app/admin/actions';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

async function fetchAnnouncement(id: string) {
  const supabase = createClient();
  const { data } = await supabase.from('announcements').select('*').eq('id', id).single();
  return data;
}

export default function EditAnnouncementPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [initial, setInitial] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const action = updateAnnouncement.bind(null, params.id);
  const [state, formAction] = useActionState(action, null);

  useEffect(() => {
    let mounted = true;
    fetchAnnouncement(params.id).then((data) => {
      if (mounted) {
        setInitial(data);
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
    router.push('/admin/announcements');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Site</p>
        <h1 className="text-3xl font-serif font-bold">Edit Announcement</h1>
        <p className="text-muted-foreground">Update banner details.</p>
      </div>

      <form action={formAction} className="space-y-6 bg-surface p-8 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <Input name="message" defaultValue={initial.message} required />
          {state?.errors?.message && <p className="text-red-500 text-xs">{state.errors.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Link Text (optional)</label>
            <Input name="link_text" defaultValue={initial.link_text ?? ''} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Link URL (optional)</label>
            <Input name="link_url" defaultValue={initial.link_url ?? ''} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <select
            name="type"
            defaultValue={initial.type}
            className="flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            <option value="info">Info (Blue)</option>
            <option value="promo">Promo (Gold)</option>
            <option value="urgent">Urgent (Red)</option>
            <option value="event">Event (Green)</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="is_active" defaultChecked={initial.is_active} className="rounded border-input bg-surface text-gold focus:ring-gold" />
          Active
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
