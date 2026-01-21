import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const mathFacts = [
  "Did you know 111,111,111 × 111,111,111 = 12,345,678,987,654,321?",
  "A 'googol' is 10^100 – more than all atoms in the universe!",
  "Zero is the only number that can't be represented in Roman numerals!",
  "The word 'hundred' comes from 'hundrath', meaning 120, not 100!",
  "If you shuffle a deck of cards, the order has likely never existed before!",
  "π has been calculated to over 100 trillion digits!",
  "1 + 2 + 3 + 4 + ... to infinity = -1/12 (in certain mathematical contexts)!",
  "A pizza with radius 'z' and height 'a' has volume Pi × z × z × a!",
  "There are 6 different ways to arrange 3 objects!",
  "The Fibonacci sequence appears in sunflower seed patterns!",
];

const MathFactCharacter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFact, setCurrentFact] = useState(mathFacts[0]);

  const handleClick = () => {
    if (!isOpen) {
      const randomFact = mathFacts[Math.floor(Math.random() * mathFacts.length)];
      setCurrentFact(randomFact);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Speech Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-24 right-0 w-72 bg-background border-2 border-science-gold rounded-2xl p-4 shadow-card-hover"
          >
            {/* Triangle pointer */}
            <div className="absolute -bottom-3 right-8 w-6 h-6 bg-background border-r-2 border-b-2 border-science-gold rotate-45" />
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-start gap-2">
              <span className="text-2xl">🧠</span>
              <div>
                <p className="text-xs font-bold text-science-gold mb-1">Mind-Blowing Math Fact!</p>
                <p className="text-sm text-foreground leading-relaxed">{currentFact}</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                const randomFact = mathFacts[Math.floor(Math.random() * mathFacts.length)];
                setCurrentFact(randomFact);
              }}
              className="mt-3 text-xs text-primary hover:text-primary/80 font-medium"
            >
              ✨ Another fact!
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Button */}
      <motion.button
        onClick={handleClick}
        className="relative w-20 h-20 rounded-full bg-gradient-to-br from-science-gold to-science-gold-dark shadow-button flex items-center justify-center overflow-hidden border-4 border-background"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Ramanujan-style character avatar */}
        <div className="text-4xl">🧮</div>
        
        {/* Notification dot */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="text-[10px] text-white font-bold">!</span>
          </motion.div>
        )}
      </motion.button>

      {/* Hint text */}
      <motion.p
        className="text-[10px] text-muted-foreground text-center mt-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Click me!
      </motion.p>
    </div>
  );
};

export default MathFactCharacter;
