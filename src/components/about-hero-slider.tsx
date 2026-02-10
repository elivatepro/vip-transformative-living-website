"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getSiteImageUrl } from "@/lib/site-images";

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

export function AboutHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-20%", opacity: 0 }}
          transition={{ 
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
        >
          <Image
            src={getSiteImageUrl(images[currentIndex])}
            alt="Coach Wayne Dawson"
            fill
            className="object-cover object-top"
            priority={currentIndex === 0}
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Overlay effects to blend with background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 mix-blend-multiply" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
    </div>
  );
}
