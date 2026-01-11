import CameraExplodeScroll from "@/components/CameraExplodeScroll";
import FeatureGrid from "@/components/FeatureGrid";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TechnicalSpecs from "@/components/TechnicalSpecs";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0e0e0e] selection:bg-white/20">
      <SiteHeader />
      
      {/* 
        The Scrollytelling Component.
        Occupies 400vh of space.
      */}
      <CameraExplodeScroll />
      
      {/* Post-Scroll Content */}
      <div className="relative z-10 bg-[#0e0e0e]">
          <FeatureGrid />
          <TechnicalSpecs />
          <SiteFooter />
      </div>
    </main>
  );
}
