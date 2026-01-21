import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import FeatureGrid from "@/components/FeatureGrid";
import MathematiciansCarousel from "@/components/MathematiciansCarousel";
import SineWaveDivider from "@/components/SineWaveDivider";
import FormulaDecor from "@/components/FormulaDecor";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      
      {/* News Ticker with Formula Decor */}
      <div className="relative">
        <FormulaDecor formula="euler" position="right" className="top-1/2 -translate-y-1/2" />
        <NewsTicker />
      </div>
      
      <SineWaveDivider className="bg-background" color="text-science-gold/30" />
      
      <FeatureGrid />
      
      <SineWaveDivider className="bg-muted" color="text-primary/20" inverted />
      
      {/* Mathematicians Carousel with Formula Decor */}
      <div className="relative">
        <FormulaDecor formula="goldenRatio" position="left" className="top-20" />
        <MathematiciansCarousel />
      </div>
      
      <SineWaveDivider className="bg-background" color="text-science-gold/30" />
      
      <Footer />
    </div>
  );
};

export default Index;
