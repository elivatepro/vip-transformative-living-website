import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Download, 
  MessageSquare, 
  Calendar,
  Search,
  ArrowRight
} from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const supabase = await createClient();
  const params = await searchParams;
  const query = params.q || '';

  if (!query) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
        <h2 className="text-xl font-medium mb-2">Search the Admin Portal</h2>
        <p>Enter a keyword to search bookings, subscribers, downloads, and messages.</p>
      </div>
    );
  }

  // Perform parallel searches
  const results = await Promise.allSettled([
    // Bookings
    supabase.from('calendar_bookings')
      .select('*')
      .or(`invitee_email.ilike.%${query}%,invitee_name.ilike.%${query}%`)
      .order('start_time', { ascending: false })
      .limit(5),
    
    // Subscribers
    supabase.from('subscribers')
      .select('*')
      .or(`email.ilike.%${query}%,first_name.ilike.%${query}%`)
      .order('subscribed_at', { ascending: false })
      .limit(5),
      
    // Ebook Downloads
    supabase.from('ebook_downloads')
      .select('*')
      .or(`email.ilike.%${query}%,first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
      .order('downloaded_at', { ascending: false })
      .limit(5),
      
    // Messages
    supabase.from('contact_submissions')
      .select('*')
      .or(`subject.ilike.%${query}%,first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,message.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .limit(5)
  ]);

  const getData = (result: any) => 
    result.status === 'fulfilled' && result.value.data ? result.value.data : [];

  const bookings = getData(results[0]);
  const subscribers = getData(results[1]);
  const downloads = getData(results[2]);
  const messages = getData(results[3]);

  const totalResults = bookings.length + subscribers.length + downloads.length + messages.length;

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <h1 className="text-2xl font-bold font-serif mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
        </p>
      </div>

      {totalResults === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No results found matching your query.</p>
        </div>
      )}

      {bookings.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gold">
            <Calendar className="h-5 w-5" />
            <h2 className="font-semibold text-lg text-foreground">Bookings</h2>
          </div>
          <div className="grid gap-4">
            {bookings.map((item: any) => (
              <div key={item.id} className="p-4 rounded-lg bg-card border border-border flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.invitee_name}</p>
                  <p className="text-sm text-muted-foreground">{new Date(item.start_time).toLocaleDateString()} - {item.event_name}</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/bookings?q=${encodeURIComponent(item.invitee_email || '')}`}>
                    View <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {subscribers.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gold">
            <Users className="h-5 w-5" />
            <h2 className="font-semibold text-lg text-foreground">Subscribers</h2>
          </div>
          <div className="grid gap-4">
            {subscribers.map((item: any) => (
              <div key={item.id} className="p-4 rounded-lg bg-card border border-border flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.email}</p>
                  <p className="text-sm text-muted-foreground">{item.first_name} • {item.source}</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/subscribers?q=${encodeURIComponent(item.email)}`}>
                    View <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {downloads.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gold">
            <Download className="h-5 w-5" />
            <h2 className="font-semibold text-lg text-foreground">E-book Downloads</h2>
          </div>
          <div className="grid gap-4">
            {downloads.map((item: any) => (
              <div key={item.id} className="p-4 rounded-lg bg-card border border-border flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.first_name} {item.last_name}</p>
                  <p className="text-sm text-muted-foreground">{item.email} • {item.ebook_title}</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/ebook-downloads?q=${encodeURIComponent(item.email)}`}>
                    View <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {messages.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gold">
            <MessageSquare className="h-5 w-5" />
            <h2 className="font-semibold text-lg text-foreground">Messages</h2>
          </div>
          <div className="grid gap-4">
            {messages.map((item: any) => (
              <div key={item.id} className="p-4 rounded-lg bg-card border border-border flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.subject}</p>
                  <p className="text-sm text-muted-foreground">{item.first_name} {item.last_name} • {new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/messages?id=${item.id}`}>
                    View <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
