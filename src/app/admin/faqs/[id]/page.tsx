'use client';

import { useActionState, useEffect, useState } from 'react';
import { updateFaq } from '@/app/admin/actions';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

async function fetchFaq(id: string) {
  const supabase = createClient();
  const { data } = await supabase.from('faqs').select('*').eq('id', id).single();
  return data;
}

export default function EditFaqPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [initial, setInitial] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const action = updateFaq.bind(null, params.id);
  const [state, formAction] = useActionState(action, null);

  useEffect(() => {
    let mounted = true;
    fetchFaq(params.id).then((data) => {
      if (mounted) {
        setInitial(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [params.id]);

  if (loading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  if (!initial) {
    router.push('/admin/faqs');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Support</p>
        <h1 className="text-3xl font-serif font-bold">Edit FAQ</h1>
        <p className="text-muted-foreground">Update question details.</p>
      </div>

      <form action={formAction} className="space-y-6 bg-surface p-8 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-sm font-medium">Question</label>
          <Input name="question" defaultValue={initial.question} required />
          {state?.errors?.question && <p className="text-red-500 text-xs">{state.errors.question}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Answer</label>
          <textarea
            name="answer"
            rows={4}
            defaultValue={initial.answer}
            className="flex w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            required
          />
          {state?.errors?.answer && <p className="text-red-500 text-xs">{state.errors.answer}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select
              name="category"
              defaultValue={initial.category}
              className="flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              <option value="general">General</option>
              <option value="coaching">Coaching</option>
              <option value="process">Process</option>
              <option value="investment">Investment</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Display order</label>
            <Input name="display_order" type="number" min={0} defaultValue={initial.display_order ?? 0} />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="is_published" defaultChecked={initial.is_published} className="rounded border-input bg-surface text-gold focus:ring-gold" />
          Published
        </div>

        {state?.success === false && state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )}

        <div className="pt-2">
          <Button type="submit" className="w-full sm:w-auto">Save changes</Button>
        </div>
      </form>
    </div>
  );
}
