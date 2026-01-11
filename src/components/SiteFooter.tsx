'use client';

export default function SiteFooter() {
    return (
        <footer className="bg-[#0e0e0e] pt-32 pb-12 px-6 border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                <div>
                   <h2 className="text-4xl font-bold tracking-tighter text-white mb-6">ARGON X</h2>
                    <p className="text-white/40 text-sm max-w-xs">
                        Redefining the boundaries of digital imaging physics. 
                        Engineered in Tokyo, assembled in Hamburg.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
                    <div>
                        <h4 className="text-white font-semibold uppercase tracking-widest mb-4 text-xs">Product</h4>
                        <ul className="space-y-2 text-white/50">
                            <li><a href="#" className="hover:text-white transition-colors">Overview</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Specs</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Lenses</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold uppercase tracking-widest mb-4 text-xs">Support</h4>
                        <ul className="space-y-2 text-white/50">
                            <li><a href="#" className="hover:text-white transition-colors">Manuals</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Registration</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
                <p>© 2026 Argon Optical Industries. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">Privacy</a>
                    <a href="#" className="hover:text-white">Terms</a>
                </div>
            </div>
        </footer>
    );
}
