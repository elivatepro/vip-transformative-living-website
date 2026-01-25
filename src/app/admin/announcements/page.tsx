import { createClient } from "@/lib/supabase-server";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Edit, Megaphone } from "lucide-react";
import Link from "next/link";
import { deleteAnnouncement } from "../actions";

export default async function AnnouncementsPage() {
  const supabase = await createClient();
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif">Announcements</h1>
          <p className="text-muted-foreground">Manage site-wide banners and alerts.</p>
        </div>
        <Button asChild>
          <Link href="/admin/announcements/new">
            <Plus className="mr-2 h-4 w-4" /> New Announcement
          </Link>
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Message</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcements && announcements.length > 0 ? (
              announcements.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-md truncate">{item.message}</TableCell>
                  <TableCell className="capitalize">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground`}>
                        {item.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/announcements/${item.id}`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                    <form action={async () => {
                        'use server';
                        await deleteAnnouncement(item.id);
                    }} className="inline">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No announcements found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
