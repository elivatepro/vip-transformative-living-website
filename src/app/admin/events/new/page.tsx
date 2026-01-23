'use client';

import { useActionState } from 'react';
import { createEvent } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function SubmitButton() {
  return <Button type="submit">Save Event</Button>;
}

export default function NewEventPage() {
  const [state, formAction] = useActionState(createEvent, null);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Programming</p>
        <h1 className="text-3xl font-serif font-bold">Create Event</h1>
        <p className="text-muted-foreground">Add workshops, webinars, or live sessions with a registration link.</p>
      </div>

      <form action={formAction} className="space-y-6 bg-surface p-8 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input name="title" placeholder="e.g., Career Transition Lab" required />
          {state?.errors?.title && <p className="text-red-500 text-xs">{state.errors.title}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={4}
            className="flex w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            placeholder="What participants will learn, format, and who it's for."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input name="event_date" type="date" required />
            {state?.errors?.event_date && <p className="text-red-500 text-xs">{state.errors.event_date}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Time</label>
            <Input name="event_time" type="time" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input name="location" placeholder="Fort Lauderdale, FL or Virtual" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Registration URL</label>
            <Input name="registration_url" placeholder="https://link.to/register" />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input defaultChecked type="checkbox" name="is_active" className="rounded border-input bg-surface text-gold focus:ring-gold" />
          Event is active
        </label>

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
