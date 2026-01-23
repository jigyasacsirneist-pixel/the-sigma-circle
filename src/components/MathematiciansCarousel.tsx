import { useState, useEffect, useRef, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
const mathematicians = [
  {
    name: "Srinivasa Ramanujan",
    years: "1887 - 1920",
    title: "The Man Who Knew Infinity",
    quote: "An equation for me has no meaning unless it expresses a thought of God.",
    color: "from-science-gold/20 to-science-gold/5",
    borderColor: "border-science-gold/30",
    initial: "R",
    accentColor: "text-science-gold",
  },
  {
    name: "Aryabhata",
    years: "476 - 550 CE",
    title: "Father of Indian Mathematics",
    quote: "Just as a bee collects honey from flowers, so should a scholar gain knowledge from everywhere.",
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
    initial: "A",
    accentColor: "text-primary",
  },
  {
    name: "Alan Turing",
    years: "1912 - 1954",
    title: "Father of Computer Science",
    quote: "Those who can imagine anything, can create the impossible.",
    color: "from-csir-blue-light/20 to-csir-blue-light/5",
    borderColor: "border-csir-blue-light/30",
    initial: "T",
    accentColor: "text-csir-blue-light",
  },
  {
    name: "Katherine Johnson",
    years: "1918 - 2020",
    title: "Hidden Figure of NASA",
    quote: "I counted everything. I counted the steps to the road, the steps up to church.",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    initial: "K",
    accentColor: "text-purple-500",
  },
  {
    name: "Leonhard Euler",
    years: "1707 - 1783",
    title: "Master of Us All",
    quote: "Mathematicians have tried in vain to find some order in the sequence of prime numbers.",
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/30",
    initial: "E",
    accentColor: "text-emerald-500",
  },
];

const MathematiciansCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  // Auto-scroll for mobile users
  useEffect(() => {
    if (!api || !isMobile) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api, isMobile]);

  // Handle card click for mobile
  const handleCardClick = useCallback((index: number) => {
    if (isMobile) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  }, [isMobile, expandedIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Euler's Identity Easter Egg */}
      <div className="absolute top-10 right-10 font-math text-2xl text-muted-foreground/20 hidden lg:block">
        e<sup>iπ</sup> + 1 = 0
      </div>
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span className="font-math text-lg">∑</span>
            Hall of Fame
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Legends of Mathematics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Giants on whose shoulders we stand – their ideas shape our understanding of the universe
          </p>
        </div>

        {/* Carousel */}
        <div className="animate-on-scroll">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {mathematicians.map((person, index) => {
                const isExpanded = isMobile ? expandedIndex === index : hoveredIndex === index;
                
                return (
                  <CarouselItem key={person.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div
                      className={`relative group h-full bg-gradient-to-br ${person.color} rounded-2xl p-6 border-2 ${person.borderColor} transition-all duration-500 hover:scale-105 hover:shadow-card-hover cursor-pointer`}
                      onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                      onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                      onClick={() => handleCardClick(index)}
                    >
                      {/* Avatar Circle */}
                      <div className={`w-20 h-20 rounded-full bg-background border-2 ${person.borderColor} flex items-center justify-center mx-auto mb-4 shadow-card`}>
                        <span className={`text-3xl font-bold font-math ${person.accentColor}`}>
                          {person.initial}
                        </span>
                      </div>

                      {/* Name & Title */}
                      <h3 className="text-xl font-bold text-foreground text-center mb-1">
                        {person.name}
                      </h3>
                      <p className="text-sm text-muted-foreground text-center mb-2">
                        {person.years}
                      </p>
                      <p className={`text-sm font-medium ${person.accentColor} text-center mb-4`}>
                        {person.title}
                      </p>

                      {/* Quote (appears on hover/tap) */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm italic text-muted-foreground text-center">
                            "{person.quote}"
                          </p>
                        </div>
                      </div>

                      {/* Tap/Hover hint */}
                      <div
                        className={`text-xs text-muted-foreground/60 text-center mt-2 transition-opacity ${
                          isExpanded ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        {isMobile ? "Tap for quote" : "Hover for quote"}
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default MathematiciansCarousel;
