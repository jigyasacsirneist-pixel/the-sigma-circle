const mathSymbols = [
  { symbol: "π", size: "text-6xl", delay: "0s", duration: "20s", left: "5%", top: "20%" },
  { symbol: "e", size: "text-5xl", delay: "2s", duration: "25s", left: "15%", top: "60%" },
  { symbol: "Φ", size: "text-7xl", delay: "4s", duration: "22s", left: "80%", top: "15%" },
  { symbol: "∑", size: "text-4xl", delay: "1s", duration: "18s", left: "70%", top: "70%" },
  { symbol: "∫", size: "text-6xl", delay: "3s", duration: "24s", left: "90%", top: "40%" },
  { symbol: "∞", size: "text-5xl", delay: "5s", duration: "20s", left: "25%", top: "80%" },
  { symbol: "√", size: "text-4xl", delay: "2.5s", duration: "21s", left: "60%", top: "25%" },
  { symbol: "θ", size: "text-5xl", delay: "1.5s", duration: "23s", left: "40%", top: "50%" },
  { symbol: "λ", size: "text-4xl", delay: "4.5s", duration: "19s", left: "85%", top: "85%" },
  { symbol: "Δ", size: "text-6xl", delay: "3.5s", duration: "22s", left: "10%", top: "40%" },
];

const geometricShapes = [
  { type: "triangle", size: 60, delay: "1s", duration: "30s", left: "20%", top: "30%" },
  { type: "circle", size: 40, delay: "2s", duration: "25s", left: "75%", top: "55%" },
  { type: "sine", width: 100, delay: "0s", duration: "35s", left: "50%", top: "75%" },
];

const FloatingMathSymbols = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* Blueprint Grid Pattern */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,204,0,0.15)" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid-large" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(255,204,0,0.25)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#grid-large)" />
        </svg>
      </div>

      {/* Floating Math Symbols - MORE VISIBLE */}
      {mathSymbols.map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.size} font-serif animate-float-symbol`}
          style={{
            left: item.left,
            top: item.top,
            animationDelay: item.delay,
            animationDuration: item.duration,
            color: "rgba(255, 255, 255, 0.25)",
            textShadow: "0 0 20px rgba(255, 204, 0, 0.3)",
          }}
        >
          {item.symbol}
        </div>
      ))}

      {/* Geometric Shapes - MORE VISIBLE */}
      {geometricShapes.map((shape, index) => (
        <div
          key={`shape-${index}`}
          className="absolute animate-float-shape"
          style={{
            left: shape.left,
            top: shape.top,
            animationDelay: shape.delay,
            animationDuration: shape.duration,
          }}
        >
          {shape.type === "triangle" && (
            <svg width={shape.size} height={shape.size} viewBox="0 0 100 100">
              <polygon 
                points="50,10 90,90 10,90" 
                fill="none" 
                stroke="rgba(255, 204, 0, 0.3)" 
                strokeWidth="2" 
              />
            </svg>
          )}
          {shape.type === "circle" && (
            <svg width={shape.size} height={shape.size} viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.2)" 
                strokeWidth="2" 
              />
            </svg>
          )}
          {shape.type === "sine" && (
            <svg width={shape.width} height="40" viewBox="0 0 100 40">
              <path 
                d="M0,20 Q25,0 50,20 T100,20" 
                fill="none" 
                stroke="rgba(255, 204, 0, 0.35)" 
                strokeWidth="2" 
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingMathSymbols;
