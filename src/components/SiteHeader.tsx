'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SiteHeader() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
            <div className="w-4 h-4 bg-white rounded-full group-hover:bg-gray-200 transition-colors" />
            <span className="text-white font-bold tracking-tighter text-xl">ARGON X</span>
        </Link>

        <nav className="hidden md:flex gap-8">
            {[
              { name: 'Overview', path: '/' },
              { name: 'Specs', path: '/specs' },
              { name: 'Gallery', path: '/gallery' },
              { name: 'Buy', path: '/buy' }
            ].map((item) => (
                <Link key={item.name} href={item.path} className="text-sm font-medium text-white/70 hover:text-white uppercase tracking-widest transition-colors relative group">
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
            ))}
        </nav>

        <Link href="/buy" className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors">
            Pre-order
        </Link>
      </div>
    </motion.header>
  );
}
