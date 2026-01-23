import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, CalendarDays } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];

  const [newsletterCount, testimonialCount, eventCount, draftNewsletters, upcomingEvents, featuredTestimonials] = await Promise.all([
    supabase.from('newsletters').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('newsletters').select('id,title,category,is_published').eq('is_published', false).order('created_at', { ascending: false }).limit(3),
    supabase.from('events').select('id,title,event_date,location,is_active').gte('event_date', today).order('event_date', { ascending: true }).limit(3),
    supabase.from('testimonials').select('id,client_name,title,is_visible,is_featured').order('display_order', { ascending: true }).limit(4),
  ]);

  const stats = {
    newsletters: newsletterCount.count ?? 0,
    testimonials: testimonialCount.count ?? 0,
    events: eventCount.count ?? 0,
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Coach Wayne</p>
          <h1 className="text-3xl font-serif font-bold">Admin Control Center</h1>
          <p className="text-muted-foreground">Publish newsletters, keep testimonials fresh, and keep events current.</p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline"><Link href="/admin/newsletters/new">New Newsletter</Link></Button>
          <Button asChild><Link href="/admin/events/new">Add Event</Link></Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Newsletters</CardTitle>
            <FileText className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newsletters}</div>
            <p className="text-xs text-muted-foreground">Published + drafts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Testimonials</CardTitle>
            <Users className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.testimonials}</div>
            <p className="text-xs text-muted-foreground">Visible + hidden</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Events & Workshops</CardTitle>
            <CalendarDays className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.events}</div>
            <p className="text-xs text-muted-foreground">Upcoming + past entries</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Quick Actions</h2>
          <Link href="/admin/testimonials/new" className="text-sm text-gold hover:underline">Add testimonial</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/newsletters/new" className="p-6 bg-surface border border-border rounded-lg hover:border-gold transition-colors block">
            <span className="block font-bold mb-2">Write Newsletter</span>
            <span className="text-sm text-muted-foreground">Create a new article</span>
          </Link>
          <Link href="/admin/events/new" className="p-6 bg-surface border border-border rounded-lg hover:border-gold transition-colors block">
            <span className="block font-bold mb-2">Add Event</span>
            <span className="text-sm text-muted-foreground">Workshops or webinars</span>
          </Link>
          <Link href="/admin/testimonials" className="p-6 bg-surface border border-border rounded-lg hover:border-gold transition-colors block">
            <span className="block font-bold mb-2">Manage Testimonials</span>
            <span className="text-sm text-muted-foreground">Feature video or text</span>
          </Link>
          <Link href="/admin/newsletters" className="p-6 bg-surface border border-border rounded-lg hover:border-gold transition-colors block">
            <span className="block font-bold mb-2">Newsletter Archive</span>
            <span className="text-sm text-muted-foreground">Edit or unpublish</span>
          </Link>
        </div>
      </div>

      {/* Work Queue */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-surface">
          <CardHeader>
            <CardTitle>Drafts needing publication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {draftNewsletters.data?.length ? (
              draftNewsletters.data.map((item) => (
                <div key={item.id} className="flex items-center justify-between border border-border/60 rounded-md px-4 py-3">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/newsletters/${item.id}`}>Open</Link>
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No drafts right now.</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-surface">
          <CardHeader>
            <CardTitle>Upcoming events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.data?.length ? (
              upcomingEvents.data.map((event) => (
                <div key={event.id} className="flex items-center justify-between border border-border/60 rounded-md px-4 py-3">
                  <div>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.event_date} {event.location ? `• ${event.location}` : ''}</p>
                  </div>
                  <Button variant="ghost" size="sm" className={event.is_active ? 'text-gold' : 'text-muted-foreground'}>
                    {event.is_active ? 'Active' : 'Inactive'}
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming events scheduled.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-surface">
        <CardHeader>
          <CardTitle>Testimonials in rotation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTestimonials.data?.length ? featuredTestimonials.data.map((item) => (
              <div key={item.id} className="border border-border rounded-md p-4 bg-surface-elevated/30">
                <p className="font-semibold">{item.client_name}</p>
                {item.title && <p className="text-xs text-muted-foreground">{item.title}</p>}
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className={item.is_featured ? 'text-gold' : 'text-muted-foreground'}>{item.is_featured ? 'Featured' : 'Standard'}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className={item.is_visible ? 'text-foreground' : 'text-muted-foreground'}>{item.is_visible ? 'Visible' : 'Hidden'}</span>
                </div>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground">No testimonials added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
