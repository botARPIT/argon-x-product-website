export default function ExplodeLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 bg-[#0e0e0e]">
      <div className="flex flex-col items-center gap-4">
        {/* Optical/Lens-like spinner */}
        <div className="relative w-12 h-12 flex items-center justify-center">
             <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
             <div className="absolute inset-0 border-t-2 border-white/80 rounded-full animate-spin"></div>
             <div className="absolute inset-2 border-2 border-white/5 rounded-full"></div>
        </div>
        
        <p className="tracking-[0.2em] text-xs font-medium uppercase text-white/50 animate-pulse">
          Initializing Optics
        </p>
      </div>
    </div>
  );
}
