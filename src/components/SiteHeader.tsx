'use client';

import Link from 'next/link';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Overview', path: '/' },
  { name: 'Specs', path: '/specs' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Buy', path: '/buy' }
];

export default function SiteHeader() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-[#0e0e0e]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group z-50 relative" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-4 h-4 bg-white rounded-full group-hover:bg-gray-200 transition-colors" />
            <span className="text-white font-bold tracking-tighter text-xl">ARGON X</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
                <Link key={item.name} href={item.path} className="text-sm font-medium text-white/70 hover:text-white uppercase tracking-widest transition-colors relative group">
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
            ))}
        </nav>

        <div className="hidden md:block">
            <Link href="/buy" className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors">
                Pre-order
            </Link>
        </div>

        {/* Mobile Hamburger */}
        <button 
            className="md:hidden z-50 p-2 text-white relative w-8 h-8 flex flex-col justify-center gap-[6px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
            <motion.span 
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-[2px] bg-white block origin-center transition-transform"
            />
            <motion.span 
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-[2px] bg-white block"
            />
            <motion.span 
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-[2px] bg-white block origin-center transition-transform"
            />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed inset-0 bg-[#0e0e0e] z-40 flex flex-col pt-32 px-6 md:hidden"
                >
                    <nav className="flex flex-col gap-8">
                        {navItems.map((item, idx) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + idx * 0.1 }}
                            >
                                <Link 
                                    href={item.path} 
                                    className="text-3xl font-bold text-white tracking-tighter"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12"
                    >
                         <Link 
                            href="/buy" 
                            className="block w-full text-center bg-white text-black py-4 rounded-full text-lg font-bold tracking-wide"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Pre-order Now
                        </Link>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
