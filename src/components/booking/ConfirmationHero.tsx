'use client';

import { Check, Calendar, Clock, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Props {
  name: string;
  date: string | null;
  time: string | null;
  timezone: string;
}

export default function ConfirmationHero({ name, date, time, timezone }: Props) {
  return (
    <section className="bg-background pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: 'url("/images/hero-bg-mountain.jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Radial glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]"
        >
          <Check className="w-10 h-10 text-background stroke-[3]" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-playfair text-4xl md:text-5xl text-foreground mb-4"
        >
          You're All Set, {name}!
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-inter text-lg text-muted-foreground mb-10 max-w-lg mx-auto"
        >
          Your VIP Discovery Call has been scheduled.
          <br />
          Check your email for confirmation details.
        </motion.p>

        {(date || time) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-surface border border-border rounded-xl p-8 mb-8 max-w-md mx-auto"
          >
            <div className="space-y-4">
              {date && (
                <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                  <Calendar className="w-5 h-5 text-gold shrink-0" />
                  <span className="font-inter text-foreground">{date}</span>
                </div>
              )}
              {time && (
                <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                  <Clock className="w-5 h-5 text-gold shrink-0" />
                  <span className="font-inter text-foreground">{time} ({timezone})</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-gold shrink-0" />
                <span className="font-inter text-foreground">Zoom (link in your email)</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Calendar Buttons - Visual only */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
           <Button variant="outline" className="border-border text-muted-foreground hover:text-gold hover:border-gold">
             Add to Google Calendar
           </Button>
           <Button variant="outline" className="border-border text-muted-foreground hover:text-gold hover:border-gold">
             Add to Apple Calendar
           </Button>
        </motion.div>
      </div>
    </section>
  );
}
