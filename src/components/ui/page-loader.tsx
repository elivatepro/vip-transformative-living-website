'use client';

import { motion } from 'framer-motion';
import { Loader } from '@/components/ui/loader';

export function PageLoader() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm"
    >
      <Loader size="lg" />
    </motion.div>
  );
}
