'use client';

import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { getSiteImageUrl } from "@/lib/site-images";

export default function WhileYouWait() {
  return (
    <section className="bg-surface py-20 px-4 relative overflow-hidden border-t border-border/50">
       {/* Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl -z-10" />

       <div className="max-w-2xl mx-auto text-center">
         <h2 className="font-playfair text-3xl text-foreground mb-4">While You Wait...</h2>
         <p className="font-inter text-muted-foreground mb-12">Get a head start on your transformation.</p>

         <div className="bg-background border border-border rounded-2xl p-8 mb-8 text-left flex flex-col md:flex-row gap-6 items-center shadow-lg hover:border-gold/30 transition-colors">
            <div className="w-28 h-36 bg-surface-elevated rounded-lg shrink-0 relative overflow-hidden flex items-center justify-center text-zinc-600 shadow-inner">
               {/* Using actual ebook cover if available, otherwise fallback */}
               <Image 
                  src={getSiteImageUrl("/images/Breaking Free Ebook Cover.png")} 
                  alt="Ebook Cover" 
                  fill
                  className="object-cover"
               />
            </div>
            <div>
               <div className="text-[11px] font-bold uppercase tracking-widest text-gold mb-2">Free Resource</div>
               <h3 className="font-playfair text-xl text-foreground mb-2">The 5 Questions Every Man Must Answer</h3>
               <p className="font-inter text-sm text-muted-foreground mb-4">A quick read to help you start reflecting before our call.</p>
               <Button variant="link" className="p-0 h-auto text-gold hover:text-gold/80 hover:no-underline">
                 Download Free <ArrowRight className="w-4 h-4 ml-1" />
               </Button>
            </div>
         </div>

         <div className="flex items-center justify-center gap-4 text-zinc-500 text-sm mb-8">
            <div className="h-px w-16 bg-border" />
            <span>OR</span>
            <div className="h-px w-16 bg-border" />
         </div>

         <div>
           <h3 className="font-playfair text-xl text-foreground mb-2">Take the Free VIP Self-Assessment</h3>
           <p className="font-inter text-sm text-muted-foreground mb-6">Get instant clarity on your Values, Identity & Purpose</p>
           <Button className="rounded-full px-8">
             Start Assessment <ArrowRight className="w-4 h-4 ml-2" />
           </Button>
         </div>
       </div>
    </section>
  );
}
