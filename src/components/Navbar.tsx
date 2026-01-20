import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import csirLogo from "@/assets/csir-logo.jpg";
import neistLogo from "@/assets/neist-logo.jpg";
import jigyasaLogo from "@/assets/jigyasa-logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Activities", href: "#activities" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logos */}
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="bg-white rounded p-1">
              <img 
                src={csirLogo} 
                alt="CSIR Logo" 
                className="h-8 lg:h-11 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block h-8 w-px bg-border/30" />
            <div className="hidden sm:block bg-transparent rounded p-1">
              <img 
                src={neistLogo} 
                alt="CSIR-NEIST Logo" 
                className="h-8 lg:h-11 w-auto object-contain"
              />
            </div>
            <div className="hidden md:block h-8 w-px bg-border/30" />
            <div className="hidden md:block bg-white rounded p-1">
              <img 
                src={jigyasaLogo} 
                alt="Jigyasa Logo" 
                className="h-8 lg:h-11 w-auto object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isScrolled ? "text-foreground" : "text-foreground/90"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              asChild
              className={isScrolled ? "" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"}
            >
              <Link to="/portal">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/portal">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-card">
            <div className="container px-4 py-4 flex flex-col gap-4">
              {/* Mobile Logos */}
              <div className="flex items-center justify-center gap-3 pb-3 border-b border-border">
                <img src={csirLogo} alt="CSIR" className="h-10 w-auto" />
                <img src={neistLogo} alt="NEIST" className="h-10 w-auto" />
                <img src={jigyasaLogo} alt="Jigyasa" className="h-10 w-auto" />
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link to="/portal">Login</Link>
                </Button>
                <Button size="sm" asChild className="flex-1">
                  <Link to="/portal">Register</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
