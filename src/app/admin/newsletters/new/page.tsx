'use client';

import { createNewsletter } from '@/app/admin/actions';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Section } from '@/components/ui/section';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? 'Saving...' : 'Create Newsletter'}</Button>;
}

export default function NewNewsletterPage() {
  const [state, formAction] = useActionState(createNewsletter, null);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold">New Newsletter</h1>
        <p className="text-muted-foreground">Draft a new article for your subscribers.</p>
      </div>

      <form action={formAction} className="space-y-6 bg-surface p-8 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input name="title" placeholder="Enter title..." required />
          {state?.errors?.title && <p className="text-red-500 text-xs">{state.errors.title}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input name="slug" placeholder="url-friendly-slug" required />
            {state?.errors?.slug && <p className="text-red-500 text-xs">{state.errors.slug}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select 
              name="category" 
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
          <Input name="excerpt" placeholder="Short summary..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content (HTML)</label>
          <textarea 
            name="content" 
            rows={10} 
            className="flex w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            placeholder="<p>Write your content here...</p>"
            required
          />
          {state?.errors?.content && <p className="text-red-500 text-xs">{state.errors.content}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_published" id="is_published" className="rounded border-input bg-surface text-gold focus:ring-gold" />
          <label htmlFor="is_published" className="text-sm font-medium">Publish immediately</label>
        </div>

        {state?.success === false && state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )}

        <div className="pt-4">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
