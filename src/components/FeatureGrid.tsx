'use client';

import { motion } from 'framer-motion';

const features = [
  { 
    title: "Magnesium Alloy Body", 
    desc: "A unibody chassis milled to 0.01mm tolerance. Weather-sealed and built for the most extreme environments.",
    col: "md:col-span-2",
  },
  { 
    title: "50.1 MP", 
    desc: "Exmor RS CMOS Sensor",
    col: "md:col-span-1",
  },
  { 
    title: "8K Video", 
    desc: "30fps 10-bit 4:2:2 internal recording.",
    col: "md:col-span-1",
  },
  { 
    title: "AI Autofocus", 
    desc: "Real-time tracking for eyes, animals, and vehicles.",
    col: "md:col-span-2",
  },
];

export default function FeatureGrid() {
  return (
    <section className="bg-[#0e0e0e] py-32 px-6 md:px-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6">Designed for the Obsessed.</h2>
          <p className="text-white/60 text-lg max-w-2xl font-light">
            Every curve, button, and dial has been refined over thousands of hours of testing. 
            The Argon X is not just a tool; it is an extension of your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${f.col} group relative overflow-hidden bg-white/5 border border-white/10 p-8 md:p-12 hover:bg-white/10 transition-colors duration-500`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
              </div>
              
              <div className="h-full flex flex-col justify-between">
                <div></div> {/* Spacer */}
                <div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">{f.title}</h3>
                  <p className="text-white/50">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
