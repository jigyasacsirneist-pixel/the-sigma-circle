import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MathematiciansBackground from "./MathematiciansBackground";
import FloatingMathSymbols from "./FloatingMathSymbols";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Mathematicians Background */}
      <MathematiciansBackground />
      
      {/* Floating Math Symbols & Grid */}
      <FloatingMathSymbols />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-science-gold/20 border border-science-gold/40 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-science-gold animate-pulse" />
            <span className="text-primary-foreground text-sm font-medium">
              Under CSIR-NEIST Jigyasa Program
            </span>
          </div>
          
          {/* Particle Text Effect */}
          <div className="mb-6 animate-fade-in-up animation-delay-100">
            <ParticleTextEffect 
              words={["MATHS CLUB", "π ∞ Σ", "EXPLORE", "DISCOVER", "CSIR-NEIST"]}
              className="w-full max-w-[800px] h-[200px] mx-auto"
            />
          </div>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-science-gold font-semibold mb-4 animate-fade-in-up animation-delay-200">
            @ CSIR-NEIST
          </p>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-300">
            Bridging the gap between abstract mathematics and real-world scientific discovery.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="https://quiz.deolang.com/login">Login</Link>
            </Button>
            <Button variant="gold" size="xl" asChild>
              <Link to="https://quiz.deolang.com/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
