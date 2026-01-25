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
import { Plus, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { deleteFaq } from "../actions";

export default async function FaqsPage() {
  const supabase = await createClient();
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif">FAQs</h1>
          <p className="text-muted-foreground">Manage frequently asked questions.</p>
        </div>
        <Button asChild>
          <Link href="/admin/faqs/new">
            <Plus className="mr-2 h-4 w-4" /> New FAQ
          </Link>
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs && faqs.length > 0 ? (
              faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium">{faq.question}</TableCell>
                  <TableCell className="capitalize">{faq.category}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${faq.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {faq.is_published ? 'Published' : 'Draft'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/faqs/${faq.id}`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                    <form action={async () => {
                      'use server';
                      await deleteFaq(faq.id);
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
                  No FAQs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
