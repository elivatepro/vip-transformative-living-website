'use client';

import { createClient } from '@/lib/supabase-client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Download, 
  MessageSquare, 
  ClipboardCheck, 
  Star, 
  FileText, 
  HelpCircle, 
  Package, 
  Mic, 
  Megaphone, 
  Settings, 
  LogOut,
  Menu,
  Bell,
  Search,
  User,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { PageLoader } from '@/components/ui/page-loader';
import { AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  // If on login page, simple layout
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  const handleLogout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    router.refresh();
    router.push('/admin/login');
  };

  const navGroups = [
    {
      title: null, // Top level
      items: [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      ]
    },
    {
      title: 'DATA',
      items: [
        { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
        { name: 'Subscribers', href: '/admin/subscribers', icon: Users },
        { name: 'Downloads', href: '/admin/ebook-downloads', icon: Download },
        { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
        { name: 'Assessments', href: '/admin/assessments', icon: ClipboardCheck },
      ]
    },
    {
      title: 'CONTENT',
      items: [
        { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
        { name: 'Articles', href: '/admin/articles', icon: FileText },
        { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
        { name: 'Packages', href: '/admin/packages', icon: Package },
        { name: 'Speaking', href: '/admin/speaking', icon: Mic },
      ]
    },
    {
      title: 'SITE',
      items: [
        { name: 'Announcements', href: '/admin/announcements', icon: Megaphone },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AnimatePresence>
        {isLoading && <PageLoader />}
      </AnimatePresence>
      {/* Header (Fixed) */}
      <header className="h-16 border-b border-border bg-[#141414] fixed top-0 left-0 right-0 z-50 flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          
          <Link 
            href="/admin" 
            className="flex items-center gap-3"
            onClick={() => {
              if (pathname !== '/admin') setIsLoading(true);
            }}
          >
             {/* Logo */}
            <div className="relative h-8 w-40 block">
              <Image src="/images/logo-horizontal-gold.png" alt="VIPTL" fill sizes="(max-width: 768px) 100vw, 160px" className="object-contain" priority />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="h-9 w-64 rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 border-l border-border pl-4 ml-2">
            <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
              <User className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium hidden md:block">Wayne</span>
          </div>
        </div>
      </header>

      <div className="flex pt-16 min-h-screen">
        {/* Sidebar (Fixed on Desktop, Drawer on Mobile) */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-64px)] overflow-y-auto pt-16 lg:pt-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-4 space-y-6">
            {navGroups.map((group, i) => (
              <div key={i}>
                {group.title && (
                  <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground tracking-wider">
                    {group.title}
                  </h3>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setIsSidebarOpen(false);
                          if (pathname !== item.href) setIsLoading(true);
                        }}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-sm font-medium",
                          isActive 
                            ? "bg-gold/10 text-gold" 
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <div className="pt-4 mt-4 border-t border-border">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}
