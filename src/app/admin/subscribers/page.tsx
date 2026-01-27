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
import { Download, Search, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface SubscribersPageProps {
  searchParams: Promise<{
    q?: string;
    source?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function SubscribersPage({ searchParams }: SubscribersPageProps) {
  const supabase = await createClient();
  const params = await searchParams;
  const query = params.q || '';
  const page = Number(params.page) || 1;
  const pageSize = 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let dataRequest = supabase
    .from('subscribers')
    .select('*', { count: 'exact' })
    .order('subscribed_at', { ascending: false })
    .range(from, to);

  if (query) {
    dataRequest = dataRequest.or(`email.ilike.%${query}%,first_name.ilike.%${query}%`);
  }
  
  if (params.source && params.source !== 'all') {
    dataRequest = dataRequest.eq('source', params.source);
  }

  if (params.status && params.status !== 'all') {
    if (params.status === 'active') dataRequest = dataRequest.eq('is_active', true);
    if (params.status === 'unsubscribed') dataRequest = dataRequest.eq('is_active', false);
  }

  const { data: subscribers, count, error } = await dataRequest;

  if (error) {
    // Handle table not found or other errors
    console.error(error);
  }

  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif flex items-center gap-2">
            <Users className="h-6 w-6 text-gold" />
            Newsletter Subscribers
          </h1>
          <p className="text-muted-foreground">{count || 0} total subscribers</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end md:items-center bg-card p-4 rounded-lg border border-border">
        <form className="flex-1 flex gap-4 w-full" action="/admin/subscribers" method="GET">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              name="q"
              placeholder="Search by email or name..."
              className="pl-9 w-full"
              defaultValue={query}
            />
          </div>
          <select 
            name="source" 
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            defaultValue={params.source || 'all'}
          >
            <option value="all">All Sources</option>
            <option value="website">Website</option>
            <option value="ebook">E-book</option>
            <option value="manual">Manual</option>
          </select>
          <select 
            name="status"
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            defaultValue={params.status || 'all'}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
          <Button type="submit">Filter</Button>
        </form>
      </div>

      <div className="border border-border rounded-lg overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers && subscribers.length > 0 ? (
              subscribers.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell className="font-medium">{sub.email}</TableCell>
                  <TableCell>{sub.first_name || '—'}</TableCell>
                  <TableCell className="capitalize">{sub.source}</TableCell>
                  <TableCell>{new Date(sub.subscribed_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${sub.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {sub.is_active ? 'Active' : 'Unsubscribed'}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No subscribers found.
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
              <Link href={`/admin/subscribers?page=${page - 1}&q=${query}&source=${params.source || ''}&status=${params.status || ''}`}>Previous</Link>
            </Button>
          )}
          {page < totalPages && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/subscribers?page=${page + 1}&q=${query}&source=${params.source || ''}&status=${params.status || ''}`}>Next</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
