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

export default async function SpeakingTopicsPage() {
  const supabase = await createClient();
  const { data: topics } = await supabase
    .from('speaking_topics')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif">Speaking Topics</h1>
          <p className="text-muted-foreground">Manage presentations and workshops.</p>
        </div>
        <Button asChild>
          <Link href="/admin/speaking/new">
            <Plus className="mr-2 h-4 w-4" /> New Topic
          </Link>
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topics && topics.length > 0 ? (
              topics.map((topic) => (
                <TableRow key={topic.id}>
                  <TableCell className="font-medium">{topic.title}</TableCell>
                  <TableCell>{topic.format}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${topic.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {topic.is_published ? 'Published' : 'Draft'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/speaking/${topic.id}`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                    {/* Placeholder for delete action */}
                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No speaking topics found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
