import { createClient } from "@/lib/supabase-server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ExternalLink, Calendar, Video, Clock } from "lucide-react";
import Link from "next/link";

interface BookingsPageProps {
  searchParams: Promise<{
    q?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function BookingsPage({ searchParams }: BookingsPageProps) {
  const supabase = await createClient();
  const params = await searchParams;
  const query = params.q || '';
  const page = Number(params.page) || 1;
  const pageSize = 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let dataRequest = supabase
    .from('calendar_bookings')
    .select('*', { count: 'exact' })
    .order('start_time', { ascending: false })
    .range(from, to);

  if (query) {
    dataRequest = dataRequest.or(`invitee_email.ilike.%${query}%,invitee_name.ilike.%${query}%`);
  }
  
  if (params.status && params.status !== 'all') {
    dataRequest = dataRequest.eq('status', params.status);
  }

  const { data: bookings, count, error } = await dataRequest;

  if (error) {
    console.error("Error fetching bookings:", error);
  }

  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif flex items-center gap-2">
            <Calendar className="h-6 w-6 text-gold" />
            Bookings
          </h1>
          <p className="text-muted-foreground">{count || 0} total bookings</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end md:items-center bg-card p-4 rounded-lg border border-border">
        <form className="flex-1 flex gap-4 w-full" action="/admin/bookings" method="GET">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              name="q"
              placeholder="Search by name or email..."
              className="pl-9 w-full"
              defaultValue={query}
            />
          </div>
          <select 
            name="status"
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            defaultValue={params.status || 'all'}
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
          <Button type="submit">Filter</Button>
        </form>
      </div>

      <div className="border border-border rounded-lg overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Invitee</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Event</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => {
                const startDate = new Date(booking.start_time);
                const isPast = startDate < new Date();
                
                return (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{startDate.toLocaleDateString()}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                           <Clock className="h-3 w-3" />
                           {startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{booking.invitee_name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <span>{booking.invitee_email}</span>
                        {booking.invitee_phone && <span className="text-xs text-muted-foreground">{booking.invitee_phone}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">{booking.event_name}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize 
                        ${booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                          isPast ? 'bg-gray-100 text-gray-700' : 'bg-green-100 text-green-700'}`}>
                        {booking.status === 'cancelled' ? 'Cancelled' : (isPast ? 'Completed' : 'Scheduled')}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                       {booking.zoom_link && booking.status !== 'cancelled' && (
                           <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0" title="Join Zoom">
                             <a href={booking.zoom_link} target="_blank" rel="noopener noreferrer">
                               <Video className="h-4 w-4 text-blue-500" />
                             </a>
                           </Button>
                       )}
                       {booking.zoom_link && (
                           <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0" title="Open Link">
                             <a href={booking.zoom_link} target="_blank" rel="noopener noreferrer">
                               <ExternalLink className="h-4 w-4 text-muted-foreground" />
                             </a>
                           </Button>
                       )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  <div className="flex flex-col items-center gap-3">
                    <Calendar className="h-10 w-10 opacity-20" />
                    <p>No bookings found matching your criteria.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {from + 1}-{Math.min(to + 1, count || 0)} of {count || 0}
        </p>
        <div className="flex gap-2">
          {page > 1 && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/bookings?page=${page - 1}&q=${query}&status=${params.status || ''}`}>Previous</Link>
            </Button>
          )}
          {page < totalPages && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/bookings?page=${page + 1}&q=${query}&status=${params.status || ''}`}>Next</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
