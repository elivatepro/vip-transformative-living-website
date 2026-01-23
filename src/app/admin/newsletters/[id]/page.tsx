import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import { updateNewsletter } from '@/app/admin/actions';
import { EditNewsletterForm } from '../edit-form';
import type { Database } from '@/types/database';

type Newsletter = Database['public']['Tables']['newsletters']['Row'];

export default async function EditNewsletterPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('newsletters')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!data) {
    notFound();
  }

  const action = updateNewsletter.bind(null, params.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Newsletter</p>
        <h1 className="text-3xl font-serif font-bold">Edit Article</h1>
        <p className="text-muted-foreground">Update copy, category, or publish status.</p>
      </div>

      <EditNewsletterForm initial={data as Newsletter} action={action} />
    </div>
  );
}
