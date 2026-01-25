"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/about-images/20251017_104756.png",
  "/images/about-images/20251017_140311.png",
  "/images/about-images/20251018_192632.png",
  "/images/about-images/20251018_192646.png",
  "/images/about-images/20251028_121426.png",
  "/images/about-images/20251120_160641.png",
  "/images/about-images/20251209_160640.png",
  "/images/about-images/20251213_152524.png",
  "/images/about-images/4th Image retouched 3.jpg"
];

export function CircularHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mx-auto">
      {/* Decorative Outer Rings */}
      <div className="absolute -inset-10 border border-gold/10 rounded-full animate-spin-slow duration-[30s]" />
      <div className="absolute -inset-20 border border-gold/5 rounded-full animate-reverse-spin-slow duration-[40s]" />
      
      {/* Decorative Ring */}
      <div className="absolute -inset-4 border border-gold/20 rounded-full" />
      
      {/* Main Container */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-transparent p-[2px] bg-gradient-to-br from-gold/80 via-gold/40 to-transparent">
        <div className="w-full h-full rounded-full overflow-hidden bg-surface relative">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={images[currentIndex]}
                alt="Coach Wayne Dawson"
                fill
                className="object-cover"
                priority={currentIndex === 0}
                sizes="(max-width: 768px) 300px, 400px"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Decorative Dots */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-4">
        <div className="w-2 h-2 rounded-full bg-gold/60" />
        <div className="w-2 h-2 rounded-full bg-gold/30" />
        <div className="w-2 h-2 rounded-full bg-gold/60" />
      </div>
    </div>
  );
}
