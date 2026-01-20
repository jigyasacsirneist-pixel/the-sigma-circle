import { TrendingUp, TrendingDown, Activity, Minus } from "lucide-react";

type TickerItem = {
  symbol: string;
  title: string;
  trend: "up" | "down" | "neutral";
  value: string;
  category: string;
};

const tickerItems: TickerItem[] = [
  { 
    symbol: "FRCL", 
    title: "Fractal Geometry Workshop", 
    trend: "up", 
    value: "+85%", 
    category: "EVENTS" 
  },
  { 
    symbol: "BRHM", 
    title: "Brahmaputra River Flow Model", 
    trend: "up", 
    value: "+12.3", 
    category: "RESEARCH" 
  },
  { 
    symbol: "JGYS", 
    title: "Math Olympiad 2026", 
    trend: "up", 
    value: "OPEN", 
    category: "REGISTRATIONS" 
  },
  { 
    symbol: "SEIS", 
    title: "Seismic Prediction Algorithm", 
    trend: "up", 
    value: "+94%", 
    category: "ACCURACY" 
  },
  { 
    symbol: "MTCH", 
    title: "Monthly Math Challenge", 
    trend: "neutral", 
    value: "LIVE", 
    category: "COMPETITION" 
  },
  { 
    symbol: "CRYP", 
    title: "Cryptography Bootcamp", 
    trend: "down", 
    value: "5 LEFT", 
    category: "SEATS" 
  },
];

const NewsTicker = () => {
  // Duplicate items for seamless loop
  const duplicatedItems = [...tickerItems, ...tickerItems];

  const TrendIcon = ({ trend }: { trend: "up" | "down" | "neutral" }) => {
    if (trend === "up") return <TrendingUp className="w-3.5 h-3.5" />;
    if (trend === "down") return <TrendingDown className="w-3.5 h-3.5" />;
    return <Minus className="w-3.5 h-3.5" />;
  };

  const getTrendColor = (trend: "up" | "down" | "neutral") => {
    if (trend === "up") return "text-green-400";
    if (trend === "down") return "text-red-400";
    return "text-science-gold";
  };

  return (
    <section className="bg-[#0a0a12] py-0 overflow-hidden border-y border-primary/20">
      <div className="flex items-stretch">
        {/* Live Badge */}
        <div className="flex-shrink-0 z-10 bg-gradient-to-r from-primary to-csir-blue px-4 py-3 flex items-center gap-2 border-r border-primary/30">
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-red-500 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </div>
          <Activity size={16} className="text-science-gold" />
          <span className="text-primary-foreground font-bold text-xs tracking-wider uppercase">
            Science Updates
          </span>
        </div>
        
        {/* Ticker Content */}
        <div className="flex-1 overflow-hidden bg-gradient-to-r from-[#0a0a12] via-[#0d1020] to-[#0a0a12]">
          <div className="animate-ticker flex whitespace-nowrap items-stretch py-2.5 hover:[animation-play-state:paused]">
            {duplicatedItems.map((item, index) => (
              <div
                key={index}
                className="inline-flex items-center mx-1 px-3 py-1.5 bg-primary/5 border border-primary/10 rounded hover:bg-primary/10 transition-colors cursor-pointer group"
              >
                {/* Symbol Badge */}
                <span className="bg-primary/20 text-science-gold font-mono font-bold text-xs px-2 py-0.5 rounded mr-2">
                  {item.symbol}
                </span>
                
                {/* Category */}
                <span className="text-muted-foreground/50 text-[10px] uppercase tracking-wider mr-2">
                  {item.category}
                </span>
                
                {/* Title */}
                <span className="text-primary-foreground/80 text-sm font-medium mr-3 group-hover:text-primary-foreground transition-colors">
                  {item.title}
                </span>
                
                {/* Trend Indicator */}
                <div className={`flex items-center gap-1 font-mono text-xs font-semibold ${getTrendColor(item.trend)}`}>
                  <TrendIcon trend={item.trend} />
                  <span>{item.value}</span>
                </div>
                
                {/* Separator */}
                <span className="ml-4 mr-2 text-primary/30">│</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsTicker;
