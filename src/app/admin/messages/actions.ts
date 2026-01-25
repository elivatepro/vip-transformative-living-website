'use server';

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function markAsRead(id: string) {
  const supabase = await createClient();
  await supabase.from('contact_submissions').update({ is_read: true, read_at: new Date().toISOString() }).eq('id', id);
  revalidatePath('/admin/messages');
}

export async function archiveMessage(id: string) {
  const supabase = await createClient();
  await supabase.from('contact_submissions').update({ is_archived: true }).eq('id', id);
  revalidatePath('/admin/messages');
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  await supabase.from('contact_submissions').delete().eq('id', id);
  revalidatePath('/admin/messages');
}

export async function updateNotes(id: string, notes: string) {
    const supabase = await createClient();
    await supabase.from('contact_submissions').update({ notes }).eq('id', id);
    revalidatePath('/admin/messages');
}
