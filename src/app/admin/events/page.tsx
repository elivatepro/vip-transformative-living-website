import { createClient } from '@/lib/supabase-server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Trash2, CalendarDays, MapPin, Power } from 'lucide-react';
import { deleteEvent } from '@/app/admin/actions';

export default async function EventsAdmin() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Programming</p>
          <h1 className="text-3xl font-serif font-bold">Events & Workshops</h1>
          <p className="text-muted-foreground">Keep upcoming dates current so visitors can register.</p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Link>
        </Button>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="uppercase text-xs text-muted-foreground bg-surface-elevated">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events?.length ? (
              events.map((event) => (
                <tr key={event.id} className="hover:bg-surface-elevated/40">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground">{event.title}</p>
                    {event.description && <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {event.event_date}
                      {event.event_time ? `, ${event.event_time}` : ''}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${event.is_active ? 'text-gold' : 'text-muted-foreground'}`}>
                      <Power className="h-3 w-3" /> {event.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location || 'TBD'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <form
                      action={async () => {
                        'use server';
                        await deleteEvent(event.id);
                      }}
                      className="inline"
                    >
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-900/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No events added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
