'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Video } from 'lucide-react';
import Image from 'next/image';
import { Loader } from '@/components/ui/loader';
import { getSiteImageUrl } from "@/lib/site-images";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [iframeLoaded, setIframeLoaded] = React.useState(false);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset iframe loaded state when modal opens
      setIframeLoaded(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const calendlyUrl = "https://calendly.com/waynedawsonvip/vip-discovery-call?embed_domain=viptansformativeliving.com&embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1&background_color=0A0A0A&text_color=F5F5F5&primary_color=C5A059";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="pointer-events-auto relative w-full max-w-5xl h-[85vh] sm:h-[650px] bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
                <span className="sr-only">Close</span>
              </button>

              {/* Left Sidebar (Details) */}
              <div className="w-full md:w-1/3 bg-surface-elevated p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-border overflow-y-auto relative z-10">
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                  {/* Profile Image */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gold shadow-lg shrink-0">
                    <Image
                      src={getSiteImageUrl("/images/coach-wayne-new.jpg")}
                      alt="Coach Wayne"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Header Info */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gold uppercase tracking-wider">Coach Wayne</h3>
                    <h2 className="text-2xl md:text-3xl font-serif text-foreground">Discovery Call</h2>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
                      <Clock className="w-5 h-5 text-gold" />
                      <span className="font-medium">30 mins</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
                      <Video className="w-5 h-5 text-gold" />
                      <span className="font-medium">Zoom Web Conferencing</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Book your exclusive session to explore how we can unlock your true potential. 
                    This 30-minute discovery call is designed to identify your goals and see if we're a perfect match for your transformative journey.
                  </p>
                </div>
              </div>

              {/* Right Content (Calendly) */}
              <div className="w-full md:w-2/3 h-full bg-background relative">
                {/* Loader Overlay */}
                <AnimatePresence>
                  {!iframeLoaded && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-10 flex items-center justify-center bg-background"
                    >
                      <Loader size="md" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Select a Date & Time - Calendly"
                  className="w-full h-full min-h-[500px]"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
