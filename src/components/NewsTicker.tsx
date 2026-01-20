import { AlertCircle } from "lucide-react";

const newsItems = [
  "🎯 Upcoming Workshop on Fractal Geometry – January 2026",
  "📊 New Math Modeling Results for Brahmaputra River Flow Published",
  "🏆 Registrations open for Jigyasa Math Olympiad 2026",
  "🔬 CSIR-NEIST Scientists Develop New Algorithm for Seismic Prediction",
  "📚 Monthly Math Challenge: Win Exciting Prizes!",
  "🌟 Join the Cryptography Bootcamp – Limited Seats Available",
];

const NewsTicker = () => {
  // Duplicate items for seamless loop
  const duplicatedItems = [...newsItems, ...newsItems];

  return (
    <section className="bg-primary py-3 overflow-hidden">
      <div className="flex items-center">
        {/* Breaking News Badge */}
        <div className="flex-shrink-0 z-10 bg-news-red text-primary-foreground px-4 py-1.5 font-semibold text-sm flex items-center gap-2 shadow-lg">
          <AlertCircle size={16} />
          <span>UPDATES</span>
        </div>
        
        {/* Ticker Content */}
        <div className="flex-1 overflow-hidden">
          <div className="animate-ticker flex whitespace-nowrap hover:pause">
            {duplicatedItems.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center text-primary-foreground/90 text-sm font-medium mx-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-science-gold mr-3" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsTicker;
