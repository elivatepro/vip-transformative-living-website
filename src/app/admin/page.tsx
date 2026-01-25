import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  ClipboardCheck, 
  TrendingUp, 
  ArrowRight,
  FileText,
  Star,
  Megaphone,
  HelpCircle,
  Download
} from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
  
  // Fetch key metrics
  // Using Promise.allSettled to handle cases where tables might not exist yet
  const results = await Promise.allSettled([
    supabase.from('subscribers').select('*', { count: 'exact', head: true }),
    supabase.from('ebook_downloads').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('is_read', false),
    supabase.from('self_assessment_results').select('*', { count: 'exact', head: true }).gte('completed_at', firstDayOfMonth),
    
    // Content Status Counts
    supabase.from('newsletter_articles').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('newsletter_articles').select('*', { count: 'exact', head: true }).eq('is_published', false),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('faqs').select('*', { count: 'exact', head: true }).eq('is_published', true),
    
    // Recent Messages
    supabase.from('contact_submissions').select('id, first_name, last_name, subject, created_at, is_read').order('created_at', { ascending: false }).limit(5)
  ]);

  // Helper to get count or 0
  const getCount = (result: any) => 
    result.status === 'fulfilled' && result.value.count !== null ? result.value.count : 0;
    
  const getData = (result: any) => 
    result.status === 'fulfilled' && result.value.data ? result.value.data : [];

  const stats = {
    subscribers: getCount(results[0]),
    ebookDownloads: getCount(results[1]),
    unreadMessages: getCount(results[2]),
    assessmentsMonth: getCount(results[3]),
    publishedArticles: getCount(results[4]),
    draftArticles: getCount(results[5]),
    publishedTestimonials: getCount(results[6]),
    publishedFaqs: getCount(results[7]),
  };

  const recentMessages = getData(results[8]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold font-serif text-foreground">Good morning, Wayne</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with VIP Transformative Living today.
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.subscribers}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+23</span>
              <span className="opacity-70">this week</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">E-book Downloads</CardTitle>
            <BookOpen className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.ebookDownloads}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+12</span>
              <span className="opacity-70">this week</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.unreadMessages > 0 ? (
                <span className="text-gold font-medium">Requires attention</span>
              ) : (
                <span className="text-green-500">All caught up</span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Assessments</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assessmentsMonth}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Completed this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscriber Growth Chart (Placeholder) */}
        <Card className="lg:col-span-2 border-border bg-card">
          <CardHeader>
            <CardTitle>Subscriber Growth</CardTitle>
            <CardDescription>New subscribers over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full bg-muted/20 rounded-md flex items-center justify-center border border-dashed border-border">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-muted-foreground text-sm">Chart visualization requires client-side library</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Messages</CardTitle>
            <Button variant="ghost" size="sm" asChild className="text-xs h-8">
              <Link href="/admin/messages">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {recentMessages.length > 0 ? (
              <div className="divide-y divide-border">
                {recentMessages.map((msg: any) => (
                  <div key={msg.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-1">
                      <span className="font-medium text-sm">{msg.first_name} {msg.last_name}</span>
                      <span className="text-xs text-muted-foreground">{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate font-medium mb-1">{msg.subject}</p>
                    <div className="flex items-center gap-2">
                      {!msg.is_read && <span className="h-2 w-2 rounded-full bg-gold"></span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No recent messages
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Content Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/articles/new" className="flex flex-col gap-2 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-gold/50 transition-all group">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-gold/20 group-hover:text-gold transition-colors">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold block text-sm">New Article</span>
                <span className="text-xs text-muted-foreground">Publish to newsletter</span>
              </div>
            </Link>
            
            <Link href="/admin/testimonials/new" className="flex flex-col gap-2 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-gold/50 transition-all group">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-gold/20 group-hover:text-gold transition-colors">
                <Star className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold block text-sm">New Testimonial</span>
                <span className="text-xs text-muted-foreground">Add client success story</span>
              </div>
            </Link>

            <Link href="/admin/announcements" className="flex flex-col gap-2 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-gold/50 transition-all group">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-gold/20 group-hover:text-gold transition-colors">
                <Megaphone className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold block text-sm">Announcement</span>
                <span className="text-xs text-muted-foreground">Create site banner</span>
              </div>
            </Link>

             <Button variant="outline" className="h-auto flex flex-col items-start gap-2 p-4 justify-start hover:bg-muted/50 hover:border-gold/50 hover:text-foreground">
               <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                 <Download className="h-4 w-4" />
               </div>
               <div className="text-left">
                 <span className="font-semibold block text-sm">Export Subscribers</span>
                 <span className="text-xs text-muted-foreground">Download CSV file</span>
               </div>
            </Button>
          </div>
        </div>

        {/* Content Status */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Content Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Articles</span>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="text-foreground font-medium">{stats.publishedArticles} Published</span>
                <span className="text-muted-foreground">{stats.draftArticles} Drafts</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors">
              <div className="flex items-center gap-3">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Testimonials</span>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="text-foreground font-medium">{stats.publishedTestimonials} Published</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">FAQs</span>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="text-foreground font-medium">{stats.publishedFaqs} Published</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
