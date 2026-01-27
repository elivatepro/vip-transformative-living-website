'use client';

import { Linkedin, Youtube, Instagram, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function StayConnected() {
  return (
    <section className="bg-background py-16 px-4 text-center border-t border-border/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-playfair text-2xl text-foreground mb-2">Stay Connected</h2>
        <p className="font-inter text-muted-foreground mb-8">Get weekly insights while you wait for your call.</p>

        {/* Newsletter form simplified */}
        <div className="max-w-md mx-auto mb-12">
            <div className="flex gap-2">
               <input 
                 type="email" 
                 placeholder="Your email" 
                 className="flex-1 bg-background border border-border rounded-md px-4 py-2 text-sm text-foreground focus:outline-none focus:border-gold"
               />
               <Button className="h-auto py-2">
                 Subscribe
               </Button>
            </div>
        </div>

        <div className="flex items-center justify-center gap-4 text-zinc-500 text-sm mb-8">
            <div className="h-px w-16 bg-border" />
            <span>or</span>
            <div className="h-px w-16 bg-border" />
         </div>

         <p className="font-playfair text-lg text-foreground mb-6">Follow Coach Wayne</p>
         
         <div className="flex justify-center gap-4 mb-12">
           {[
             { Icon: Linkedin, href: '#' },
             { Icon: Youtube, href: '#' },
             { Icon: Instagram, href: '#' },
           ].map(({ Icon, href }, idx) => (
             <Link 
               key={idx}
               href={href}
               className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-300"
             >
               <Icon className="w-5 h-5" />
             </Link>
           ))}
         </div>

         <div className="border-t border-border pt-12">
            <p className="text-sm text-zinc-500 mb-6">Questions? Email support@viptl.com</p>
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-gold transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Homepage
            </Link>
         </div>
      </div>
    </section>
  );
}
