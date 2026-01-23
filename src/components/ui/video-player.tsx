'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoplayOnScroll?: boolean;
  autoplayOnHover?: boolean;
  className?: string;
}

export function VideoPlayer({ 
  src, 
  poster, 
  autoplayOnScroll = false,
  autoplayOnHover = false,
  className
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Autoplay on scroll
  useEffect(() => {
    if (autoplayOnScroll && videoRef.current) {
      if (isInView) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // Auto-play was prevented
              setIsPlaying(false);
            });
        }
      } else {
        videoRef.current.pause();
        setTimeout(() => setIsPlaying(false), 0);
      }
    }
  }, [isInView, autoplayOnScroll]);

  // Hover handlers
  const handleMouseEnter = () => {
    if (autoplayOnHover && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (autoplayOnHover && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative rounded-lg overflow-hidden group bg-black aspect-video", className)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        playsInline
        loop
        className="w-full h-full object-cover"
        onClick={togglePlay}
      />
      
      {/* Controls Overlay */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/30",
        isPlaying && !autoplayOnHover ? "opacity-0 group-hover:opacity-100" : "opacity-100"
      )}>
        <button 
          onClick={togglePlay}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-gold/80 text-background backdrop-blur-sm hover:scale-110 transition-transform"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
        </button>
      </div>

      {/* Mute Toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
