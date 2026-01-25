'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function PageLoader() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm"
    >
      <div className="relative flex items-center justify-center w-32 h-32">
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
        <div className="relative z-10 w-16 h-16 flex items-center justify-center">
           <Image 
             src="/images/Icon-White.png" 
             alt="Loading..." 
             width={64} 
             height={64} 
             className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]"
             priority
           />
        </div>
      </div>
    </motion.div>
  );
}
