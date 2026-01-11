'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const galleryImages = [
  {
    src: "/gallery/sample_street.png",
    alt: "Tokyo Night Rain",
    caption: "Low Light / ISO 3200 / f/1.2",
    colSpan: "md:col-span-2",
    aspect: "aspect-[16/9]"
  },
  {
    src: "/gallery/sample_landscape.png",
    alt: "Icelandic Sunset",
    caption: "Dynamic Range / ISO 100 / f/8",
    colSpan: "md:col-span-1",
    aspect: "aspect-square"
  },
  {
    src: "/gallery/sample_macro.png",
    alt: "Macro Eye Detail",
    caption: "Macro Detail / ISO 400 / f/2.8",
    colSpan: "md:col-span-1",
    aspect: "aspect-square"
  },
  {
    src: "/gallery/sample_street.png",
    alt: "Street Detail",
    caption: "Street Snaps / ISO 1600 / f/1.8",
    colSpan: "md:col-span-1",
    aspect: "aspect-[4/5]"
  },
  {
    src: "/gallery/sample_landscape.png",
    alt: "Nature Texture",
    caption: "Color Depth / ISO 50 / f/11",
    colSpan: "md:col-span-1",
    aspect: "aspect-[4/5]"
  }
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#0e0e0e] selection:bg-white/20 pt-24">
      <SiteHeader />
      
      <div className="max-w-7xl mx-auto px-6 py-20">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="mb-24 text-center"
        >
           <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">Shot on Argon X</h1>
           <p className="text-white/50 text-lg md:text-xl font-light max-w-2xl mx-auto">
             See the world as it was meant to be seen. Unfiltered, uncompromised.
           </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {galleryImages.map((img, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ delay: i * 0.1, duration: 0.6 }}
               className={`relative ${img.colSpan} group overflow-hidden bg-white/5`}
             >
                <div className={`relative w-full ${img.aspect}`}>
                  <Image 
                    src={img.src} 
                    alt={img.alt} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  
                  <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <p className="text-white font-medium tracking-wide">{img.alt}</p>
                      <p className="text-white/60 text-xs uppercase tracking-widest mt-1">{img.caption}</p>
                  </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
