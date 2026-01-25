'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './vip-framework.module.css';
import { motion, useInView } from 'framer-motion';

export function VipFramework() {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  // Mobile fallback state (can be handled by CSS media queries, but we might want conditional rendering)
  // The design review suggests: Desktop (768px+) -> Option A, Mobile (<768px) -> Option C.
  // We can render both and hide/show via CSS or use a hook. CSS is better for SSR.

  return (
    <div className="w-full" ref={containerRef}>
      {/* Desktop View (Option A) */}
      <div className="hidden md:block">
        <div className={styles['vip-triangle']}>
          <svg viewBox="0 0 500 433" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#D4AF37' }} />
                <stop offset="100%" style={{ stopColor: '#B8860B' }} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Triangle Path */}
            <motion.path 
              ref={pathRef}
              d="M 250 40 L 460 390 L 40 390 Z" 
              className={styles['triangle-path']}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2, ease: "easeOut" }}
              filter="url(#glow)"
            />
            
            {/* Vertex Nodes */}
            <motion.circle 
              cx="250" cy="40" r="8" 
              fill="#D4AF37" 
              filter="url(#glow)" 
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.5 }}
              className={styles['triangle-node']} // Add pulse animation via CSS class if needed, or framer
            />
            <motion.circle 
              cx="460" cy="390" r="8" 
              fill="#D4AF37" 
              filter="url(#glow)"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 1.7, duration: 0.5 }}
              className={styles['triangle-node']}
            />
            <motion.circle 
              cx="40" cy="390" r="8" 
              fill="#D4AF37" 
              filter="url(#glow)" 
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 1.9, duration: 0.5 }}
              className={styles['triangle-node']}
            />
          </svg>
          
          {/* Labels positioned absolutely */}
          <motion.span 
            className={`${styles['node-label']} ${styles['purpose-label']}`}
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.1 }}
          >
            PURPOSE
          </motion.span>
          <motion.span 
            className={`${styles['node-label']} ${styles['values-label']}`}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 2.3 }}
          >
            VALUES
          </motion.span>
          <motion.span 
            className={`${styles['node-label']} ${styles['identity-label']}`}
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 2.5 }}
          >
            IDENTITY
          </motion.span>
          
          {/* Center Content */}
          <motion.div 
            className={styles['triangle-center']}
            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
            animate={isInView ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" } : {}}
            transition={{ delay: 2.8, duration: 0.8 }}
          >
            <p className={styles['alignment-title']}>ALIGNMENT</p>
            <p className={styles['alignment-text']}>When V+I+P align, transformation becomes inevitable.</p>
          </motion.div>
        </div>
      </div>

      {/* Mobile View (Option C) */}
      <div className="block md:hidden">
        <div className={styles['vip-stack']}>
          <div className={styles['vip-card']}>
            <div className={styles['vip-letter']}>V</div>
            <div className={styles['vip-card-content']}>
              <h3>VALUES</h3>
              <p>What Drives You</p>
            </div>
          </div>
          
          <div className={styles['vip-connector']} />
          
          <div className={styles['vip-card']}>
            <div className={styles['vip-letter']}>I</div>
            <div className={styles['vip-card-content']}>
              <h3>IDENTITY</h3>
              <p>Who You Truly Are</p>
            </div>
          </div>
          
          <div className={styles['vip-connector']} />
          
          <div className={styles['vip-card']}>
            <div className={styles['vip-letter']}>P</div>
            <div className={styles['vip-card-content']}>
              <h3>PURPOSE</h3>
              <p>Why You Exist</p>
            </div>
          </div>
          
          <div className={styles['vip-connector']} />
          
          <div className={styles['vip-alignment-card']}>
            <h4>ALIGNMENT</h4>
            <p>Transformation Achieved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
