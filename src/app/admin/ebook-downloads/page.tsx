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
import { Download, Search } from "lucide-react";
import Link from "next/link";

interface EbookDownloadsPageProps {
  searchParams: Promise<{
    q?: string;
    ebook?: string;
    page?: string;
  }>;
}

export default async function EbookDownloadsPage({ searchParams }: EbookDownloadsPageProps) {
  const supabase = await createClient();
  const params = await searchParams;
  const query = params.q || '';
  const page = Number(params.page) || 1;
  const pageSize = 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let dataRequest = supabase
    .from('ebook_downloads')
    .select('*', { count: 'exact' })
    .order('downloaded_at', { ascending: false })
    .range(from, to);

  if (query) {
    dataRequest = dataRequest.or(`email.ilike.%${query}%,first_name.ilike.%${query}%,last_name.ilike.%${query}%`);
  }
  
  if (params.ebook && params.ebook !== 'all') {
    dataRequest = dataRequest.eq('ebook_slug', params.ebook);
  }

  const { data: downloads, count, error } = await dataRequest;

  if (error) {
    console.error(error);
  }

  // Get unique ebook titles for filter if possible, hardcoded for now based on plan
  const ebookOptions = [
    { label: 'Breaking Free', value: 'breaking-free' },
    { label: 'Warrior Brain', value: 'warrior-brain' },
  ];

  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">E-book Downloads</h1>
          <p className="text-muted-foreground">{count || 0} leads generated</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end md:items-center bg-card p-4 rounded-lg border border-border">
        <form className="flex-1 flex gap-4 w-full" action="/admin/ebook-downloads" method="GET">
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
            name="ebook" 
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            defaultValue={params.ebook || 'all'}
          >
            <option value="all">All E-books</option>
            {ebookOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <Button type="submit">Filter</Button>
        </form>
      </div>

      <div className="border border-border rounded-lg overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>E-book</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {downloads && downloads.length > 0 ? (
              downloads.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.email}</TableCell>
                  <TableCell>{item.first_name} {item.last_name}</TableCell>
                  <TableCell>{item.ebook_title}</TableCell>
                  <TableCell>{new Date(item.downloaded_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No downloads found.
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
              <Link href={`/admin/ebook-downloads?page=${page - 1}&q=${query}&ebook=${params.ebook || ''}`}>Previous</Link>
            </Button>
          )}
          {page < totalPages && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/ebook-downloads?page=${page + 1}&q=${query}&ebook=${params.ebook || ''}`}>Next</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
