'use client';

import { useActionState } from 'react';
import { createSpeakingTopic } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function SubmitButton() {
  return (
    <Button type="submit" className="w-full sm:w-auto">Save Topic</Button>
  );
}

export default function NewSpeakingTopicPage() {
  const [state, formAction] = useActionState(createSpeakingTopic, null);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Speaking</p>
        <h1 className="text-3xl font-serif font-bold">Add Topic</h1>
        <p className="text-muted-foreground">Create a new keynote or workshop topic.</p>
      </div>

      <form action={formAction} className="space-y-6 bg-surface p-8 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input name="title" placeholder="e.g., Leadership by VIP" required />
          {state?.errors?.title && <p className="text-red-500 text-xs">{state.errors.title}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <Input name="slug" placeholder="leadership-by-vip" required />
          {state?.errors?.slug && <p className="text-red-500 text-xs">{state.errors.slug}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={4}
            className="flex w-full rounded-md border border-input bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            placeholder="Short overview..."
            required
          />
          {state?.errors?.description && <p className="text-red-500 text-xs">{state.errors.description}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Audience Type</label>
            <Input name="audience_type" placeholder="Corporate, Men, Youth..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Format</label>
            <Input name="format" placeholder="Keynote, Workshop..." />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Display order</label>
          <Input name="display_order" type="number" min={0} defaultValue={0} />
        </div>

        <div className="flex items-center gap-2 text-sm font-medium">
          <input defaultChecked type="checkbox" name="is_published" className="rounded border-input bg-surface text-gold focus:ring-gold" />
          Published
        </div>

        {state?.success === false && state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )}

        <div className="pt-2">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
