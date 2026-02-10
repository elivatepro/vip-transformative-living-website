'use client';

import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getResponsiveSiteBackgroundStyle, getSiteImageUrl } from "@/lib/site-images";

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.refresh();
      router.push('/admin');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-background">
      <div
        className="absolute inset-0 scale-105 blur-md animate-fade-in responsive-site-bg"
        style={{ ...getResponsiveSiteBackgroundStyle("/images/alpine-meadow.jpg"), backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 opacity-30 bg-noise" />

      <Card className="relative w-full max-w-lg border border-gold/40 bg-surface/80 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.55)] animate-fade-up">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/6 via-white/0 to-gold/12 pointer-events-none" />
        <CardHeader className="text-center space-y-4 relative z-10 pb-4">
          <div className="mx-auto w-20 h-20 relative drop-shadow-lg">
            <Image src={getSiteImageUrl("/images/logo-gold-texture.png")} alt="VIPTL" fill sizes="80px" className="object-contain" />
          </div>
          <CardTitle className="text-2xl font-serif tracking-tight">Admin Access</CardTitle>
          <p className="text-sm text-muted-foreground">Secure dashboard for Coach Wayne.</p>
        </CardHeader>
        <CardContent className="relative z-10 pb-9">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-surface/70 border-border focus-visible:ring-gold pr-10 rounded-lg"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">@</span>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-surface/70 border-border focus-visible:ring-gold pr-12 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-2 flex items-center px-2 text-muted-foreground hover:text-gold transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            
            <Button type="submit" variant="primary" className="w-full font-semibold rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.25)]" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
