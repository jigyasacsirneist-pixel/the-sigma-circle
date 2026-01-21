import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import FeatureGrid from "@/components/FeatureGrid";
import MathematiciansCarousel from "@/components/MathematiciansCarousel";
import SineWaveDivider from "@/components/SineWaveDivider";
import FormulaDecor from "@/components/FormulaDecor";
import Footer from "@/components/Footer";
import MouseConstellation from "@/components/MouseConstellation";
import MathFactCharacter from "@/components/MathFactCharacter";
import GeometrySandbox from "@/components/GeometrySandbox";
import ClickableFormula from "@/components/ClickableFormula";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Interactive Mouse Constellation Background */}
      <MouseConstellation />
      
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
      
      {/* Clickable Formula Section */}
      <section className="py-16 bg-muted/50 text-center">
        <p className="text-muted-foreground mb-4">Click on any formula for a surprise! ✨</p>
        <div className="flex flex-wrap justify-center gap-8 text-2xl md:text-4xl">
          <ClickableFormula formula="E = mc²" className="text-foreground hover:text-primary transition-colors" />
          <ClickableFormula formula="a² + b² = c²" className="text-foreground hover:text-primary transition-colors" />
          <ClickableFormula formula="eⁱᵖ + 1 = 0" className="text-foreground hover:text-primary transition-colors" />
        </div>
      </section>
      
      <SineWaveDivider className="bg-background" color="text-science-gold/30" />
      
      <Footer />
      
      {/* Interactive Elements */}
      <MathFactCharacter />
      <GeometrySandbox />
    </div>
  );
};

export default Index;
