import { MotionValue, useTransform, motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

interface ExplodeOverlaysProps {
  scrollYProgress: MotionValue<number>;
}

export default function ExplodeOverlays({ scrollYProgress }: ExplodeOverlaysProps) {
  // Intro (0–15%)
  const introOpacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Lens (25–40%)
  const lensOpacity = useTransform(scrollYProgress, [0.20, 0.25, 0.40, 0.45], [0, 1, 1, 0]);
  const lensY = useTransform(scrollYProgress, [0.20, 0.45], [50, 0]);

  // Sensor (50–65%)
  const sensorOpacity = useTransform(scrollYProgress, [0.45, 0.50, 0.65, 0.70], [0, 1, 1, 0]);
  const sensorY = useTransform(scrollYProgress, [0.45, 0.70], [50, 0]);

  // Internal (70–85%)
  const internalOpacity = useTransform(scrollYProgress, [0.65, 0.70, 0.85, 0.90], [0, 1, 1, 0]);
  const internalY = useTransform(scrollYProgress, [0.65, 0.90], [50, 0]);

  // CTA (90–100%)
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.90, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 1], [50, 0]);

  return (
    <>
      {/* Intro */}
      <motion.div 
        style={{ opacity: introOpacity, y: introY }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 will-change-transform"
      >
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 text-center text-white">
          Argon X
        </h1>
        <p className="text-xl md:text-2xl text-white/70 tracking-wide font-light">
          Precision, Captured.
        </p>
      </motion.div>

      {/* Lens Separation - Left Aligned */}
      <motion.div 
        style={{ opacity: lensOpacity, y: lensY }}
        className="absolute inset-0 flex items-center justify-start px-8 md:px-32 pointer-events-none select-none z-10 will-change-transform"
      >
          <div className="max-w-xs md:max-w-md">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-2">Optical Engineering</h2>
            <p className="text-base md:text-xl text-white/60 font-light">Multi-element glass, engineered for clarity.</p>
          </div>
      </motion.div>

      {/* Sensor Reveal - Right Aligned */}
      <motion.div 
        style={{ opacity: sensorOpacity, y: sensorY }}
        className="absolute inset-0 flex items-center justify-end px-8 md:px-32 pointer-events-none select-none z-10 will-change-transform"
      >
          <div className="max-w-xs md:max-w-md text-right">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-2">Full-Frame Sensor</h2>
            <p className="text-base md:text-xl text-white/60 font-light">Light, translated into data.</p>
          </div>
      </motion.div>

      {/* Internal Stack - Subtle */}
      <motion.div 
        style={{ opacity: internalOpacity, y: internalY }}
        className="absolute inset-0 flex items-end justify-center pb-32 pointer-events-none select-none z-10 will-change-transform"
      >
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-light tracking-wide text-white mb-1">High-speed processing.</h2>
            <p className="text-base md:text-lg text-white/50">Zero compromise.</p>
          </div>
      </motion.div>

      {/* CTA */}
      <motion.div 
        style={{ opacity: ctaOpacity, y: ctaY }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-20 will-change-transform"
      >
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 text-white px-4 text-center">
          Built to see more.
        </h2>
        <Link href="/buy" className="hidden md:block pointer-events-auto bg-white text-black px-10 py-4 rounded-full text-lg font-medium tracking-wide hover:bg-gray-200 transition-colors">
          Pre-order
        </Link>
      </motion.div>
    </>
  );
}
