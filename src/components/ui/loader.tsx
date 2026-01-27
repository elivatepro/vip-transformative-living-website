'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Loader({ className, size = 'md' }: LoaderProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  const logoSize = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  return (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size], className)}>
      {/* Spinning Rings */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold border-r-gold/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-transparent border-b-gold/30 border-l-gold/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Logo */}
      <div className="relative z-10 flex items-center justify-center w-[50%] h-[50%]">
         <Image 
           src="/images/Icon-White.png" 
           alt="Loading..." 
           width={logoSize[size]} 
           height={logoSize[size]} 
           className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]"
           priority
         />
      </div>
    </div>
  );
}
