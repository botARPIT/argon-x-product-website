'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { useState } from 'react';

const packages = [
  {
    id: 'body',
    name: 'Body Only',
    price: '$3,899',
    includes: ['Argon X Body', 'Battery NP-FZ100', 'Charger', 'Strap']
  },
  {
    id: 'kit',
    name: 'Kit w/ 24-70mm',
    price: '$4,999',
    includes: ['Argon X Body', 'FE 24-70mm GM II', 'Battery NP-FZ100', 'Charger', 'Strap']
  }
];

export default function BuyPage() {
  const [selectedPkg, setSelectedPkg] = useState(packages[0]);

  return (
    <main className="min-h-screen bg-[#0e0e0e] selection:bg-white/20 pt-24">
      <SiteHeader />
      
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left: Product Viz */}
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="relative aspect-square md:aspect-[4/3] w-full bg-white/5 rounded-2xl overflow-hidden flex items-center justify-center p-8"
            >
                <div className="relative w-full h-full">
                   {/* Using Frame 000 as the "Product Shot" */}
                   <Image 
                     src="/camera-sequence/frame_000.jpg" 
                     alt="Argon X" 
                     fill 
                     className="object-contain"
                     priority
                   />
                </div>
                
                {/* 360 Badge */}
                <div className="absolute top-6 left-6 text-white/30 text-xs font-mono tracking-widest uppercase">
                    Model: ARG-X-01
                </div>
            </motion.div>

            {/* Right: Configurator */}
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="mb-8">
                   <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-2">Pre-order Argon X</h1>
                   <p className="text-white/50 text-xl">Estimated shipping: November 2026</p>
                </div>

                <div className="space-y-6 mb-12">
                   {packages.map((pkg) => (
                      <div 
                        key={pkg.id}
                        onClick={() => setSelectedPkg(pkg)}
                        className={`cursor-pointer border p-6 rounded-xl transition-all duration-300 ${selectedPkg.id === pkg.id ? 'border-white bg-white/10' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                      >
                         <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-semibold text-white">{pkg.name}</h3>
                            <span className="text-xl font-light text-white">{pkg.price}</span>
                         </div>
                         <p className="text-white/40 text-sm">
                            Includes: {pkg.includes.join(', ')}
                         </p>
                      </div>
                   ))}
                </div>

                <div className="flex flex-col gap-4">
                    <button className="w-full bg-white text-black py-5 rounded-full text-lg font-bold tracking-wide hover:bg-gray-200 transition-colors">
                        Secure Pre-order
                    </button>
                    <p className="text-center text-white/30 text-xs mt-2">
                        Deposit of $500 required today. Fully refundable.
                    </p>
                </div>
            </motion.div>
        </div>
      </div>
      
      <SiteFooter />
    </main>
  );
}
