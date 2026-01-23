import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import { updateEvent } from '@/app/admin/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data } = await supabase.from('events').select('*').eq('id', params.id).single();

  if (!data) {
    notFound();
  }

  const action = async (formData: FormData) => {
    'use server';
    await updateEvent(params.id, null, formData);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Programming</p>
        <h1 className="text-3xl font-serif font-bold">Edit Event</h1>
        <p className="text-muted-foreground">Update schedule, location, or visibility.</p>
      </div>

      <form action={action} className="space-y-6 bg-surface p-8 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input name="title" defaultValue={data.title} required />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={data.description ?? ''}
            className="flex w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            placeholder="What participants will learn, format, and who it's for."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input name="event_date" type="date" defaultValue={data.event_date} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Time</label>
            <Input name="event_time" type="time" defaultValue={data.event_time ?? ''} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input name="location" defaultValue={data.location ?? ''} placeholder="Fort Lauderdale, FL or Virtual" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Registration URL</label>
            <Input name="registration_url" defaultValue={data.registration_url ?? ''} placeholder="https://link.to/register" />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="is_active" defaultChecked={data.is_active} className="rounded border-input bg-surface text-gold focus:ring-gold" />
          Event is active
        </label>

        <div className="pt-2">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  );
}
