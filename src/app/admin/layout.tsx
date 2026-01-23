'use client';

import { createClient } from '@/lib/supabase-client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, Calendar, Users, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  // If on login page, simple layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Newsletters', href: '/admin/newsletters', icon: FileText },
    { name: 'Testimonials', href: '/admin/testimonials', icon: Users },
    { name: 'Events', href: '/admin/events', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-surface p-6 flex flex-col">
        <div className="mb-8 px-2">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative h-8 w-32">
              <Image src="/images/logo-gold-texture.png" alt="VIPTL" fill sizes="128px" className="object-contain" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin</span>
          </Link>
        </div>

        <nav className="space-y-2 flex-grow">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium",
                  isActive 
                    ? "bg-gold/10 text-gold" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="pt-8 border-t border-border mt-auto">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
