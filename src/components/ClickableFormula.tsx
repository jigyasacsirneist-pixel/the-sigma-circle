import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickableFormulaProps {
  formula: string;
  className?: string;
}

const ClickableFormula = ({ formula, className = "" }: ClickableFormulaProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; char: string }[]>([]);

  const handleClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Generate confetti
    const newConfetti = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      char: ["1", "2", "3", "π", "∞", "=", "+", "×"][Math.floor(Math.random() * 8)],
    }));

    setConfetti(newConfetti);

    setTimeout(() => {
      setIsAnimating(false);
      setConfetti([]);
    }, 1000);
  };

  return (
    <motion.span
      onClick={handleClick}
      className={`relative inline-block cursor-pointer font-math ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isAnimating
          ? {
              textShadow: [
                "0 0 0px rgba(255,204,0,0)",
                "0 0 20px rgba(255,204,0,0.8)",
                "0 0 40px rgba(255,204,0,0.6)",
                "0 0 0px rgba(255,204,0,0)",
              ],
            }
          : {}
      }
      transition={{ duration: 0.5 }}
    >
      {formula}

      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((c) => (
          <motion.span
            key={c.id}
            className="absolute text-science-gold font-bold pointer-events-none"
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: c.x,
              y: c.y - 50,
              scale: 0.5,
              rotate: Math.random() * 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ left: "50%", top: "50%" }}
          >
            {c.char}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Glow ring */}
      {isAnimating && (
        <motion.span
          className="absolute inset-0 rounded-lg border-2 border-science-gold"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.span>
  );
};

export default ClickableFormula;
