import { createClient } from "@/lib/supabase-server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, Archive, Trash2, CheckCircle, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";
import { markAsRead, archiveMessage, deleteMessage, updateNotes } from "./actions";
import { cn } from "@/lib/utils";

interface MessagesPageProps {
  searchParams: Promise<{
    id?: string;
    filter?: string; // unread, read, archived
  }>;
}

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
  const supabase = await createClient();
  const params = await searchParams;
  const selectedId = params.id;
  const filter = params.filter || 'all';

  // Fetch list
  let query = supabase
    .from('contact_submissions')
    .select('id, first_name, last_name, subject, created_at, is_read, is_archived')
    .order('created_at', { ascending: false });

  if (filter === 'unread') query = query.eq('is_read', false).eq('is_archived', false);
  if (filter === 'read') query = query.eq('is_read', true).eq('is_archived', false);
  if (filter === 'archived') query = query.eq('is_archived', true);
  if (filter === 'all') query = query.eq('is_archived', false);

  const { data: messages, error } = await query;

  // Fetch selected detail
  let selectedMessage = null;
  if (selectedId) {
    const { data } = await supabase.from('contact_submissions').select('*').eq('id', selectedId).single();
    selectedMessage = data;
    
    // Auto mark as read if viewing
    if (selectedMessage && !selectedMessage.is_read) {
        // We can't trigger server action from render, usually done via effect or user action.
        // But for "Inbox" style, usually clicking opens it.
        // We'll leave it to manual or handle it differently.
        // Actually, we can just let the user click "Mark Read" or do it in a Client Component effect.
        // For now, I'll add a "Mark as Read" button prominently if unread.
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-gold" />
            Messages
          </h1>
          <p className="text-muted-foreground">{messages?.length || 0} messages found</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:h-[calc(100vh-12rem)] gap-6 h-auto">
        {/* Inbox List (Left Panel) */}
        <div className="w-full md:w-1/3 flex flex-col bg-card border border-border rounded-lg overflow-hidden h-96 md:h-auto">
            <div className="p-4 border-b border-border space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">Inbox</h2>
                    <span className="text-xs text-muted-foreground">{messages?.length || 0} messages</span>
                </div>
                <div className="flex gap-2 text-xs">
                    <Link href="/admin/messages?filter=all" className={cn("px-2 py-1 rounded-md", filter === 'all' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>All</Link>
                    <Link href="/admin/messages?filter=unread" className={cn("px-2 py-1 rounded-md", filter === 'unread' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>Unread</Link>
                    <Link href="/admin/messages?filter=archived" className={cn("px-2 py-1 rounded-md", filter === 'archived' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>Archived</Link>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
                {messages && messages.length > 0 ? (
                    <div className="divide-y divide-border">
                        {messages.map((msg) => (
                            <Link 
                                key={msg.id} 
                                href={`/admin/messages?id=${msg.id}&filter=${filter}`}
                                className={cn(
                                    "block p-4 hover:bg-muted/50 transition-colors cursor-pointer",
                                    selectedId === msg.id ? "bg-muted border-l-4 border-l-gold" : "border-l-4 border-l-transparent",
                                    !msg.is_read ? "bg-gold/5" : ""
                                )}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={cn("font-medium text-sm", !msg.is_read ? "font-bold" : "")}>
                                        {msg.first_name} {msg.last_name}
                                    </span>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className={cn("text-xs mb-1 truncate", !msg.is_read ? "text-foreground font-medium" : "text-muted-foreground")}>
                                    {msg.subject}
                                </p>
                                {!msg.is_read && (
                                    <span className="inline-block w-2 h-2 rounded-full bg-gold"></span>
                                )}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-muted-foreground">
                        No messages found.
                    </div>
                )}
            </div>
        </div>

        {/* Message Detail (Right Panel) */}
        <div className="w-full md:w-2/3 bg-card border border-border rounded-lg overflow-hidden flex flex-col min-h-[500px] md:min-h-0">
            {selectedMessage ? (
                <>
                    {/* Header */}
                    <div className="p-6 border-b border-border flex justify-between items-start bg-muted/20">
                        <div>
                            <h1 className="text-xl font-bold mb-2">{selectedMessage.subject}</h1>
                            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-foreground">{selectedMessage.first_name} {selectedMessage.last_name}</span>
                                    <span>&lt;{selectedMessage.email}&gt;</span>
                                </div>
                                {selectedMessage.phone && <div>{selectedMessage.phone}</div>}
                                <div className="flex items-center gap-2 mt-1 text-xs">
                                    <Clock className="h-3 w-3" />
                                    {new Date(selectedMessage.created_at).toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {!selectedMessage.is_read && (
                                <form action={markAsRead.bind(null, selectedMessage.id)}>
                                    <Button size="sm" variant="outline" className="gap-2">
                                        <CheckCircle className="h-4 w-4" /> Mark Read
                                    </Button>
                                </form>
                            )}
                            <form action={archiveMessage.bind(null, selectedMessage.id)}>
                                <Button size="sm" variant="outline" className="gap-2" disabled={selectedMessage.is_archived}>
                                    <Archive className="h-4 w-4" /> {selectedMessage.is_archived ? 'Archived' : 'Archive'}
                                </Button>
                            </form>
                            <form action={deleteMessage.bind(null, selectedMessage.id)}>
                                <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-500/10 hover:text-red-600">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 overflow-y-auto whitespace-pre-wrap font-serif text-lg leading-relaxed">
                        {selectedMessage.message}
                    </div>

                    {/* Footer / Notes */}
                    <div className="p-6 border-t border-border bg-muted/20">
                        <h3 className="text-sm font-semibold mb-2">Admin Notes</h3>
                        <form action={async (formData) => {
                            'use server';
                            await updateNotes(selectedMessage.id, formData.get('notes') as string);
                        }}>
                            <textarea 
                                name="notes"
                                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Add internal notes about this inquiry..."
                                defaultValue={selectedMessage.notes || ''}
                            />
                            <div className="flex justify-between items-center mt-4">
                                <Button type="submit" size="sm">Save Notes</Button>
                                <Button asChild size="sm" className="bg-gold hover:bg-gold/90 text-black">
                                    <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                                        <Mail className="h-4 w-4 mr-2" /> Reply via Email
                                    </a>
                                </Button>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                    <Mail className="h-12 w-12 mb-4 opacity-20" />
                    <p>Select a message to view details</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
