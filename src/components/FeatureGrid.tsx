import { useEffect, useRef } from "react";
import { FlaskConical, LineChart, Lock } from "lucide-react";
import InteractiveFeatureCard from "./InteractiveFeatureCard";

const activities = [
  {
    icon: FlaskConical,
    title: "Lab-to-Desk Math",
    description:
      "Explore the mathematical foundations behind chemistry experiments, biological modeling, and physical sciences conducted at NEIST laboratories.",
    gradient: "from-primary/10 to-csir-blue-light/5",
    iconBg: "bg-primary",
    puzzle: {
      question: "If a chemical reaction doubles every 10 minutes, how many times larger is it after 1 hour?",
      hint: "Think exponentially! 2^n where n = number of 10-min periods",
      answer: "64 times larger (2⁶ = 64)",
    },
  },
  {
    icon: LineChart,
    title: "Predictive Modeling",
    description:
      "Apply mathematical modeling techniques to solve real environmental challenges in Northeast India – from flood prediction to biodiversity analysis.",
    gradient: "from-science-gold/15 to-science-gold/5",
    iconBg: "bg-science-gold",
    puzzle: {
      question: "A river rises 2m every hour. If it starts at 5m, when does it reach 15m?",
      hint: "Linear equation: 5 + 2x = 15",
      answer: "5 hours (x = 5)",
    },
  },
  {
    icon: Lock,
    title: "Cryptography",
    description:
      "Decode the science of secrets. Learn number theory, encryption algorithms, and the mathematics that keeps our digital world secure.",
    gradient: "from-csir-blue-light/10 to-primary/5",
    iconBg: "bg-csir-blue-light",
    puzzle: {
      question: "Caesar Cipher: PDWK → ? (shift = 3 backwards)",
      hint: "P-3=M, D-3=A, W-3=T, K-3=H",
      answer: "MATH 🔓",
    },
  },
];

const FeatureGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

    const cards = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="activities" className="py-20 lg:py-28 section-grey">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            What We Do
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Club Activities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how mathematics powers scientific innovation at CSIR-NEIST
          </p>
          <p className="text-sm text-science-gold mt-2">✨ Hover over cards for mini-puzzles!</p>
        </div>

        {/* Interactive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {activities.map((activity, index) => (
            <InteractiveFeatureCard
              key={activity.title}
              icon={activity.icon}
              title={activity.title}
              description={activity.description}
              gradient={activity.gradient}
              iconBg={activity.iconBg}
              puzzle={activity.puzzle}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
