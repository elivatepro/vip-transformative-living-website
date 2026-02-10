'use client';

import Image from 'next/image';
import { getSiteImageUrl } from "@/lib/site-images";

export default function CoachWayneNote() {
  return (
    <section className="bg-background bg-noise py-20 px-4 relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="bg-surface/80 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-xl">
          <div className="shrink-0 relative">
             <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold relative">
               <Image 
                 src={getSiteImageUrl("/images/coach-wayne-new.jpg")}
                 alt="Coach Wayne Dawson"
                 fill
                 className="object-cover"
               />
             </div>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="font-playfair text-xl italic text-gold mb-4">A Quick Note from Coach Wayne</h3>
            <p className="font-inter text-foreground/80 leading-relaxed mb-6">
              "I'm looking forward to meeting you. This call isn't about selling you anything—it's about understanding where you are and exploring if I can help.
              <br /><br />
              Come as you are. Bring your real questions. Let's have an honest conversation."
            </p>
            <p className="font-playfair text-lg italic text-muted-foreground">— Wayne</p>
          </div>
        </div>
      </div>
    </section>
  );
}
