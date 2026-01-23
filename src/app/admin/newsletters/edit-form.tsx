'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Database } from '@/types/database';

type Newsletter = Database['public']['Tables']['newsletters']['Row'];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Saving...' : 'Save changes'}
    </Button>
  );
}

export function EditNewsletterForm({ initial, action }: { initial: Newsletter; action: (prevState: any, formData: FormData) => Promise<any>; }) {
  const [state, formAction] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-6 bg-surface p-8 rounded-lg border border-border">
      <input type="hidden" name="published_at" value={initial.published_at ?? ''} />

      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input name="title" defaultValue={initial.title} required />
        {state?.errors?.title && <p className="text-red-500 text-xs">{state.errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <Input name="slug" defaultValue={initial.slug} required />
          {state?.errors?.slug && <p className="text-red-500 text-xs">{state.errors.slug}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <select
            name="category"
            defaultValue={initial.category}
            className="flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          >
            <option value="Purpose">Purpose</option>
            <option value="Identity">Identity</option>
            <option value="Values">Values</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Excerpt</label>
        <Input name="excerpt" defaultValue={initial.excerpt ?? ''} placeholder="Short summary..." />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Content (HTML)</label>
        <textarea
          name="content"
          rows={10}
          defaultValue={initial.content}
          className="flex w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          required
        />
        {state?.errors?.content && <p className="text-red-500 text-xs">{state.errors.content}</p>}
      </div>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" name="is_published" defaultChecked={initial.is_published} className="rounded border-input bg-surface text-gold focus:ring-gold" />
        Published
      </label>

      {state?.success === false && state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
