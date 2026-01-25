import { createClient } from '@/lib/supabase-server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { deleteNewsletter } from '@/app/admin/actions';

export default async function NewslettersAdmin() {
  const supabase = await createClient();
  const { data: newsletter_articles } = await supabase
    .from('newsletter_articles')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold">Newsletters</h1>
        <Link href="/admin/articles/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Article
          </Button>
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead className="bg-surface-elevated text-muted-foreground uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {newsletter_articles?.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  No newsletter_articles found. Create one to get started.
                </td>
              </tr>
            ) : (
              newsletter_articles?.map((item) => (
                <tr key={item.id} className="hover:bg-surface-elevated/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{item.title}</td>
                  <td className="px-6 py-4">
                    {item.is_published ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-400">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.category}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/articles/${item.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <form action={async () => {
                      'use server';
                      await deleteNewsletter(item.id);
                    }} className="inline">
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-900/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
