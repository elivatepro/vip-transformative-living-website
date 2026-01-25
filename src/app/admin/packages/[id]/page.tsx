'use client';

import { useActionState, useEffect, useState } from 'react';
import { updateCoachingPackage } from '@/app/admin/actions';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

async function fetchCoachingPackage(id: string) {
  const supabase = createClient();
  const { data } = await supabase.from('coaching_packages').select('*').eq('id', id).single();
  return data;
}

export default function EditCoachingPackagePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [initial, setInitial] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const action = updateCoachingPackage.bind(null, params.id);
  const [state, formAction] = useActionState(action, null);

  useEffect(() => {
    let mounted = true;
    fetchCoachingPackage(params.id).then((data) => {
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
    router.push('/admin/packages');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Coaching</p>
        <h1 className="text-3xl font-serif font-bold">Edit Package</h1>
        <p className="text-muted-foreground">Update program details.</p>
      </div>

      <form action={formAction} className="space-y-6 bg-surface p-8 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input name="name" defaultValue={initial.name} required />
          {state?.errors?.name && <p className="text-red-500 text-xs">{state.errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <Input name="slug" defaultValue={initial.slug} required />
          {state?.errors?.slug && <p className="text-red-500 text-xs">{state.errors.slug}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={initial.description}
            className="flex w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            required
          />
          {state?.errors?.description && <p className="text-red-500 text-xs">{state.errors.description}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Total Price ($)</label>
            <Input name="total_price" type="number" min={0} step="0.01" defaultValue={initial.total_price ?? ''} />
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
