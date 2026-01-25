'use client';

import { useActionState } from 'react';
import { createAnnouncement } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function SubmitButton() {
  return (
    <Button type="submit" className="w-full sm:w-auto">Save Announcement</Button>
  );
}

export default function NewAnnouncementPage() {
  const [state, formAction] = useActionState(createAnnouncement, null);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Site</p>
        <h1 className="text-3xl font-serif font-bold">Add Announcement</h1>
        <p className="text-muted-foreground">Create a banner alert for the website.</p>
      </div>

      <form action={formAction} className="space-y-6 bg-surface p-8 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <Input name="message" placeholder="e.g., New coaching spots available!" required />
          {state?.errors?.message && <p className="text-red-500 text-xs">{state.errors.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Link Text (optional)</label>
            <Input name="link_text" placeholder="Learn More" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Link URL (optional)</label>
            <Input name="link_url" placeholder="/coaching" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <select
            name="type"
            className="flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            <option value="info">Info (Blue)</option>
            <option value="promo">Promo (Gold)</option>
            <option value="urgent">Urgent (Red)</option>
            <option value="event">Event (Green)</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium">
          <input defaultChecked type="checkbox" name="is_active" className="rounded border-input bg-surface text-gold focus:ring-gold" />
          Active immediately
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
