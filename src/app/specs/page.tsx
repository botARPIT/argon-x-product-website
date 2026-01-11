'use client';

import { motion } from 'framer-motion';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const specsData = [
  {
    category: "Imaging",
    items: [
      { label: "Sensor Type", value: "35mm full-frame (35.9 x 24.0 mm) Exmor RS CMOS sensor" },
      { label: "Effective Pixels", value: "Approx. 50.1 megapixels" },
      { label: "Total Pixels", value: "Approx. 53.0 megapixels" },
      { label: "Aspect Ratio", value: "3:2" },
      { label: "Color Filter System", value: "RGB primary color filters" },
    ]
  },
  {
    category: "Recording (Still)",
    items: [
      { label: "Formatting", value: "JPEG (DCF Ver. 2.0, Exif Ver. 2.32, MPF Baseline compliant), HEIF (MPEG-A MIAF compliant), RAW (Sony ARW 4.0 format compliant)" },
      { label: "Image Quality Modes", value: "RAW, JPEG, HEIF (4:2:0 / 4:2:2), RAW+JPEG, RAW+HEIF" },
      { label: "Dynamic Range", value: "15 stops (Movie)" }
    ]
  },
  {
    category: "Recording (Movie)",
    items: [
      { label: "Compression", value: "XAVC S: MPEG-4 AVC/H.264, XAVC HS: MPEG-H HEVC/H.265" },
      { label: "Resolution", value: "8K (7680 x 4320), 4K (3840 x 2160)" },
      { label: "Color Space", value: "Rec. 2020, Rec. 709" }
    ]
  },
  {
    category: "Focus System",
    items: [
      { label: "Type", value: "Fast Hybrid AF (phase-detection AF / contrast-detection AF)" },
      { label: "Focus Points", value: "759 points (phase-detection AF)" },
      { label: "Sensitivity Range", value: "EV-4 to EV20 (ISO 100 equivalent with F2.0 lens attached)" }
    ]
  }
];

export default function SpecsPage() {
  return (
    <main className="min-h-screen bg-[#0e0e0e] selection:bg-white/20 pt-24">
      <SiteHeader />
      
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="mb-20 text-center"
        >
           <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">Technical Specifications</h1>
           <p className="text-white/50 text-lg md:text-xl font-light max-w-2xl mx-auto">
             Engineered without compromise. The Argon X defines a new standard for optical precision and processing power.
           </p>
        </motion.div>

        <div className="space-y-16">
          {specsData.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: idx * 0.1 }}
            >
              <h2 className="text-sm font-medium text-white/40 uppercase tracking-[0.2em] mb-8 border-b border-white/10 pb-4">
                {section.category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
                {section.items.map((item, i) => (
                  <div key={i} className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                     <div className="text-white/60 font-medium text-sm md:text-base">{item.label}</div>
                     <div className="col-span-2 text-white font-light text-sm md:text-base opacity-90">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <SiteFooter />
    </main>
  );
}
