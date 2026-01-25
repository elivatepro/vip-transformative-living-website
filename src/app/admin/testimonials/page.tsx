import { createClient } from '@/lib/supabase-server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Plus, Trash2, Star, Eye, EyeOff, Edit } from 'lucide-react';
import { deleteTestimonial } from '@/app/admin/actions';

export default async function TestimonialsAdmin() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Social proof</p>
          <h1 className="text-3xl font-serif font-bold">Testimonials</h1>
          <p className="text-muted-foreground">Feature the right stories and keep the carousel fresh.</p>
        </div>
        <Button asChild>
          <Link href="/admin/testimonials/new">
            <Plus className="mr-2 h-4 w-4" /> New Testimonial
          </Link>
        </Button>
      </div>

      <Card className="bg-surface border border-border overflow-hidden">
        <CardHeader className="bg-surface-elevated/50">
          <CardTitle className="text-sm text-muted-foreground">Library</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="uppercase text-xs text-muted-foreground bg-surface-elevated">
              <tr>
                <th className="px-6 py-3 text-left">Client</th>
                <th className="px-6 py-3 text-left">Featured</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Order</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {testimonials?.length ? (
                testimonials.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-elevated/40">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{item.client_name}</p>
                      {item.title && <p className="text-xs text-muted-foreground">{item.title}</p>}
                    </td>
                    <td className="px-6 py-4">
                      {item.is_featured ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 text-gold px-2.5 py-1 text-xs font-semibold">
                          <Star className="h-3 w-3" /> Featured
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Standard</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {item.is_published ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-400"><Eye className="h-3 w-3" /> Published</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><EyeOff className="h-3 w-3" /> Draft</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{item.display_order ?? 0}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/testimonials/${item.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <form
                        action={async () => {
                          'use server';
                          await deleteTestimonial(item.id);
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
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No testimonials yet. Add one to get started.</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
