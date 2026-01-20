import { useEffect, useRef } from "react";
import { FlaskConical, LineChart, Lock } from "lucide-react";

const activities = [
  {
    icon: FlaskConical,
    title: "Lab-to-Desk Math",
    description:
      "Explore the mathematical foundations behind chemistry experiments, biological modeling, and physical sciences conducted at NEIST laboratories.",
    gradient: "from-primary/10 to-csir-blue-light/5",
    iconBg: "bg-primary",
  },
  {
    icon: LineChart,
    title: "Predictive Modeling",
    description:
      "Apply mathematical modeling techniques to solve real environmental challenges in Northeast India – from flood prediction to biodiversity analysis.",
    gradient: "from-science-gold/15 to-science-gold/5",
    iconBg: "bg-science-gold",
  },
  {
    icon: Lock,
    title: "Cryptography",
    description:
      "Decode the science of secrets. Learn number theory, encryption algorithms, and the mathematics that keeps our digital world secure.",
    gradient: "from-csir-blue-light/10 to-primary/5",
    iconBg: "bg-csir-blue-light",
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
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {activities.map((activity, index) => (
            <div
              key={activity.title}
              className={`animate-on-scroll group relative bg-background rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${activity.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl ${activity.iconBg} flex items-center justify-center mb-6 shadow-button`}
                >
                  <activity.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {activity.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>

                {/* Learn More Link */}
                <div className="mt-6 flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
