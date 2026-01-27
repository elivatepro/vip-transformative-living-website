import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import ArticleEditor from '@/components/admin/articles/ArticleEditor';

export default async function EditNewsletterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('newsletter_articles')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) {
    notFound();
  }

  return <ArticleEditor initialData={data} />;
}
