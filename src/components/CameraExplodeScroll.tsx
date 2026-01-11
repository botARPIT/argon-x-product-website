'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import ExplodeLoader from './ExplodeLoader';
import ExplodeOverlays from './ExplodeOverlays';

// Configuration
const FRAME_COUNT = 160;
const FRAME_PATH = '/camera-sequence/frame_'; 
const BUFFER_SIZE = 24; // Keep ~24 frames ahead/behind. ~0.5s of fast scroll.
const LERP_FACTOR = 0.08; // Lower = smoother, Higher = more responsive.

// Helper: Linear Interpolation
const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};

export default function CameraExplodeScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State
  const scrollProgressRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastRenderedFrameRef = useRef(-1);
  const requestRef = useRef<number>(0);
  
  // Image Cache: Map<index, Image>
  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const [areInitialImagesLoaded, setAreInitialImagesLoaded] = useState(false);
  
  const isMobileRef = useRef(false);

  // Scroll Motion Value
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 1. Decouple Scroll Input
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    scrollProgressRef.current = latest;
  });

  // Device Detection
  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isSmall = window.innerWidth < 768;
      isMobileRef.current = isTouch || isSmall;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Resource Management (Sliding Window)
  const manageResources = useCallback((targetIndex: number) => {
    const start = Math.max(0, targetIndex - BUFFER_SIZE);
    const end = Math.min(FRAME_COUNT - 1, targetIndex + BUFFER_SIZE);

    // Garbage Collect
    const keysToRemove: number[] = [];
    imageCache.current.forEach((_, key) => {
      if (key < start || key > end) {
        keysToRemove.push(key);
      }
    });

    keysToRemove.forEach((key) => {
        imageCache.current.delete(key); 
    });

    // Preload Window
    for (let i = start; i <= end; i++) {
        if (!imageCache.current.has(i)) {
            const img = new Image();
            img.decoding = 'async'; 
            const frameStr = i.toString().padStart(3, '0');
            img.src = `${FRAME_PATH}${frameStr}.jpg`;
            imageCache.current.set(i, img);
        }
    }
  }, []);

  // Initial Preload
  useEffect(() => {
    const preloadInit = async () => {
      const promises: Promise<void>[] = [];
      const initBuffer = 20; // Load first 20 immediately
      
      for (let i = 0; i < initBuffer; i++) {
         const promise = new Promise<void>((resolve) => {
            const img = new Image();
            img.decoding = 'async';
            const frameStr = i.toString().padStart(3, '0');
            img.src = `${FRAME_PATH}${frameStr}.jpg`;
            img.onload = () => {
                imageCache.current.set(i, img);
                resolve();
            };
            img.onerror = () => resolve(); 
         });
         promises.push(promise);
      }
      
      await Promise.all(promises);
      setAreInitialImagesLoaded(true);
    };
    
    preloadInit();
  }, []);


  // 3. Render Loop
  const renderLoop = useCallback(() => {
    if (!canvasRef.current) return;

    // A. Calculate Physics
    const targetFrameIndex = scrollProgressRef.current * (FRAME_COUNT - 1);
    
    const diff = targetFrameIndex - currentFrameRef.current;
    
    // Snap or Lerp
    if (Math.abs(diff) < 0.05) {
        currentFrameRef.current = targetFrameIndex;
    } else {
        currentFrameRef.current = lerp(currentFrameRef.current, targetFrameIndex, LERP_FACTOR);
    }

    // B. Draw Guard (Integer Check)
    const drawIndex = Math.round(currentFrameRef.current);
    
    // Trigger Resource Management
    manageResources(drawIndex);

    const canvas = canvasRef.current;
    
    // Redraw if index changed
    if (drawIndex !== lastRenderedFrameRef.current) {
        const img = imageCache.current.get(drawIndex);
        
        if (img && img.complete && img.naturalWidth > 0) {
             const ctx = canvas.getContext('2d', { alpha: false }); 
             if (ctx) {
                 // 4. Canvas Resize & DPR Handling
                 const dpr = window.devicePixelRatio || 1;
                 const maxDpr = isMobileRef.current ? 1.5 : dpr;
                 const effectiveDpr = Math.min(dpr, maxDpr);
                 
                 const rect = canvas.getBoundingClientRect();
                 const targetWidth = rect.width * effectiveDpr;
                 const targetHeight = rect.height * effectiveDpr;
                 
                 if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
                     canvas.width = targetWidth;
                     canvas.height = targetHeight;
                     ctx.scale(effectiveDpr, effectiveDpr);
                 }
                 
                 ctx.clearRect(0, 0, rect.width, rect.height);
                 
                 // Contain Logic
                 const imgRatio = img.naturalWidth / img.naturalHeight;
                 const canvasRatio = rect.width / rect.height;
                 
                 let drawW, drawH, offX, offY;
                 
                 if (canvasRatio > imgRatio) {
                     drawH = rect.height;
                     drawW = drawH * imgRatio;
                     offX = (rect.width - drawW) / 2;
                     offY = 0;
                 } else {
                     drawW = rect.width;
                     drawH = drawW / imgRatio;
                     offX = 0;
                     offY = (rect.height - drawH) / 2;
                 }
                 
                 ctx.drawImage(img, offX, offY, drawW, drawH);
                 lastRenderedFrameRef.current = drawIndex;
             }
        }
    }

    requestRef.current = requestAnimationFrame(renderLoop);
  }, [manageResources]);

  // Start/Stop Loop
  useEffect(() => {
    if (areInitialImagesLoaded) {
        requestRef.current = requestAnimationFrame(renderLoop);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [areInitialImagesLoaded, renderLoop]);

  return (
    <div ref={containerRef} className={`relative bg-[#0e0e0e] ${areInitialImagesLoaded ? 'h-[600vh]' : 'h-screen overflow-hidden'}`}>
      
      {!areInitialImagesLoaded && <ExplodeLoader />}

      <div className="sticky top-0 h-screen w-full overflow-hidden overscroll-none">
        
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
        />

        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,#0e0e0e_100%)] opacity-100 z-[5]" />

        {areInitialImagesLoaded && <ExplodeOverlays scrollYProgress={scrollYProgress} />}
        
      </div>
    </div>
  );
}
