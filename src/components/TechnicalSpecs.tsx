'use client';

const specs = [
    { label: "Sensor Type", value: "35mm Full-Frame Exmor RS CMOS" },
    { label: "Effective Pixels", value: "50.1 Megapixels" },
    { label: "ISO Sensitivity", value: "ISO 100-32000 (Exp to 50-102400)" },
    { label: "Viewfinder", value: "9.44M-dot QXGA OLED" },
    { label: "Shutter Speed", value: "1/32000 to 30 sec" },
    { label: "Image Stabilization", value: "5.5-stop In-body Mechanic" },
];

export default function TechnicalSpecs() {
  return (
    <section className="bg-[#0e0e0e] py-12 md:py-24 px-6 md:px-12 border-t border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto">
         <div className="mb-12 text-center">
            <h2 className="text-sm font-medium text-white/40 uppercase tracking-[0.2em] mb-4">Specifications</h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">Technical Excellence</h3>
         </div>

         <div className="space-y-4">
             {specs.map((item, i) => (
                 <div key={i} className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/10 group hover:border-white/30 transition-colors">
                     <span className="text-white/50 text-sm uppercase tracking-widest mb-2 md:mb-0">{item.label}</span>
                     <span className="text-white text-lg md:text-xl font-light tracking-wide">{item.value}</span>
                 </div>
             ))}
         </div>
         
         <div className="mt-16 text-center">
             <a href="#" className="text-white border-b border-white pb-1 hover:text-white/80 hover:border-white/80 transition-all text-sm uppercase tracking-widest">
                View Full Datasheet
             </a>
         </div>
      </div>
    </section>
  );
}
