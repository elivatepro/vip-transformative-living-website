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

export function SquareHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[4/5] max-w-[450px] mx-auto group">
      {/* Decorative Square Frames */}
      <div className="absolute -inset-4 border border-gold/20 rounded-2xl" />
      <div className="absolute -inset-8 border border-gold/10 rounded-3xl" />
      
      {/* Accent Corners */}
      <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-gold rounded-tl-lg z-20" />
      <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-gold rounded-br-lg z-20" />

      {/* Main Slider Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Image
              src={images[currentIndex]}
              alt="Coach Wayne Dawson"
              fill
              className="object-cover object-top"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, 450px"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlays to blend with background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Decorative Dots */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <div 
            key={index}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentIndex ? "w-8 bg-gold" : "w-2 bg-gold/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
