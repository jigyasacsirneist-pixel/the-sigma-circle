import { motion } from "framer-motion";

interface Mathematician {
  name: string;
  years: string;
  emoji: string;
  x: string;
  y: string;
  delay: number;
  duration: number;
}

const mathematicians: Mathematician[] = [
  { name: "Aryabhata", years: "476-550", emoji: "🧮", x: "5%", y: "15%", delay: 0, duration: 20 },
  { name: "Archimedes", years: "287-212 BC", emoji: "⚙️", x: "85%", y: "20%", delay: 2, duration: 18 },
  { name: "Euclid", years: "300 BC", emoji: "📐", x: "15%", y: "70%", delay: 1, duration: 22 },
  { name: "Pythagoras", years: "570-495 BC", emoji: "📏", x: "80%", y: "75%", delay: 3, duration: 19 },
  { name: "Ramanujan", years: "1887-1920", emoji: "∞", x: "10%", y: "45%", delay: 0.5, duration: 21 },
  { name: "Euler", years: "1707-1783", emoji: "e", x: "90%", y: "50%", delay: 1.5, duration: 17 },
  { name: "Gauss", years: "1777-1855", emoji: "Σ", x: "25%", y: "25%", delay: 2.5, duration: 23 },
  { name: "Newton", years: "1643-1727", emoji: "🍎", x: "75%", y: "35%", delay: 0.8, duration: 20 },
  { name: "Fibonacci", years: "1170-1250", emoji: "🐚", x: "70%", y: "85%", delay: 1.2, duration: 18 },
  { name: "Brahmagupta", years: "598-668", emoji: "0️⃣", x: "30%", y: "80%", delay: 2.2, duration: 24 },
];

const MathematiciansBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
      
      {/* Animated Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="math-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-science-gold" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#math-grid)" />
      </svg>
      
      {/* Floating Mathematician Cards */}
      {mathematicians.map((mathematician, index) => (
        <motion.div
          key={mathematician.name}
          className="absolute"
          style={{ left: mathematician.x, top: mathematician.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.15, 0.3, 0.15],
            scale: [0.95, 1.05, 0.95],
            y: [0, -20, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: mathematician.duration,
            delay: mathematician.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-science-gold/20 rounded-full blur-xl scale-150" />
            
            {/* Card */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 text-center transform hover:scale-110 transition-transform">
              {/* Emoji/Symbol */}
              <div className="text-3xl md:text-5xl mb-2 font-math">
                {mathematician.emoji}
              </div>
              
              {/* Name */}
              <h3 className="text-white/80 font-semibold text-xs md:text-sm tracking-wide">
                {mathematician.name}
              </h3>
              
              {/* Years */}
              <p className="text-science-gold/60 text-[10px] md:text-xs mt-1">
                {mathematician.years}
              </p>
            </div>
            
            {/* Decorative Ring */}
            <motion.div
              className="absolute -inset-2 border border-science-gold/20 rounded-3xl"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </div>
        </motion.div>
      ))}
      
      {/* Floating Mathematical Formulas */}
      <motion.div
        className="absolute left-[40%] top-[10%] text-white/10 font-math text-2xl md:text-4xl"
        animate={{ y: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        e<sup>iπ</sup> + 1 = 0
      </motion.div>
      
      <motion.div
        className="absolute right-[20%] bottom-[15%] text-white/10 font-math text-xl md:text-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        a² + b² = c²
      </motion.div>
      
      <motion.div
        className="absolute left-[60%] top-[60%] text-white/10 font-math text-lg md:text-2xl"
        animate={{ y: [0, -15, 0], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>
      </motion.div>
      
      <motion.div
        className="absolute left-[5%] bottom-[30%] text-white/10 font-math text-xl md:text-3xl"
        animate={{ y: [0, 25, 0], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      >
        ∫∞
      </motion.div>
      
      {/* Animated Circles/Orbits */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.circle
          cx="50%"
          cy="50%"
          r="200"
          fill="none"
          stroke="rgba(255, 204, 0, 0.1)"
          strokeWidth="1"
          strokeDasharray="10 20"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="350"
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1"
          strokeDasharray="5 15"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
};

export default MathematiciansBackground;
