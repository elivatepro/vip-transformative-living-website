"use client";

import { useEffect, useState } from "react";

export function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Global Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
      
      {/* Top Left Golden Glow - Enhanced */}
      <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gold/10 blur-[120px] mix-blend-screen opacity-40 animate-pulse" style={{ animationDuration: '10s' }} />
      
      {/* Bottom Right Blue/Deep Glow - Enhanced */}
      <div className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-900/10 blur-[120px] mix-blend-screen opacity-20" />
      
      {/* Center Spotlight - Subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
    </div>
  );
}
